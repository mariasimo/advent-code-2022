import { convertToNumber, readInputAsArray, logResults } from '../utils';
import {
  findHigherGroupOfCalories,
  sumTopThreeHigherGroupsOfCalories,
} from './logic';

const input: number[] = readInputAsArray({ dayNumber: 1 }).map((item) =>
  convertToNumber(item),
);

const outputPart1 = findHigherGroupOfCalories(input);
const outputPart2 = sumTopThreeHigherGroupsOfCalories(input);

logResults(1, [outputPart1, outputPart2]);

export { outputPart1, outputPart2 };
