# Fast Fourier Transform Lab

Interactive tutorial site for learning the Fast Fourier Transform (FFT) in a competitive programming context.

The site explains polynomial multiplication, convolution, roots of unity, recursive and iterative FFT, inverse FFT, and NTT through visual walkthroughs, step-by-step traces, code templates, and practice problems.

## Features

- **Home**: visual FFT hero, overview deck, section links, and assignment mapping.
- **Learn**: interactive tutorial modules plus a written FFT article.
- **Trace**: step-through recursive and iterative FFT traces with highlighted code, variables, explanations, and controls.
- **Practice**: Codeforces problem cards, Monaco-based editor, Python and C++ runners, sample-test grading, complexity chart, and live benchmark.
- **Resources**: recursive FFT, iterative FFT, NTT, and Python FFT templates, key formulas, and common mistakes.
- **Citations**: textbook, online, and competitive programming references used by the tutorial.

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS 4
- Monaco Editor
- Recharts
- KaTeX
- Pyodide for in-browser Python execution
- Wandbox API for C++ execution

## Local Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Useful commands:

```bash
npm run build
npm run start
```

## Project Structure

```text
src/app/
  page.tsx          Home
  learn/page.tsx    Tutorial and article
  trace/page.tsx    Interactive FFT trace
  practice/page.tsx Problems and editor
  resources/page.tsx
  citations/page.tsx

src/components/
  home/
  learn/
  trace/
  practice/
  resources/
  citations/
  shared/

src/lib/
  fftTrace.ts
  fftProblems.ts
  codeRunner.ts
  sampleRunner.ts
  pyodideRunner.ts
```

## Notes

The app is mostly static and frontend-driven. Python runs locally in the browser through Pyodide. C++ execution uses Wandbox, so C++ runs require network access to the public Wandbox API.

The production build is validated with:

```bash
npm run build
```
