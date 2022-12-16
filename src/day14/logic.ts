import { Inventory, Rule } from './types';

export const parseInput = (input: string[]) => {
  const template = input.splice(0, 1)[0];
  const rules = input
    .filter((r) => r)
    .map((r) => {
      const [pair, insertion] = r.split('->');
      return { pair: pair.trim(), insertion: insertion.trim() };
    });

  return { template, rules };
};

export const completeStep = (polymer: string, rules: Rule[]) => {
  const foundPairs: string[] = polymer
    .split('')
    .map((s, i) => (polymer[i + 1] ? s + polymer[i + 1] : s));

  const findRule = (pair: string) => rules.find((r) => r.pair === pair);

  const newPolymer = foundPairs
    .map((pair) => {
      const insertion = findRule(pair)?.insertion;

      if (insertion) {
        return pair[0] + insertion;
      }

      return pair;
    })
    .join('');

  return newPolymer;
};

export const growPolymer = (
  initialPolymer: string,
  rules: Rule[],
  steps: number,
) => {
  let counter = steps;
  let finalPolymer = initialPolymer;

  do {
    finalPolymer = completeStep(finalPolymer, rules);
    counter--;
  } while (counter > 0);

  return finalPolymer;
};

export const getPolymerElementsDifference = (
  initialPolymer: string,
  rules: Rule[],
  steps: number,
) => {
  const polymer = growPolymer(initialPolymer, rules, steps);

  const elementsCount = polymer
    .split('')
    .reduce((output: { [element: string]: number }, element) => {
      if (output[element]) {
        output[element] += 1;
      } else {
        output[element] = 1;
      }

      return output;
    }, {});

  const elementsCountValues = Object.values(elementsCount).sort(
    (a, b) => b - a,
  );

  return (
    elementsCountValues[0] - elementsCountValues[elementsCountValues.length - 1]
  );
};

export const countPolymerElements = (
  template: string,
  rules: Rule[],
  steps: number,
) => {
  let rest = '';

  const incrementMapKeyValue = (
    key: string,
    value: number,
    map: Map<string, number>,
  ) => map.set(key, (map.get(key) ?? 0) + value);

  const initialInventory: Inventory = new Map();
  template.split('').forEach((letter, index, self) => {
    const nextLetter = self[index + 1];

    const pair = nextLetter && letter + nextLetter;
    if (!nextLetter) {
      rest = letter;
    } else {
      incrementMapKeyValue(pair, 1, initialInventory);
    }
  });

  const trackInventory = (inventory: Inventory): Inventory => {
    const updated: Inventory = new Map();
    const findRule = (pair: string) => rules.find((r) => r.pair === pair);

    for (const [pair, count] of inventory) {
      const insertion = findRule(pair)?.insertion;
      const [n1, n2] = pair.split('');
      const pair1 = n1 + insertion;
      const pair2 = insertion + n2;

      incrementMapKeyValue(pair1, count, updated);
      incrementMapKeyValue(pair2, count, updated);
    }

    return updated;
  };

  const trackPairs = (step: number, inventory: Inventory): Inventory => {
    if (step === steps) return inventory;

    const updatedStep = step + 1;
    const updatedInventory = trackInventory(inventory);

    return trackPairs(updatedStep, updatedInventory);
  };

  const countInventory = (inventory: Inventory) => {
    const letterCount = new Map();
    inventory.forEach(function (count, pair) {
      incrementMapKeyValue(pair[0], count, letterCount);
    });

    incrementMapKeyValue(rest, rest.length, letterCount);

    return letterCount;
  };

  const inventory = trackPairs(0, initialInventory);
  const inventoryCount = countInventory(inventory);

  const elementsCountValues = [...inventoryCount]
    .map((item) => item[1])
    .sort((a, b) => b - a);

  return (
    elementsCountValues[0] - elementsCountValues[elementsCountValues.length - 1]
  );
};
