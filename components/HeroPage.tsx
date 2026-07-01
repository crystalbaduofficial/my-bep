"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

interface HeroPageProps {
  title: string;
  subtitle: string;
  ctaUrl: string;
  ctaText: string;
  secondaryCtaUrl?: string;
  secondaryCtaText?: string;
}

export default function HeroPage({
  title,
  subtitle,
  ctaUrl,
  ctaText,
  secondaryCtaUrl,
  secondaryCtaText,
}: HeroPageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateSize();

    const stars: Array<{ x: number; y: number; r: number; v: number }> = [];
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5,
        v: Math.random() * 0.3,
      });
    }

    let frame = 0;
    let rafId: number;

    const render = () => {
      // Deep space gradient
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      grad.addColorStop(0, "#0a0e27");
      grad.addColorStop(0.5, "#051122");
      grad.addColorStop(1, "#030712");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Twinkling stars
      stars.forEach((s) => {
        const opacity = 0.3 + 0.6 * Math.abs(Math.sin(frame * 0.01 + s.x * 0.0001));
        ctx.fillStyle = `rgba(255,255,255,${opacity})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Earth position
      const cx = canvas.width / 2;
      const cy = (canvas.height * 2) / 3;
      const r = Math.min(canvas.width, canvas.height) * 0.22;

      // Outer blue glow (brightest)
      const g1 = ctx.createRadialGradient(cx, cy, r * 0.6, cx, cy, r * 3);
      g1.addColorStop(0, "rgba(59,130,246,0.8)");
      g1.addColorStop(0.3, "rgba(59,130,246,0.4)");
      g1.addColorStop(1, "rgba(59,130,246,0)");
      ctx.fillStyle = g1;
      ctx.beginPath();
      ctx.arc(cx, cy, r * 3, 0, Math.PI * 2);
      ctx.fill();

      // Mid cyan glow
      const g2 = ctx.createRadialGradient(cx, cy, r * 0.5, cx, cy, r * 2);
      g2.addColorStop(0, "rgba(56,189,248,0.5)");
      g2.addColorStop(0.5, "rgba(56,189,248,0.2)");
      g2.addColorStop(1, "rgba(56,189,248,0)");
      ctx.fillStyle = g2;
      ctx.beginPath();
      ctx.arc(cx, cy, r * 2, 0, Math.PI * 2);
      ctx.fill();

      // Earth sphere
      const g3 = ctx.createRadialGradient(cx - 20, cy - 20, 0, cx, cy, r * 1.1);
      g3.addColorStop(0, "rgba(100,180,255,0.4)");
      g3.addColorStop(0.6, "rgba(30,100,180,0.15)");
      g3.addColorStop(1, "rgba(10,40,100,0.05)");
      ctx.fillStyle = g3;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();

      // Bright rotating accent
      const angle = (frame * 0.0008) % (Math.PI * 2);
      const ax = cx + Math.cos(angle - Math.PI / 4) * r * 1.5;
      const ay = cy + Math.sin(angle - Math.PI / 4) * r * 1.5;
      const g4 = ctx.createRadialGradient(ax, ay, 2, ax, ay, 80);
      g4.addColorStop(0, "rgba(255,255,150,0.9)");
      g4.addColorStop(0.3, "rgba(100,200,255,0.3)");
      g4.addColorStop(1, "rgba(59,130,246,0)");
      ctx.fillStyle = g4;
      ctx.beginPath();
      ctx.arc(ax, ay, 80, 0, Math.PI * 2);
      ctx.fill();

      frame++;
      rafId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => updateSize();
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-dark-1">
      {/* Canvas Background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-dark-1/80" />

      {/* Content Container */}
      <div className="relative z-20 w-full h-full flex flex-col items-center justify-center px-4">
        <div
          className="text-center max-w-3xl"
          style={{
            animation: "fade-in-up 1s ease-out",
          }}
        >
          {/* Title */}
          <h1
            className="text-6xl md:text-7xl font-black text-white mb-6 leading-tight"
            style={{
              fontWeight: 900,
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed font-light">
            {subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href={ctaUrl}
              className="px-8 py-4 rounded-lg bg-blue-600 text-white font-semibold text-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {ctaText}
            </Link>
            {secondaryCtaUrl && secondaryCtaText && (
              <Link
                href={secondaryCtaUrl}
                className="px-8 py-4 rounded-lg bg-cyan-500 text-slate-900 font-semibold text-lg hover:bg-cyan-400 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {secondaryCtaText}
              </Link>
            )}
          </div>

          {/* Security Text */}
          <p className="text-sm text-gray-500">Your data is secure and never shared</p>
        </div>
      </div>
    </div>
  );
}
