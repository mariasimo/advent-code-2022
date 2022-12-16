import { readInputAsArray } from '../utils';
import {
  parseInput,
  simulateStep,
  simulateMultipleSteps,
  getSyncStep,
} from './logic';

const input = readInputAsArray({ dayNumber: 11, isExample: true });
const parsedInput = parseInput(input);

const testInput = ['11111', '19991', '19991', '19991', '11111'].map((i) =>
  i.split('').map((j) => +j),
);

describe('Day11: Dumbo Octopus', () => {
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
  });
  describe('Part 1', () => {
    describe('Simulate step', () => {
      test('Should return flashes counted after 1 step', () => {
        expect(simulateStep(testInput, 0).incrementedFlashes).toEqual(9);
      });
    });
    describe('Simulate 10 steps', () => {
      test('Should return flashes counted after a given number of steps', () => {
        expect(simulateMultipleSteps(parsedInput, 10)).toEqual(204);
      });
    });
    describe('Simulate 100 steps', () => {
      test('Should return flashes counted after a given number of steps', () => {
        expect(simulateMultipleSteps(parsedInput, 100)).toEqual(1656);
      });
    });
  });
  describe('Part 2', () => {
    describe('Get synchronizing step', () => {
      test('Should return the step after which all values of array are 0', () => {
        expect(getSyncStep(parsedInput)).toEqual(195);
      });
    });
  });
});
