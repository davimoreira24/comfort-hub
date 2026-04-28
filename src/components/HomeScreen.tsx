"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type Props = {
  onChoose: (choice: "mimo" | "espaco") => void;
};

export default function HomeScreen({ onChoose }: Props) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".home-hello", {
        y: 14,
        opacity: 0,
        duration: 0.9,
      })
        .from(
          ".home-title",
          {
            y: 24,
            opacity: 0,
            duration: 1.1,
          },
          "-=0.5"
        )
        .from(
          ".home-sub",
          {
            y: 16,
            opacity: 0,
            duration: 0.9,
          },
          "-=0.6"
        )
        .from(
          ".home-btn",
          {
            y: 22,
            opacity: 0,
            duration: 0.8,
            stagger: 0.12,
          },
          "-=0.5"
        )
        .from(
          ".home-foot",
          {
            opacity: 0,
            duration: 0.8,
          },
          "-=0.4"
        );
    },
    { scope: root }
  );

  const handleHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      y: -3,
      scale: 1.015,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      y: 0,
      scale: 1,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={root}
      className="min-h-[100svh] w-full flex items-center justify-center px-6 pt-16 pb-28"
    >
      <div className="w-full max-w-xl text-center">
        <p className="home-hello font-[family-name:var(--font-script)] text-2xl text-[color:var(--muted)] mb-3">
          oi, amor
        </p>
        <h1 className="home-title font-[family-name:var(--font-display)] italic text-4xl sm:text-5xl leading-[1.1] tracking-tight text-[color:var(--foreground)] mb-5">
          Um cantinho
          <br />
          só pra você.
        </h1>
        <p className="home-sub text-base sm:text-lg text-[color:var(--muted)] max-w-md mx-auto mb-12 leading-relaxed">
          Sem pressa, sem cobrança. Você decide o tamanho do abraço de hoje.
        </p>

        <div className="flex flex-col gap-4 sm:gap-5 max-w-sm mx-auto">
          <button
            type="button"
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
            onClick={() => onChoose("mimo")}
            className="home-btn group relative overflow-hidden rounded-3xl px-8 py-6 glass soft-shadow text-left transition-colors"
            style={{
              background:
                "linear-gradient(135deg, rgba(243,215,226,0.85), rgba(231,179,198,0.7))",
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)] mb-1">
                  opção 01
                </div>
                <div className="font-[family-name:var(--font-display)] text-2xl text-[color:var(--foreground)]">
                  Quero um mimo
                </div>
                <div className="text-sm text-[color:var(--muted)] mt-1">
                  vales pra você resgatar comigo
                </div>
              </div>
              <span
                aria-hidden
                className="text-3xl float"
                style={{ filter: "drop-shadow(0 4px 12px rgba(231,179,198,0.6))" }}
              >
                💝
              </span>
            </div>
          </button>

          <button
            type="button"
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
            onClick={() => onChoose("espaco")}
            className="home-btn group relative overflow-hidden rounded-3xl px-8 py-6 glass soft-shadow text-left transition-colors"
            style={{
              background:
                "linear-gradient(135deg, rgba(214,200,236,0.85), rgba(185,164,220,0.7))",
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)] mb-1">
                  opção 02
                </div>
                <div className="font-[family-name:var(--font-display)] text-2xl text-[color:var(--foreground)]">
                  Quero meu espaço
                </div>
                <div className="text-sm text-[color:var(--muted)] mt-1">
                  só fotos e mensagens, sem precisar fazer nada
                </div>
              </div>
              <span
                aria-hidden
                className="text-3xl float"
                style={{
                  filter: "drop-shadow(0 4px 12px rgba(185,164,220,0.6))",
                  animationDelay: "0.6s",
                }}
              >
                🌙
              </span>
            </div>
          </button>
        </div>

        <p className="home-foot mt-12 text-xs uppercase tracking-[0.25em] text-[color:var(--muted)]/70">
          feito com calma, pra você
        </p>
      </div>
    </div>
  );
}
