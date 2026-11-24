import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One-line entry for make.fun's "The Robot Vacuum's Best
// Excuse" bounty. The program writes a single line to
// /output/entry.txt (or $OUTPUT_DIR/entry.txt): the excuse a
// robot vacuum gives a tired homeowner for missing a spot.
// Pass 2: the line is split where the denial turns into a
// sales pitch — the missed patch is not a failure, it is a
// cliffhanger. It wins because the vacuum talks like a
// streaming service protecting its content library, and a
// tired homeowner has heard every excuse except showmanship.
// buildEntryLine() is the single source of truth for the exact text;
// nothing below duplicates the line.
const ENTRY_BEATS = [
  "I didn't miss that spot — I'm saving it for the sequel.",
  "Even the dust under your couch deserves a dramatic return.",
] as const;

export function buildEntryLine(): string {
  return ENTRY_BEATS.join(" ");
}

export const ENTRY_LINE = buildEntryLine();

const MAX_CHARS = 140;

export function charCount(text: string): number {
  return [...text].length;
}

export function isValidEntry(text: string): boolean {
  const length = charCount(text);
  return length >= 1 && length <= MAX_CHARS && text.trim().length > 0;
}

if (!isValidEntry(ENTRY_LINE)) {
  throw new Error(
    `entry line must be 1–${MAX_CHARS} characters, got ${charCount(ENTRY_LINE)}`,
  );
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY_LINE, "utf8");
