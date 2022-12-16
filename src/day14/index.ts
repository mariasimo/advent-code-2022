import { logResults, readInputAsArray } from '../utils';
import {
  countPolymerElements,
  getPolymerElementsDifference,
  parseInput,
} from './logic';

const input = readInputAsArray({ dayNumber: 14 });
const { template, rules } = parseInput(input);

const outputPart1 = getPolymerElementsDifference(template, rules, 10);
const outputPart2 = countPolymerElements(template, rules, 40);

logResults(14, [outputPart1, outputPart2]);
export { outputPart1, outputPart2 };
