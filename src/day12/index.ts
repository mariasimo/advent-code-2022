import { logResults, readInputAsArray } from '../utils';
import { findPathsPart1, findPathsPart2, parseInput } from './logic';

const input = readInputAsArray({ dayNumber: 12 });
const parsedInput = parseInput(input);

const outputPart1 = findPathsPart1(parsedInput).length;
const outputPart2 = findPathsPart2(parsedInput).length;

logResults(12, [outputPart1, outputPart2]);

export { outputPart1, outputPart2 };
