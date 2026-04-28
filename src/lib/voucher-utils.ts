import type { Voucher } from "@/data/vouchers";

export const TARGET_WHATSAPP = "5585999393807";

const STORAGE_KEY = "comfort-hub:redeemed";

export type Redemption = {
  code: string;
  /** ISO date string */
  date: string;
};

export type RedemptionMap = Record<string, Redemption>;

export function generateRedemptionCode(voucherId: string): string {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(-2);
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  const slug = voucherId.toUpperCase().slice(0, 3).padEnd(3, "X");
  return `AC${yy}${mm}${dd}-${slug}-${random}`;
}

export function formatDateBR(date: Date): string {
  return date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function buildWhatsAppMessage(
  voucher: Pick<Voucher, "title" | "subtitle" | "emoji">,
  code: string,
  date: Date
): string {
  const lines = [
    `Oi amor 💗`,
    ``,
    `Resgatei meu vale: *${voucher.emoji} ${voucher.title}*`,
    `_${voucher.subtitle}_`,
    ``,
    `Código: ${code}`,
    `Resgatado em: ${formatDateBR(date)}`,
    ``,
    `Vamos combinar? ♡`,
  ];
  return lines.join("\n");
}

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${TARGET_WHATSAPP}?text=${encodeURIComponent(message)}`;
}

export function loadRedemptions(): RedemptionMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return {};
    return parsed as RedemptionMap;
  } catch {
    return {};
  }
}

export function saveRedemptions(map: RedemptionMap): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {
    // localStorage indisponível — ignora silenciosamente
  }
}
