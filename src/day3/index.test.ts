import { readInputAsArray } from '../utils/index';
import {
  getStringHalves,
  getMatchesBetweenTwoStrings,
  getLetterPriority,
  getTotalPriorityValue,
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
});
