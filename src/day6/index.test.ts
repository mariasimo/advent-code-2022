import { readInput, readInputAsArray } from '../utils';
import {
  parseInput,
  trackGrowthInADay,
  trackGrowthInAPeriod,
  getLanternshipGrowthRate,
  trackGrowthInAPeriodEfficient,
} from './logic';

const input = readInput({ dayNumber: 6, isExample: true });
const initialState = parseInput(input);
const finalExampleRow = [
  6, 0, 6, 4, 5, 6, 0, 1, 1, 2, 6, 0, 1, 1, 1, 2, 2, 3, 3, 4, 6, 7, 8, 8, 8, 8,
];

describe('Day6: Lanternfish', () => {
  describe('Generic', () => {
    describe('Parse input', () => {
      test('Should parse input into an array of numbers', () => {
        expect(Array.isArray(parseInput(input))).toBe(true);
      });
      test('Should parse input into an array of numbers', () => {
        expect(parseInput(input)[0]).toEqual(expect.any(Number));
      });
    });
  });
  describe('Part 1', () => {
    describe('Track growth in a day', () => {
      test('Should add up all previous actions to reflect lantership daily transformation', () => {
        expect(trackGrowthInADay(initialState)).toStrictEqual([2, 3, 2, 0, 1]);
      });
      test('Should add up all previous actions to reflect lantership daily transformation', () => {
        expect(trackGrowthInADay([2, 3, 2, 0, 1])).toStrictEqual([
          1, 2, 1, 6, 0, 8,
        ]);
      });
    });
    describe('Track growth in a period of days', () => {
      test('Should return a 2d array with so many inner arrays as days input + initial state', () => {
        expect(trackGrowthInAPeriod(18, initialState)).toHaveLength(19);
      });
      test('Should apply transformation successfully', () => {
        expect(trackGrowthInAPeriod(18, initialState)[18]).toStrictEqual(
          finalExampleRow,
        );
      });
    });
    describe('Get lanternship growth rate', () => {
      test('Should return the length of final row of 2d array', () => {
        expect(getLanternshipGrowthRate([initialState, finalExampleRow])).toBe(
          26,
        );
      });
    });
  });
  describe('Part 2', () => {
    describe('Track growth in a period of days — MORE EFFICIENT', () => {
      test('Should return a number, the number of lanternfish', () => {
        expect(trackGrowthInAPeriodEfficient(18, initialState)).toBe(26);
      });
    });
    describe('Track growth in a period of days — MORE EFFICIENT', () => {
      test('Should return a number, the number of lanternfish', () => {
        expect(trackGrowthInAPeriodEfficient(80, initialState)).toBe(5934);
      });
    });
  });
});
