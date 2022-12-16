import { readInputAsArray } from '../utils';
import {
  parseInput,
  findLowPoints,
  getRiskLevel,
  getRiskLevelTotal,
  getBasinSize,
  multiplyBasinSizes,
  findBasinSizesAndGetProduct,
} from './logic';

const input = readInputAsArray({ dayNumber: 9, isExample: true });
const parsedInput = parseInput(input);

describe('Day9:Smoking Basin', () => {
  describe('Generic', () => {
    describe('Parse input', () => {
      test('Should return an array', () => {
        expect(parseInput(input)).toEqual(expect.any(Array));
      });
      test('Should return a 2d array', () => {
        expect(parseInput(input)[0]).toEqual(expect.any(Array));
      });
      test('Should return a 2d array fill with numbers', () => {
        expect(parseInput(input)[0][0]).toEqual(expect.any(Number));
      });
    });
    describe('Find low points', () => {
      test('Should return an array of points which height is lower than any adjacent (top, bottom, left or right)', () => {
        expect(findLowPoints(parsedInput).map((p) => p.height)).toStrictEqual([
          1, 0, 5, 5,
        ]);
      });
    });
  });
  describe('Part 1', () => {
    describe('Get risk level', () => {
      test('Given a low point, should return its risk level', () => {
        expect(getRiskLevel(5)).toBe(6);
      });
    });
    describe('Get risk level total', () => {
      test('Find low points and return the sum of its risk levels', () => {
        expect(getRiskLevelTotal(parsedInput)).toBe(15);
      });
    });
  });
  describe('Part 2', () => {
    describe('Get basin size', () => {
      test('Should return number of elements in basin', () => {
        expect(getBasinSize({ height: 2, x: 0, y: 0 }, parsedInput)).toBe(3);
      });
    });
    describe('Get basin size', () => {
      test('Should return number of elements in basin', () => {
        expect(getBasinSize({ height: 0, x: 9, y: 0 }, parsedInput)).toBe(9);
      });
    });
    describe('Get basin size', () => {
      test('Should return number of elements in basin', () => {
        expect(getBasinSize({ height: 5, x: 2, y: 2 }, parsedInput)).toBe(14);
      });
    });
    describe('Mutiple largest basin sizes', () => {
      test('Should return the product of three largest basin sizes', () => {
        expect(multiplyBasinSizes([3, 9, 14, 9])).toBe(1134);
      });
    });
    describe('Find basins and get product of three largest ones', () => {
      test('Should find basins and get product of three largest ones', () => {
        expect(findBasinSizesAndGetProduct(parsedInput)).toBe(1134);
      });
    });
  });
});
