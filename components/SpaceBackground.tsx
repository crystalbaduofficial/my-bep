"use client";

import { useEffect, useRef } from "react";

export function SpaceBackground() {
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

    // Generate stars
    const stars: Array<{ x: number; y: number; r: number; v: number; opacity: number }> = [];
    for (let i = 0; i < 150; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1,
        v: Math.random() * 0.15,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    let frame = 0;
    let rafId: number;

    const render = () => {
      // Deep space gradient
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      grad.addColorStop(0, "#030712");
      grad.addColorStop(0.3, "#051122");
      grad.addColorStop(0.7, "#030a1a");
      grad.addColorStop(1, "#000309");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Subtle grid overlay
      ctx.strokeStyle = "rgba(59, 130, 246, 0.03)";
      ctx.lineWidth = 1;
      const gridSize = 100;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Twinkling stars
      stars.forEach((s) => {
        const twinkle = 0.3 + 0.5 * Math.abs(Math.sin(frame * 0.005 + s.x * 0.0001));
        ctx.fillStyle = `rgba(255,255,255,${s.opacity * twinkle})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Subtle nebula fog
      const nebula = ctx.createRadialGradient(
        canvas.width * 0.3,
        canvas.height * 0.4,
        100,
        canvas.width * 0.3,
        canvas.height * 0.4,
        Math.max(canvas.width, canvas.height)
      );
      nebula.addColorStop(0, "rgba(56, 189, 248, 0.04)");
      nebula.addColorStop(0.5, "rgba(59, 130, 246, 0.02)");
      nebula.addColorStop(1, "rgba(59, 130, 246, 0)");
      ctx.fillStyle = nebula;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

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

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none" />;
}
