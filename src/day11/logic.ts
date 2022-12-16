export const parseInput = (input: string[]): number[][] => {
  return input.map((row) => row.split('').map((num) => +num));
};

export const simulateStep = (
  octopus: (string | number)[][],
  flashes: number,
): {
  incrementedFlashes: number;
  incrementedOctopus: (number | string)[][];
} => {
  // increase energy level
  let incrementedOctopus: (number | string)[][] = [...octopus].map((row) =>
    row.map((o) => (typeof o === 'number' ? o + 1 : o)),
  );

  // any octopus with energy level > 9, flashes (we count flashes++)
  incrementedOctopus.forEach((row, y) =>
    row.map((o, x) => {
      if (o > 9) {
        octopusFlash(x, y);
      }
    }),
  );

  // reset every marked octopus to 0
  incrementedOctopus = incrementedOctopus.map((row) =>
    row.map((o) => (o === '*' ? 0 : o)),
  );

  // return number of flashes
  return { incrementedFlashes: flashes, incrementedOctopus };

  function octopusFlash(x: number, y: number) {
    if (incrementedOctopus[y][x] === '*') return;

    flashes++;

    // we mark this octupus as it has flashed
    incrementedOctopus[y][x] = '*';

    // every adjacent octopus increase its energy by one
    incrementAdjacents(x, y);

    // if any octopus energy exceeds 9, flashes and reset to 0 (we use recursivity)
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (isInBounds(x + dx, y + dy)) {
          if (incrementedOctopus[y + dy][x + dx] > 9) {
            octopusFlash(x + dx, y + dy);
          }
        }
      }
    }
  }

  function incrementAdjacents(x: number, y: number) {
    const isCenter = (dx: number, dy: number) => dx === 0 && dy === 0;

    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (!isCenter(dx, dy) && isInBounds(x + dx, y + dy)) {
          // type guard
          if (typeof incrementedOctopus[y + dy][x + dx] === 'number') {
            (incrementedOctopus[y + dy][x + dx] as number) += 1;
          }
        }
      }
    }
  }

  function isInBounds(x: number, y: number) {
    return (
      y >= 0 &&
      y < incrementedOctopus.length &&
      x >= 0 &&
      x < incrementedOctopus[0].length
    );
  }
};

export const simulateMultipleSteps = (
  octopus: (number | string)[][],
  steps: number,
): number => {
  let flashes = 0;
  let count = 0;
  let octopusCopy = [...octopus];

  while (count < steps) {
    const { incrementedFlashes, incrementedOctopus } = simulateStep(
      octopusCopy,
      flashes,
    );

    octopusCopy = incrementedOctopus;
    flashes = incrementedFlashes;
    count++;
  }

  return flashes;
};

export const getSyncStep = (octopus: (number | string)[][]): number => {
  let flashes = 0;
  let count = 0;
  let octopusCopy = [...octopus];

  do {
    const { incrementedOctopus } = simulateStep(octopusCopy, flashes);
    octopusCopy = incrementedOctopus;

    count++;
  } while (octopusCopy.flat().find((o) => o !== 0));

  return count;
};
