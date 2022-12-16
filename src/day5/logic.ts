import { Line, Point, Diagram, TypeOfLine, TypeOfLineOptions } from './types';

const OVERLAP_FACTOR = 2;

export const parseToLines = (input: string[]): Line[] => {
  const basePoint: Point = [0, 0];
  const baseLine: Line = [basePoint, basePoint];

  const lines = input.map((item) => {
    return <Line>baseLine.map((_, index) => {
      const pointStrings = item.split('->')[index];
      const point = pointStrings.split(',').map((el) => +el);
      return point;
    });
  });

  return lines;
};

export const generateDiagram = (
  xLength: number = 10,
  yLength: number = 10,
): Diagram => {
  const grid = [...Array(xLength)].map(
    (_) => <null[]>[...Array(yLength).fill(null)],
  );
  return grid;
};

export const filterDiagonalLines = (lines: Line[]) => {
  return lines.filter(
    ([startPoint, endPoint]) =>
      startPoint[0] === endPoint[0] || startPoint[1] === endPoint[1],
  );
};

const incrementPoint = (diagram: Diagram, x: number, y: number) => {
  let currentValue = diagram[y][x];
  const newValue = (currentValue || 0) + 1;

  diagram[y][x] = newValue;

  return diagram;
};

export const findLargestValue = (lines: Line[], axis: 'x' | 'y') => {
  const axisIndexValues = { x: 0, y: 1 };
  const axisIndex = axisIndexValues[axis];

  const xAxisValues = lines.map(([startPoint, endPoint]) => [
    startPoint[axisIndex],
    endPoint[axisIndex],
  ]);

  const numbersList = xAxisValues.flat(2);

  return Math.max(...numbersList);
};

export const getTypeOfLine = (line: Line): TypeOfLine => {
  const [[startX, startY], [endX, endY]] = line;

  const isVertical = startX === endX && startY !== endY;
  const isDiagonal = startX !== endX && startY !== endY;

  if (isDiagonal) {
    return TypeOfLineOptions.diagonal;
  }

  if (isVertical) {
    return TypeOfLineOptions.vertical;
  }

  return TypeOfLineOptions.horizontal;
};

export const registerLinesInDiagram = (lines: Line[]) => {
  let largestNumOnXAxis = findLargestValue(lines, 'x');
  let largestNumOnYAxis = findLargestValue(lines, 'y');

  let diagram = generateDiagram(largestNumOnXAxis + 1, largestNumOnYAxis + 1);

  for (const line of lines) {
    let [[startX, startY], [endX, endY]] = line;

    const typeOfLine = getTypeOfLine(line);

    let x = startX;
    let y = startY;

    const isDistancePositive = (start: number, end: number) => end - start > 0;

    const theresDistance = (start: number, end: number, cuPos: number) =>
      isDistancePositive(start, end) ? end >= cuPos : end <= cuPos;

    if (typeOfLine === TypeOfLineOptions.diagonal) {
      do {
        incrementPoint(diagram, x, y);
        isDistancePositive(startX, endX) ? x++ : x--;
        isDistancePositive(startY, endY) ? y++ : y--;
      } while (
        theresDistance(startX, endX, x) ||
        theresDistance(startY, endY, y)
      );
    }

    if (typeOfLine === TypeOfLineOptions.horizontal) {
      do {
        incrementPoint(diagram, x, y);
        isDistancePositive(startX, endX) ? x++ : x--;
      } while (theresDistance(startX, endX, x));
    }

    if (typeOfLine === TypeOfLineOptions.vertical) {
      do {
        incrementPoint(diagram, x, y);
        isDistancePositive(startY, endY) ? y++ : y--;
      } while (theresDistance(startY, endY, y));
    }
  }

  return diagram;
};

export const countOverlappingLines = (diagram: Diagram) => {
  const filteredDiagram = diagram.flat().filter(Boolean);

  return filteredDiagram.reduce((total: number, cu) => {
    const pointValue = cu && cu >= OVERLAP_FACTOR ? 1 : 0;
    return total + pointValue;
  }, 0);
};
