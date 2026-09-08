import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, locale = "en-IN"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number, locale = "en-IN"): string {
  return new Intl.NumberFormat(locale).format(num);
}

export function formatPercentage(value: number, locale = "en-IN"): string {
  return new Intl.NumberFormat(locale, {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(value / 100);
}

export function formatIndianCompact(amount: number): string {
  if (amount >= 10000000) {
    const crore = parseFloat((amount / 10000000).toFixed(1));
    return `₹${crore} crore`;
  }
  if (amount >= 100000) {
    const lakh = parseFloat((amount / 100000).toFixed(1));
    return `₹${lakh} lakh`;
  }
  return formatCurrency(amount);
}

export function formatIndianDigits(input: string): string {
  const digits = input.replace(/\D/g, "");
  if (!digits) return "";
  return new Intl.NumberFormat("en-IN").format(Number(digits));
}

export function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${Math.round(meters)} m`;
  }
  return `${(meters / 1000).toFixed(1)} km`;
}

export function generateId(prefix = "id"): string {
  return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  ms: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), ms);
  };
}