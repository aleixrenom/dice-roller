import type { RollOptions, RollResult } from "../types";

/**
 * Rolls complex dice notation like "1d20+5+2+1d4+1d6"
 */
export function rollDiceString(
  notation: string,
  options: RollOptions = {}
): RollResult {
  const parts = parseNotation(notation);
  let total = 0;
  const rolls: { notation: string; results: number[] }[] = [];
  const modifiers: number[] = [];
  let advApplied = false;

  for (let part of parts) {
    if (!part.trim() || part === "+") continue; // Skip empty or lone '+'
    if (part.startsWith("+")) part = part.slice(1); // Handle leading '+' to avoid any possible regex errors

    const dice = parseDice(part);
    if (dice) {
      let { numDice, numSides } = dice;

      // Handle double dice (critical)
      if (options.doubleDice) numDice *= 2;

      // Handle advantage/disadvantage for first d20 only
      if (
        !advApplied &&
        numSides === 20 &&
        numDice === 1 &&
        (options.advantage || options.disadvantage)
      ) {
        const { rolls: advRolls, chosen } = rollAdvantageDisadvantage(
          numSides,
          !!options.advantage
        );
        rolls.push({
          notation: part + (options.advantage ? " (adv)" : " (dis)"),
          results: advRolls,
        });
        total += chosen;
        advApplied = true;
      } else {
        const results = rollDice(numDice, numSides);
        rolls.push({ notation: part, results });
        total += results.reduce((a, b) => a + b, 0);
      }
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

  return { rolls, modifiers, total, rollOptions: options };
}

// --- Helper functions ---

function parseNotation(notation: string): string[] {
  return notation.replace(/\s+/g, "").split(/(?=[+-])/);
}

function parseDice(part: string): { numDice: number; numSides: number } | null {
  const diceMatch = /^(\d*)d(\d+)$/i.exec(part);
  if (!diceMatch) return null;
  return {
    numDice: diceMatch[1] ? parseInt(diceMatch[1], 10) : 1,
    numSides: parseInt(diceMatch[2], 10),
  };
}

function rollDice(numDice: number, numSides: number): number[] {
  const results: number[] = [];
  for (let i = 0; i < numDice; i++) {
    results.push(Math.floor(Math.random() * numSides) + 1);
  }
  return results;
}

function rollAdvantageDisadvantage(
  numSides: number,
  advantage: boolean // true for advantage, false for disadvantage
): { rolls: number[]; chosen: number } {
  const roll1 = Math.floor(Math.random() * numSides) + 1;
  const roll2 = Math.floor(Math.random() * numSides) + 1;
  const chosen = advantage ? Math.max(roll1, roll2) : Math.min(roll1, roll2);
  return { rolls: [roll1, roll2], chosen };
}
