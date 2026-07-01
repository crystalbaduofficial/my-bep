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
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Draw gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "#030712");
    gradient.addColorStop(0.5, "#071322");
    gradient.addColorStop(1, "#0B1D33");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw stars
    const stars: Array<{ x: number; y: number; size: number }> = [];
    for (let i = 0; i < 100; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5,
      });
    }

    let animationId: number;
    let time = 0;

    const animate = () => {
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw stars with twinkling
      stars.forEach((star) => {
        const opacity = 0.3 + 0.7 * Math.sin(time * 0.01 + star.x * 0.001);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw Earth glow
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const glowRadius = Math.min(canvas.width, canvas.height) * 0.25;

      // Outer glow
      const glowGradient = ctx.createRadialGradient(centerX, centerY, glowRadius * 0.5, centerX, centerY, glowRadius * 1.5);
      glowGradient.addColorStop(0, "rgba(59, 130, 246, 0.4)");
      glowGradient.addColorStop(0.5, "rgba(56, 189, 248, 0.2)");
      glowGradient.addColorStop(1, "rgba(59, 130, 246, 0)");
      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, glowRadius * 1.5, 0, Math.PI * 2);
      ctx.fill();

      time++;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ display: "block" }}
      />

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-1/30 to-dark-1/80" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div style={{ animation: "fade-in-up 0.8s ease-out" }}>
          <h1 className="heading-1 mb-6 text-white">{title}</h1>
          <p className="subtext mb-8 max-w-xl mx-auto">{subtitle}</p>

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

          <p className="text-xs text-gray-500 mt-8">
            Your data is secure and never shared
          </p>
        </div>
      </div>
    </div>
  );
}
