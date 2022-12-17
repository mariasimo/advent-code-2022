import { readInputAsArray } from '../utils/index';
import {
  getStringHalves,
  getMatchesBetweenTwoStrings,
  getLetterPriority,
  getTotalPriorityValue,
  getMatchesBetweenStrings,
  createGroupsOfThreeString,
  getTotalPriorityValueInChunks,
} from './logic';

const inputExample = readInputAsArray({ dayNumber: 3, isExample: true });

describe('Day 3: Rucksack Reorganization', () => {
  describe('Part 1', () => {
    test('Get compartiments from rucksack', () => {
      expect(getStringHalves(inputExample[0])).toStrictEqual([
        'vJrwpWtwJgWr',
        'hcsFMMfFFhFp',
      ]);
    });
    test('Get matches between both compartiments', () => {
      expect(
        getMatchesBetweenTwoStrings(getStringHalves(inputExample[0])),
      ).toStrictEqual(['p']);
    });
    test('Get letter priority value', () => {
      expect(getLetterPriority('a')).toStrictEqual(1);
      expect(getLetterPriority('A')).toStrictEqual(27);
    });
    test('Get total priority value of rucksack common items', () => {
      expect(getTotalPriorityValue(inputExample)).toStrictEqual(157);
    });
  });
  describe('Part 2', () => {
    test('Get matches between three simple strings', () => {
      expect(
        getMatchesBetweenStrings(['abccfh', 'ccbd', 'bptx']),
      ).toStrictEqual(['b']);
    });
    test('Get matches between three simple strings', () => {
      expect(
        getMatchesBetweenStrings(['aBccfh', 'ccBda', 'bptxa']),
      ).toStrictEqual(['a']);
    });

    test('Get matches between three rusksack', () => {
      expect(getMatchesBetweenStrings(inputExample.slice(0, 3))).toStrictEqual([
        'r',
      ]);
    });
    test('Get matches between three rusksack', () => {
      expect(createGroupsOfThreeString(inputExample)).toStrictEqual([
        [
          'vJrwpWtwJgWrhcsFMMfFFhFp',
          'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
          'PmmdzqPrVvPwwTWBwg',
        ],
        [
          'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn',
          'ttgJtRGJQctTZtZT',
          'CrZsJsPPZsGzwwsLwLmpwMDw',
        ],
      ]);
    });
    test('Divide input in groups of three strings and sum its priority values', () => {
      expect(getTotalPriorityValueInChunks(inputExample)).toBe(70);
    });
  });
});
