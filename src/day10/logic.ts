import { pairs, part1Scores, part2Scores } from './constants';
import { notEmpty } from './types';

export const parseInput = (input: string[]) => {
  return input.map((line) => line.split(''));
};

const isClosingChar = (char: string) => Object.values(pairs).includes(char);

const isPair = (openChar: string, closeChar: string) =>
  pairs[openChar] === closeChar;

export const filterInmediatePairs = (line: string[]) => {
  const removePairs: string[] = [];

  line.forEach((char) => {
    if (
      isClosingChar(char) &&
      isPair(removePairs[removePairs.length - 1], char)
    ) {
      removePairs.pop();
    } else {
      removePairs.push(char);
    }
  });

  return removePairs;
};

export const getIncorrectChar = (line: string[]) => {
  const filteredLine = filterInmediatePairs(line);

  const incorrectChar = filteredLine.find((char) =>
    Object.values(pairs).includes(char),
  );

  return incorrectChar;
};

export const calculateIncorrectCharsScore = (lines: string[][]) => {
  const incorrectChars = lines
    .map((line) => getIncorrectChar(line))
    .filter(Boolean);

  const score = incorrectChars.reduce(
    (total, char) => total + part1Scores[char as string],
    0,
  );
  return score;
};

export const findCompletionString = (line: string[]) => {
  const filteredLine = filterInmediatePairs(line);

  const isCorruptedLine = filteredLine.some((char) =>
    Object.values(pairs).includes(char),
  );

  if (isCorruptedLine) return; // the input was invalid, return

  return filteredLine
    .map((i: string) => pairs[i])
    .reverse()
    .join('');
};

export const scoreCompletionString = (s: string) => {
  return s.split('').reduce((total, char) => total * 5 + part2Scores[char], 0);
};

export const calculateCompletionStringsScore = (lines: string[][]): number => {
  const completionStrings = lines
    .map((line) => findCompletionString(line))
    .filter(notEmpty);

  const scores: number[] = completionStrings
    .map((s) => scoreCompletionString(s))
    .sort((a, b) => b - a);

  const middleIndex = Math.floor(scores.length / 2);

  return scores[middleIndex];
};
