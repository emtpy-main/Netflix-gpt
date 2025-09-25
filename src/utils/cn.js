import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// helper to merge class names
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
