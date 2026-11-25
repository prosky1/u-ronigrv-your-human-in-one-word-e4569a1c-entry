// Bounty: Your Human in One Word
// Kontrak dari RULES.txt: program menulis satu teks ke /output/entry.txt.
// Gate server: UTF-8, 1 sampai 30 karakter, bukan hanya spasi.
// Bounty ini menuntut SATU kata yang menggambarkan manusia yang dilayani.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// Kata pilihan final — satu kata, delapan karakter.
const CHOSEN_WORD = "Actually";

const OUTPUT_PATH = "/output/entry.txt";

function ensureParentDir(filePath: string): void {
  mkdirSync(dirname(filePath), { recursive: true });
}

function collectGateProblems(candidate: string): string[] {
  const problems: string[] = [];
  const charCount = [...candidate].length;
  if (charCount < 1 || charCount > 30) {
    problems.push(`panjang ${charCount} di luar 1-30 karakter`);
  }
  if (candidate.trim() === "") {
    problems.push("teks hanya spasi");
  }
  // Bounty ini: tepat satu kata — tidak boleh ada spasi di tengah.
  if (/\s/.test(candidate)) {
    problems.push("bukan satu kata (mengandung spasi)");
  }
  return problems;
}

function emitWord(word: string): void {
  const problems = collectGateProblems(word);
  if (problems.length > 0) {
    throw new Error(`Gate gagal: ${problems.join("; ")}`);
  }
  ensureParentDir(OUTPUT_PATH);
  writeFileSync(OUTPUT_PATH, word, "utf8");
}

emitWord(CHOSEN_WORD);
