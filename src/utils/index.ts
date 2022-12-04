import chalk from 'chalk';
import { readFileSync } from 'fs';

type ReadInputProps = {
  dayNumber: string | number;
  isExample?: boolean;
};

export const readInput = ({ dayNumber, isExample }: ReadInputProps): string => {
  const path = isExample
    ? `./src/day${dayNumber}/input-example`
    : `./src/day${dayNumber}/input`;

  const input = readFileSync(path, 'utf8');
  return input;
};

export const readInputAsArray = ({
  dayNumber,
  isExample,
}: ReadInputProps): string[] => {
  const input = readInput({ dayNumber, isExample });
  return input.split('\n');
};

export const convertToNumber = (string: string): number => {
  return +string;
};

export const logResults = (day: number, results: number[]): void => {
  const title = chalk.bold.hex('#ffc413');
  const text = chalk.hex('#ffc413');
  const numberOfStars = results.map((el) => el).length;
  const stars = [...Array(numberOfStars).keys()].map((_) => '⭐️').join('');

  console.log(title(`\n${stars} DAY ${day}:`));
  results.forEach((result, index) => {
    console.log(text(`   Part ${index + 1} Solution: ${result}`));
  });
};
