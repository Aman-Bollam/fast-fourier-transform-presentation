export const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin finibus augue ac pulvinar blandit. Nam semper lectus eu arcu rutrum posuere. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed euismod eros vel diam dapibus pulvinar. Curabitur ultrices tincidunt blandit. Vestibulum ante libero, eleifend eu lobortis eu, aliquam eu felis. Donec non nunc velit. Suspendisse potenti.";

export type Accent = "blue" | "purple" | "cyan" | "emerald";

export type FeatureCardData = {
  title: string;
  description: string;
  href: string;
  accent: Accent;
};

export const FEATURE_CARDS: FeatureCardData[] = [
  {
    title: "Learn",
    description: "Visual tutorial and written article walking through the core ideas.",
    href: "/learn",
    accent: "blue",
  },
  {
    title: "Trace",
    description: "Step through an interactive trace with controls and live variables.",
    href: "/trace",
    accent: "purple",
  },
  {
    title: "Practice",
    description: "Problem cards, a built-in editor skeleton, and external links.",
    href: "/practice",
    accent: "cyan",
  },
  {
    title: "Resources",
    description: "Templates, key formulas, references, and common mistakes.",
    href: "/resources",
    accent: "emerald",
  },
];

export const ASSIGNMENT_MAP: { left: string; right: string; href: string }[] = [
  { left: "Tutorial", right: "Learn", href: "/learn" },
  { left: "Examples", right: "Trace", href: "/trace" },
  { left: "Practice Problems", right: "Practice", href: "/practice" },
];

export type Difficulty = "Easy" | "Medium" | "Hard";

export type ProblemCardData = {
  title: string;
  difficulty: Difficulty;
  tags: string[];
  blurb: string;
};

export const PROBLEM_CARDS: ProblemCardData[] = [
  {
    title: "Placeholder Problem A",
    difficulty: "Easy",
    tags: ["binary-search", "fractions"],
    blurb: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    title: "Placeholder Problem B",
    difficulty: "Medium",
    tags: ["binary-search", "averages"],
    blurb: "Proin finibus augue ac pulvinar blandit.",
  },
  {
    title: "Placeholder Problem C",
    difficulty: "Hard",
    tags: ["stern-brocot", "rationals"],
    blurb: "Nam semper lectus eu arcu rutrum posuere.",
  },
];

export type ResourceSection = {
  title: string;
  description: string;
  bullets: string[];
  accent: Accent;
};

export const RESOURCE_SECTIONS: ResourceSection[] = [
  {
    title: "Templates",
    description: "Reusable code snippets for the most common patterns.",
    bullets: ["Placeholder template 1", "Placeholder template 2", "Placeholder template 3"],
    accent: "blue",
  },
  {
    title: "Key Formulas",
    description: "Compact reference for the formulas you'll reach for most often.",
    bullets: ["Placeholder formula 1", "Placeholder formula 2", "Placeholder formula 3"],
    accent: "purple",
  },
  {
    title: "References",
    description: "External readings and links that go deeper on the topic.",
    bullets: ["Placeholder reference 1", "Placeholder reference 2", "Placeholder reference 3"],
    accent: "cyan",
  },
  {
    title: "Common Mistakes",
    description: "Pitfalls worth knowing about before you hit them in a contest.",
    bullets: ["Placeholder pitfall 1", "Placeholder pitfall 2", "Placeholder pitfall 3"],
    accent: "emerald",
  },
];

export type TraceVariable = { name: string; value: string };

export const FAKE_TRACE_VARIABLES: TraceVariable[] = [
  { name: "lo", value: "—" },
  { name: "hi", value: "—" },
  { name: "mid", value: "—" },
  { name: "step", value: "0" },
  { name: "feasible", value: "—" },
];

export type TestCase = { input: string; expected: string; status: string };

export const FAKE_TEST_CASES: TestCase[] = [
  { input: "Sample 1 input", expected: "Sample 1 output", status: "—" },
  { input: "Sample 2 input", expected: "Sample 2 output", status: "—" },
  { input: "Sample 3 input", expected: "Sample 3 output", status: "—" },
];

export const VISUAL_TUTORIAL_MODULES = [
  { title: "Module 1", subtitle: "Intro placeholder" },
  { title: "Module 2", subtitle: "Visualization placeholder" },
  { title: "Module 3", subtitle: "Walkthrough placeholder" },
  { title: "Module 4", subtitle: "Recap placeholder" },
];
