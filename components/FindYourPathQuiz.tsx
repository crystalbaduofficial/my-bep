"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

type QuizStep = "q1" | "q2" | "q3" | "q4" | "q5" | "results";
type PathType = "7-day" | "30-day" | "simulator" | "instructor" | "team";

interface Answers {
  timeline?: string;
  purpose?: string;
  confidence?: string;
  style?: string;
  teamOrSolo?: string;
}

interface PathResult {
  type: PathType;
  title: string;
  description: string;
  timeline: string;
  icon: string;
  nextSteps: string[];
  tools: string[];
  ctaText: string;
  ctaUrl: string;
}

const PATHS: Record<PathType, PathResult> = {
  "7-day": {
    type: "7-day",
    title: "7-Day Exam Sprint",
    description: "Perfect for those who need rapid preparation before an upcoming exam.",
    timeline: "7 days",
    icon: "⚡",
    nextSteps: [
      "Complete core concept videos (2 hours)",
      "Take full practice exams (3x)",
      "Focus on weak areas with targeted drills",
    ],
    tools: ["Learning Center", "Practice Exams", "Performance Analytics"],
    ctaText: "Start Sprint",
    ctaUrl: "https://sso.backflowexamprep.com/sign-up",
  },
  "30-day": {
    type: "30-day",
    title: "30-Day Certification Plan",
    description: "A structured, comprehensive approach to mastering backflow certification.",
    timeline: "30 days",
    icon: "📚",
    nextSteps: [
      "Enroll in structured course modules",
      "Complete weekly practice exams",
      "Review explanations and consolidate knowledge",
    ],
    tools: ["Learning Center", "Practice Exams", "Study Guides", "Progress Tracker"],
    ctaText: "Start Plan",
    ctaUrl: "https://sso.backflowexamprep.com/sign-up",
  },
  simulator: {
    type: "simulator",
    title: "Simulator Confidence Plan",
    description: "Build hands-on experience with real-world backflow scenarios.",
    timeline: "21 days",
    icon: "🔬",
    nextSteps: [
      "Review core concepts and safety principles",
      "Run 5+ scenarios in the simulator",
      "Practice troubleshooting common issues",
    ],
    tools: ["Simulator", "Learning Center", "Scenario Library", "Performance Analytics"],
    ctaText: "Start Simulator",
    ctaUrl: "https://sso.backflowexamprep.com/sign-up",
  },
  instructor: {
    type: "instructor",
    title: "Instructor Classroom Plan",
    description: "Teach and prepare your classroom for certification success.",
    timeline: "Flexible",
    icon: "👨‍🏫",
    nextSteps: [
      "Set up your classroom workspace",
      "Invite and manage students",
      "Use instructor dashboard to track progress",
    ],
    tools: ["Courses", "Classroom Management", "Student Analytics", "Resource Library"],
    ctaText: "Learn About Classroom",
    ctaUrl: "/courses",
  },
  team: {
    type: "team",
    title: "Team Training Program",
    description: "Organize and track training across your entire organization.",
    timeline: "Custom",
    icon: "👥",
    nextSteps: [
      "Create organization and invite team",
      "Assign learning paths to team members",
      "Monitor progress and completion rates",
    ],
    tools: ["Organizations", "Team Analytics", "Bulk Enrollment", "Compliance Reports"],
    ctaText: "Explore Organizations",
    ctaUrl: "/organizations",
  },
};

const QUESTIONS = [
  {
    id: "q1",
    question: "When is your exam?",
    answers: [
      { text: "This week", value: "thisWeek" },
      { text: "This month", value: "thisMonth" },
      { text: "2-3 months away", value: "later" },
      { text: "No set date", value: "noDate" },
    ],
  },
  {
    id: "q2",
    question: "What are you preparing for?",
    answers: [
      { text: "Certification exam", value: "cert" },
      { text: "Classroom teaching", value: "teaching" },
      { text: "Organizational training", value: "org" },
      { text: "Practical skills", value: "skills" },
    ],
  },
  {
    id: "q3",
    question: "What's your confidence level?",
    answers: [
      { text: "Just starting", value: "beginner" },
      { text: "Some knowledge", value: "intermediate" },
      { text: "Pretty confident", value: "confident" },
      { text: "Need refresher", value: "refresher" },
    ],
  },
  {
    id: "q4",
    question: "How do you prefer to learn?",
    answers: [
      { text: "Video lessons", value: "video" },
      { text: "Practice problems", value: "practice" },
      { text: "Hands-on simulation", value: "simulation" },
      { text: "Mixed approach", value: "mixed" },
    ],
  },
  {
    id: "q5",
    question: "Are you training alone or with others?",
    answers: [
      { text: "Solo", value: "solo" },
      { text: "Small group", value: "group" },
      { text: "Full organization", value: "org" },
      { text: "Classroom setting", value: "classroom" },
    ],
  },
];

