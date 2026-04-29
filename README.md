# Fraction Binary Search Lab

Fraction Binary Search Lab is an interactive competitive programming tutorial focused on the exact rational side of fraction binary search: **Stern-Brocot trees, mediants, Farey sequences, and exact fraction search without floating-point precision issues**.

This project was created for a competitive programming topic presentation/tutorial. The chosen topic is inspired by the Fraction Binary Search topic from the provided competitive programming topic list, but this project focuses specifically on exact rational search concepts that go beyond the binary search material covered in class.

## Project Goal

The goal of this project is to make exact fraction search easier to understand by combining three learning styles:

1. **Visual explanations** for building intuition about fractions, mediants, and the Stern-Brocot tree.
2. **Interactive tracing visualizations** for walking through exact rational search examples step by step.
3. **Practice tools** with starter code, sample test cases, and external problem links.

Instead of only explaining the topic through text, this project teaches the idea through visual intuition, algorithm traces, and hands-on practice.

---

## Topic Focus

Class covered several forms of binary search, including binary search on arrays, binary search on answers, floating-point binary search, k-th element search, and average/ratio transformations.

This project extends the idea of binary search into a different setting: **searching exact rational numbers**.

The main focus is:

- Stern-Brocot tree
- Mediant fractions
- Farey sequences
- Exact rational search
- Comparing fractions without decimals
- Finding fractions without floating-point precision
- Representing rational numbers as paths of `L` and `R` moves

This keeps the project connected to binary search while avoiding repetition of class content.

---

## Why Fraction Binary Search?

Many competitive programming problems involve values that are not simple integers. Some problems involve:

- Fractions
- Rational numbers
- Ratios
- Approximation under constraints
- Ordered sets of fractions
- Exact comparisons without precision errors

A common issue with fractions is that floating-point numbers can introduce precision errors.

For example, instead of comparing:

```text
a / b < c / d
```

using decimals, we can compare exactly with cross multiplication:

```text
a * d < c * b
```

This project focuses on techniques that let us reason about fractions exactly.

---

## Assignment Requirements

This project is organized around the required parts of the topic submission.

### 1. Clear and Comprehensive Tutorial

The **Learn** section teaches the concept through both visuals and written explanations.

It includes:

- What exact rational search is
- Why floating-point precision can be risky
- How to compare fractions safely
- The mediant of two fractions
- Stern-Brocot tree intuition
- Farey sequence intuition
- How rational numbers can be represented as paths of `L` and `R`
- Common templates and mistakes

### 2. Illustrative Examples

The **Trace** section contains interactive walkthroughs of example problems. Each example shows the current algorithm step, the changing variables, and the reasoning behind each move.

Example trace categories include:

- Finding a target fraction in the Stern-Brocot tree
- Converting a fraction into an `L/R` path
- Converting an `L/R` path back into a fraction
- Exploring Farey sequence relationships

### 3. Practice Problems

The **Practice** section includes both a built-in IDE/test runner and external links for additional practice.

It includes:

- Problem cards
- Difficulty labels
- Topic tags
- Starter code
- Sample test cases
- External links for full submissions

---

## App Structure

```text
Fraction Binary Search Lab
├── Learn
│   ├── Visual tutorial
│   └── Written article
├── Trace
│   ├── Stern-Brocot target search trace
│   ├── Fraction to L/R path trace
│   ├── L/R path to fraction trace
│   └── Farey sequence trace
├── Practice
│   ├── Built-in IDE/test runner
│   └── External practice problem links
└── Resources
    ├── Templates
    ├── Key formulas
    └── References
```

---

## Tech Stack

This project is planned as a modern frontend application with a lightweight in-browser practice environment.

- **Next.js** for the main frontend application
- **React** for building reusable UI components
- **TypeScript** for type-safe development
- **Tailwind CSS** for styling and responsive layouts
- **Framer Motion** for smooth animations and interactive visualizations
- **React Simple Code Editor** or **Monaco Editor** for the built-in practice IDE
- **Client-side JavaScript test runner** for running sample test cases in the browser
- **Vercel** for deployment
- **GitHub** for source control and project hosting

The app is designed to run mostly on the frontend. The tutorial visuals, tracing examples, and practice runner can all be handled in the browser without requiring a backend.

```text
Next.js frontend
        ↓
Interactive tutorial visuals
        ↓
Step-by-step tracing components
        ↓
Practice IDE + sample test runner
        ↓
Deployed on Vercel
```

This keeps the project easy to deploy while still making it feel like a polished interactive learning tool.

---

## Main Features

### Learn: Visual Tutorial

The Learn section explains exact fraction search using interactive visualizations instead of only text.

Planned visuals include:

- A number line showing fractions as exact rational points
- A fraction comparison visual using cross multiplication
- A mediant animation showing how two fractions create a new fraction between them
- A Stern-Brocot tree visualization
- A Farey sequence visualization
- A path visualization showing how `L` and `R` moves locate a fraction

The goal is to explain not just what the algorithm does, but why it works.

---

### Learn: Written Article

The written article supports the visual tutorial by explaining the full concept in a traditional format.

The article covers:

