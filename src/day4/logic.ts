import { Board, FilteredBoard, Row } from './types';
import { Maybe } from './types';

const BOARD_LENGTH = 5;

const filterAndConvertInArray = (
  input: string,
  splitCharacter: string,
  filterFunction: (digit: string) => void,
) =>
  input
    .split(splitCharacter)
    .filter(filterFunction)
    .map((digit) => +digit);

export const parseInput = (
  input: string[],
): { randomNumbers: number[]; boards: Board[] } => {
  const [randomDigits, ...boardDigits] = input.filter(Boolean);
  const randomNumbers = filterAndConvertInArray(
    randomDigits,
    ',',
    (digit) => digit && digit !== ',',
  );

  let board: Board | [];
  const boards = boardDigits.reduce((boards: Board[], cu: string, index) => {
    if (index % BOARD_LENGTH === 0) {
      board = [];
    }
    const row = filterAndConvertInArray(cu, ' ', Boolean);

    if (row?.length === BOARD_LENGTH) {
      (board as Board).push(row as Row);
    }
    if (board?.length === BOARD_LENGTH) {
      boards.push(board);
    }
    return boards;
  }, []);

  return { randomNumbers, boards };
};

export const crossOutNumber = (
  board: Board | FilteredBoard,
  number: number,
): FilteredBoard => {
  return board.map((row) => row.map((item) => (item === number ? null : item)));
};

export const isRowComplete = (board: FilteredBoard): boolean => {
  const remainingRows = board.filter((row) => row.find((el) => el)).length;
  return remainingRows < BOARD_LENGTH;
};

export const isColumnComplete = (board: FilteredBoard): boolean => {
  const iterateColumns = [...Array(5).keys()];
  const invertedBoard = iterateColumns.map((columnNum) =>
    board.map((row) => row[columnNum]),
  );

  return isRowComplete(invertedBoard);
};

export const playBingo = (
  boards: (Board | FilteredBoard)[],
  randomNumbers: number[],
  winnerOrLoser: 'winner' | 'loser',
): Maybe<{
  lastNumberPlayed: number;
  board: FilteredBoard;
}> => {
  const currentNumber = randomNumbers[0];

  let filteredBoards = boards.map((board) => {
    return crossOutNumber(board, currentNumber);
  });

  const winnerBoard = filteredBoards.find(
    (board) => isRowComplete(board) || isColumnComplete(board),
  );

  if (winnerBoard) {
    if (winnerOrLoser === 'winner') {
      return {
        lastNumberPlayed: currentNumber,
        board: winnerBoard,
      };
    }
    if (winnerOrLoser === 'loser') {
      const loserBoardIsFound = filteredBoards.length === 1;

      if (loserBoardIsFound) {
        return {
          lastNumberPlayed: currentNumber,
          board: filteredBoards[0],
        };
      }
    }
  }

  return playNextNumber(filteredBoards, randomNumbers, winnerOrLoser);
};

export const getBingoScore = (
  lastNumberPlayed: number,
  board: FilteredBoard,
): number => {
  const boardScore: number = board
    .flat()
    .reduce((total: number, item) => (item ? total + item : total), 0);

  return boardScore * lastNumberPlayed;
};

function playNextNumber(
  filteredBoards: FilteredBoard[],
  randomNumbers: number[],
  winnerOrLoser: 'winner' | 'loser',
) {
  const remainingNumbers = randomNumbers.slice(1);
  const remainingBoards = filteredBoards.filter(
    (board) => !isRowComplete(board) && !isColumnComplete(board),
  );

  if (remainingNumbers.length) {
    return playBingo(remainingBoards, remainingNumbers, winnerOrLoser);
  }
}
