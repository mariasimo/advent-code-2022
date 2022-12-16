import { readInput } from '../utils';
import {
  calculateDifference,
  findCheapestFuelCost,
  findCheapestIncreasingFuelCost,
  parseInput,
} from './logic';

const input = readInput({ dayNumber: 7, isExample: true });
const parsedInput = parseInput(input);

describe('Day7:The Treachery of Whales', () => {
  describe('Generic', () => {
    describe('Parse input', () => {
      test('Should return an array', () => {
        expect(Array.isArray(parseInput(input))).toBe(true);
      });
      test('Should return an array of numbers', () => {
        expect(parseInput(input)[0]).toEqual(expect.any(Number));
      });
    });
  });
  describe('Part 1', () => {
    describe('Find cheapest alignment option', () => {
      test('Should return a number representing the cheapest fuel cost of align all items', () => {
        expect(findCheapestFuelCost(parsedInput)).toBe(37);
      });
    });
  });
  describe('Part 2', () => {
    describe('Calculate Difference', () => {
      test('Should return the sum of all indexes between an array created from two extreme values with a step separation of one', () => {
        expect(calculateDifference(16, 5)).toBe(66);
      });
    });
    describe('Find cheapest alignment option with increasing fuel cost', () => {
      test('Should return a number representing the cheapest fuel cost of align all items', () => {
        expect(findCheapestIncreasingFuelCost(parsedInput)).toBe(168);
      });
    });
  });
});
