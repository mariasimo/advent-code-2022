import {
  Bit,
  BitOptions,
  Counter,
  Maybe,
  PowerConsumptionRatesCriteria,
  LifeSupportRatesCriteria,
  PowerConsumptionRate,
  LifeSupportRate,
} from './types';

const getMostCommonBit = (counter: Counter) =>
  counter[0] > counter[1] ? '0' : '1';

const getLessCommonBit = (counter: Counter) =>
  counter[1] < counter[0] ? '1' : '0';

export const binaryToDecimal = (binary: string): number => {
  return parseInt(binary, 2);
};

export const binaryToDecimalOldSchool = (binary: string): number => {
  const t = binary
    .split('')
    .reverse()
    .reduce((total, digit, index) => {
      if (+digit) {
        return total + 2 ** index;
      }

      return total;
    }, 0);

  return t;
};

export const createRow = (input: string[], position: number): Bit[] => {
  return input.map((item) => <Bit>item[position]);
};

export const countTypeOfBitsInRow = (row: Bit[]): Counter => {
  const initialCounter: Counter = { '0': 0, '1': 0 };

  return row.reduce((acc: Counter, cu) => {
    if (cu === BitOptions.zero) {
      acc[BitOptions.zero] += 1;
    }
    if (cu === BitOptions.one) {
      acc[BitOptions.one] += 1;
    }

    return acc;
  }, initialCounter);
};

const getPowerComsumptionRatesCriteria = (): PowerConsumptionRatesCriteria => {
  return {
    gamma: getMostCommonBit,
    epsilon: getLessCommonBit,
  };
};

export const calcPowerConsumptionRate = (
  input: string[],
  rate: PowerConsumptionRate,
): number => {
  const numberOfRows = [...Array(input[0].length).keys()];

  const binary = numberOfRows
    .map((position) => {
      const row = createRow(input, position);
      const counter = countTypeOfBitsInRow(row);
      const rateCalculation = getPowerComsumptionRatesCriteria();
      const calculateRate = rateCalculation[rate];

      return calculateRate(counter);
    })
    .join('');

  return binaryToDecimal(binary);
};

export const getPowerCompsumtion = (input: string[]): number => {
  const gammaRate = calcPowerConsumptionRate(input, 'gamma');
  const epsilonRate = calcPowerConsumptionRate(input, 'epsilon');

  return gammaRate * epsilonRate;
};

const getLifeSupportRatesCriteria = (): LifeSupportRatesCriteria => {
  return {
    oxigenGeneration: getMostCommonBit,
    CO2Scrubber: getLessCommonBit,
  };
};

export const calcLifeSupportRate = (
  input: string[],
  rate: LifeSupportRate,
): Maybe<number> => {
  const getResult = (
    filteredInput = input,
    numberOfRows = 0,
  ): number | string[] => {
    const row = createRow(filteredInput, numberOfRows);
    const counter = countTypeOfBitsInRow(row);
    const ratesCriteria = getLifeSupportRatesCriteria();
    const selectedBit = ratesCriteria[rate](counter);

    const result = filteredInput.filter(
      (el) => el[numberOfRows] === selectedBit,
    );

    if (result.length === 1) {
      const binary = result[0];
      return binaryToDecimal(binary);
    }
    return getResult(result, numberOfRows + 1);
  };

  const result = getResult(input, 0);

  if (typeof result === 'number') {
    return result;
  }
};

export const getLifeSupport = (input: string[]): number => {
  const oxigenGeneration = calcLifeSupportRate(input, 'oxigenGeneration') ?? 1;
  const CO2Scrubber = calcLifeSupportRate(input, 'CO2Scrubber') ?? 1;

  return oxigenGeneration * CO2Scrubber;
};
