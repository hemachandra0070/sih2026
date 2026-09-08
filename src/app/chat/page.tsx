"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Send, ArrowRight, Mic, Square, Volume2, VolumeX } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Alert } from "@/components/ui/Alert";
import { ChatMessageBubble } from "@/components/chat/ChatMessageBubble";
import { sendChatMessage, sendAudioMessage, formatAudioDataUrl } from "@/lib/api/chat";
import type { ChatMessage } from "@/lib/api/chat";
import { cn } from "@/lib/utils";

const INITIAL_MESSAGE: ChatMessage = {
  role: "assistant",
  content:
    "Hello! I can help you understand government schemes for SC entrepreneurs and students — eligibility, financing, documents and how to apply. How can I help?",
  timestamp: "",
  quickActions: ["Find a scheme", "Check eligibility", "Calculate EMI", "Required documents"],
};

const NAV_ACTIONS: Record<string, string> = {
  "Find a scheme": "/assess",
  "Calculate EMI": "/calculator",
};

function now(): string {
  return new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export default function ChatPage() {
  const router = useRouter();
  const [messages, setMessages] = React.useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = React.useState("");
  const [sending, setSending] = React.useState(false);

  // Voice recording state
  const [isRecording, setIsRecording] = React.useState(false);
  const [recordingDuration, setRecordingDuration] = React.useState(0);
  const [recordingError, setRecordingError] = React.useState<string | null>(null);
  const [autoPlayVoice, setAutoPlayVoice] = React.useState(true);

  // Audio playback state
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const [currentPlayingIndex, setCurrentPlayingIndex] = React.useState<number | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = React.useState(false);

  // Refs for media recording
  const mediaRecorderRef = React.useRef<MediaRecorder | null>(null);
  const audioStreamRef = React.useRef<MediaStream | null>(null);
  const recordedChunksRef = React.useRef<Blob[]>([]);
  const timerIntervalRef = React.useRef<NodeJS.Timeout | null>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages, sending, isRecording]);

  // Clean up recording and audio on unmount
  React.useEffect(() => {
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
      if (audioStreamRef.current) {
        audioStreamRef.current.getTracks().forEach((t) => t.stop());
      }
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const playAudioForMessage = (url: string, index: number) => {
    if (!audioRef.current) return;
    audioRef.current.src = url;
    audioRef.current
      .play()
      .then(() => {
        setCurrentPlayingIndex(index);
        setIsPlayingAudio(true);
      })
      .catch((err) => {
        console.warn("Audio playback prevented or failed:", err);
        setIsPlayingAudio(false);
      });
  };

  const togglePlayAudio = (index: number) => {
    if (currentPlayingIndex === index && isPlayingAudio) {
      audioRef.current?.pause();
      setIsPlayingAudio(false);
      return;
    }

    const targetMessage = messages[index];
    if (targetMessage?.audioUrl) {
      playAudioForMessage(targetMessage.audioUrl, index);
    }
  };

  const startRecording = async () => {
    setRecordingError(null);
    if (typeof window === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setRecordingError("Voice recording is not supported in this browser.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioStreamRef.current = stream;

      const supportedMime = [
        "audio/webm;codecs=opus",
        "audio/webm",
        "audio/mp4",
        "audio/ogg;codecs=opus",
        "",
      ].find(
        (type) =>
          !type ||
          (typeof MediaRecorder !== "undefined" && MediaRecorder.isTypeSupported(type))
      ) || "";

      const options = supportedMime ? { mimeType: supportedMime } : undefined;
      const mediaRecorder = new MediaRecorder(stream, options);
      mediaRecorderRef.current = mediaRecorder;
      recordedChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.start(250);
      setIsRecording(true);
      setRecordingDuration(0);

      timerIntervalRef.current = setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);
    } catch (err: unknown) {
      console.error("Microphone access error:", err);
      const isPermissionDenied =
        err instanceof DOMException &&
        (err.name === "NotAllowedError" || err.name === "PermissionDeniedError");
      setRecordingError(
        isPermissionDenied
          ? "Microphone access was denied. Please allow microphone permissions in your browser to use the voice assistant."
          : "Could not access microphone. Please check your audio input device."
      );
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (!mediaRecorderRef.current || !isRecording) return;

    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }

    const recorder = mediaRecorderRef.current;
    recorder.onstop = () => {
      const mimeType = recorder.mimeType || "audio/webm";
      const audioBlob = new Blob(recordedChunksRef.current, { type: mimeType });

      if (audioStreamRef.current) {
        audioStreamRef.current.getTracks().forEach((track) => track.stop());
        audioStreamRef.current = null;
      }

      handleSendAudio(audioBlob);
    };

    recorder.stop();
    setIsRecording(false);
  };

  const handleSendAudio = (audioBlob: Blob) => {
    if (sending) return;

    const tempUserMsgIndex = messages.length;
    const placeholderMsg: ChatMessage = {
      role: "user",
      content: "Listening… transcribing voice…",
      timestamp: now(),
      isVoice: true,
    };

    const historyWithPlaceholder = [...messages, placeholderMsg];
    setMessages(historyWithPlaceholder);
    setSending(true);

    sendAudioMessage(audioBlob, historyWithPlaceholder)
      .then((response) => {
        const transcriptText = response.transcript || "Voice query";
        const answerText =
          response.answer_text ||
          response.message ||
          "Here is the information for your scheme query.";
        const audioUrl = formatAudioDataUrl(response.audio_base64);

        setMessages((prev) => {
          const updated = [...prev];
          if (updated[tempUserMsgIndex]) {
            updated[tempUserMsgIndex] = {
              ...updated[tempUserMsgIndex],
              content: transcriptText,
            };
          }
          const assistantMsg: ChatMessage = {
            role: "assistant",
            content: answerText,
            timestamp: now(),
            quickActions: response.quickActions,
            audioUrl,
            audioLanguage: response.answer_language,
          };
          const newMessages = [...updated, assistantMsg];

          if (audioUrl && autoPlayVoice) {
            setTimeout(() => {
              playAudioForMessage(audioUrl, newMessages.length - 1);
            }, 100);
          }

          return newMessages;
        });
      })
      .catch(() => {
        setMessages((prev) => {
          const updated = [...prev];
          if (updated[tempUserMsgIndex]) {
            updated[tempUserMsgIndex] = {
              ...updated[tempUserMsgIndex],
              content: "Voice query (untranscribed)",
            };
          }
          return [
            ...updated,
            {
              role: "assistant",
              content:
                "Sorry, I had trouble processing your voice query. Please try again or type your question.",
              timestamp: now(),
            },
          ];
        });
      })
      .finally(() => {
        setSending(false);
      });
  };

  const runQuickAction = (action: string) => {
    const path = NAV_ACTIONS[action];
    if (path) {
      router.push(path);
      return;
    }
    sendMessage(action);
  };

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || sending || isRecording) return;

    const userMessage: ChatMessage = { role: "user", content: trimmed, timestamp: now() };
    const history = [...messages, userMessage];
    setMessages(history);
    setInput("");
    setSending(true);

    sendChatMessage({ message: trimmed, conversationHistory: history })
      .then((response) => {
        const answerText = response.answer_text || response.message || "Here is the information you requested.";
        const audioUrl = formatAudioDataUrl(response.audio_base64);

        setMessages((prev) => {
          const assistantMsg: ChatMessage = {
            role: "assistant",
            content: answerText,
            timestamp: now(),
            quickActions: response.quickActions,
            audioUrl,
            audioLanguage: response.answer_language,
          };
          const newMessages = [...prev, assistantMsg];

          if (audioUrl && autoPlayVoice) {
            setTimeout(() => {
              playAudioForMessage(audioUrl, newMessages.length - 1);
            }, 100);
          }

          return newMessages;
        });
      })
      .catch(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Something went wrong. Please try again.",
            timestamp: now(),
          },
        ]);
      })
      .finally(() => {
        setSending(false);
      });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage(input);
  };

  return (
    <PageContainer maxWidth="lg">
      <PageHeader
        title="Ask about schemes"
        subtitle="Speak or type to ask about eligibility, financing, documents and application steps."
      />

      <Card className="flex h-[72vh] flex-col overflow-hidden border border-border shadow-sm">
        {/* Assistant status & Auto-play control header */}
        <div className="flex items-center justify-between border-b border-border bg-surface px-4 py-2.5 text-xs text-text-secondary">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
            <span className="font-medium text-text-primary">Voice & Text Assistant</span>
          </div>
          <button
            type="button"
            onClick={() => setAutoPlayVoice((prev) => !prev)}
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium text-text-secondary transition-colors hover:text-text-primary hover:bg-surface-soft focus:outline-none focus-visible:ring-1 focus-visible:ring-primary"
            aria-label={autoPlayVoice ? "Auto-play voice responses is ON" : "Auto-play voice responses is OFF"}
            title="Toggle automatic audio reply playback"
          >
            {autoPlayVoice ? (
              <>
                <Volume2 className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                <span>Auto-play: ON</span>
              </>
            ) : (
              <>
                <VolumeX className="h-3.5 w-3.5 text-text-secondary" aria-hidden="true" />
                <span>Auto-play: OFF</span>
              </>
            )}
          </button>
        </div>

        {/* Hidden shared audio element */}
        <audio
          ref={audioRef}
          className="hidden"
          onEnded={() => setIsPlayingAudio(false)}
          onPause={() => setIsPlayingAudio(false)}
          onError={() => setIsPlayingAudio(false)}
        />

        {/* Message history log */}
        <div
          ref={scrollRef}
          className="flex-1 space-y-3 overflow-y-auto p-4 sm:p-6"
          role="log"
          aria-live="polite"
        >
          {messages.map((message, index) => (
            <div key={index}>
              <ChatMessageBubble
                message={message}
                isPlaying={currentPlayingIndex === index && isPlayingAudio}
                onTogglePlay={() => togglePlayAudio(index)}
              />
              {message.role === "assistant" &&
                message.quickActions &&
                message.quickActions.length > 0 && (
                  <div className="ml-9 mt-2 flex flex-wrap gap-2">
                    {message.quickActions.map((action) => (
                      <button
                        key={action}
                        type="button"
                        onClick={() => runQuickAction(action)}
                        className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      >
                        {action}
                        {NAV_ACTIONS[action] && (
                          <ArrowRight className="h-3 w-3" aria-hidden="true" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
            </div>
          ))}

          {sending && (
            <div className="flex w-full justify-start gap-2.5">
              <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <span className="text-xs" aria-hidden="true">
                  …
                </span>
              </span>
              <span
                className="rounded-[var(--radius-card)] border border-border bg-surface px-4 py-2.5 text-sm text-text-secondary"
                role="status"
              >
                <Badge variant="secondary" className="animate-pulse bg-transparent">
                  Thinking…
                </Badge>
              </span>
            </div>
          )}
        </div>

        {/* Microphone permission / system error banner */}
        {recordingError && (
          <div className="border-t border-border px-3 pt-3">
            <Alert
              variant="destructive"
              dismissible
              onDismiss={() => setRecordingError(null)}
              title="Voice Input Notice"
            >
              {recordingError}
            </Alert>
          </div>
        )}

        {/* Input bar with mic and send buttons */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 border-t border-border bg-background p-3 sm:p-4"
        >
          {isRecording ? (
            /* Recording active bar */
            <div className="flex flex-1 items-center gap-3 rounded-[var(--radius-input)] border border-primary/40 bg-primary/5 px-4 py-2 text-sm text-primary animate-pulse">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500" />
              </span>
              <span className="font-medium text-text-primary">Listening…</span>
              <span className="flex items-center gap-1" aria-hidden="true">
                <span className="h-2 w-1 animate-pulse rounded-full bg-primary" />
                <span className="h-4 w-1 animate-pulse rounded-full bg-primary [animation-delay:150ms]" />
                <span className="h-2.5 w-1 animate-pulse rounded-full bg-primary [animation-delay:300ms]" />
                <span className="h-5 w-1 animate-pulse rounded-full bg-primary [animation-delay:75ms]" />
                <span className="h-3 w-1 animate-pulse rounded-full bg-primary [animation-delay:225ms]" />
              </span>
              <span className="ml-auto font-mono text-xs font-semibold text-text-secondary">
                {formatDuration(recordingDuration)}
              </span>
            </div>
          ) : (
            <Input
              type="text"
              aria-label="Type your question"
              placeholder="Ask by text or click the mic to speak…"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              disabled={sending}
              className="flex-1"
            />
          )}

          {/* Voice mic / Stop button */}
          {isRecording ? (
            <Button
              type="button"
              size="icon"
              onClick={stopRecording}
              aria-label="Stop recording and send voice question"
              title="Stop recording"
              className="rounded-full bg-red-500 hover:bg-red-600 text-white shadow-sm"
            >
              <Square className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
            </Button>
          ) : (
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={startRecording}
              disabled={sending}
              aria-label="Use microphone to ask question"
              title="Ask by voice"
              className="rounded-full border-border text-text-secondary hover:border-primary hover:text-primary hover:bg-primary/5"
            >
              <Mic className="h-4 w-4" aria-hidden="true" />
            </Button>
          )}

          {/* Text send button */}
          <Button
            type="submit"
            size="icon"
            loading={sending}
            disabled={!input.trim() || isRecording || sending}
            className="rounded-full"
            aria-label="Send message"
            title="Send message"
          >
            <Send className="h-4 w-4" aria-hidden="true" />
          </Button>
        </form>
      </Card>
    </PageContainer>
  );
}