import { logResults, readInput } from '../utils';
import {
  getLanternshipGrowthRate,
  parseInput,
  trackGrowthInAPeriod,
  trackGrowthInAPeriodEfficient,
} from './logic';

const input = readInput({ dayNumber: 6 });
const initialState = parseInput(input);

const lanternfishArr = trackGrowthInAPeriod(80, initialState);

const outputPart1 = getLanternshipGrowthRate(lanternfishArr);
const outputPart2 = trackGrowthInAPeriodEfficient(256, initialState);

logResults(6, [outputPart1, outputPart2]);
export { outputPart1, outputPart2 };