- What fraction binary search is
- Why exact rational search matters
- How it differs from floating-point binary search
- How to compare fractions safely
- How the mediant works
- How the Stern-Brocot tree organizes rational numbers
- How Farey sequences relate to fraction ordering
- How fractions can be encoded as paths
- Common implementation mistakes

This makes the project useful even without interacting with every visualization.

---

### Trace: Step-by-Step Examples

The Trace section is designed like an algorithm walkthrough.

Each example includes:

- Problem statement
- Input values
- Current left and right fraction bounds
- Current mediant
- Current path
- Explanation of the current step
- Highlighted variables
- Previous, next, and reset controls

The purpose of this section is to show how exact rational search behaves step by step.

---

### Practice: Built-in IDE and Problem Links

The Practice section is meant to go beyond a normal list of links.

It includes a small built-in coding playground where users can try selected problems against sample test cases.

Each practice problem may include:

- Title
- Difficulty
- Topic tags
- Short description
- Starter code
- Sample tests
- External submission link

The goal is to make practice feel closer to a lightweight LeetCode environment.

---

## Resources

The Resources section contains quick references for review.

Planned resources include:

- Fraction comparison template
- Mediant template
- Stern-Brocot search template
- Path to fraction template
- Fraction to path template
- Farey sequence notes
- Common mistakes checklist
- References used for the tutorial

---

## Key Concepts

### Fraction Comparison

To compare two fractions:

```text
a / b and c / d
```

avoid converting to decimals. Instead, use cross multiplication:

```text
a * d < c * b
```

This avoids floating-point precision issues.

---

### Mediant

The mediant of two fractions is:

```text
a / b and c / d
```

```text
(a + c) / (b + d)
```

The mediant is useful because it creates a new fraction between the two current bounds.

---

### Stern-Brocot Tree

The Stern-Brocot tree is a binary tree containing every positive reduced fraction exactly once.

It starts with two boundary fractions:

```text
0/1 and 1/0
```

Their mediant is:

```text
1/1
```

Then the process repeats recursively. This gives a way to search over exact fractions without relying on floating-point values.

---

### L/R Path Representation

Each rational number in the Stern-Brocot tree can be described by a path.

```text
L = move left
R = move right
```

This path uniquely identifies the fraction.

---

### Farey Sequences

A Farey sequence of order `n` contains all reduced fractions between `0` and `1` whose denominators are at most `n`, listed in increasing order.

Farey sequences are related to the Stern-Brocot tree because both describe structured ways to organize rational numbers.

---

## Common Mistakes

- Comparing fractions with decimals instead of cross multiplication
- Forgetting that the Stern-Brocot tree contains reduced fractions
- Updating the wrong bound during mediant search
- Using floating-point midpoints instead of mediants for exact rational search
- Ignoring overflow when cross multiplying large values

---

## Local Setup

Clone the repository:

```bash
git clone https://github.com/Aman-Bollam/fraction-binary-search-lab.git
cd fraction-binary-search-lab
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the app:

```text
http://localhost:3000
```

---

## Suggested Repository Structure

```text
fraction-binary-search-lab/
├── README.md
├── app/
│   ├── page.tsx
│   ├── learn/page.tsx
│   ├── trace/page.tsx
│   ├── trace/stern-brocot/page.tsx
│   ├── trace/fraction-to-path/page.tsx
│   ├── trace/path-to-fraction/page.tsx
│   ├── trace/farey/page.tsx
│   ├── practice/page.tsx
│   ├── practice/[slug]/page.tsx
│   └── resources/page.tsx
├── components/
│   ├── learn/
│   ├── trace/
│   ├── practice/
│   ├── resources/
│   └── shared/
├── lib/
│   ├── problems.ts
│   ├── traces.ts
│   ├── resources.ts
│   └── fractions.ts
└── public/
```

---

## Deployment

This project is intended to be deployed with Vercel.

Basic deployment flow:

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Keep the default Next.js build settings.
4. Deploy the site.
5. Add the live demo link to this README.

After deployment, future updates can be made with:

```bash
git add .
git commit -m "Update fraction binary search lab"
git push
```

Vercel will automatically rebuild and redeploy the site.

---

## References

- [YouKn0wWho Academy: Fraction Binary Search](https://youkn0wwho.academy/topic-list/fraction_binary_search)
- [CP-Algorithms: Stern-Brocot Tree and Farey Sequences](https://cp-algorithms.com/others/stern_brocot_tree_farey_sequences.html)

---

## Future Improvements

Possible future additions:

- More traced examples
- More built-in practice problems
- Full JavaScript test runner
- C++ template viewer
- Better Stern-Brocot tree visualization
- Farey sequence generation visualizer
- Difficulty-based filtering for practice problems
- Animation controls for speed and step size
- Better error messages in the code runner
- Exportable notes or study sheet

---

## Final Summary

Fraction Binary Search Lab is designed to make exact rational search easier to learn by combining visual intuition, interactive examples, and hands-on practice.

The main idea is simple:

```text
Fractions can be searched exactly without floating-point precision by using mediants, Stern-Brocot trees, Farey sequences, and L/R path representations.
```
