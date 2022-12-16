import { logResults, readInputAsArray } from '../utils';
import {
  calculateCompletionStringsScore,
  calculateIncorrectCharsScore,
  parseInput,
} from './logic';

const input = readInputAsArray({ dayNumber: 10 });
const parsedInput = parseInput(input);

const outputPart1 = calculateIncorrectCharsScore(parsedInput);
const outputPart2 = calculateCompletionStringsScore(parsedInput);

logResults(10, [outputPart1, outputPart2]);
export { outputPart1, outputPart2 };
