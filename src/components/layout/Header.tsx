"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Languages, Globe } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/Sheet";
import { useTranslation } from "@/hooks/useTranslation";

type Language = "en" | "hi" | "te";

const NAV_ITEMS = [
  { href: "/", label: "navigation.home" },
  { href: "/assess", label: "navigation.assess" },
  { href: "/schemes", label: "navigation.schemes" },
  { href: "/calculator", label: "navigation.calculateEmi" },
  { href: "/partners", label: "navigation.partners" },
  { href: "/chat", label: "navigation.chat" },
];

export function Header() {
  const { t, language, setLanguage } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLanguageChange = () => {
    const languages: Language[] = ["en", "hi", "te"];
    const next = languages[(languages.indexOf(language) + 1) % languages.length];
    setLanguage(next);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white">
      <div className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-primary rounded">
                <span className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-input)] bg-primary text-white">
                  <Globe className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="hidden sm:block text-sm font-semibold leading-tight text-text-primary">
                  {t("header.serviceName")}
                </span>
              </Link>
              <nav aria-label="Primary" className="hidden md:flex items-center gap-1">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-[var(--radius-input)] px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-background hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {t(item.label)}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleLanguageChange}
                className="inline-flex items-center gap-1.5 rounded-[var(--radius-input)] px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-background hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label={t("header.language")}
              >
                <Languages className="h-4 w-4" aria-hidden="true" />
                <span className="uppercase">{language}</span>
              </button>
              <div className="md:hidden">
                <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-text-primary hover:bg-background"
                      aria-label="Open menu"
                    >
                      <Menu className="h-5 w-5" aria-hidden="true" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="bg-surface">
                    <SheetHeader>
                      <SheetTitle className="text-text-primary">{t("header.serviceName")}</SheetTitle>
                    </SheetHeader>
                    <nav aria-label="Mobile" className="mt-4 flex flex-col gap-1">
                      {NAV_ITEMS.map((item) => (
                        <SheetClose asChild key={item.href}>
                          <Link
                            href={item.href}
                            className="rounded-[var(--radius-input)] px-3 py-2.5 text-base font-medium text-text-primary transition-colors hover:bg-background"
                          >
                            {t(item.label)}
                          </Link>
                        </SheetClose>
                      ))}
                    </nav>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}