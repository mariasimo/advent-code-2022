import { logResults, readInputAsArray } from '../utils/index';
import { getTotalPriorityValue, getTotalPriorityValueInChunks } from './logic';

const input: string[] = readInputAsArray({ dayNumber: 3 });

const outputPart1 = getTotalPriorityValue(input);
const outputPart2 = getTotalPriorityValueInChunks(input);

logResults(3, [outputPart1, outputPart2]);

export { outputPart1, outputPart2 };
