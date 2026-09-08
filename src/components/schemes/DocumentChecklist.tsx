"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Check, FileText } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export interface DocumentItem {
  name: string;
  mandatory: boolean;
  note?: string;
}

export interface DocumentChecklistProps extends React.HTMLAttributes<HTMLDivElement> {
  documents: DocumentItem[];
  title?: string;
}

export function DocumentChecklist({ documents, title, className, ...props }: DocumentChecklistProps) {
  return (
    <div className={cn("w-full", className)} {...props}>
      {title && (
        <h2 className="mb-4 text-lg font-semibold text-text-primary sm:text-xl">{title}</h2>
      )}
      <ul className="divide-y divide-border rounded-[var(--radius-card)] border border-border bg-surface">
        {documents.map((doc) => (
          <li
            key={doc.name}
            className="flex items-start justify-between gap-3 px-4 py-3"
          >
            <div className="flex items-start gap-3">
              <span className="mt-0.5 rounded-[var(--radius-input)] bg-primary/5 p-1.5 text-primary">
                <FileText className="h-4 w-4" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-medium text-text-primary">{doc.name}</p>
                {doc.note && <p className="mt-0.5 text-xs text-text-secondary">{doc.note}</p>}
              </div>
            </div>
            <Badge variant={doc.mandatory ? "default" : "secondary"}>
              <Check className="mr-1 h-3 w-3" aria-hidden="true" />
              {doc.mandatory ? "Mandatory" : "Optional"}
            </Badge>
          </li>
        ))}
      </ul>
    </div>
  );
}