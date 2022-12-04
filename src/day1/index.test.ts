import {
  groupCaloriesByElf,
  findHigherGroupOfCalories,
  sumTopThreeHigherGroupsOfCalories,
} from './logic';
import { convertToNumber, readInputAsArray } from '../utils/index';

const input = readInputAsArray({ dayNumber: 1, isExample: true }).map((item) =>
  convertToNumber(item),
);

describe('Day 1: Calorie Counting', () => {
  describe('Part 1', () => {
    describe('Group calories by elf', () => {
      test('Should return calories grouped by elf with test', () => {
        expect(groupCaloriesByElf([1, 2, 0, 5, 4])).toStrictEqual({
          'elf 1': 3,
          'elf 2': 9,
        });
      });
      test('Should return calories grouped by elf with example input', () => {
        expect(groupCaloriesByElf(input)).toStrictEqual({
          'elf 1': 6000,
          'elf 2': 4000,
          'elf 3': 11000,
          'elf 4': 24000,
          'elf 5': 10000,
        });
      });
    });
    describe('Find group with most calories', () => {
      test('Should return group with most calories', () => {
        expect(findHigherGroupOfCalories(input)).toBe(24000);
      });
    });
  });
  describe('Part 2', () => {
    describe('Sum top three groups of calories', () => {
      test('Should return sum', () => {
        expect(sumTopThreeHigherGroupsOfCalories(input)).toBe(45000);
      });
    });
  });
});
