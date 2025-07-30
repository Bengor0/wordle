import { getDailyStreakMax, getIndex, getWinRate } from "./userDataUtils.js";
import { GameModes } from "../enums/GameModes.js";

export function compareClassicIndex(user1, user2) {
  const userData1 = user1.data();
  const userData2 = user2.data();
  return (
    getIndex(userData1, GameModes.CLASSIC) -
    getIndex(userData2, GameModes.CLASSIC)
  );
}

export function compareRoyaleIndex(user1, user2) {
  const userData1 = user1.data();
  const userData2 = user2.data();
  return (
    getIndex(userData2, GameModes.ROYALE) -
    getIndex(userData1, GameModes.ROYALE)
  );
}

export function compareClassicWinRate(user1, user2) {
  const userData1 = user1.data();
  const userData2 = user2.data();
  return (
    getWinRate(userData2, GameModes.CLASSIC) -
    getWinRate(userData1, GameModes.CLASSIC)
  );
}

export function compareRoyaleWinRate(user1, user2) {
  const userData1 = user1.data();
  const userData2 = user2.data();
  return (
    getWinRate(userData1, GameModes.ROYALE) -
    getWinRate(userData2, GameModes.ROYALE)
  );
}

export function compareClassicDailyStreakMax(user1, user2) {
  const userData1 = user1.data();
  const userData2 = user2.data();
  return (
    getDailyStreakMax(userData2, GameModes.CLASSIC) -
    getDailyStreakMax(userData1, GameModes.CLASSIC)
  );
}

export function compareRoyaleDailyStreakMax(user1, user2) {
  const userData1 = user1.data();
  const userData2 = user2.data();
  return (
    getDailyStreakMax(userData2, GameModes.ROYALE) -
    getDailyStreakMax(userData1, GameModes.ROYALE)
  );
}
