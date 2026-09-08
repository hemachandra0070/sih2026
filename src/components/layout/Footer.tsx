"use client";

import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="text-sm font-semibold text-text-primary">{t("header.serviceName")}</h2>
            <p className="mt-2 text-sm text-text-secondary">
              {t("landing.hero.subtitle")}
            </p>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-text-primary">Service</h2>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <Link href="/assess" className="text-text-secondary transition-colors hover:text-text-primary">
                  {t("navigation.assess")}
                </Link>
              </li>
              <li>
                <Link href="/schemes" className="text-text-secondary transition-colors hover:text-text-primary">
                  {t("navigation.schemes")}
                </Link>
              </li>
              <li>
                <Link href="/calculator" className="text-text-secondary transition-colors hover:text-text-primary">
                  {t("navigation.calculateEmi")}
                </Link>
              </li>
              <li>
                <Link href="/partners" className="text-text-secondary transition-colors hover:text-text-primary">
                  {t("navigation.partners")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-text-primary">Getting help</h2>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <span className="text-text-secondary">{t("footer.about")}</span>
              </li>
              <li>
                <span className="text-text-secondary">{t("footer.accessibility")}</span>
              </li>
              <li>
                <Link href="/chat" className="text-text-secondary transition-colors hover:text-text-primary">
                  {t("navigation.chat")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-text-primary">Information</h2>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <span className="text-text-secondary">{t("footer.privacy")}</span>
              </li>
              <li>
                <span className="text-text-secondary">{t("footer.sourceNote")}</span>
              </li>
            </ul>
            <p className="mt-4 text-xs text-text-secondary">
              {t("footer.copyright")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}