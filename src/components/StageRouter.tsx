"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import HomeScreen from "./HomeScreen";
import MimosScreen from "./MimosScreen";
import EspacoScreen from "./EspacoScreen";
import SmileButton from "./SmileButton";

type Stage = "home" | "mimo" | "espaco";

export default function StageRouter() {
  const [stage, setStage] = useState<Stage>("home");
  const [renderedStage, setRenderedStage] = useState<Stage>("home");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  useEffect(() => {
    if (stage === renderedStage) return;
    if (isAnimating.current) return;
    if (!wrapperRef.current) {
      setRenderedStage(stage);
      return;
    }

    isAnimating.current = true;
    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      onComplete: () => {
        isAnimating.current = false;
      },
    });

    // Suspiro: respira pra fora (escala leve + blur + fade), troca conteúdo,
    // e respira pra dentro.
    tl.to(wrapperRef.current, {
      opacity: 0,
      y: -10,
      scale: 0.985,
      filter: "blur(8px)",
      duration: 0.55,
      onComplete: () => setRenderedStage(stage),
    }).fromTo(
      wrapperRef.current,
      { opacity: 0, y: 14, scale: 1.005, filter: "blur(8px)" },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.85,
        ease: "power3.out",
      }
    );
  }, [stage, renderedStage]);

  const goHome = () => setStage("home");

  return (
    <div className="relative w-full">
      <div ref={wrapperRef} className="will-change-transform">
        {renderedStage === "home" && (
          <HomeScreen onChoose={(c) => setStage(c)} />
        )}
        {renderedStage === "mimo" && <MimosScreen onBack={goHome} />}
        {renderedStage === "espaco" && <EspacoScreen onBack={goHome} />}
      </div>

      <SmileButton />
    </div>
  );
}
