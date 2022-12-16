import { readInputAsArray, logResults } from '../utils';
import {
  getTournamentScore,
  getRoundScore,
  getRoundNewScore,
  Round,
} from './logic';

const input = readInputAsArray({ dayNumber: 2 }).map((el) =>
  el.split(' '),
) as Round[];

const outputPart1 = getTournamentScore(input, getRoundScore);
const outputPart2 = getTournamentScore(input, getRoundNewScore);

logResults(2, [outputPart1, outputPart2]);

export { outputPart1, outputPart2 };
