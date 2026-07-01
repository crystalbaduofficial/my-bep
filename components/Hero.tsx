"use client";

import React, { useEffect, useRef } from "react";
import Button from "./Button";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create a simple animated gradient background with canvas
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx || !containerRef.current) return;

    canvas.width = containerRef.current.clientWidth;
    canvas.height = containerRef.current.clientHeight;
    canvas.className = "absolute inset-0";
    canvas.style.zIndex = "1";

    let animationId: number;
    let time = 0;

    const drawGradientSphere = () => {
      // Clear canvas
      ctx!.fillStyle = "rgba(3, 7, 18, 0.5)";
      ctx!.fillRect(0, 0, canvas.width, canvas.height);

      // Draw orbital lines and particles
      ctx!.strokeStyle = "rgba(56, 189, 248, 0.1)";
      ctx!.lineWidth = 1;

      // Rotating orbital rings
      const centerX = canvas.width * 0.3;
      const centerY = canvas.height * 0.5;

      for (let i = 0; i < 3; i++) {
        ctx!.beginPath();
        ctx!.ellipse(
          centerX,
          centerY,
          150 + i * 80,
          80 + i * 40,
          time * (0.5 + i * 0.2),
          0,
          Math.PI * 2
        );
        ctx!.stroke();
      }

      // Draw floating particles
      ctx!.fillStyle = "rgba(56, 189, 248, 0.3)";
      for (let i = 0; i < 20; i++) {
        const x =
          centerX +
          Math.cos(time * 0.5 + i) * (100 + i * 10) +
          Math.sin(i) * 50;
        const y =
          centerY +
          Math.sin(time * 0.3 + i) * (50 + i * 5) +
          Math.cos(i) * 30;
        ctx!.beginPath();
        ctx!.arc(x, y, 2 + Math.sin(time + i) * 1, 0, Math.PI * 2);
        ctx!.fill();
      }

      time += 0.005;
      animationId = requestAnimationFrame(drawGradientSphere);
    };

    drawGradientSphere();

    const handleResize = () => {
      if (containerRef.current) {
        canvas.width = containerRef.current.clientWidth;
        canvas.height = containerRef.current.clientHeight;
      }
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
      className="relative w-full h-[600px] md:h-[800px] overflow-hidden flex items-center justify-center"
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 z-10" style={{ background: "linear-gradient(to bottom, transparent, transparent, #030712)" }} />

      {/* Main content */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h1 className="heading-1 mb-6 text-white">
          Your premier classroom,
          <br />
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            with you anywhere on Earth.
          </span>
        </h1>

        <p className="subtext mb-8 max-w-2xl mx-auto">
          Train, practice, simulate, and prepare for certification from wherever
          your work takes you.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button href="/create-account" variant="primary" size="lg">
            Create Free Account
            <span className="text-lg">→</span>
          </Button>
          <Button href="/learning" variant="secondary" size="lg">
            Explore Learning
          </Button>
        </div>

        {/* Campaign tagline */}
        <p className="text-gray-400 text-sm md:text-base mt-12 italic">
          Everything has a beginning. Seize yours with Backflow Exam Prep.
        </p>
      </div>
    </div>
  );
}
