import { logResults, readInputAsArray } from '../utils/index';
import { getTotalPriorityValue } from './logic';

const input: string[] = readInputAsArray({ dayNumber: 3 });

const outputPart1 = getTotalPriorityValue(input);

logResults(3, [outputPart1]);

export { outputPart1 };
