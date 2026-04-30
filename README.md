# Fast Fourier Transform Lab

Fast Fourier Transform Lab is an interactive competitive programming tutorial focused on the **Fast Fourier Transform (FFT)** and its competitive uses: **polynomial multiplication, convolution, the Discrete Fourier Transform (DFT), the Cooley–Tukey algorithm, and the Number Theoretic Transform (NTT)**.

This project was created for a competitive programming topic presentation/tutorial. The chosen topic is inspired by the Fast Fourier Transform topic from the provided competitive programming topic list, and this project focuses specifically on how FFT is used to speed up polynomial and convolution problems that would otherwise be too slow with naive methods.

## Project Goal

The goal of this project is to make the Fast Fourier Transform easier to understand by combining three learning styles:

1. **Visual explanations** for building intuition about polynomials, roots of unity, and the divide-and-conquer structure of FFT.
2. **Interactive tracing visualizations** for walking through FFT and convolution examples step by step.
3. **Practice tools** with starter code, sample test cases, and external problem links.

Instead of only explaining the topic through text, this project teaches the idea through visual intuition, algorithm traces, and hands-on practice.

---

## Topic Focus

Class covered several common algorithmic techniques such as divide and conquer, modular arithmetic, and basic number theory.

This project extends those ideas into a specific high-impact setting: **multiplying polynomials and computing convolutions in `O(n log n)` time** using the Fast Fourier Transform.

The main focus is:

- Discrete Fourier Transform (DFT)
- Roots of unity and the unit circle
- Cooley–Tukey divide-and-conquer FFT
- Iterative FFT with bit reversal
- Inverse FFT (IFFT)
- Polynomial multiplication via FFT
- Convolution and its meaning
- Number Theoretic Transform (NTT) for exact integer convolutions

This keeps the project connected to standard divide-and-conquer techniques while introducing a powerful new tool for polynomial-style problems.

---

## Why Fast Fourier Transform?

Many competitive programming problems hide a polynomial multiplication or a convolution inside them. Some problems involve:

- Polynomial multiplication
- Big integer multiplication
- Counting pairs whose values sum to a target
- String matching with wildcards
- Subset sum / coin change style counting
- Generating function manipulations
- Long array / signal style problems

A common issue with these problems is that the naive `O(n^2)` approach is too slow for large `n`.

For example, instead of computing the product of two polynomials directly:

```text
C[k] = sum over i of A[i] * B[k - i]
```

in `O(n^2)`, FFT computes the same convolution in:

```text
O(n log n)
```

This project focuses on techniques that use FFT to turn slow polynomial-style problems into fast ones.

---

## Assignment Requirements

This project is organized around the required parts of the topic submission.

### 1. Clear and Comprehensive Tutorial

The **Learn** section teaches the concept through both visuals and written explanations.

It includes:

- What polynomial multiplication and convolution are
- Why naive multiplication is too slow
- What roots of unity are and why they matter
- The Discrete Fourier Transform (DFT)
- The Cooley–Tukey divide-and-conquer FFT
- Iterative FFT with bit reversal
- The Inverse FFT (IFFT)
- Number Theoretic Transform (NTT) intuition
- Common templates and mistakes

### 2. Illustrative Examples

The **Trace** section contains interactive walkthroughs of example problems. Each example shows the current algorithm step, the changing variables, and the reasoning behind each move.

Example trace categories include:

- Recursive FFT on a small polynomial
- Iterative FFT with bit reversal
- Polynomial multiplication using FFT
- Number Theoretic Transform (NTT) on a small input

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
Fast Fourier Transform Lab
├── Learn
│   ├── Visual tutorial
│   └── Written article
├── Trace
│   ├── Recursive FFT trace
│   ├── Iterative FFT trace
│   ├── Polynomial multiplication trace
│   └── NTT trace
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

The Learn section explains the Fast Fourier Transform using interactive visualizations instead of only text.

Planned visuals include:

- A polynomial as an array of coefficients vs. as samples on the unit circle
- Roots of unity laid out on the complex unit circle
- A divide-and-conquer animation showing how FFT splits even and odd terms
- A bit-reversal visualization for iterative FFT
- A convolution animation showing how polynomial multiplication aligns terms
- An NTT visualization showing modular roots of unity

The goal is to explain not just what the algorithm does, but why it works.

---

### Learn: Written Article

The written article supports the visual tutorial by explaining the full concept in a traditional format.

The article covers:

- What polynomial multiplication and convolution are
- Why we need a faster approach than `O(n^2)`
- What the DFT computes
- How roots of unity make the DFT structured
- How Cooley–Tukey turns the DFT into `O(n log n)`
- How the inverse FFT recovers coefficients
- How NTT replaces complex roots of unity with modular ones
- Common implementation mistakes

This makes the project useful even without interacting with every visualization.

---

### Trace: Step-by-Step Examples

The Trace section is designed like an algorithm walkthrough.

