"use client";

import React, { useState } from "react";
import GlassCard from "./GlassCard";
import Button from "./Button";

interface QuizAnswers {
  timeline: string | null;
  purpose: string | null;
  confidence: string | null;
  studyStyle: string | null;
  context: string | null;
}

interface PlanResult {
  title: string;
  duration: string;
  description: string;
  nextSteps: string[];
  learningCTAUrl: string;
  storeCTAUrl: string;
  createAccountUrl: string;
}

export default function PlanBuilder() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({
    timeline: null,
    purpose: null,
    confidence: null,
    studyStyle: null,
    context: null,
  });
  const [result, setResult] = useState<PlanResult | null>(null);

  const questions = [
    {
      id: "timeline",
      title: "When is your test?",
      options: [
        { value: "this-week", label: "This week" },
        { value: "2-4-weeks", label: "In 2–4 weeks" },
        { value: "1-3-months", label: "In 1–3 months" },
        { value: "not-scheduled", label: "Not scheduled yet" },
      ],
    },
    {
      id: "purpose",
      title: "What are you preparing for?",
      options: [
        { value: "cert-exam", label: "Certification exam" },
        { value: "practice", label: "Practice/refresher" },
        { value: "simulator", label: "Hands-on simulator training" },
        { value: "teaching", label: "Teaching a class" },
        { value: "team", label: "Training a team" },
      ],
    },
    {
      id: "confidence",
      title: "What's your current confidence level?",
      options: [
        { value: "brand-new", label: "I'm brand new to backflow" },
        { value: "basics", label: "I know the basics" },
        { value: "need-practice", label: "I need more practice" },
        { value: "almost-ready", label: "I'm almost ready" },
      ],
    },
    {
      id: "studyStyle",
      title: "How do you prefer to learn?",
      options: [
        { value: "short-lessons", label: "Short lessons" },
        { value: "exams", label: "Practice exams" },
        { value: "simulator", label: "Hands-on simulator" },
        { value: "videos", label: "Videos & PDFs" },
        { value: "guided", label: "Guided lesson plans" },
      ],
    },
    {
      id: "context",
      title: "Are you training alone or with a team?",
      options: [
        { value: "alone", label: "Alone" },
        { value: "school", label: "With a school" },
        { value: "employer", label: "With an employer/team" },
        { value: "instructor", label: "I'm an instructor/admin" },
      ],
    },
  ];

  const generatePlan = (): PlanResult => {
    const { timeline, purpose, confidence, studyStyle, context } = answers;

    // Simple logic to generate plans based on answers
    if (timeline === "this-week") {
      return {
        title: "7-Day Exam Sprint",
        duration: "7 days",
        description: "Intensive daily sessions to prepare for your imminent exam. Focus on high-yield topics and timed practice tests.",
        nextSteps: [
          "Start with a quick diagnostic quiz to identify weak areas",
          "Do 2–3 timed practice exams daily to build speed",
          "Review explanations immediately after each test",
        ],
        learningCTAUrl: "https://lms.backflowexamprep.com?plan=exam-sprint",
        storeCTAUrl: "https://shop.backflowexamprep.com/pricing?source=my-bep-plan",
        createAccountUrl: "https://sso.backflowexamprep.com/sign-up?intent=exam-sprint",
      };
    }

    if (purpose === "team") {
      return {
        title: "Team Training Plan",
        duration: "Varies by team size",
        description: "Manage your entire team's certification journey with assignments, progress tracking, and performance analytics.",
        nextSteps: [
          "Set up your workspace and add team members",
          "Create custom learning paths for different roles",
          "Monitor progress and send automated reminders",
        ],
        learningCTAUrl: "https://lms.backflowexamprep.com/dashboard?plan=team",
        storeCTAUrl: "https://shop.backflowexamprep.com/pricing?source=my-bep-team",
        createAccountUrl: "https://sso.backflowexamprep.com/sign-up?intent=team-training",
      };
    }

    if (studyStyle === "simulator") {
      return {
        title: "Simulator Mastery Plan",
        duration: "30 days",
        description: "Hands-on learning with the interactive simulator. Practice real procedures, build confidence, and understand system behavior.",
        nextSteps: [
          "Start with simulator tutorials",
          "Practice each system type in isolation",
          "Complete full system walkthroughs",
        ],
        learningCTAUrl: "https://lms.backflowexamprep.com/simulator?plan=mastery",
        storeCTAUrl: "https://shop.backflowexamprep.com/pricing?source=my-bep-simulator",
        createAccountUrl: "https://sso.backflowexamprep.com/sign-up?intent=simulator-mastery",
      };
    }

    if (confidence === "brand-new") {
      return {
        title: "30-Day Certification Bootcamp",
        duration: "30 days",
        description: "A complete foundational program from zero to certification-ready. Structured lessons, practice, and guided review.",
        nextSteps: [
          "Watch foundational video lessons",
          "Take topic-specific practice quizzes",
          "Complete full-length practice exams weekly",
        ],
        learningCTAUrl: "https://lms.backflowexamprep.com/bootcamp?plan=foundation",
        storeCTAUrl: "https://shop.backflowexamprep.com/pricing?source=my-bep-bootcamp",
        createAccountUrl: "https://sso.backflowexamprep.com/sign-up?intent=bootcamp",
      };
    }

    // Default plan
    return {
      title: "30-Day Certification Plan",
      duration: "30 days",
      description: "A balanced mix of video lessons, practice exams, and simulator work to get you certification-ready.",
      nextSteps: [
        "Take a diagnostic quiz to find your starting point",
        "Follow the recommended lesson sequence",
        "Complete practice exams weekly to track progress",
      ],
      learningCTAUrl: "https://lms.backflowexamprep.com/dashboard?plan=ready",
      storeCTAUrl: "https://shop.backflowexamprep.com/pricing?source=my-bep-plan",
      createAccountUrl: "https://sso.backflowexamprep.com/sign-up?intent=learning-plan",
    };
  };

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setResult(generatePlan());
    }
  };

  const handleReset = () => {
    setStep(0);
    setAnswers({
      timeline: null,
      purpose: null,
      confidence: null,
      studyStyle: null,
      context: null,
    });
    setResult(null);
  };

  const isAnswered = answers[questions[step].id as keyof QuizAnswers] !== null;

  if (result) {
    return (
      <GlassCard className="max-w-2xl mx-auto">
        <div className="text-center mb-8" style={{ animation: "fade-in-up 0.8s ease-out" }}>
          <div className="text-6xl mb-6">🎯</div>
          <h2 className="heading-2 mb-4 text-white">{result.title}</h2>
          <p className="subtext mb-8">Your personalized {result.duration} study plan</p>
          <p className="text-gray-300 mb-8">{result.description}</p>

          <div className="bg-white/5 rounded-lg p-6 mb-8 text-left">
            <h3 className="text-white font-semibold mb-4">Your Next Steps:</h3>
            <ol className="space-y-3">
              {result.nextSteps.map((step, idx) => (
                <li key={idx} className="flex gap-3 text-gray-300">
                  <span className="text-secondary font-bold flex-shrink-0">{idx + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <p className="text-sm text-gray-400 mb-8">
            Create an account to save this plan and start learning immediately.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
            <Button href={result.createAccountUrl} variant="primary" size="lg" className="justify-center">
              Create Free Account
            </Button>
            <Button href={result.learningCTAUrl} variant="secondary" size="lg" className="justify-center">
              Start Learning
            </Button>
            <Button href={result.storeCTAUrl} variant="secondary" size="lg" className="justify-center">
              View Plans
            </Button>
          </div>

          <button
            onClick={handleReset}
            className="text-secondary hover:text-blue-300 transition-colors text-sm"
          >
            Take the quiz again
          </button>
        </div>
      </GlassCard>
    );
  }

  const question = questions[step];

  return (
    <GlassCard className="max-w-2xl mx-auto">
      <div className="mb-8">
        {/* Progress */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-gray-400 text-sm">
            Question {step + 1} of {questions.length}
          </span>
          <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
              style={{
                width: `${((step + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Question */}
        <h3 className="heading-2 mb-6 text-white">{question.title}</h3>

        {/* Options */}
        <div className="space-y-3 mb-8">
          {question.options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleAnswer(question.id, option.value)}
              className={`w-full text-left p-4 rounded-lg transition-all ${
                answers[question.id as keyof QuizAnswers] === option.value
                  ? "bg-secondary/20 border border-secondary text-white"
                  : "glass hover:bg-white/10 text-gray-300 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    answers[question.id as keyof QuizAnswers] === option.value
                      ? "border-secondary bg-secondary"
                      : "border-gray-500"
                  }`}
                >
                  {answers[question.id as keyof QuizAnswers] === option.value && (
                    <div className="w-2 h-2 rounded-full bg-dark-1" />
                  )}
                </div>
                <span>{option.label}</span>
              </div>
            </button>
          ))}
        </div>

        {/* CTA */}
        <Button
          onClick={handleNext}
          variant="primary"
          size="md"
          className="w-full justify-center"
          disabled={!isAnswered}
        >
          {step === questions.length - 1 ? "See Your Plan" : "Next"}
          <span className="text-lg">→</span>
        </Button>
      </div>
    </GlassCard>
  );
}
