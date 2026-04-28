# Fraction Binary Search Lab

Fraction Binary Search Lab is an interactive competitive programming tutorial for learning how binary search can be used on fractions, ratios, averages, and real-valued answers.

Instead of only explaining the topic through text, this project teaches the idea through visual intuition, step-by-step traces, and runnable practice problems.

## Project Goal

The goal of this project is to make fraction binary search easier to understand by combining three learning styles:

1. **3Blue1Brown-style visual explanations** for building intuition.
2. **NeetCode-style tracing visualizations** for walking through example problems.
3. **LeetCode-style practice tools** with starter code, sample test cases, and external problem links.

This project was created for a competitive programming topic presentation/tutorial.

---

## Why Fraction Binary Search?

Binary search is usually taught as a way to search through sorted arrays or integer answer spaces. However, many competitive programming problems ask for answers involving:

- Fractions
- Ratios
- Averages
- Slopes
- Probabilities
- Real-valued thresholds

In these problems, the answer is not always a clean integer. Fraction binary search helps solve these problems by searching over possible answer values and using a yes/no feasibility check.

Some problems also require searching through exact fractions. For that, this project introduces the **mediant** and the **Stern-Brocot tree**, which provide a structured way to search over rational numbers.

---

## Assignment Requirements

This project is organized around the required parts of the topic submission.

### 1. Clear and Comprehensive Tutorial

The **Learn** section teaches the concept through both visuals and written explanations.

It includes:

- Binary search on real-valued answers
- Why floating-point precision matters
- Fractions as points on a number line
- The mediant of two fractions
- Stern-Brocot tree intuition
- How to identify monotonic feasibility checks
- Common templates and mistakes

### 2. Illustrative Examples

The **Trace** section contains interactive walkthroughs of example problems. Each example shows the current algorithm step, the changing variables, and the reasoning behind each move.

Examples include:

- Maximum Average Subarray
- K-th Smallest Prime Fraction
- Stern-Brocot exact fraction search

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
│   ├── Maximum Average Subarray trace
│   ├── K-th Smallest Prime Fraction trace
│   └── Stern-Brocot exact fraction trace
├── Practice
│   ├── Built-in IDE/test runner
│   └── External practice problem links
└── Resources
    ├── Templates
    ├── Key formulas
    └── References