function getPathResult(answers: Answers): PathType {
  const { timeline, purpose, confidence, style, teamOrSolo } = answers;

  // Team/organizational training
  if (teamOrSolo === "org") return "team";

  // Instructor classroom
  if (purpose === "teaching" || teamOrSolo === "classroom") return "instructor";

  // Simulator focused
  if (style === "simulation") return "simulator";

  // Exam sprint
  if (timeline === "thisWeek" || timeline === "thisMonth") return "7-day";

  // Default: 30-day plan
  return "30-day";
}

export function FindYourPathQuiz() {
  const [currentStep, setCurrentStep] = useState<QuizStep>("q1");
  const [answers, setAnswers] = useState<Answers>({});

  const handleAnswer = (question: string, value: string) => {
    const newAnswers = { ...answers, [question]: value };
    setAnswers(newAnswers);

    if (currentStep === "q5") {
      setCurrentStep("results");
    } else {
      const steps: QuizStep[] = ["q1", "q2", "q3", "q4", "q5"];
      const currentIndex = steps.indexOf(currentStep);
      if (currentIndex < steps.length - 1) {
        setCurrentStep(steps[currentIndex + 1]);
      }
    }
  };

  const reset = () => {
    setCurrentStep("q1");
    setAnswers({});
  };

  if (currentStep === "results") {
    const pathType = getPathResult(answers);
    const path = PATHS[pathType];

    return (
      <div className="w-full max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{path.icon}</div>
          <h2 className="heading-2 mb-2">{path.title}</h2>
          <p className="subtext">{path.description}</p>
        </div>

        <div className="premium-card mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <p className="text-sm text-gray-400 mb-1">Timeline</p>
              <p className="text-lg font-semibold text-blue-400">{path.timeline}</p>
            </div>
            <div className="text-center border-l border-r border-white/10">
              <p className="text-sm text-gray-400 mb-1">Tools Included</p>
              <p className="text-lg font-semibold text-blue-400">{path.tools.length}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-400 mb-1">Recommended</p>
              <p className="text-lg font-semibold text-blue-400">Priority</p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Your Next Steps</h3>
            <ol className="space-y-3">
              {path.nextSteps.map((step, idx) => (
                <li key={idx} className="flex gap-3">
                  <span className="font-semibold text-blue-400 flex-shrink-0">{idx + 1}.</span>
                  <span className="text-gray-300">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3">Recommended Tools</h3>
            <div className="flex flex-wrap gap-2">
              {path.tools.map((tool, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full bg-blue-600/20 border border-blue-400/30 text-sm text-blue-300"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <a
            href={path.ctaUrl}
            className="block w-full px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold text-center hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
          >
            {path.ctaText}
          </a>
          <button
            onClick={reset}
            className="w-full px-8 py-3 rounded-lg border border-white/20 text-white font-semibold hover:border-white/40 hover:bg-white/5 transition-all duration-300"
          >
            Try Another Path
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Want to explore all options?{" "}
          <Link href="/resources" className="text-blue-400 hover:text-blue-300">
            View all resources
          </Link>
        </p>
      </div>
    );
  }

  const question = QUESTIONS.find((q) => q.id === currentStep);
  if (!question) return null;

  const questionNumber = QUESTIONS.findIndex((q) => q.id === currentStep) + 1;
  const progress = (questionNumber / QUESTIONS.length) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm text-gray-400">Question {questionNumber} of 5</p>
          <p className="text-sm font-semibold text-blue-400">{Math.round(progress)}%</p>
        </div>
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <h2 className="heading-2 mb-8">{question.question}</h2>

        <div className="space-y-3">
          {question.answers.map((answer) => (
            <button
              key={answer.value}
              onClick={() => handleAnswer(question.id.replace("q", ""), answer.value)}
              className="w-full p-4 rounded-lg border border-white/20 bg-white/5 text-left hover:border-blue-400/50 hover:bg-blue-600/10 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-base font-medium text-white group-hover:text-blue-300">
                  {answer.text}
                </span>
                <ChevronRight
                  size={20}
                  className="text-gray-500 group-hover:text-blue-400 transition-all duration-300 group-hover:translate-x-1"
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={reset}
        className="text-sm text-gray-500 hover:text-white transition"
      >
        Start over
      </button>
    </div>
  );
}
