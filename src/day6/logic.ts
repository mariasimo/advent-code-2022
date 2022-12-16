export const parseInput = (input: string): number[] => {
  return input.split(',').map((item) => +item);
};

const LANTERNFISH_READY_TO_SPAWN = 0;
const NEW_LANTERNFISH = 8;
const RESET_LANTERNFISH = 6;
const CYCLE = 9;

export const countLanternfish = (
  lanternfish: number[],
  filterFunction: (lanternfish: number) => boolean,
) => {
  return lanternfish.filter(filterFunction);
};

export const trackGrowthInADay = (lanternfishADay: number[]): number[] => {
  let lanternfish = lanternfishADay;

  const numberOfLanternfishReadyToSpawn = countLanternfish(
    lanternfishADay,
    (lanternfish) => lanternfish === LANTERNFISH_READY_TO_SPAWN,
  );

  const transformLanternfish = lanternfish.map((l) => {
    return l === 0 ? RESET_LANTERNFISH : l - 1;
  });

  const newLanternfish = numberOfLanternfishReadyToSpawn.map(
    (_) => NEW_LANTERNFISH,
  );
  return [...transformLanternfish, ...newLanternfish];
};

export const trackGrowthInAPeriod = (
  periodInDays: number,
  initialState: number[],
): number[][] => {
  let lanterfish = [initialState];
  let counter = 0;

  while (periodInDays > counter) {
    const lanterfishToday = trackGrowthInADay(lanterfish[counter]);
    lanterfish.push(lanterfishToday);
    counter++;
  }

  return lanterfish;
};

export const getLanternshipGrowthRate = (lanternfish: number[][]): number => {
  return lanternfish[lanternfish.length - 1].length;
};

export const trackGrowthInAPeriodEfficient = (
  periodInDays: number,
  initialState: number[],
): number => {
  let currentDay = 0;
  const cycle = Array(CYCLE).fill(0);

  const fishesInCycle = cycle.map((_, index) => {
    return initialState.filter((el) => el === index).length;
  });

  while (periodInDays > currentDay) {
    const currentFish = fishesInCycle.shift();

    if (typeof currentFish === 'number') {
      if (currentFish > 0) {
        fishesInCycle[RESET_LANTERNFISH] += currentFish;
      }
      fishesInCycle.push(currentFish);
    }

    currentDay++;
  }

  return fishesInCycle.reduce((acc, cu) => acc + cu);
};
