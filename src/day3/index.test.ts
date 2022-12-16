import { readInputAsArray } from '../utils/index';
import {
  binaryToDecimalOldSchool,
  calcPowerConsumptionRate,
  countTypeOfBitsInRow,
  createRow,
  getPowerCompsumtion,
  getLifeSupport,
  calcLifeSupportRate,
} from './logic';
import { Bit } from './types';

const row: Bit[] = ['0', '1', '1', '1', '1', '0', '0', '1', '1', '1', '0', '0'];
const inputExample = readInputAsArray({ dayNumber: 3, isExample: true });

describe('Day: Binary Diagnostic', () => {
  describe('Generic', () => {
    describe('BinaryToDecimal', () => {
      test('Should convert binary to decimal', () => {
        expect(binaryToDecimalOldSchool('10110')).toBe(22);
      });
      test('Should convert binary to decimal', () => {
        expect(binaryToDecimalOldSchool('01001')).toBe(9);
      });
    });
    describe('Create bits row with every item[arg position] from a given string[]', () => {
      test('Should output an array of strings with the same length of input', () => {
        expect(createRow(inputExample, 0)).toHaveLength(inputExample.length);
      });
      test('Should create correct bits row', () => {
        expect(createRow(inputExample, 0)).toStrictEqual(row);
      });
    });
    describe('CountTypeOfBitsInRow', () => {
      test('Should count ones and zeros in row', () => {
        expect(countTypeOfBitsInRow(row)).toStrictEqual({ '0': 5, '1': 7 });
      });
    });
  }),
    describe('Part 1', () => {
      describe('Calculate Rates', () => {
        describe('Calculate Gamma Rate', () => {
          test('Should return gamma rate for a given input', () => {
            expect(
              calcPowerConsumptionRate(inputExample, 'gamma'),
            ).toStrictEqual(22);
          });
        });
        describe('Calculate Epsilon Rate', () => {
          test('Should return gamma rate for a given input', () => {
            expect(
              calcPowerConsumptionRate(inputExample, 'epsilon'),
            ).toStrictEqual(9);
          });
        });
        describe('Get Power Compsumtion', () => {
          test('Should return correct power compsumtion', () => {
            expect(getPowerCompsumtion(inputExample)).toStrictEqual(198);
          });
        });
      });
    });
  describe('Part 2', () => {
    describe('Calc Life Support related rates', () => {
      test('should return correct Oxigen Generation Rate', () => {
        expect(calcLifeSupportRate(inputExample, 'oxigenGeneration')).toBe(23);
      });
      test('should return correct CO2 Scrubber Rate', () => {
        expect(calcLifeSupportRate(inputExample, 'CO2Scrubber')).toBe(10);
      });
      describe('Get Life Support Rating', () => {
        test('Should get life support rating', () => {
          expect(getLifeSupport(inputExample)).toBe(230);
        });
      });
    });
  });
});
