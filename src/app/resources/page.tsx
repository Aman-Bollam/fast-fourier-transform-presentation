import { CodeTemplate } from "@/components/resources/CodeTemplate";
import { FormulaReference } from "@/components/resources/FormulaReference";
import { CommonMistakes } from "@/components/resources/CommonMistakes";

const CODE_TEMPLATES = [
  {
    id: "recursive-cpp",
    title: "Recursive FFT",
    language: "cpp" as const,
    description:
      "Divide-and-conquer FFT using std::complex<double>. Clean and readable — good for learning.",
    code: `#include <bits/stdc++.h>
using namespace std;
using cd = complex<double>;
const double PI = acos(-1);

// Recursive Cooley-Tukey FFT
// inv=false: forward DFT, inv=true: inverse DFT
void fft(vector<cd>& a, bool inv) {
    int n = a.size();
    if (n == 1) return;

    vector<cd> a0(n / 2), a1(n / 2);
    for (int i = 0; i < n / 2; i++) {
        a0[i] = a[2 * i];
        a1[i] = a[2 * i + 1];
    }
    fft(a0, inv);
    fft(a1, inv);

    double ang = 2 * PI / n * (inv ? -1 : 1);
    cd w(1), wn(cos(ang), sin(ang));
    for (int i = 0; i < n / 2; i++, w *= wn) {
        a[i]         = a0[i] + w * a1[i];
        a[i + n / 2] = a0[i] - w * a1[i];
    }
    if (inv)
        for (cd& x : a) x /= 2;
}

// Multiply polynomials a and b, return coefficients
vector<long long> multiply(vector<int>& a, vector<int>& b) {
    vector<cd> fa(a.begin(), a.end()), fb(b.begin(), b.end());
    int n = 1;
    while (n < (int)(a.size() + b.size())) n <<= 1;
    fa.resize(n); fb.resize(n);
    fft(fa, false); fft(fb, false);
    for (int i = 0; i < n; i++) fa[i] *= fb[i];
    fft(fa, true);
    vector<long long> res(n);
    for (int i = 0; i < n; i++)
        res[i] = llround(fa[i].real());
    return res;
}`,
  },
  {
    id: "iterative-cpp",
    title: "Iterative FFT",
    language: "cpp" as const,
    description:
      "In-place iterative FFT with bit-reversal permutation. Preferred for competitive programming.",
    code: `#include <bits/stdc++.h>
using namespace std;
using cd = complex<double>;
const double PI = acos(-1);

// Iterative Cooley-Tukey FFT with bit-reversal
void fft(vector<cd>& a, bool inv) {
    int n = a.size();
    // Bit-reversal permutation
    for (int i = 1, j = 0; i < n; i++) {
        int bit = n >> 1;
        for (; j & bit; bit >>= 1) j ^= bit;
        j ^= bit;
        if (i < j) swap(a[i], a[j]);
    }
    // Butterfly passes
    for (int len = 2; len <= n; len <<= 1) {
        double ang = 2 * PI / len * (inv ? -1 : 1);
        cd wlen(cos(ang), sin(ang));
        for (int i = 0; i < n; i += len) {
            cd w(1);
            for (int j = 0; j < len / 2; j++, w *= wlen) {
                cd u = a[i + j], v = w * a[i + j + len / 2];
                a[i + j]           = u + v;
                a[i + j + len / 2] = u - v;
            }
        }
    }
    if (inv)
        for (cd& x : a) x /= n;
}`,
  },
  {
    id: "ntt-cpp",
    title: "NTT mod 998244353",
    language: "cpp" as const,
    description:
      "Number Theoretic Transform for exact integer results modulo 998244353.",
    code: `#include <bits/stdc++.h>
using namespace std;

const int MOD = 998244353;  // = 119 * 2^23 + 1, primitive root g = 3
const int g = 3;

long long power(long long a, long long b, long long mod) {
    long long res = 1;
    a %= mod;
    while (b > 0) {
        if (b & 1) res = res * a % mod;
        a = a * a % mod;
        b >>= 1;
    }
    return res;
}

// Number Theoretic Transform (mod 998244353)
void ntt(vector<int>& a, bool inv) {
    int n = a.size();
    for (int i = 1, j = 0; i < n; i++) {
        int bit = n >> 1;
        for (; j & bit; bit >>= 1) j ^= bit;
        j ^= bit;
        if (i < j) swap(a[i], a[j]);
    }
    for (int len = 2; len <= n; len <<= 1) {
        long long w = inv
            ? power(g, MOD - 1 - (MOD - 1) / len, MOD)
            : power(g, (MOD - 1) / len, MOD);
        for (int i = 0; i < n; i += len) {
            long long wk = 1;
            for (int j = 0; j < len / 2; j++, wk = wk * w % MOD) {
                int u = a[i + j];
                int v = (long long)wk * a[i + j + len / 2] % MOD;
                a[i + j]           = (u + v) % MOD;
                a[i + j + len / 2] = (u - v + MOD) % MOD;
            }
        }
    }
    if (inv) {
        long long n_inv = power(n, MOD - 2, MOD);
        for (int& x : a) x = (long long)x * n_inv % MOD;
    }
}

vector<int> multiply(vector<int> a, vector<int> b) {
    int result_size = a.size() + b.size() - 1;
    int n = 1;
    while (n < result_size) n <<= 1;
    a.resize(n); b.resize(n);
    ntt(a, false); ntt(b, false);
    for (int i = 0; i < n; i++)
        a[i] = (long long)a[i] * b[i] % MOD;
    ntt(a, true);
    a.resize(result_size);
    return a;
}`,
  },
  {
    id: "python-fft",
    title: "Python FFT",
    language: "python" as const,
    description:
      "Recursive FFT in Python using cmath. Compatible with the built-in editor.",
    code: `import cmath
import math

def fft(a, inv=False):
    """Recursive Cooley-Tukey FFT."""
    n = len(a)
    if n == 1:
        return list(a)
    even = fft(a[0::2], inv)
    odd  = fft(a[1::2], inv)
    sign = 1 if inv else -1
    T = [cmath.exp(sign * 2j * math.pi * k / n) * odd[k]
         for k in range(n // 2)]
    return (
        [even[k] + T[k] for k in range(n // 2)] +
        [even[k] - T[k] for k in range(n // 2)]
    )

def multiply_polynomials(a, b):
    """Multiply polynomials a and b (coefficient lists)."""
    result_len = len(a) + len(b) - 1
    n = 1
    while n < result_len:
        n <<= 1
    # Zero-pad
    fa = list(a) + [0] * (n - len(a))
    fb = list(b) + [0] * (n - len(b))
    # Forward FFT
    FA = fft(fa)
    FB = fft(fb)
    # Pointwise multiply
    FC = [FA[i] * FB[i] for i in range(n)]
    # Inverse FFT
    fc = fft(FC, inv=True)
    # Scale and round
    return [round(x.real / n) for x in fc[:result_len]]

# Example: (1 + 2x + 3x^2) * (4 + 5x) = 4 + 13x + 22x^2 + 15x^3
print(multiply_polynomials([1, 2, 3], [4, 5]))`,
  },
];

