import HeroPage from "@/components/HeroPage";

export default function Home() {
  return (
    <HeroPage
      title="Welcome to Backflow Exam Prep"
      subtitle="Your training, simulator, practice exams, and certification tools in one place."
      ctaUrl="https://sso.backflowexamprep.com/sign-up"
      ctaText="Set up my account"
      secondaryCtaUrl="/simulator"
      secondaryCtaText="Skip for now"
    />
  );
}
