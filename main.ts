import { writeFileSync, mkdirSync } from "node:fs";

const ENTRY_WORD = "Later";

function validateSingleWord(value: string): void {
  if (value.length === 0) {
    throw new Error("entry must not be empty");
  }
  if (value.length > 30) {
    throw new Error("entry exceeds 30 character gate limit");
  }
  if (/[\r\n]/.test(value)) {
    throw new Error("entry must be a single line");
  }
  if (/\s/.test(value)) {
    throw new Error("entry must be exactly one word with no whitespace");
  }
  if (value.trim() !== value) {
    throw new Error("entry must not have leading or trailing whitespace");
  }
}

validateSingleWord(ENTRY_WORD);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY_WORD, "utf8");
