import { logResults, readInputAsArray } from '../utils';
import { getSyncStep, parseInput, simulateMultipleSteps } from './logic';

const input = readInputAsArray({ dayNumber: 11 });
const parsedInput = parseInput(input);

const outputPart1 = simulateMultipleSteps(parsedInput, 100);
const outputPart2 = getSyncStep(parsedInput);

logResults(11, [outputPart1, outputPart2]);

export { outputPart1, outputPart2 };
