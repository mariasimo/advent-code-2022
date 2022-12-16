export type Maybe<T> = T | undefined;

export enum BitOptions {
  zero = '0',
  one = '1',
}

export type Bit = `${BitOptions}`;
export type Counter = { '0': number; '1': number };
export type CalculationMethod = (counter: Counter) => Bit;

export enum PowerConsumptionRateOptions {
  gamma = 'gamma',
  epsilon = 'epsilon',
}
export type PowerConsumptionRate = keyof typeof PowerConsumptionRateOptions;
export type PowerConsumptionRatesCriteria = {
  [K in PowerConsumptionRate]: CalculationMethod;
};

export enum LifeSupportRateOptions {
  oxigenGeneration = 'oxigenGeneration',
  CO2Scrubber = 'CO2Scrubber',
}

export type LifeSupportRate = keyof typeof LifeSupportRateOptions;
export type LifeSupportRatesCriteria = {
  [K in LifeSupportRate]: CalculationMethod;
};
