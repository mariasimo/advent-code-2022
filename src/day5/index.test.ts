import { readInputAsArray } from '../utils';
import {
  filterDiagonalLines,
  generateDiagram,
  parseToLines,
  registerLinesInDiagram,
  countOverlappingLines,
  findLargestValue,
} from './logic';

const input = readInputAsArray({ dayNumber: 5, isExample: true });
const lines = parseToLines(input);
const diagonalLine = [
  [8, 0],
  [0, 8],
];
const diagramTestLine = [2, 2, 2, 1, 1, 1, null, null, null, null];
const horizontalAndVerticalLines = filterDiagonalLines(lines);
const registeredHorizontalAndVerticalLines = registerLinesInDiagram(
  horizontalAndVerticalLines,
);
const registeredLines = registerLinesInDiagram(lines);

describe('Day 5: Hydrothermal Venture', () => {
  describe('Generic', () => {
    describe('Parse Input', () => {
      test('Return an array', () => {
        expect(lines).toEqual(expect.any(Array));
      });
      test('Create array of lines', () => {
        expect(lines[0]).toEqual([
          [0, 9],
          [5, 9],
        ]);
      });
    });
    describe('Create diagram', () => {
      test('Return an array', () => {
        expect(generateDiagram(9, 9)).toEqual(expect.any(Array));
      });
      test('Generate 2d array for register lines', () => {
        expect(generateDiagram(3, 3)[0]).toEqual([null, null, null]);
      });
    });
    describe('Filter diagonal lines', () => {
      test('Return an array with less items than the input', () => {
        expect(filterDiagonalLines(lines).length).toBeLessThan(lines.length);
      });
      test('Does not contain diagonal lines', () => {
        expect(filterDiagonalLines(lines)).toEqual(
          expect.not.arrayContaining(diagonalLine),
        );
      });
    });
    describe('Find largest number', () => {
      test('Should find larges number on a given axis of a 2D array', () => {
        expect(findLargestValue(lines, 'x')).toBe(9);
      });
    });
  });
  describe('Part 1', () => {
    describe('Register overlapping horizontal and vertical lines in diagram', () => {
      test('Return correct last line as per example', () => {
        expect(registeredHorizontalAndVerticalLines[9]).toStrictEqual(
          diagramTestLine,
        );
      });
    });
    describe('Count number of overlapping horizontal and vertical lines', () => {
      test('Return correct number of overlapping lines', () => {
        expect(
          countOverlappingLines(registeredHorizontalAndVerticalLines),
        ).toBe(5);
      });
    });
  });
  describe('Part 2', () => {
    describe('Register all overlapping lines in diagram, including diagonals', () => {
      test('Return correct last line as per example', () => {
        expect(registeredLines[9]).toStrictEqual(diagramTestLine);
      });
    });
    describe('Count number of overlapping horizontal and vertical lines', () => {
      test('Return correct number of overlapping lines', () => {
        expect(countOverlappingLines(registeredLines)).toBe(12);
      });
    });
  });
});
