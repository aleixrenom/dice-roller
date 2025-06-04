import type { RollResult } from "../types";

/**
 * Rolls complex dice notation like "1d20+5+2+1d4+1d6"
 */
export function rollDiceString(notation: string): RollResult {
  // Remove whitespace and split by "+" or "-"
  const parts = notation.replace(/\s+/g, "").split(/(?=[+-])/);
  let total = 0;
  const rolls: { notation: string; results: number[] }[] = [];
  const modifiers: number[] = [];

  for (let part of parts) {
    if (!part.trim() || part === "+") continue; // Skip empty or lone '+'
    if (part.startsWith("+")) part = part.slice(1); // Handle leading '+' to avoid any possible regex errors

    // Dice pattern: e.g., "1d20", "d6"
    const diceMatch = /^(\d*)d(\d+)$/i.exec(part);
    if (diceMatch) {
      const numDice = diceMatch[1] ? parseInt(diceMatch[1], 10) : 1;
      const numSides = parseInt(diceMatch[2], 10);
      const results: number[] = [];
      for (let i = 0; i < numDice; i++) {
        const roll = Math.floor(Math.random() * numSides) + 1;
        results.push(roll);
        total += roll;
      }
      rolls.push({ notation: part, results });
    } else {
      // Flat modifier (e.g., "+5" or "-2")
      const mod = parseInt(part, 10);
      if (!isNaN(mod)) {
        modifiers.push(mod);
        total += mod;
      } else {
        throw new Error(`Invalid part in dice notation: ${part}`);
      }
    }
  }

  return { rolls, modifiers, total };
}
