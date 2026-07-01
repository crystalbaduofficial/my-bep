"use client";

import React, { useState } from "react";
import GlobeHero from "./GlobeHero";
import GlassCard from "./GlassCard";
import Button from "./Button";

interface OnboardingProfile {
  firstName: string;
  lastName: string;
  displayName: string;
  bio: string;
}

export default function OnboardingFlow() {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<OnboardingProfile>({
    firstName: "",
    lastName: "",
    displayName: "",
    bio: "",
  });
  const [selectedPath, setSelectedPath] = useState<string | null>(null);

  const learningPaths = [
    {
      id: "certified",
      icon: "🏆",
      title: "Get certified",
      desc: "Earn your backflow certification",
    },
    {
      id: "practice",
      icon: "📝",
      title: "Practice for an exam",
      desc: "Prepare with practice questions",
    },
    {
      id: "simulator",
      icon: "⚙️",
      title: "Use the simulator",
      desc: "Learn hands-on system procedures",
    },
    {
      id: "teach",
      icon: "🎓",
      title: "Teach a class",
      desc: "Deliver training to others",
    },
    {
      id: "team",
      icon: "👥",
      title: "Train my team",
      desc: "Manage team certification",
    },
  ];

  const handleProfileChange = (field: keyof OnboardingProfile, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleContinue = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const getDestinationUrl = (pathId: string | null) => {
    const paths: Record<string, string> = {
      certified: "https://learn.backflowexamprep.com",
      practice: "https://learn.backflowexamprep.com/practice",
      simulator: "https://sim.backflowexamprep.com",
      teach: "https://learn.backflowexamprep.com",
      team: "/organizations",
    };
    return paths[pathId || "certified"];
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Progress header */}
      <div className="sticky top-0 z-40 bg-dark-1/80 backdrop-blur border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white text-sm font-bold">
                {step}
              </div>
              <span className="text-gray-400 text-sm">Step {step} of 4</span>
            </div>
            <div className="text-xs text-gray-500">
              {step === 1 && "WELCOME"}
              {step === 2 && "PROFILE"}
              {step === 3 && "LEARNING PATH"}
              {step === 4 && "READY TO START"}
            </div>
          </div>
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Step 1: Welcome */}
      {step === 1 && (
        <div className="flex-1 flex flex-col">
          <GlobeHero />
          <div className="flex-1 flex items-center justify-center px-4 py-12">
            <div className="text-center max-w-lg">
              <p className="text-gray-400 mb-8">
                Your training, simulator, practice exams, and certification tools
                in one place.
              </p>
              <Button
                onClick={handleContinue}
                variant="primary"
                size="lg"
                className="w-full justify-center"
              >
                Set up my account
                <span className="text-lg">→</span>
              </Button>
              <button
                onClick={() => window.location.href = "https://learn.backflowexamprep.com"}
                className="mt-4 text-secondary hover:text-blue-300 transition-colors text-sm"
              >
                Skip for now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Profile Setup */}
      {step === 2 && (
        <div className="flex-1 py-16 md:py-24 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="heading-1 mb-4 text-white">Let's set up your profile</h1>
              <p className="subtext mb-8">
                This helps personalize your experience and allows instructors to
                track your progress.
              </p>

              <div className="space-y-4 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    First name
                  </label>
                  <input
                    type="text"
                    value={profile.firstName}
                    onChange={(e) => handleProfileChange("firstName", e.target.value)}
                    placeholder="John"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-secondary transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Last name
                  </label>
                  <input
                    type="text"
                    value={profile.lastName}
                    onChange={(e) => handleProfileChange("lastName", e.target.value)}
                    placeholder="Doe"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-secondary transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Display name
                  </label>
                  <input
                    type="text"
                    value={profile.displayName}
                    onChange={(e) => handleProfileChange("displayName", e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-secondary transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Bio (optional)
                  </label>
                  <textarea
                    value={profile.bio}
                    onChange={(e) => handleProfileChange("bio", e.target.value)}
                    placeholder="Backflow professional and examiner"
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-secondary transition-colors resize-none"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setStep(1)}
                  variant="ghost"
                  size="md"
                >
                  Back
                </Button>
                <Button
                  onClick={handleContinue}
                  variant="primary"
                  size="md"
                  className="flex-1 justify-center"
                >
                  Continue
                  <span className="text-lg">→</span>
                </Button>
              </div>
            </div>

            <div className="glass-card h-96 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center mx-auto mb-4 text-4xl">
                  {profile.firstName
                    ? profile.firstName.charAt(0).toUpperCase()
                    : "?"}{" "}
                  {profile.lastName
                    ? profile.lastName.charAt(0).toUpperCase()
                    : ""}
                </div>
                <p className="text-lg font-semibold text-white mb-1">
                  {profile.displayName || "Profile preview"}
                </p>
                <p className="text-sm text-gray-400 mb-4">
                  {profile.bio || "Backflow professional"}
                </p>
                <div className="text-xs text-gray-500">
                  {profile.firstName && profile.lastName ? "39 / 160" : "0 / 160"}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Learning Path Selection */}
      {step === 3 && (
        <div className="flex-1 py-16 md:py-24 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="heading-1 mb-4 text-white">What are you here to do?</h1>
            <p className="subtext max-w-2xl">
              Choose the option that best fits your goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {learningPaths.map((path) => (
              <button
                key={path.id}
                onClick={() => setSelectedPath(path.id)}
                className={`glass-card p-6 text-left transition-all transform hover:scale-105 ${
                  selectedPath === path.id
                    ? "ring-2 ring-secondary bg-secondary/10"
                    : ""
                }`}
              >
                <div className="text-5xl mb-4">{path.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {path.title}
                </h3>
                <p className="text-gray-400 text-sm">{path.desc}</p>
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <Button
              onClick={() => setStep(2)}
              variant="ghost"
              size="md"
            >
              Back
            </Button>
            <Button
              onClick={handleContinue}
              variant="primary"
              size="md"
              disabled={!selectedPath}
              className="flex-1 justify-center disabled:opacity-50"
            >
              Continue
              <span className="text-lg">→</span>
            </Button>
          </div>
        </div>
      )}

      {/* Step 4: Ready to Start */}
      {step === 4 && (
        <div className="flex-1 py-16 md:py-24 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <div className="text-center max-w-2xl">
            <div className="text-6xl mb-6">🚀</div>
            <h1 className="heading-1 mb-4 text-white">You're ready.</h1>
            <p className="subtext mb-12">
              Choose where to start your certification journey.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Button
                href="https://learn.backflowexamprep.com"
                variant="secondary"
                size="lg"
                className="justify-center flex-col h-auto py-6"
              >
                <span className="text-3xl mb-2">📚</span>
                Go to Learning Center
              </Button>
              <Button
                href="https://sim.backflowexamprep.com"
                variant="secondary"
                size="lg"
                className="justify-center flex-col h-auto py-6"
              >
                <span className="text-3xl mb-2">⚙️</span>
                Try the Simulator
              </Button>
              <Button
                href="https://learn.backflowexamprep.com/practice"
                variant="secondary"
                size="lg"
                className="justify-center flex-col h-auto py-6"
              >
                <span className="text-3xl mb-2">✓</span>
                Practice Exams
              </Button>
            </div>

            <Button
              href={getDestinationUrl(selectedPath)}
              variant="primary"
              size="lg"
              className="w-full justify-center"
            >
              Continue to Your Path
              <span className="text-lg">→</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
