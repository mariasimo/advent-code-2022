export const parseInput = (crabs: string) => {
  return crabs.split(',').map((item) => +item);
};

export const findCheapestFuelCost = (unalignedCrabs: number[]) => {
  const posiblePositions = Array(Math.max(...unalignedCrabs) + 1)
    .fill(0)
    .map((_, index) => index);

  const fuelCostOptions = posiblePositions.map((targetPosition) => {
    const fuel = unalignedCrabs
      .filter((i) => targetPosition !== i)
      .reduce((fuelCost, crabPosition) => {
        const difference =
          crabPosition > targetPosition
            ? crabPosition - targetPosition
            : targetPosition - crabPosition;
        return fuelCost + difference;
      }, 0);

    const option = {
      alignedTo: targetPosition,
      fuel,
    };

    return option;
  });

  const cheapestOption = fuelCostOptions.sort((a, b) => a.fuel - b.fuel)[0];
  return cheapestOption.fuel;
};

export const calculateDifference = (target: number, origin: number) => {
  const moves = Array(Math.abs(target - origin)).fill(0);
  return moves.reduce((acc, cu, index) => acc + index + 1, 0);
};

export const findCheapestIncreasingFuelCost = (unalignedCrabs: number[]) => {
  const posiblePositions = Array(Math.max(...unalignedCrabs) + 1)
    .fill(0)
    .map((_, index) => index);

  const fuelCostOptions = posiblePositions.map((targetPosition) => {
    const fuel = unalignedCrabs
      .filter((i) => targetPosition !== i)
      .reduce((fuelCost, crabPosition) => {
        const difference = calculateDifference(targetPosition, crabPosition);
        return fuelCost + difference;
      }, 0);

    const option = {
      alignedTo: targetPosition,
      fuel,
    };

    return option;
  });

  const cheapestOption = fuelCostOptions.sort((a, b) => a.fuel - b.fuel)[0];
  return cheapestOption.fuel;
};
