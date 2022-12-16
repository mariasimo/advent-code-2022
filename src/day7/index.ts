import { logResults, readInput } from '../utils';
import {
  findCheapestFuelCost,
  findCheapestIncreasingFuelCost,
  parseInput,
} from './logic';

const input = readInput({ dayNumber: 7 });
const crabs = parseInput(input);

const outputPart1 = findCheapestFuelCost(crabs);
const outputPart2 = findCheapestIncreasingFuelCost(crabs);

logResults(7, [outputPart1, outputPart2]);
export { outputPart1, outputPart2 };
