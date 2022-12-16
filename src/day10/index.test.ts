import { readInputAsArray } from '../utils';
import {
  parseInput,
  getIncorrectChar,
  calculateIncorrectCharsScore,
  findCompletionString,
  calculateCompletionStringsScore,
  scoreCompletionString,
} from './logic';

const input = readInputAsArray({ dayNumber: 10, isExample: true });
const parsedInput = parseInput(input);

describe('Day10:Syntax Scoring', () => {
  describe('Generic', () => {
    describe('Parse input', () => {
      test('Should return an array', () => {
        expect(parseInput(input)).toEqual(expect.any(Array));
      });
      test('Should return a 2d array', () => {
        expect(parseInput(input)[0]).toEqual(expect.any(Array));
      });
      test('Should return a 2d array fill with numbers', () => {
        expect(parseInput(input)[0][0]).toEqual(expect.any(String));
      });
    });
  });
  describe('Part 1', () => {
    describe('Get incorrect character', () => {
      test("Given a corrupted line, should return the first character which doesn't match", () => {
        expect(getIncorrectChar(parsedInput[2])).toBe('}');
      });
    });
    describe('Get incorrect character', () => {
      test('Given a incomplete line, should return a nullish value', () => {
        expect(getIncorrectChar(parsedInput[0])).toBeUndefined();
      });
    });
    describe('Calculate incorrect characters score', () => {
      test('Given an array of lines, get incorrect characters at corrupted lines, and return the sum of its scores', () => {
        expect(calculateIncorrectCharsScore(parsedInput)).toBe(26397);
      });
    });
  });
  describe('Part 2', () => {
    describe('Find completion string', () => {
      test('Given an incomplete line, should return string on missing closing characters', () => {
        expect(findCompletionString(parsedInput[0])).toBe('}}]])})]');
      });
    });
    describe('Find completion string', () => {
      test('Given a corrupted line, should return a nullish value', () => {
        expect(findCompletionString(parsedInput[2])).toBe(undefined);
      });
    });
    describe('Score completion string', () => {
      test('Should return a number scoring the input string', () => {
        expect(scoreCompletionString('}}]])})]')).toBe(288957);
      });
    });
    describe('Calculate completion strings score', () => {
      test('Given an array of line, should calculate a score for each and return the middle one', () => {
        expect(calculateCompletionStringsScore(parsedInput)).toBe(288957);
      });
    });
  });
});
