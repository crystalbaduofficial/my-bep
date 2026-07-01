"use client";

import React, { useEffect, useRef } from "react";
import Button from "./Button";

export default function GlobeHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const loadGlobe = async () => {
      try {
        if (!containerRef.current) return;

        const GlobeModule = await import("globe.gl");
        const Globe = GlobeModule.default as any;
        const container = containerRef.current;

        globeRef.current = new Globe(container)
          .globeImageUrl("//cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg")
          .width(container.clientWidth)
          .height(container.clientHeight)
          .autoRotate(true)
          .autoRotateSpeed(0.6);

        // Handle window resize
        const handleResize = () => {
          if (globeRef.current && containerRef.current) {
            globeRef.current
              .width(containerRef.current.clientWidth)
              .height(containerRef.current.clientHeight);
          }
        };

        window.addEventListener("resize", handleResize);

        return () => {
          window.removeEventListener("resize", handleResize);
        };
      } catch (error) {
        console.warn("Globe.gl failed to load, using fallback gradient");
      }
    };

    loadGlobe();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[600px] md:h-[800px] overflow-hidden flex items-center justify-center bg-gradient-to-b from-dark-1 via-dark-2 to-dark-1"
    >
      {/* Animated background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, rgba(3, 7, 18, 0.9) 0%, rgba(7, 19, 34, 0.8) 50%, rgba(11, 29, 51, 0.9) 100%)`,
          animation: "subtle-float 20s ease-in-out infinite",
        }}
      />

      {/* Twinkling stars background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="star absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1 + "px",
              height: Math.random() * 2 + 1 + "px",
              opacity: Math.random() * 0.6 + 0.4,
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              animation: `twinkle ${Math.random() * 3 + 3}s ease-in-out infinite`,
              animationDelay: Math.random() * 3 + "s",
            }}
          />
        ))}
      </div>

      {/* Smooth overlay gradient */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: "linear-gradient(to bottom, rgba(3, 7, 18, 0.2) 0%, rgba(3, 7, 18, 0.5) 50%, #030712 100%)",
        }}
      />

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
          <Button
            href="/onboarding"
            variant="primary"
            size="lg"
          >
            Create Free Account
            <span className="text-lg">→</span>
          </Button>
          <Button
            href="https://learn.backflowexamprep.com"
            variant="secondary"
            size="lg"
          >
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
