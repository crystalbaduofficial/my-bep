"use client";

import React, { useState } from "react";
import GlassCard from "./GlassCard";
import Button from "./Button";

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const SAMPLE_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question:
      "What is the primary purpose of a backflow prevention device?",
    options: [
      "To increase water pressure",
      "To prevent contaminated water from flowing back into the clean water supply",
      "To filter water impurities",
      "To regulate water temperature",
    ],
    correctAnswer: 1,
    explanation:
      "Backflow prevention devices protect the public water supply by preventing contaminated or polluted water from flowing backward into the system.",
  },
  {
    id: 2,
    question:
      "Which type of backflow preventer is suitable for high-hazard applications?",
    options: [
      "Vacuum breaker",
      "Check valve",
      "Reduced Pressure Principle (RPP) device",
      "Atmospheric vacuum breaker",
    ],
    correctAnswer: 2,
    explanation:
      "RPP devices provide the highest level of protection and are required for high-hazard applications where serious health risks exist.",
  },
  {
    id: 3,
    question: "How often should backflow prevention devices typically be tested?",
    options: ["Monthly", "Annually", "Every 5 years", "Only when installed"],
    correctAnswer: 1,
    explanation:
      "Most jurisdictions require annual testing and certification of backflow prevention devices to ensure they function properly.",
  },
];

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);

  const question = SAMPLE_QUESTIONS[currentQuestion];

  const handleAnswer = (answerIdx: number) => {
    setSelectedAnswer(answerIdx);
    setShowExplanation(true);

    if (answerIdx === question.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < SAMPLE_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowExplanation(false);
    setQuizComplete(false);
  };

  if (quizComplete) {
    const percentage = Math.round((score / SAMPLE_QUESTIONS.length) * 100);
    return (
      <GlassCard className="text-center">
        <div className="text-6xl mb-6">
          {percentage >= 80 ? "🎉" : percentage >= 60 ? "👍" : "📚"}
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">Quiz Complete!</h3>
        <p className="text-4xl font-bold text-secondary mb-2">
          {percentage}%
        </p>
        <p className="text-gray-400 mb-2">
          You answered {score} out of {SAMPLE_QUESTIONS.length} questions
          correctly.
        </p>
        <p className="text-gray-400 mb-6">
          {percentage >= 80
            ? "Excellent work! You're ready for the real exam."
            : percentage >= 60
              ? "Good job! Review the material and try again."
              : "Keep studying. The full course will help you master these concepts."}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="primary" size="md" onClick={handleRestart}>
            Try Again
          </Button>
          <Button
            variant="secondary"
            size="md"
            href="https://learn.backflowexamprep.com"
          >
            Start Learning
          </Button>
        </div>
      </GlassCard>
    );
  }

  return (
    <GlassCard>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-400 text-sm">
            Question {currentQuestion + 1} of {SAMPLE_QUESTIONS.length}
          </span>
          <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary transition-all"
              style={{
                width: `${((currentQuestion + 1) / SAMPLE_QUESTIONS.length) * 100}%`,
              }}
            />
          </div>
        </div>

        <h3 className="text-xl font-semibold text-white mb-6">
          {question.question}
        </h3>

        <div className="space-y-3 mb-6">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => !showExplanation && handleAnswer(idx)}
              disabled={showExplanation}
              className={`w-full text-left p-4 rounded-lg transition-all ${
                selectedAnswer === idx
                  ? idx === question.correctAnswer
                    ? "bg-green-500/20 border border-green-400/50"
                    : "bg-red-500/20 border border-red-400/50"
                  : "glass hover:bg-white/10"
              } ${showExplanation ? "opacity-75" : "cursor-pointer"}`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedAnswer === idx
                      ? "border-current"
                      : "border-gray-400"
                  }`}
                >
                  {selectedAnswer === idx && (
                    <div className="w-3 h-3 rounded-full bg-current" />
                  )}
                </div>
                <span className="text-white text-sm md:text-base">{option}</span>
              </div>
            </button>
          ))}
        </div>

        {showExplanation && (
          <GlassCard className="mb-6 bg-blue-500/10 border-blue-400/30">
            <p className="text-sm text-blue-200 mb-2 font-semibold">
              {selectedAnswer === question.correctAnswer ? "✓ Correct!" : "✗ Incorrect"}
            </p>
            <p className="text-gray-300 text-sm">{question.explanation}</p>
          </GlassCard>
        )}

        {showExplanation && (
          <Button
            onClick={handleNext}
            variant="primary"
            size="md"
            className="w-full justify-center"
          >
            {currentQuestion === SAMPLE_QUESTIONS.length - 1
              ? "See Results"
              : "Next Question"}
          </Button>
        )}
      </div>
    </GlassCard>
  );
}
