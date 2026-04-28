"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import type { Voucher } from "@/data/vouchers";
import {
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  formatDateBR,
} from "@/lib/voucher-utils";

type Props = {
  voucher: Voucher;
  code: string;
  date: Date;
  onClose: () => void;
};

export default function RedeemedVoucherModal({
  voucher,
  code,
  date,
  onClose,
}: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (!overlayRef.current || !cardRef.current) return;

    // Bloqueia scroll do body enquanto modal está aberto
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: "power2.out" },
    );
    gsap.fromTo(
      cardRef.current,
      { y: 40, opacity: 0, scale: 0.92, rotateX: -6 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotateX: 0,
        duration: 0.85,
        ease: "power3.out",
      },
    );

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);

  const handleClose = () => {
    if (!cardRef.current || !overlayRef.current) {
      onClose();
      return;
    }
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(cardRef.current, {
      y: 30,
      opacity: 0,
      scale: 0.96,
      duration: 0.35,
      ease: "power2.in",
    }).to(
      overlayRef.current,
      { opacity: 0, duration: 0.3, ease: "power2.in" },
      "<",
    );
  };

  const handleShare = () => {
    const message = buildWhatsAppMessage(voucher, code, date);
    const url = buildWhatsAppUrl(message);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignora
    }
  };

  const formattedDate = formatDateBR(date);

  if (!mounted) return null;

  const modal = (
    <div
      ref={overlayRef}
      className="redeem-overlay fixed inset-0 z-[100] overflow-y-auto"
      style={{
        background:
          "radial-gradient(circle at 50% 30%, rgba(245,237,246,0.92), rgba(155,130,180,0.7))",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
      }}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label="Voucher resgatado"
    >
      <div
        className="min-h-full flex items-center justify-center px-4 sm:px-6 py-8"
        onClick={handleClose}
      >
        <div
          className="w-full max-w-lg flex flex-col items-center gap-6 my-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* O Voucher (área que será impressa) */}
          <div
            ref={cardRef}
            className="printable-voucher relative w-full rounded-[28px] overflow-hidden"
            style={{
              background: `
              radial-gradient(circle at 80% 0%, ${voucher.glow}, transparent 60%),
              radial-gradient(circle at 0% 100%, ${voucher.accent}30, transparent 60%),
              linear-gradient(160deg, #fffdf9, #fdf5f7 60%, #f5edf6)
            `,
              boxShadow:
                "0 30px 80px -30px rgba(150,110,180,0.45), 0 6px 18px rgba(150,110,180,0.15)",
              border: `1px solid ${voucher.accent}55`,
            }}
          >
            {/* Borda decorativa interna */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-3 rounded-[22px]"
              style={{ border: `1px dashed ${voucher.accent}80` }}
            />

            {/* Selo de autenticidade */}
            <div
              aria-hidden
              className="absolute top-5 right-5 sm:top-7 sm:right-7 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-center font-[family-name:var(--font-display)] italic text-[10px] sm:text-xs leading-tight"
              style={{
                background: voucher.accent,
                color: "#fff",
                transform: "rotate(-8deg)",
                boxShadow: `0 10px 30px -10px ${voucher.glow}`,
              }}
            >
              <span className="px-2">
                vale
                <br />
                autêntico
                <br />♡
              </span>
            </div>

            <div className="relative px-7 sm:px-10 pt-9 sm:pt-12 pb-8 sm:pb-10">
              {/* Cabeçalho */}
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="inline-block w-2 h-2 rounded-full"
                  style={{ background: voucher.accent }}
                />
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[color:var(--muted)]">
                  comfort hub · resgatado
                </span>
              </div>

              {/* Emoji + título */}
              <div className="flex items-end gap-4 mb-5">
                <span
                  aria-hidden
                  className="text-5xl sm:text-6xl"
                  style={{
                    filter: `drop-shadow(0 8px 18px ${voucher.glow})`,
                  }}
                >
                  {voucher.emoji}
                </span>
                <div className="flex-1 pr-16 sm:pr-20">
                  <p className="font-[family-name:var(--font-script)] text-xl sm:text-2xl text-[color:var(--muted)] leading-none mb-1">
                    vale presente
                  </p>
                  <h3 className="font-[family-name:var(--font-display)] italic text-3xl sm:text-4xl text-[color:var(--foreground)] leading-tight">
                    {voucher.title}
                  </h3>
                </div>
              </div>

              <p className="font-[family-name:var(--font-script)] text-xl sm:text-2xl text-[color:var(--foreground)] mb-5">
                {voucher.subtitle}
              </p>

              <p className="text-sm sm:text-base text-[color:var(--foreground)]/80 leading-relaxed mb-7">
                {voucher.description}
              </p>

              {/* Linha pontilhada */}
              <div
                aria-hidden
                className="relative my-6"
                style={{
                  borderTop: `2px dashed ${voucher.accent}80`,
                }}
              >
                <span
                  className="absolute -left-10 sm:-left-13 -top-3 w-6 h-6 rounded-full"
                  style={{ background: "var(--background)" }}
                />
                <span
                  className="absolute -right-10 sm:-right-13 -top-3 w-6 h-6 rounded-full"
                  style={{ background: "var(--background)" }}
                />
              </div>

              {/* Detalhes do resgate */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-[color:var(--muted)] mb-1">
                    para
                  </div>
                  <div className="font-[family-name:var(--font-display)] italic text-lg text-[color:var(--foreground)]">
                    Bruna, meu amor
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-[color:var(--muted)] mb-1">
                    de
                  </div>
                  <div className="font-[family-name:var(--font-display)] italic text-lg text-[color:var(--foreground)]">
                    super davi ♡
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-[color:var(--muted)] mb-1">
                    resgatado em
                  </div>
                  <div className="text-[color:var(--foreground)] font-medium">
                    {formattedDate}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-[color:var(--muted)] mb-1">
                    obs.
                  </div>
                  <div className="text-[color:var(--foreground)] text-xs leading-snug">
                    {voucher.note}
                  </div>
                </div>
              </div>

              {/* Código */}
              <div
                className="mt-7 rounded-2xl px-5 py-4 flex items-center justify-between gap-3"
                style={{
                  background: "rgba(255,255,255,0.7)",
                  border: `1px solid ${voucher.accent}50`,
                }}
              >
                <div className="min-w-0">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-[color:var(--muted)] mb-1">
                    código de resgate
                  </div>
                  <div className="font-mono text-base sm:text-lg text-[color:var(--foreground)] tracking-wider truncate">
                    {code}
                  </div>
                </div>
                <button
                  onClick={handleCopy}
                  className="no-print shrink-0 text-xs font-semibold px-3 py-2 rounded-full bg-white hover:bg-white/80 transition-colors text-[color:var(--foreground)]"
                  style={{ border: `1px solid ${voucher.accent}80` }}
                  aria-label="Copiar código"
                >
                  {copied ? "copiado ♡" : "copiar"}
                </button>
              </div>

              {/* Rodapé */}
              <div className="mt-7 flex items-center justify-between">
                <span className="text-xs text-[color:var(--muted)] italic">
                  feito com calma, pra você
                </span>
                <span
                  className="text-xs font-semibold tracking-wider"
                  style={{ color: voucher.accent }}
                >
                  COMFORT HUB · ♡
                </span>
              </div>
            </div>
          </div>

          {/* Ações (ocultas na impressão) */}
          <div className="no-print w-full flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              onClick={handleShare}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5 font-semibold text-white text-sm sm:text-base transition-transform hover:scale-[1.02] active:scale-[0.99]"
              style={{
                background: "linear-gradient(135deg, #25D366, #128C7E)",
                boxShadow: "0 14px 40px -12px rgba(37, 211, 102, 0.55)",
              }}
            >
              <WhatsAppIcon />
              Compartilhar no WhatsApp
            </button>
            <button
              onClick={handlePrint}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5 font-semibold text-sm sm:text-base bg-white/90 hover:bg-white text-[color:var(--foreground)] transition-colors soft-shadow"
              style={{ border: "1px solid rgba(150,110,180,0.25)" }}
            >
              <PrintIcon />
              Imprimir
            </button>
          </div>

          <button
            onClick={handleClose}
            className="no-print text-sm text-[color:var(--muted)] hover:text-[color:var(--foreground)] transition-colors"
          >
            fechar
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}

function WhatsAppIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5"
    >
      <path d="M19.05 4.91A10 10 0 0 0 4.06 18.16L3 22l3.95-1.04a10 10 0 0 0 12.1-15.05M12 20.13a8.13 8.13 0 0 1-4.16-1.13l-.3-.18-2.34.62.62-2.28-.2-.3a8.13 8.13 0 1 1 6.38 3.27m4.4-6.04c-.24-.12-1.43-.7-1.65-.79-.22-.08-.38-.12-.55.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.65-1.2-1.44-1.34-1.68-.14-.24-.02-.37.1-.49.1-.1.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.32-.75-1.81-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.7 2.6 4.13 3.65.58.25 1.03.4 1.38.51.58.18 1.1.16 1.52.1.46-.07 1.43-.58 1.63-1.15.2-.57.2-1.05.14-1.15-.06-.1-.22-.16-.46-.28" />
    </svg>
  );
}

function PrintIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <polyline points="6 9 6 2 18 2 18 9" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect x="6" y="14" width="12" height="8" />
    </svg>
  );
}
