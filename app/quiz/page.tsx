import { Section } from "@/components/Section";
import { FindYourPathQuiz } from "@/components/FindYourPathQuiz";

export const metadata = {
  title: "Find Your Path - Backflow Exam Prep",
  description: "Answer a few questions to get your personalized learning path.",
};

export default function QuizPage() {
  return (
    <>
      <Section
        title="Find Your Path"
        subtitle="Personalized Learning"
        description="Answer a few quick questions to discover the perfect learning path for your goals."
        centered={true}
      >
        <FindYourPathQuiz />
      </Section>
    </>
  );
}
