import { readInputAsArray } from '../utils';
import {
  parseInput,
  crossOutNumber,
  isRowComplete,
  isColumnComplete,
  playBingo,
  getBingoScore,
} from './logic';

const inputExample: string[] = readInputAsArray({
  dayNumber: 4,
  isExample: true,
});

const outputExample = parseInput(inputExample);
const { randomNumbers, boards } = outputExample;
const winnerGameResult = playBingo(boards, randomNumbers, 'winner');
const loserGameResult = playBingo(boards, randomNumbers, 'loser');

const board = boards[0];

const filteredBoard = [
  [22, 13, 17, 11, 0],
  [8, 2, 23, 4, 24],
  [21, 9, 14, 16, 7],
  [6, 10, 3, 18, 5],
  [null, 12, 20, 15, 19],
];
const boardWithRowComplete = [
  [22, 13, 17, 11, 0],
  [8, 2, 23, 4, 24],
  [21, 9, 14, 16, 7],
  [6, 10, 3, 18, 5],
  [null, null, null, null, null],
];
const boardWithColumnComplete = [
  [null, 13, 17, 11, 0],
  [null, 2, 23, 4, 24],
  [null, 9, 14, 16, 7],
  [null, 10, 3, 18, 5],
  [null, 12, 20, 15, 19],
];
const winnerBoard = [
  [null, null, null, null, null],
  [10, 16, 15, null, 19],
  [18, 8, null, 26, 20],
  [22, null, 13, 6, null],
  [null, null, 12, 3, null],
];
const loserBoard = [
  [3, 15, null, null, 22],
  [null, 18, null, null, null],
  [19, 8, null, 25, null],
  [20, null, null, null, null],
  [null, null, null, 12, 6],
];

describe('Day:Giant Squid', () => {
  describe('Generic', () => {
    describe('Parse input', () => {
      test('Should return an object with "randomNumbers" property in it', () => {
        expect(outputExample).toHaveProperty('randomNumbers');
      });
      test('Should return an object with "boards" property in it', () => {
        expect(outputExample).toHaveProperty('boards');
      });
      test('Should return boards with a length 5 ', () => {
        expect(outputExample.boards[0]).toHaveLength(5);
      });
      test('Should return boards with rows of length 5 ', () => {
        expect(outputExample.boards[0][0]).toHaveLength(5);
      });
      test('Should return object with correct structure ', () => {
        expect(outputExample).toEqual({
          randomNumbers: expect.anything(),
          boards: expect.anything(),
        });
      });
    });
  });

  describe('Is Row Complete', () => {
    test('Should detect when a board has a entire row crossed out', () => {
      expect(isRowComplete(board)).toEqual(false);
    });
    test('Should detect when a board has a entire row crossed out', () => {
      expect(isRowComplete(boardWithRowComplete)).toEqual(true);
    });
  });
  describe('Is Column Complete', () => {
    test('Should detect when a board has a entire column crossed out', () => {
      expect(isColumnComplete(board)).toEqual(false);
    });
    test('Should detect when a board has a entire column crossed out', () => {
      expect(isColumnComplete(boardWithColumnComplete)).toEqual(true);
    });
  });
  describe('Cross out numbers', () => {
    test('Should remove picked number of board', () => {
      expect(crossOutNumber(board, 1)).toEqual(filteredBoard);
    });
  });
  describe('Get final score', () => {
    test('Should return correct final score', () => {
      expect(
        getBingoScore(
          winnerGameResult?.lastNumberPlayed ?? 1,
          winnerGameResult?.board ?? [],
        ),
      ).toStrictEqual(4512);
    });
    test('Should return correct final score', () => {
      expect(
        getBingoScore(
          loserGameResult?.lastNumberPlayed ?? 1,
          loserGameResult?.board ?? [],
        ),
      ).toStrictEqual(1924);
    });
  });
  describe('Part 1', () => {
    describe('Win bingo', () => {
      test('Should return an object with "lastNumberPlayed" property in it', () => {
        expect(winnerGameResult).toHaveProperty('lastNumberPlayed');
      });
      test('Should return an object with "board" property in it', () => {
        expect(winnerGameResult).toHaveProperty('board');
      });
      test('Should return correct winner board', () => {
        expect(winnerGameResult?.board).toStrictEqual(winnerBoard);
      });
    });
  });
  describe('Part 2', () => {
    describe('Lose bingo', () => {
      test('Should return correct loser board', () => {
        expect(loserGameResult?.board).toStrictEqual(loserBoard);
      });
    });
  });
});
