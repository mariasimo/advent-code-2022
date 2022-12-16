import { logResults, readInputAsArray } from '../utils';
import { parseInput, getBingoScore, playBingo } from './logic';

const input = readInputAsArray({ dayNumber: 4 });
const { randomNumbers, boards } = parseInput(input);

const winnerGameResult = playBingo(boards, randomNumbers, 'winner');
const loserGameResult = playBingo(boards, randomNumbers, 'loser');

const outputPart1 = getBingoScore(
  winnerGameResult?.lastNumberPlayed ?? 1,
  winnerGameResult?.board ?? [],
);

const outputPart2 = getBingoScore(
  loserGameResult?.lastNumberPlayed ?? 1,
  loserGameResult?.board ?? [],
);

logResults(4, [outputPart1, outputPart2]);

export { outputPart1, outputPart2 };