Each example includes:

- Problem statement
- Input polynomial(s) or array
- Current recursion depth or FFT layer
- Current twiddle factor / root of unity
- Current intermediate array
- Explanation of the current step
- Highlighted variables
- Previous, next, and reset controls

The purpose of this section is to show how FFT and convolution behave step by step.

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

## IDE Architecture

- Monaco Editor provides syntax-highlighted editing for Python and C++.
- Python code runs locally in the browser using Pyodide.
- C++ code is sent to Wandbox's public compiler API for compilation and execution.
- Results are normalized into a shared output format and displayed in the IDE console.
- Code drafts are saved locally in the browser using `localStorage`.
- The runner design is modular, so Wandbox can later be replaced with a self-hosted compiler service or WebAssembly-based C++ toolchain.

---

## Resources

The Resources section contains quick references for review.

Planned resources include:

- Recursive FFT template
- Iterative FFT template (with bit reversal)
- Inverse FFT template
- Polynomial multiplication template
- NTT template
- Roots of unity reference
- Common mistakes checklist
- References used for the tutorial

---

## Key Concepts

### Polynomial Multiplication

Two polynomials of degree `n` multiplied directly take `O(n^2)` time:

```text
A(x) = a0 + a1*x + a2*x^2 + ... + a_{n-1}*x^{n-1}
B(x) = b0 + b1*x + b2*x^2 + ... + b_{n-1}*x^{n-1}
```

Their product `C(x) = A(x) * B(x)` has coefficients given by a convolution of the coefficient arrays. FFT speeds this up to `O(n log n)`.

---

### Discrete Fourier Transform (DFT)

The DFT evaluates a polynomial at the `n`-th roots of unity:

```text
A_hat[k] = sum over j of A[j] * w_n^{j*k}
```

where:

```text
w_n = e^{2*pi*i / n}
```

is a primitive `n`-th root of unity. The DFT converts coefficient form into point-value form.

---

### Cooley–Tukey FFT

The Cooley–Tukey FFT computes the DFT in `O(n log n)` by recursively splitting the polynomial into even-indexed and odd-indexed terms:

```text
A(x) = A_even(x^2) + x * A_odd(x^2)
```

Each recursive call works on half the data, which gives the `O(n log n)` running time.

---

### Inverse FFT

The Inverse FFT recovers the coefficient form from the point-value form:

```text
A[j] = (1 / n) * sum over k of A_hat[k] * w_n^{-j*k}
```

It is essentially the same algorithm as the forward FFT, but with conjugated roots of unity and a final scaling by `1 / n`.

---

### Number Theoretic Transform (NTT)

The Number Theoretic Transform replaces complex roots of unity with modular roots of unity in a finite field.

This avoids floating-point precision issues and gives exact integer convolutions, which is useful when the problem requires answers modulo a prime.

---

## Common Mistakes

- Forgetting to pad polynomial sizes up to the next power of two
- Not using the conjugate roots of unity in the inverse FFT
- Forgetting to divide by `n` in the inverse FFT
- Floating-point precision errors for large coefficients (use NTT instead)
- Mixing up which array holds coefficients vs. point-value samples
- Off-by-one errors in bit reversal for iterative FFT

---

## Local Setup

Clone the repository:

```bash
git clone https://github.com/Aman-Bollam/fast-fourier-transform-presentation.git
cd fast-fourier-transform-presentation
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
fast-fourier-transform-presentation/
├── README.md
├── app/
│   ├── page.tsx
│   ├── learn/page.tsx
│   ├── trace/page.tsx
│   ├── trace/recursive-fft/page.tsx
│   ├── trace/iterative-fft/page.tsx
│   ├── trace/polynomial-multiplication/page.tsx
│   ├── trace/ntt/page.tsx
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
│   └── fft.ts
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
git commit -m "Update fast fourier transform lab"
git push
```

Vercel will automatically rebuild and redeploy the site.

---

## References

- [YouKn0wWho Academy: Fast Fourier Transform](https://youkn0wwho.academy/topic-list/fft)
- [CP-Algorithms: Fast Fourier Transform](https://cp-algorithms.com/algebra/fft.html)

---

## Future Improvements

Possible future additions:

- More traced examples
- More built-in practice problems
- Full JavaScript test runner
- C++ template viewer
- Better roots-of-unity visualization on the complex plane
- Bit reversal animation for iterative FFT
- Difficulty-based filtering for practice problems
- Animation controls for speed and step size
- Better error messages in the code runner
- Exportable notes or study sheet

---

## Final Summary

Fast Fourier Transform Lab is designed to make FFT and convolution easier to learn by combining visual intuition, interactive examples, and hands-on practice.

The main idea is simple:

```text
Polynomial multiplication and convolutions can be computed in O(n log n) time using the Fast Fourier Transform, with the Number Theoretic Transform offering an exact-integer alternative.
```
