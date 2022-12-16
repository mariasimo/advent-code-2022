import { logResults, readInputAsArray } from '../utils';
import {
  countOverlappingLines,
  filterDiagonalLines,
  parseToLines,
  registerLinesInDiagram,
} from './logic';
const input = readInputAsArray({ dayNumber: 5 });

const lines = parseToLines(input);
const filteredLines = filterDiagonalLines(lines);
const registeredHorizontalAndVerticalLines =
  registerLinesInDiagram(filteredLines);
const registeredLines = registerLinesInDiagram(lines);

const outputPart1 = countOverlappingLines(registeredHorizontalAndVerticalLines);
const outputPart2 = countOverlappingLines(registeredLines);

logResults(5, [outputPart1, outputPart2]);

export { outputPart1, outputPart2 };
