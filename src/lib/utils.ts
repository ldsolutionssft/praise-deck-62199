import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
export function onBuy() {
    if (window?.fbq) {
        window.fbq("track", "InitiateCheckout");
    }
    window.location.href = "";
}
