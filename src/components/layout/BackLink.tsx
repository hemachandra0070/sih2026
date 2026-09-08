"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BackLinkProps extends React.HTMLAttributes<HTMLElement> {
  href?: string;
  label?: string;
  onClick?: () => void;
}

export function BackLink({ href, label = "Back", onClick, className, ...props }: BackLinkProps) {
  const router = useRouter();

  const commonClasses = cn(
    "group inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary-dark",
    "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded",
    className
  );

  if (href) {
    return (
      <Link href={href} className={commonClasses} {...props}>
        <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
        {label}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick || (() => router.back())} className={commonClasses} {...props}>
      <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
      {label}
    </button>
  );
}