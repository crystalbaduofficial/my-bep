"use client";

import { useEffect, useRef } from "react";
import Button from "./Button";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateCanvasSize();

    // Generate stars
    const stars: Array<{ x: number; y: number; size: number; speed: number }> = [];
    for (let i = 0; i < 150; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 0.5 + 0.1,
      });
    }

    let animationId: number;
    let time = 0;

    const animate = () => {
      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, "#030712");
      gradient.addColorStop(0.3, "#071322");
      gradient.addColorStop(0.7, "#0B1D33");
      gradient.addColorStop(1, "#030712");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw twinkling stars
      stars.forEach((star) => {
        const twinkle = Math.sin(time * star.speed * 0.02 + star.x * 0.0001) * 0.5 + 0.5;
        ctx.fillStyle = `rgba(255, 255, 255, ${0.2 + twinkle * 0.7})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw Earth glow and light
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2 + 50;
      const earthRadius = Math.min(canvas.width, canvas.height) * 0.2;

      // Large outer glow (blue)
      const outerGlow = ctx.createRadialGradient(
        centerX,
        centerY,
        earthRadius * 0.8,
        centerX,
        centerY,
        earthRadius * 2.5
      );
      outerGlow.addColorStop(0, "rgba(59, 130, 246, 0.6)");
      outerGlow.addColorStop(0.4, "rgba(56, 189, 248, 0.3)");
      outerGlow.addColorStop(1, "rgba(59, 130, 246, 0)");
      ctx.fillStyle = outerGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, earthRadius * 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Mid glow (cyan)
      const midGlow = ctx.createRadialGradient(
        centerX,
        centerY,
        earthRadius * 0.5,
        centerX,
        centerY,
        earthRadius * 1.8
      );
      midGlow.addColorStop(0, "rgba(56, 189, 248, 0.4)");
      midGlow.addColorStop(0.5, "rgba(59, 130, 246, 0.15)");
      midGlow.addColorStop(1, "rgba(59, 130, 246, 0)");
      ctx.fillStyle = midGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, earthRadius * 1.8, 0, Math.PI * 2);
      ctx.fill();

      // Earth sphere (subtle)
      const earthGradient = ctx.createRadialGradient(
        centerX - 30,
        centerY - 30,
        0,
        centerX,
        centerY,
        earthRadius
      );
      earthGradient.addColorStop(0, "rgba(100, 200, 255, 0.3)");
      earthGradient.addColorStop(0.7, "rgba(20, 120, 200, 0.15)");
      earthGradient.addColorStop(1, "rgba(10, 50, 150, 0.05)");
      ctx.fillStyle = earthGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, earthRadius, 0, Math.PI * 2);
      ctx.fill();

      // Rotating light beam
      const rotation = (time * 0.0005) % (Math.PI * 2);
      const beamX = centerX + Math.cos(rotation) * earthRadius * 1.2;
      const beamY = centerY + Math.sin(rotation) * earthRadius * 1.2;

      const beamGradient = ctx.createRadialGradient(beamX, beamY, 5, beamX, beamY, 60);
      beamGradient.addColorStop(0, "rgba(255, 255, 200, 0.8)");
      beamGradient.addColorStop(1, "rgba(59, 130, 246, 0)");
      ctx.fillStyle = beamGradient;
      ctx.beginPath();
      ctx.arc(beamX, beamY, 60, 0, Math.PI * 2);
      ctx.fill();

      time++;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      updateCanvasSize();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ display: "block" }}
      />

      {/* Dark Overlay (subtle) */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-1/20 to-dark-1/60" />

      {/* Content - Centered Text */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div style={{ animation: "fade-in-up 0.8s ease-out" }}>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white leading-tight">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href={ctaUrl} variant="primary" size="lg">
              {ctaText}
            </Button>
            {secondaryCtaUrl && secondaryCtaText && (
              <Button href={secondaryCtaUrl} variant="secondary" size="lg">
                {secondaryCtaText}
              </Button>
            )}
          </div>

          <p className="text-sm text-gray-500 mt-8">
            Your data is secure and never shared
          </p>
        </div>
      </div>
    </div>
  );
}
