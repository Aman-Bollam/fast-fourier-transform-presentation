import { SectionHeader } from "@/components/shared/SectionHeader";
import { FFTArticle } from "@/components/learn/FFTArticle";

export default function LearnPage() {
  return (
    <div className="space-y-12">
      <SectionHeader
        eyebrow="Learn"
        title="Fast Fourier Transform"
        description="A guided walkthrough from naive polynomial multiplication through the Cooley-Tukey algorithm and NTT, with interactive visualizations embedded at each step."
      />
      <FFTArticle />
    </div>
  );
}
