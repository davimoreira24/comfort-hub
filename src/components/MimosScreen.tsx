"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { vouchers, type Voucher } from "@/data/vouchers";
import {
  generateRedemptionCode,
  loadRedemptions,
  saveRedemptions,
  type RedemptionMap,
} from "@/lib/voucher-utils";
import RedeemedVoucherModal from "./RedeemedVoucherModal";

type Props = {
  onBack: () => void;
};

type ActiveModal = {
  voucher: Voucher;
  code: string;
  date: Date;
} | null;

export default function MimosScreen({ onBack }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const [redemptions, setRedemptions] = useState<RedemptionMap>({});
  const [active, setActive] = useState<ActiveModal>(null);
  const hydrated = useRef(false);

  useEffect(() => {
    setRedemptions(loadRedemptions());
    hydrated.current = true;
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    saveRedemptions(redemptions);
  }, [redemptions]);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".mimos-eyebrow", { y: 10, opacity: 0, duration: 0.7 })
        .from(".mimos-title", { y: 18, opacity: 0, duration: 0.9 }, "-=0.4")
        .from(".mimos-sub", { y: 12, opacity: 0, duration: 0.8 }, "-=0.5")
        .from(
          ".voucher-card",
          {
            y: 30,
            opacity: 0,
            rotateX: -8,
            duration: 0.8,
            stagger: { each: 0.07, from: "start" },
          },
          "-=0.4"
        );
    },
    { scope: root }
  );

  const tiltOn = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    gsap.to(el, {
      y: -6,
      rotateX: 4,
      rotateY: -3,
      scale: 1.02,
      duration: 0.5,
      ease: "power2.out",
    });
    const shine = el.querySelector(".voucher-shine");
    if (shine) gsap.to(shine, { opacity: 1, duration: 0.4 });
  };

  const tiltOff = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    gsap.to(el, {
      y: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.6,
      ease: "power2.out",
    });
    const shine = el.querySelector(".voucher-shine");
    if (shine) gsap.to(shine, { opacity: 0, duration: 0.4 });
  };

  const tiltMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(el, {
      rotateY: x * 8,
      rotateX: -y * 6,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const playRedeemAnimation = (target: HTMLElement, alreadyRedeemed: boolean) => {
    const stamp = target.querySelector(".voucher-stamp");
    if (stamp && !alreadyRedeemed) {
      gsap.fromTo(
        stamp,
        { opacity: 0, scale: 1.6, rotate: -25 },
        {
          opacity: 1,
          scale: 1,
          rotate: -12,
          duration: 0.5,
          ease: "back.out(2)",
        }
      );
    }
    if (alreadyRedeemed) return;

    const hearts = Array.from({ length: 8 });
    hearts.forEach(() => {
      const heart = document.createElement("span");
      heart.textContent = ["💗", "✨", "🌸"][Math.floor(Math.random() * 3)];
      heart.style.position = "absolute";
      heart.style.left = "50%";
      heart.style.top = "50%";
      heart.style.fontSize = `${14 + Math.random() * 14}px`;
      heart.style.pointerEvents = "none";
      heart.style.zIndex = "30";
      heart.style.transform = "translate(-50%, -50%)";
      target.appendChild(heart);

      gsap.to(heart, {
        x: (Math.random() - 0.5) * 220,
        y: -80 - Math.random() * 120,
        opacity: 0,
        rotation: (Math.random() - 0.5) * 90,
        duration: 1.4 + Math.random() * 0.6,
        ease: "power2.out",
        onComplete: () => heart.remove(),
      });
    });
  };

  const handleRedeem = (v: Voucher, card: HTMLElement) => {
    const existing = redemptions[v.id];
    if (existing) {
      playRedeemAnimation(card, true);
      setActive({
        voucher: v,
        code: existing.code,
        date: new Date(existing.date),
      });
      return;
    }

    const code = generateRedemptionCode(v.id);
    const date = new Date();
    setRedemptions((prev) => ({
      ...prev,
      [v.id]: { code, date: date.toISOString() },
    }));

    playRedeemAnimation(card, false);
    window.setTimeout(() => {
      setActive({ voucher: v, code, date });
    }, 600);
  };

  const isRedeemed = (id: string) => Boolean(redemptions[id]);

  return (
    <div
      ref={root}
      className="min-h-[100svh] w-full px-6 pt-14 sm:pt-20 pb-32 flex flex-col items-center"
    >
      <div className="w-full max-w-5xl">
        <button
          onClick={onBack}
          className="text-sm text-[color:var(--muted)] hover:text-[color:var(--foreground)] transition-colors mb-8 inline-flex items-center gap-2"
        >
          <span aria-hidden>←</span> voltar com calma
        </button>

        <p className="mimos-eyebrow text-xs uppercase tracking-[0.3em] text-[color:var(--muted)] mb-3">
          carteirinha de mimos
        </p>
        <h2 className="mimos-title font-[family-name:var(--font-display)] italic text-4xl sm:text-5xl text-[color:var(--foreground)] leading-tight mb-4">
          Escolhe um pra
          <br />
          gente fazer juntinho.
        </h2>
        <p className="mimos-sub text-base text-[color:var(--muted)] max-w-md mb-12 leading-relaxed">
          Toca em <strong className="font-semibold text-[color:var(--foreground)]">Resgatar</strong>{" "}
          pra receber seu vale bonitinho. Você pode imprimir ou me mandar no
          WhatsApp pra gente combinar.
        </p>

        <div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7"
          style={{ perspective: "1200px" }}
        >
          {vouchers.map((v) => {
            const redeemed = isRedeemed(v.id);
            return (
              <div
                key={v.id}
                className="voucher-card relative rounded-3xl overflow-hidden glass soft-shadow"
                style={{
                  background: `linear-gradient(135deg, ${v.accent}40, #ffffff90)`,
                  transformStyle: "preserve-3d",
                }}
                onMouseEnter={tiltOn}
                onMouseLeave={tiltOff}
                onMouseMove={tiltMove}
              >
                <div
                  className="voucher-shine pointer-events-none absolute inset-0 opacity-0"
                  style={{
                    background: `radial-gradient(600px circle at var(--mx,50%) var(--my,50%), ${v.glow}, transparent 60%)`,
                  }}
                />
                <div className="relative p-7 sm:p-8 flex flex-col gap-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.3em] text-[color:var(--muted)] mb-2">
                        vale presente
                      </div>
                      <h3 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl text-[color:var(--foreground)] leading-tight">
                        {v.title}
                      </h3>
                      <p className="font-[family-name:var(--font-script)] text-xl text-[color:var(--muted)] mt-1">
                        {v.subtitle}
                      </p>
                    </div>
                    <div
                      className="text-4xl sm:text-5xl heart-pulse"
                      style={{
                        filter: `drop-shadow(0 6px 16px ${v.glow})`,
                      }}
                      aria-hidden
                    >
                      {v.emoji}
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-[color:var(--foreground)]/85 leading-relaxed">
                    {v.description}
                  </p>

                  <div
                    className="border-t border-dashed border-[color:var(--muted)]/30 pt-4 flex items-center justify-between gap-3"
                    style={{ transform: "translateZ(20px)" }}
                  >
                    <span className="text-xs text-[color:var(--muted)] flex-1">
                      {v.note}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const card = e.currentTarget.closest(
                          ".voucher-card"
                        ) as HTMLElement;
                        if (card) handleRedeem(v, card);
                      }}
                      className="shrink-0 text-sm font-semibold text-[color:var(--foreground)] bg-white/80 hover:bg-white px-4 py-2 rounded-full transition-all"
                      style={{
                        boxShadow: `0 6px 20px -6px ${v.glow}`,
                      }}
                    >
                      {redeemed ? "Ver vale ♡" : "Resgatar"}
                    </button>
                  </div>

                  <div
                    className={`voucher-stamp absolute right-6 bottom-20 sm:right-10 sm:bottom-24 pointer-events-none transition-opacity ${
                      redeemed ? "opacity-100" : "opacity-0"
                    }`}
                    aria-hidden
                    style={{
                      transform: "rotate(-12deg)",
                      color: v.accent,
                    }}
                  >
                    <div
                      className="font-[family-name:var(--font-display)] italic text-2xl px-4 py-1 rounded-md border-2"
                      style={{ borderColor: v.accent, color: v.accent }}
                    >
                      resgatado
                    </div>
                  </div>
                </div>

                {/* notch lateral estilo ticket */}
                <div
                  aria-hidden
                  className="absolute top-1/2 -translate-y-1/2 -left-3 w-6 h-6 rounded-full"
                  style={{ background: "var(--background)" }}
                />
                <div
                  aria-hidden
                  className="absolute top-1/2 -translate-y-1/2 -right-3 w-6 h-6 rounded-full"
                  style={{ background: "var(--background)" }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {active && (
        <RedeemedVoucherModal
          voucher={active.voucher}
          code={active.code}
          date={active.date}
          onClose={() => setActive(null)}
        />
      )}
    </div>
  );
}
