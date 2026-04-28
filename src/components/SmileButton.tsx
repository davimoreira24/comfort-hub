"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { smiles } from "@/data/smiles";

export default function SmileButton() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<string>(smiles[0]);
  const [lastIdx, setLastIdx] = useState<number>(-1);
  const cardRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const pickRandom = () => {
    if (smiles.length === 0) return smiles[0] ?? "";
    let idx = Math.floor(Math.random() * smiles.length);
    if (smiles.length > 1) {
      while (idx === lastIdx) {
        idx = Math.floor(Math.random() * smiles.length);
      }
    }
    setLastIdx(idx);
    return smiles[idx];
  };

  const handleOpen = () => {
    setMessage(pickRandom());
    setOpen(true);
  };

  const handleClose = () => {
    if (!cardRef.current || !overlayRef.current) {
      setOpen(false);
      return;
    }
    const tl = gsap.timeline({
      onComplete: () => setOpen(false),
    });
    tl.to(cardRef.current, {
      y: 20,
      opacity: 0,
      scale: 0.96,
      duration: 0.35,
      ease: "power2.in",
    }).to(
      overlayRef.current,
      { opacity: 0, duration: 0.3, ease: "power2.in" },
      "<"
    );
  };

  const handleNew = () => {
    if (!cardRef.current) {
      setMessage(pickRandom());
      return;
    }
    gsap.to(cardRef.current.querySelector(".smile-text"), {
      y: -10,
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        setMessage(pickRandom());
        gsap.fromTo(
          cardRef.current!.querySelector(".smile-text"),
          { y: 14, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
        );
      },
    });

    // mini chuva de sparkles
    const card = cardRef.current;
    const sparkles = ["✨", "💗", "🌸", "⭐"];
    for (let i = 0; i < 6; i++) {
      const s = document.createElement("span");
      s.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
      s.style.position = "absolute";
      s.style.left = `${20 + Math.random() * 60}%`;
      s.style.top = `${20 + Math.random() * 60}%`;
      s.style.fontSize = `${12 + Math.random() * 12}px`;
      s.style.pointerEvents = "none";
      card.appendChild(s);
      gsap.to(s, {
        y: -60 - Math.random() * 40,
        x: (Math.random() - 0.5) * 60,
        opacity: 0,
        duration: 1 + Math.random() * 0.6,
        ease: "power2.out",
        onComplete: () => s.remove(),
      });
    }
  };

  useEffect(() => {
    if (open && cardRef.current && overlayRef.current) {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power2.out" }
      );
      gsap.fromTo(
        cardRef.current,
        { y: 30, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" }
      );
    }
  }, [open]);

  // pulso suave permanente
  useEffect(() => {
    if (!btnRef.current) return;
    const tween = gsap.to(btnRef.current, {
      scale: 1.05,
      duration: 1.6,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
    return () => {
      tween.kill();
    };
  }, []);

  // tecla ESC fecha
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        ref={btnRef}
        onClick={handleOpen}
        aria-label="Me dê um motivo para sorrir"
        className="fixed z-40 bottom-5 right-5 sm:bottom-8 sm:right-8 group flex items-center gap-2 sm:gap-3 pl-3 sm:pl-4 pr-3 sm:pr-5 py-2.5 sm:py-3 rounded-full font-medium text-[color:var(--foreground)] soft-shadow"
        style={{
          background: "linear-gradient(135deg, #f3d7e2, #d6c8ec)",
          boxShadow:
            "0 14px 40px -10px rgba(185,164,220,0.65), 0 4px 12px rgba(231,179,198,0.35)",
          transformOrigin: "center",
        }}
      >
        <span aria-hidden className="text-lg sm:text-xl">
          ✨
        </span>
        <span className="hidden sm:inline text-sm sm:text-base whitespace-nowrap">
          Me dê um motivo para sorrir
        </span>
        <span className="sm:hidden text-sm whitespace-nowrap">um sorriso</span>
      </button>

      {open && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-50 flex items-center justify-center px-5"
          style={{
            background:
              "radial-gradient(circle at 50% 40%, rgba(245,237,246,0.85), rgba(155,130,180,0.55))",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
          }}
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-label="Mensagem para sorrir"
        >
          <div
            ref={cardRef}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-[28px] glass soft-shadow p-7 sm:p-9 text-center"
            style={{
              background:
                "linear-gradient(160deg, rgba(255,255,255,0.92), rgba(243,215,226,0.85))",
            }}
          >
            <div className="text-3xl mb-4" aria-hidden>
              💗
            </div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[color:var(--muted)] mb-4">
              um lembrete pra você
            </p>
            <p className="smile-text font-[family-name:var(--font-display)] italic text-xl sm:text-2xl leading-relaxed text-[color:var(--foreground)] min-h-[120px] flex items-center justify-center">
              “{message}”
            </p>

            <div className="mt-7 flex items-center justify-center gap-3">
              <button
                onClick={handleNew}
                className="px-5 py-2.5 rounded-full bg-white/80 hover:bg-white text-sm font-semibold text-[color:var(--foreground)] transition-colors soft-shadow"
              >
                outro, por favor
              </button>
              <button
                onClick={handleClose}
                className="px-5 py-2.5 rounded-full bg-[color:var(--lavender-deep)] text-white text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                obrigada ♡
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
