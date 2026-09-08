"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Send, ArrowRight } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ChatMessageBubble } from "@/components/chat/ChatMessageBubble";
import { sendChatMessage } from "@/lib/api";
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

export default function ChatPage() {
  const router = useRouter();
  const [messages, setMessages] = React.useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = React.useState("");
  const [sending, setSending] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages, sending]);

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
    if (!trimmed || sending) return;

    const userMessage: ChatMessage = { role: "user", content: trimmed, timestamp: now() };
    const history = [...messages, userMessage];
    setMessages(history);
    setInput("");
    setSending(true);

    sendChatMessage({ message: trimmed, conversationHistory: history })
      .then((response) => {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: response.message,
            timestamp: now(),
            quickActions: response.quickActions,
          },
        ]);
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
        subtitle="Ask about eligibility, financing, documents and application steps for a scheme."
      />

      <Card className="flex h-[70vh] flex-col overflow-hidden">
        <div
          ref={scrollRef}
          className="flex-1 space-y-3 overflow-y-auto p-4 sm:p-6"
          role="log"
          aria-live="polite"
        >
          {messages.map((message, index) => (
            <div key={index}>
              <ChatMessageBubble message={message} />
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
                  Typing…
                </Badge>
              </span>
            </div>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 border-t border-border bg-background p-3 sm:p-4"
        >
          <Input
            type="text"
            aria-label="Type your question"
            placeholder="Ask about schemes, eligibility or documents…"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            className={cn("flex-1")}
          />
          <Button type="submit" size="icon" loading={sending} disabled={!input.trim()}>
            <Send className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </Card>
    </PageContainer>
  );
}