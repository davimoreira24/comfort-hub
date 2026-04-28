"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { carouselItems } from "@/data/carousel";

type Props = {
  onBack: () => void;
};

export default function EspacoScreen({ onBack }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .from(".espaco-eyebrow", { y: 10, opacity: 0, duration: 0.7 })
        .from(".espaco-title", { y: 18, opacity: 0, duration: 0.9 }, "-=0.4")
        .from(".espaco-sub", { y: 12, opacity: 0, duration: 0.8 }, "-=0.5")
        .from(
          ".carousel-card",
          { opacity: 0, y: 20, duration: 0.9, stagger: 0.06 },
          "-=0.4"
        );

      const track = trackRef.current;
      if (!track) return;

      // Anima o carrossel: o track contém os itens duplicados.
      // Movemos -50% (a metade duplicada) em loop infinito.
      const totalWidth = track.scrollWidth / 2;
      const duration = totalWidth / 35; // velocidade suave (px/s -> ~35)

      const loop = gsap.to(track, {
        x: -totalWidth,
        duration,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % -totalWidth),
        },
      });

      // Pausa suave ao passar o mouse / tocar
      const pause = () => gsap.to(loop, { timeScale: 0.15, duration: 0.6 });
      const resume = () => gsap.to(loop, { timeScale: 1, duration: 0.8 });
      track.addEventListener("mouseenter", pause);
      track.addEventListener("mouseleave", resume);
      track.addEventListener("touchstart", pause, { passive: true });
      track.addEventListener("touchend", resume);

      return () => {
        track.removeEventListener("mouseenter", pause);
        track.removeEventListener("mouseleave", resume);
        track.removeEventListener("touchstart", pause);
        track.removeEventListener("touchend", resume);
        loop.kill();
      };
    },
    { scope: root }
  );

  // Duplicamos para conseguir loop infinito visualmente contínuo.
  const items = [...carouselItems, ...carouselItems];

  return (
    <div
      ref={root}
      className="min-h-[100svh] w-full px-6 pt-14 sm:pt-20 pb-32 flex flex-col items-center"
    >
      <div className="w-full max-w-3xl text-center">
        <button
          onClick={onBack}
          className="text-sm text-[color:var(--muted)] hover:text-[color:var(--foreground)] transition-colors mb-8 inline-flex items-center gap-2"
        >
          <span aria-hidden>←</span> voltar com calma
        </button>

        <p className="espaco-eyebrow text-xs uppercase tracking-[0.3em] text-[color:var(--muted)] mb-3">
          seu espaço, no seu ritmo
        </p>
        <h2 className="espaco-title font-[family-name:var(--font-display)] italic text-4xl sm:text-5xl text-[color:var(--foreground)] leading-tight mb-4">
          Sem fazer nada.
          <br />
          Só estar.
        </h2>
        <p className="espaco-sub text-base text-[color:var(--muted)] max-w-md mx-auto mb-10 leading-relaxed">
          Deixa rolar. As lembranças e os recados passam sozinhos. Você só
          observa, do seu jeitinho.
        </p>
      </div>

      <div className="relative w-full overflow-hidden py-6">
        {/* fade lateral suave */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10"
          style={{
            background:
              "linear-gradient(to right, var(--background) 0%, transparent 100%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10"
          style={{
            background:
              "linear-gradient(to left, var(--background) 0%, transparent 100%)",
          }}
        />

        <div
          ref={trackRef}
          className="flex gap-6 sm:gap-8 will-change-transform"
          style={{ width: "max-content" }}
        >
          {items.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="carousel-card shrink-0 w-[78vw] sm:w-[360px] h-[460px] rounded-[28px] overflow-hidden glass soft-shadow relative flex flex-col"
              style={{
                background:
                  item.type === "message"
                    ? item.gradient
                    : item.gradient ?? "linear-gradient(135deg, #f1e3f5, #ece1f7)",
              }}
            >
              {item.type === "photo" ? (
                <>
                  <div className="relative flex-1 overflow-hidden">
                    <Image
                      src={item.src}
                      alt={item.caption}
                      fill
                      sizes="(max-width: 640px) 78vw, 360px"
                      className="object-cover select-none pointer-events-none"
                      priority={idx < 4}
                      draggable={false}
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to bottom, rgba(0,0,0,0) 60%, rgba(0,0,0,0.18) 100%)",
                      }}
                    />
                  </div>
                  <div className="bg-white/85 backdrop-blur px-6 py-5">
                    <p className="font-[family-name:var(--font-script)] text-2xl text-[color:var(--foreground)] text-center leading-tight">
                      {item.caption}
                    </p>
                    {item.sub && (
                      <p className="text-xs text-[color:var(--muted)] text-center mt-1 italic">
                        {item.sub}
                      </p>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex-1 flex flex-col justify-center px-7 sm:px-8 py-10">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-[color:var(--muted)] mb-3">
                    pra você ler quando quiser
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] italic text-2xl sm:text-3xl text-[color:var(--foreground)] leading-tight mb-4">
                    {item.title}
                  </h3>
                  <p className="text-[color:var(--foreground)]/85 leading-relaxed">
                    {item.body}
                  </p>
                  <div className="mt-auto pt-6 text-xl" aria-hidden>
                    ♡
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <p className="mt-10 text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]/70 text-center max-w-sm">
        sem botões, sem pressa. Tô aqui se você precisar de mim.
      </p>
    </div>
  );
}
