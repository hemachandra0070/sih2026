"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface ChatMessageBubbleProps {
  message: ChatMessage;
  className?: string;
}

export function ChatMessageBubble({ message, className }: ChatMessageBubbleProps) {
  const isUser = message.role === "user";

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
        <p>{message.content}</p>
        {message.timestamp && (
          <p
            className={cn(
              "mt-1 text-[10px] uppercase tracking-wide",
              isUser ? "text-white/70" : "text-text-secondary"
            )}
          >
            {message.timestamp}
          </p>
        )}
      </div>
      {isUser && (
        <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
          <User className="h-4 w-4" aria-hidden="true" />
        </span>
      )}
    </div>
  );
}