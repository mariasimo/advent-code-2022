import { Entry } from './types';

const DIGITS_BY_SEGMENTS_NUMBER = {
  '0': 6,
  '1': 2,
  '2': 5,
  '3': 5,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 3,
  '8': 7,
  '9': 6,
};
const digitLengths = Object.values(DIGITS_BY_SEGMENTS_NUMBER);

const uniqueDigitLengths = digitLengths.filter(
  (x) => digitLengths.filter((y) => y === x).length === 1,
);

export const parseInput = (input: string[]): Entry[] => {
  return input.map((lines) => {
    const [signalPatterns, outputValue] = lines
      .split(' | ')
      .map((line) => line.split(' ').map((w) => [...w].sort().join('')));

    return { signalPatterns, outputValue };
  });
};

export const countUniqueLengthDigits = (outputValueList: string[]) => {
  return outputValueList.reduce((total, outputValue) => {
    uniqueDigitLengths.includes(outputValue.length) ? total++ : total;
    return total;
  }, 0);
};

export const decodeSignalPatterns = (signalPatterns: string[]) => {
  const fiveSegmentsDigits = signalPatterns.filter((s) => s.length === 5); // 2 3 6
  const sixSegmentsDigits = signalPatterns.filter((s) => s.length === 6); // 0 6 9

  const digits: { [key: number]: string | undefined } = {
    4: signalPatterns.find((s) => s.length === DIGITS_BY_SEGMENTS_NUMBER[4]),
    7: signalPatterns.find((s) => s.length === DIGITS_BY_SEGMENTS_NUMBER[7]),
    8: signalPatterns.find((s) => s.length === DIGITS_BY_SEGMENTS_NUMBER[8]),
    1: signalPatterns.find((s) => s.length === DIGITS_BY_SEGMENTS_NUMBER[1]),
  };

  digits[6] = sixSegmentsDigits.find(
    (s) => ![...(digits[1] ?? '')].every((l) => s.includes(l)),
  );
  digits[9] = sixSegmentsDigits.find((s) =>
    [...(digits[4] ?? '')].every((l) => s.includes(l)),
  );
  digits[0] = sixSegmentsDigits.find((s) => s !== digits[9] && s !== digits[6]);
  digits[3] = fiveSegmentsDigits.find((s) =>
    [...(digits[1] ?? '')].every((d) => s.includes(d)),
  );
  digits[5] = fiveSegmentsDigits.find(
    (s) =>
      s !== digits[3] &&
      [...s].every((l) => [...(digits[9] ?? '')].includes(l)),
  );

  digits[2] = fiveSegmentsDigits.find(
    (s) => s !== digits[3] && s !== digits[5],
  );

  return digits;
};

export const decodeOutputValue = (
  outputValue: string[],
  digits: { [digit: number]: string | undefined },
) => {
  return +outputValue.map((o) => +Object.values(digits).indexOf(o)).join('');
};

export const decodeEntriesAndSumOutputValues = (entries: Entry[]) => {
  const outputArr = entries.map(({ signalPatterns, outputValue }) => {
    const digits = decodeSignalPatterns(signalPatterns);
    const output = decodeOutputValue(outputValue, digits);

    return output;
  });

  return outputArr.reduce((acc, cu) => acc + cu);
};
