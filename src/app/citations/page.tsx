import { SectionHeader } from "@/components/shared/SectionHeader";
import { CitationSection } from "@/components/citations/CitationSection";
import type { Citation } from "@/components/citations/CitationCard";

const CITATIONS: Citation[] = [
  {
    id: "clrs",
    title: "Introduction to Algorithms, 4th Edition",
    authors: "Cormen, Leiserson, Rivest, Stein",
    year: 2022,
    description:
      'The definitive algorithms textbook. Chapter 30 ("Polynomials and the FFT") provides a rigorous mathematical derivation of the DFT, the FFT algorithm, and polynomial multiplication. Includes proofs of correctness and complexity analysis.',
    category: "textbook",
    section: "Chapter 30 — Polynomials and the FFT",
  },
  {
    id: "cph",
    title: "Competitive Programmer's Handbook",
    authors: "Antti Laaksonen",
    year: 2018,
    url: "https://cses.fi/book/book.pdf",
    description:
      "A freely available competitive programming reference. Chapter 24 covers polynomial multiplication via FFT and NTT, with concise implementation-focused explanations targeted at competitive programmers.",
    category: "textbook",
    section: "Chapter 24 — Polynomial Multiplication",
  },
  {
    id: "cp-algorithms-fft",
    title: "Fast Fourier Transform — CP-Algorithms",
    authors: "CP-Algorithms contributors",
    year: "2024 (continuously updated)",
    url: "https://cp-algorithms.com/algebra/fft.html",
    description:
      "A comprehensive walkthrough of FFT for competitive programming. Covers recursive and iterative Cooley-Tukey implementations, NTT with mod 998244353, and practical tips for precision and performance.",
    category: "online",
  },
  {
    id: "nayuki-fft",
    title: "Free Small FFT in Multiple Languages",
    authors: "Nayuki Minase",
    year: 2021,
    url: "https://www.nayuki.io/page/free-small-fft-in-multiple-languages",
    description:
      "Clean, minimal, and correct FFT implementations in C, C++, Java, JavaScript, Python, and more. Valuable as a correctness reference when debugging your own implementation.",
    category: "online",
  },
  {
    id: "wikipedia-cooley-tukey",
    title: "Cooley–Tukey FFT Algorithm",
    authors: "Wikipedia contributors",
    year: "2024 (continuously updated)",
    url: "https://en.wikipedia.org/wiki/Cooley%E2%80%93Tukey_FFT_algorithm",
    description:
      "Covers the history of the FFT (Cooley & Tukey, 1965), the mathematical derivation of the divide-and-conquer recursion, and a description of the butterfly diagram. Good for understanding the algorithm's origins.",
    category: "online",
  },
  {
    id: "cf-fft-intro",
    title: "FFT: From Numbers to Polynomials",
    authors: "jakobkogler (Codeforces)",
    year: 2017,
    url: "https://codeforces.com/blog/entry/43499",
    description:
      "A highly cited Codeforces blog post that motivates FFT through polynomial multiplication, covers precision issues with floating-point FFT, and introduces NTT as a remedy. Includes multiple worked examples.",
    category: "competitive",
  },
  {
    id: "cf-fft-comprehensive",
    title: "A Comprehensive Introduction to the FFT",
    authors: "matthew99 (Codeforces)",
    year: 2018,
    url: "https://codeforces.com/blog/entry/48798",
    description:
      "Step-by-step derivation of FFT from the DFT definition, with emphasis on the iterative implementation and bit-reversal permutation. Also covers NTT and gives template code for competitive programming.",
    category: "competitive",
  },
  {
    id: "kactl",
    title: "KACTL — KTH Algorithm Competition Template Library",
    authors: "KTH Royal Institute of Technology",
    year: "2024 (continuously maintained)",
    url: "https://github.com/kth-competitive-programming/kactl",
    description:
      "The template library used by KTH's ICPC teams, widely regarded as one of the best-maintained CP code libraries. The FFT and NTT implementations are battle-tested across hundreds of contest problems.",
    category: "competitive",
    section: "content/numerical/FastFourierTransform.h",
  },
];

export default function CitationsPage() {
  const textbooks = CITATIONS.filter(c => c.category === "textbook");
  const online = CITATIONS.filter(c => c.category === "online");
  const competitive = CITATIONS.filter(c => c.category === "competitive");

  return (
    <div className="space-y-12">
      <SectionHeader
        eyebrow="Citations"
        title="References & Resources"
        description="All sources used in building this tutorial — textbooks, online references, and competitive programming resources."
      />
      <CitationSection category="textbook" citations={textbooks} />
      <CitationSection category="online" citations={online} />
      <CitationSection category="competitive" citations={competitive} />
    </div>
  );
}
