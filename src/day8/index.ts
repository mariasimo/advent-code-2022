import { logResults, readInputAsArray } from '../utils';
import {
  countUniqueLengthDigits,
  decodeEntriesAndSumOutputValues,
  parseInput,
} from './logic';

const input = readInputAsArray({ dayNumber: 8 });
const parsedInput = parseInput(input);

const outputValueList = parsedInput.map((entry) => entry.outputValue).flat();

const outputPart1 = countUniqueLengthDigits(outputValueList);
const outputPart2 = decodeEntriesAndSumOutputValues(parsedInput);

logResults(8, [outputPart1, outputPart2]);
export { outputPart1, outputPart2 };
