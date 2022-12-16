import { readInputAsArray } from '../utils';
import {
  getRoundResult,
  getRoundScore,
  getShapeResult,
  getTournamentScore,
  getRoundNewScore,
  Round,
} from './logic';

const input = readInputAsArray({ dayNumber: 2, isExample: true }).map((el) =>
  el.split(' '),
) as Round[];

describe('Day 2: Rock Paper Scissors', () => {
  describe('First part', () => {
    test('Should get shape result, 1:X:A:rock, 2:Y:B:paper, 3:Z:C:scissors', () => {
      expect(getShapeResult('X')).toBe(1);
      expect(getShapeResult('Y')).toBe(2);
      expect(getShapeResult('Z')).toBe(3);

      expect(getShapeResult('A')).toBe(1);
      expect(getShapeResult('B')).toBe(2);
      expect(getShapeResult('C')).toBe(3);
    });
    test('Should get a draw as round result', () => {
      expect(getRoundResult('A', 'X')).toBe(3);
      expect(getRoundResult('B', 'Y')).toBe(3);
      expect(getRoundResult('C', 'Z')).toBe(3);
    });
    test('Should get a win as round result', () => {
      expect(getRoundResult('A', 'Y')).toBe(6);
      expect(getRoundResult('B', 'Z')).toBe(6);
      expect(getRoundResult('C', 'X')).toBe(6);
    });
    test('Should get a loose as round result', () => {
      expect(getRoundResult('B', 'X')).toBe(0);
      expect(getRoundResult('C', 'Y')).toBe(0);
      expect(getRoundResult('A', 'Z')).toBe(0);
    });
    test('Should get expected round result', () => {
      expect(getRoundScore(['A', 'Y'])).toBe(8);
    });
    test('Should get expected round result', () => {
      expect(getTournamentScore(input, getRoundScore)).toBe(15);
    });
  });
  describe('Second part', () => {
    test('Should return expected round result', () => {
      expect(getRoundNewScore(['A', 'Y'])).toBe(4);
      expect(getRoundNewScore(['B', 'X'])).toBe(1);
      expect(getRoundNewScore(['C', 'Z'])).toBe(7);
    });
    test('Should get expected round result', () => {
      expect(getTournamentScore(input, getRoundNewScore)).toBe(12);
    });
  });
});
