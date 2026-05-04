// Catalog of FFT-related Codeforces practice problems consumed by both the
// problem cards and the in-browser IDE. Each entry is self-contained: it
// carries the metadata for the card, the per-language starter scaffold to
// hydrate the editor on demand, and the public sample tests from the CF
// statement so the IDE can grade locally.

export type Difficulty = "Easy" | "Medium" | "Hard";

export type SampleTest = {
  name: string;
  input: string;
  expectedOutput: string;
};

export type FftProblem = {
  id: string;
  title: string;
  difficulty: Difficulty;
  tags: string[];
  description: string;
  problemUrl: string;
  starterCode: { python: string; cpp: string };
  sampleTests: SampleTest[];
};

// --- Starter scaffolds (parse stdin, leave the algorithm to the user) ---

const STARTER_1096G_PY = `import sys

def solve():
    input_data = sys.stdin.read().split()
    n = int(input_data[0])
    k = int(input_data[1])
    digits = list(map(int, input_data[2:2 + k]))

    # TODO: model digit-sum frequencies as a polynomial of degree 9,
    # raise it to the power n with FFT/NTT, then sum c[s]^2 over s.
    answer = 0
    print(answer)

solve()
`;

const STARTER_1096G_CPP = `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;
    vector<int> digits(k);
    for (int i = 0; i < k; i++) cin >> digits[i];

    // TODO: model digit-sum frequencies as a polynomial of degree 9,
    // raise it to the power n with FFT/NTT, then sum c[s]^2 over s.
    long long answer = 0;
    cout << answer << endl;
    return 0;
}
`;

const STARTER_632E_PY = `import sys

def solve():
    data = sys.stdin.read().split()
    n = int(data[0])
    k = int(data[1])
    a = list(map(int, data[2:2 + n]))

    # TODO: build the indicator polynomial f(x) where f[v] = 1 if v in a,
    # then compute f(x)^k via FFT-based exponentiation. Print the sorted
    # values v with f^k[v] > 0.
    achievable: list[int] = []
    print(*achievable)

solve()
`;

const STARTER_632E_CPP = `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];

    // TODO: build the indicator polynomial f(x) where f[v] = 1 if v in a,
    // then compute f(x)^k via FFT-based exponentiation. Print the sorted
    // values v with f^k[v] > 0.
    vector<int> achievable;
    for (size_t i = 0; i < achievable.size(); i++) {
        cout << achievable[i] << (i + 1 == achievable.size() ? '\\n' : ' ');
    }
    return 0;
}
`;

const STARTER_755G_PY = `import sys

def solve():
    data = sys.stdin.read().split()
    n = int(data[0])
    k = int(data[1])

    # TODO: count groupings of n balls into k groups using the recurrence
    # f(n, k) = f(n-1, k) + f(n-1, k-1) + f(n-2, k-1). Accelerate with
    # NTT mod 998244353 + matrix exponentiation on generating polynomials.
    answers = [0] * k
    print(*answers)

solve()
`;

const STARTER_755G_CPP = `#include <bits/stdc++.h>
using namespace std;

int main() {
    long long n;
    int k;
    cin >> n >> k;

    // TODO: count groupings of n balls into k groups using the recurrence
    // f(n, k) = f(n-1, k) + f(n-1, k-1) + f(n-2, k-1). Accelerate with
    // NTT mod 998244353 + matrix exponentiation on generating polynomials.
    vector<long long> answers(k, 0);
    for (int i = 0; i < k; i++) {
        cout << answers[i] << (i + 1 == k ? '\\n' : ' ');
    }
    return 0;
}
`;

// --- The catalog ---

export const FFT_PROBLEMS: FftProblem[] = [
  {
    id: "cf-1096g",
    title: "CF 1096G — Lucky Tickets",
    difficulty: "Medium",
    tags: ["fft", "convolution", "counting"],
    description:
      "Count length-n strings over an allowed digit set whose digit sum equals exactly half the maximum possible. Reduces to raising a digit-frequency polynomial to the n/2 power via FFT/NTT.",
    problemUrl: "https://codeforces.com/problemset/problem/1096/G",
    starterCode: { python: STARTER_1096G_PY, cpp: STARTER_1096G_CPP },
    sampleTests: [
      { name: "Sample 1", input: "4 2\n1 8\n", expectedOutput: "6\n" },
      { name: "Sample 2", input: "20 1\n6\n", expectedOutput: "1\n" },
      {
        name: "Sample 3",
        input: "10 5\n6 1 4 0 3\n",
        expectedOutput: "569725\n",
      },
    ],
  },
  {
    id: "cf-632e",
    title: "CF 632E — Thief in a Shop",
    difficulty: "Hard",
    tags: ["fft", "ntt", "knapsack"],
    description:
      "Determine all total values that can be reached by picking exactly k items (with repetition) from a list of n prices. Solved via polynomial exponentiation of the indicator polynomial.",
    problemUrl: "https://codeforces.com/problemset/problem/632/E",
    starterCode: { python: STARTER_632E_PY, cpp: STARTER_632E_CPP },
    sampleTests: [
      {
        name: "Sample 1",
        input: "3 2\n1 2 3\n",
        expectedOutput: "2 3 4 5 6\n",
      },
      { name: "Sample 2", input: "5 5\n1 1 1 1 1\n", expectedOutput: "5\n" },
      {
        name: "Sample 3",
        input: "3 3\n3 5 11\n",
        expectedOutput: "9 11 13 15 17 19 21 25 27 33\n",
      },
    ],
  },
  {
    id: "cf-755g",
    title: "CF 755G — PolandBall and Many Other Balls",
    difficulty: "Hard",
    tags: ["ntt", "polynomial", "matrix-exponentiation"],
    description:
      "For every k in [1..K], count the number of ways to partition n balls into k labelled groups of one or two adjacent balls. Solve with NTT-accelerated matrix exponentiation on generating-function polynomials.",
    problemUrl: "https://codeforces.com/problemset/problem/755/G",
    starterCode: { python: STARTER_755G_PY, cpp: STARTER_755G_CPP },
    sampleTests: [
      { name: "Sample 1", input: "3 3\n", expectedOutput: "5 5 1\n" },
      { name: "Sample 2", input: "1 1\n", expectedOutput: "1\n" },
      {
        name: "Sample 3",
        input: "5 10\n",
        expectedOutput: "9 25 25 9 1 0 0 0 0 0\n",
      },
    ],
  },
];

export function findProblemById(id: string | null): FftProblem | undefined {
  if (!id) return undefined;
  return FFT_PROBLEMS.find((p) => p.id === id);
}
