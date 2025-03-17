import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const customToast = (message: string, options?: {}) => {
  toast(message, { ...options, duration: 2000 });
};

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

export function getCurrentDateForNavbar() {
  const date = new Date();
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
  return formattedDate;
}

export function getLastSixMonths() {
  const months = [];
  const now = new Date();

  for (let i = 0; i < 6; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthName = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    months.push(`${monthName} ${year}`);
  }

  return months;
}
