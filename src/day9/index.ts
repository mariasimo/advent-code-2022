import { logResults, readInputAsArray } from '../utils';
import {
  parseInput,
  getRiskLevelTotal,
  findBasinSizesAndGetProduct,
} from './logic';

const input = readInputAsArray({ dayNumber: 9 });
const parsedInput = parseInput(input);

const outputPart1 = getRiskLevelTotal(parsedInput);
const outputPart2 = findBasinSizesAndGetProduct(parsedInput);

logResults(9, [outputPart1, outputPart2]);
export { outputPart1, outputPart2 };
