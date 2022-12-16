import { Point } from './types';

export const parseInput = (input: string[]) => {
  return input.map((line) => line.split('').map((d) => +d));
};

const findLimits = (input: number[][]) => ({
  top: 0,
  bottom: input.length - 1,
  left: 0,
  right: input[0].length - 1,
});

const findAdjacents = (input: number[][], y: number, x: number): Point[] => {
  const limits = findLimits(input);
  const adjacents = [];

  if (y > limits.top) adjacents.push({ height: input[y - 1][x], y: y - 1, x });
  if (y < limits.bottom)
    adjacents.push({ height: input[y + 1][x], y: y + 1, x });
  if (x > limits.left) adjacents.push({ height: input[y][x - 1], y, x: x - 1 });
  if (x < limits.right)
    adjacents.push({ height: input[y][x + 1], y, x: x + 1 });

  return adjacents;
};

export const findLowPoints = (input: number[][]): Point[] => {
  return input.reduce((lowPoints: Point[], row, rowIndex) => {
    const lowPointsInRow = row
      .map((num, numIndex) => ({ height: num, x: numIndex, y: rowIndex }))
      .filter((num, numIndex) => {
        const adjacentsPoints = findAdjacents(input, rowIndex, numIndex);
        const adjacentHeights = Object.values(adjacentsPoints).map(
          (a) => a.height,
        );

        return (
          num.height === Math.min(num.height, ...adjacentHeights) &&
          !adjacentHeights.includes(num.height)
        );
      });

    lowPoints.push(...lowPointsInRow);
    return lowPoints;
  }, []);
};

export const getRiskLevel = (lowPoint: number): number => lowPoint + 1;

export const getRiskLevelTotal = (input: number[][]): number => {
  const lowPoints = findLowPoints(input);
  const riskLevels = lowPoints.map((p) => getRiskLevel(p.height));

  return riskLevels.reduce((total, r) => total + r, 0);
};

export const getBasinSize = (
  initialPoint: { height: number; x: number; y: number },
  input: number[][],
): number => {
  const basin: number[][] = input.map((row) =>
    row.map((num) => (num === 9 ? 1 : 0)),
  );

  const limits = findLimits(input);

  // Flood fill algorithm is used to determine area of contigous elements
  // https://www.freecodecamp.org/news/flood-fill-algorithm-explained/
  const findBasinArea = (x: number, y: number) => {
    if (basin[y][x] === 2 || basin[y][x] === 1) return;

    basin[y][x] = 2;

    if (y > limits.top) findBasinArea(x, y - 1);
    if (y < limits.bottom) findBasinArea(x, y + 1);
    if (x > limits.left) findBasinArea(x - 1, y);
    if (x < limits.right) findBasinArea(x + 1, y);
  };

  findBasinArea(initialPoint.x, initialPoint.y);
  return basin.flat().filter((p) => p === 2).length;
};

export const multiplyBasinSizes = (sizes: number[]) => {
  return sizes
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((total, s) => total * s);
};

export const findBasinSizesAndGetProduct = (input: number[][]) => {
  const lowPoints = findLowPoints(input);
  const basinSizes = lowPoints.map((initialPoint) =>
    getBasinSize(initialPoint, input),
  );

  return multiplyBasinSizes(basinSizes);
};
