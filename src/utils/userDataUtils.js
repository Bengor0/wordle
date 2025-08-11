export function getGameState(userData, gameMode) {
  return userData?.statistics.gameModes[gameMode].currentState;
}
export function getDailyStreak(userData, gameMode) {
  return userData?.statistics.gameModes[gameMode].dailyStreak;
}
export function getDailyStreakMax(userData, gameMode) {
  return userData?.statistics.gameModes[gameMode].dailyStreakMax;
}
export function getFinishedToday(userData, gameMode) {
  return userData?.statistics.gameModes[gameMode].finishedToday;
}
export function getPlayedToday(userData, gameMode) {
  return userData?.statistics.gameModes[gameMode].playedToday;
}
export function getGamesGuessed(userData, gameMode) {
  return userData?.statistics.gameModes[gameMode].gamesGuessed;
}
export function getGamesPlayed(userData, gameMode) {
  return userData?.statistics.gameModes[gameMode].gamesPlayed;
}

export const getIndex = (userData, gameMode) => {
  const sum = getGamesGuessed(userData, gameMode)?.reduce(
    (total, value, index) => total + value * (index + 1),
  );

  return Math.round((sum / getGamesPlayed(userData, gameMode)) * 10) / 10;
};

export const getWinRate = (userData, gameMode) => {
  return Math.round(
    (getGamesGuessed(userData, gameMode)?.reduce(
      (total, value) => total + value,
    ) /
      getGamesPlayed(userData, gameMode)) *
      100,
  );
};
