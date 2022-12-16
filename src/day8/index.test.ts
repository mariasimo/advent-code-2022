import { readInputAsArray } from '../utils';
import {
  parseInput,
  countUniqueLengthDigits,
  decodeSignalPatterns,
  decodeOutputValue,
  decodeEntriesAndSumOutputValues,
} from './logic';

const input = readInputAsArray({ dayNumber: 8, isExample: true });
const parsedInput = parseInput(input);

const outputValueList = parsedInput.map((entry) => entry.outputValue).flat();

const signalPatterns =
  'acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab'
    .split(' ')
    .map((signal) => [...signal].sort().join(''));

const outputValue = 'cdfeb fcadb cdfeb cdbaf'
  .split(' ')
  .map((signal) => [...signal].sort().join(''));

const digits = {
  '0': 'abcdeg',
  '1': 'ab',
  '2': 'acdfg',
  '3': 'abcdf',
  '4': 'abef',
  '5': 'bcdef',
  '6': 'bcdefg',
  '7': 'abd',
  '8': 'abcdefg',
  '9': 'abcdef',
};

describe('Day8: Seven Segment Search', () => {
  describe('Generic', () => {
    describe('Parse input', () => {
      test('Should return an array with objects containing signalPatterns property', () => {
        expect(parseInput(input)[0]).toHaveProperty('signalPatterns');
      });
      test('Should return an array with objects containing outputValue property', () => {
        expect(parseInput(input)[0]).toHaveProperty('outputValue');
      });
    });
  });
  describe('Part 1', () => {
    describe('Count unique length digits', () => {
      test('Should return the number of unique length digits in the output value strings', () => {
        expect(countUniqueLengthDigits(outputValueList)).toBe(26);
      });
    });
  });
  describe('Part 2', () => {
    describe('Decode Signal Patterns', () => {
      test('Should return an object with the correspondency between patterns and digits', () => {
        expect(decodeSignalPatterns(signalPatterns)).toStrictEqual(digits);
      });
    });
    describe('Decode Output Value', () => {
      test('Should return correct number value', () => {
        expect(decodeOutputValue(outputValue, digits)).toBe(5353);
      });
    });
    describe('Decode entries and sum output values', () => {
      test('Should return correct number value', () => {
        expect(decodeEntriesAndSumOutputValues(parsedInput)).toBe(61229);
      });
    });
  });
});