function ResourcesHeroVisual() {
  const points = [
    [70, 56], [126, 40], [184, 64], [244, 36], [302, 58], [360, 42],
    [82, 118], [154, 136], [226, 112], [296, 138], [370, 106],
  ];

  return (
    <svg viewBox="0 0 560 220" className="h-52 w-full text-cyan-400" aria-hidden="true">
      <defs>
        <linearGradient id="resourcesMesh" x1="0" x2="1" y1="1" y2="0">
          <stop offset="0%" stopColor="#0f172a" stopOpacity="0" />
          <stop offset="55%" stopColor="#0ea5e9" stopOpacity="0.72" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.22" />
        </linearGradient>
        <linearGradient id="resourcesBars" x1="0" x2="0" y1="1" y2="0">
          <stop offset="0%" stopColor="#0284c7" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.72" />
        </linearGradient>
      </defs>

      {points.map(([x, y], i) => (
        <g key={i}>
          {i < points.length - 1 && (
            <line x1={x} y1={y} x2={points[i + 1][0]} y2={points[i + 1][1]} stroke="url(#resourcesMesh)" strokeWidth="1.1" />
          )}
          {i < points.length - 3 && (
            <line x1={x} y1={y} x2={points[i + 3][0]} y2={points[i + 3][1]} stroke="#0ea5e9" strokeOpacity="0.24" strokeWidth="1" />
          )}
          <circle cx={x} cy={y} r={2.5} fill="#22d3ee" opacity="0.85" />
        </g>
      ))}

      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          d={`M330 ${176 - i * 12} C 390 ${130 - i * 11}, 450 ${185 - i * 13}, 540 ${92 - i * 16}`}
          fill="none"
          stroke="#0ea5e9"
          strokeOpacity={0.1 + i * 0.08}
          strokeWidth="1"
        />
      ))}

      {Array.from({ length: 30 }).map((_, i) => {
        const h = 12 + ((i * 23) % 94);
        return (
          <rect
            key={i}
            x={408 + i * 4.2}
            y={182 - h}
            width="1.5"
            height={h}
            rx="0.75"
            fill="url(#resourcesBars)"
            opacity={0.12 + (i % 7) * 0.035}
          />
        );
      })}
    </svg>
  );
}

export default function ResourcesPage() {
  return (
    <div className="space-y-10">
      <section className="grid items-center gap-8 pt-4 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.95fr)]">
        <header>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">
            Resources
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-100 sm:text-5xl">
            Reference Material
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-400">
            Competition-ready code templates, key formulas with derivations, and common implementation pitfalls.
          </p>
        </header>
        <div className="hidden lg:block">
          <ResourcesHeroVisual />
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          Code Templates
        </h2>
        <div className="grid gap-5 lg:grid-cols-2">
          {CODE_TEMPLATES.map((t) => (
            <CodeTemplate key={t.id} template={t} />
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          Key Formulas
        </h2>
        <FormulaReference />
      </section>

      <section className="space-y-5">
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          Common Mistakes
        </h2>
        <CommonMistakes />
      </section>
    </div>
  );
}
