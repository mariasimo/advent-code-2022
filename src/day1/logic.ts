export const groupCaloriesByElf = (arr: number[]) => {
  let elfNumber = 1;
  return arr.reduce((acc, cu) => {
    const elf = `elf ${elfNumber}`;
    if (acc[elf] === undefined) acc[elf] = 0;

    acc[elf] += cu;

    if (cu === 0) {
      elfNumber = elfNumber + 1;
    }

    return acc;
  }, {} as Record<string, number>);
};

export const findHigherGroupOfCalories = (arr: number[]) => {
  const groups = groupCaloriesByElf(arr);

  return Math.max(...Object.values(groups));
};

export const sumTopThreeHigherGroupsOfCalories = (arr: number[]) => {
  const groups = groupCaloriesByElf(arr);

  console.log(
    Object.values(groups)
      .sort((a, b) => b - a)
      .slice(0, 3),
  );
  return Object.values(groups)
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((acc, cu) => acc + cu, 0);
};
