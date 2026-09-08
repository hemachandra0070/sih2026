"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Bot, User, Play, Pause, Mic } from "lucide-react";
import type { ChatMessage } from "@/lib/api/chat";

export type { ChatMessage } from "@/lib/api/chat";

export interface ChatMessageBubbleProps {
  message: ChatMessage;
  className?: string;
  isPlaying?: boolean;
  onTogglePlay?: () => void;
}

export function ChatMessageBubble({
  message,
  className,
  isPlaying = false,
  onTogglePlay,
}: ChatMessageBubbleProps) {
  const isUser = message.role === "user";
  const hasAudio = Boolean(message.audioUrl);

  return (
    <div className={cn("flex w-full gap-2.5", isUser ? "justify-end" : "justify-start", className)}>
      {!isUser && (
        <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Bot className="h-4 w-4" aria-hidden="true" />
        </span>
      )}
      <div
        className={cn(
          "max-w-[85%] rounded-[var(--radius-card)] px-4 py-2.5 text-sm leading-relaxed sm:max-w-[75%]",
          isUser
            ? "bg-primary text-white"
            : "border border-border bg-surface text-text-primary"
        )}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>

        {/* Audio playback bar for messages with TTS audio */}
        {hasAudio && (
          <div className="mt-2.5 flex items-center gap-2 border-t border-border/50 pt-2">
            <button
              type="button"
              onClick={onTogglePlay}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                isPlaying
                  ? "bg-primary text-white shadow-sm"
                  : "bg-background text-text-primary border border-border hover:bg-surface-soft hover:border-text-primary/40"
              )}
              aria-label={
                isPlaying
                  ? `Pause audio message ${message.audioLanguage ? `in ${message.audioLanguage.toUpperCase()}` : ""}`
                  : `Play audio message ${message.audioLanguage ? `in ${message.audioLanguage.toUpperCase()}` : ""}`
              }
            >
              {isPlaying ? (
                <>
                  <Pause className="h-3 w-3" aria-hidden="true" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="h-3 w-3 fill-current" aria-hidden="true" />
                  <span>Listen</span>
                </>
              )}
            </button>

            {isPlaying && (
              <span className="flex items-center gap-0.5 px-1" aria-hidden="true">
                <span className="h-2.5 w-0.5 rounded-full bg-primary animate-pulse" />
                <span className="h-4 w-0.5 rounded-full bg-primary animate-pulse [animation-delay:150ms]" />
                <span className="h-2 w-0.5 rounded-full bg-primary animate-pulse [animation-delay:300ms]" />
                <span className="h-3.5 w-0.5 rounded-full bg-primary animate-pulse [animation-delay:75ms]" />
              </span>
            )}

            {message.audioLanguage && (
              <span className="text-[10px] uppercase font-semibold tracking-wider text-text-secondary">
                {message.audioLanguage}
              </span>
            )}
          </div>
        )}

        <div className="mt-1 flex items-center justify-between gap-2">
          {message.timestamp && (
            <p
              className={cn(
                "text-[10px] uppercase tracking-wide",
                isUser ? "text-white/70" : "text-text-secondary"
              )}
            >
              {message.timestamp}
            </p>
          )}
          {isUser && message.isVoice && (
            <span
              className="inline-flex items-center gap-1 text-[10px] text-white/80"
              title="Transcribed from voice"
            >
              <Mic className="h-2.5 w-2.5" aria-hidden="true" />
              <span>Voice</span>
            </span>
          )}
        </div>
      </div>
      {isUser && (
        <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
          <User className="h-4 w-4" aria-hidden="true" />
        </span>
      )}
    </div>
  );
}