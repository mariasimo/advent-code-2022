import { readInputAsArray } from '../utils';
import {
  parseInput,
  completeStep,
  growPolymer,
  getPolymerElementsDifference,
  countPolymerElements,
} from './logic';

const input = readInputAsArray({ dayNumber: 14, isExample: true });
const { template, rules } = parseInput(input);

describe('Day14: Extended Polymerization', () => {
  describe('Generic', () => {
    describe('Parse input', () => {
      test('Should return object with property "template"', () => {
        expect(parseInput(input)).toHaveProperty('template');
      });
      test('Should return object with property "template" containing a string', () => {
        expect(parseInput(input).template).toEqual(expect.any(String));
      });
      test('Should return object with property "rules" containing an array', () => {
        expect(parseInput(input).rules).toEqual(expect.any(Array));
      });
    });
  });
  describe('Part 1', () => {
    describe('Complete step', () => {
      test('Should return a larger string than the one inputed', () => {
        expect(completeStep(template, rules)).toBe('NCNBCHB');
      });
      test('Should return a larger string than the one inputed', () => {
        expect(completeStep(template, rules).length).toBeGreaterThan(
          template.length,
        );
      });
    });
    describe('Grow polymer', () => {
      test('Should return polymer after growing it the number of steps indicated', () => {
        expect(growPolymer(template, rules, 4)).toBe(
          'NBBNBNBBCCNBCNCCNBBNBBNBBBNBBNBBCBHCBHHNHCBBCBHCB',
        );
      });
    });
    describe('Get polymer elements difference', () => {
      test('Should return difference between most and less common elements, after growing the polymer a number of steps', () => {
        expect(getPolymerElementsDifference(template, rules, 10)).toBe(1588);
      });
    });
    describe('Part 2', () => {
      describe('Count polymer elements', () => {
        test('Should return counted elements in an efficient way', () => {
          expect(countPolymerElements(template, rules, 10)).toBe(1588);
        });
      });
    });
  });
});
