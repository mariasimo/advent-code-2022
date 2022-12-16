import { AdjacencyList } from './types';

// DFS Graph Algorithms https://codeburst.io/implementing-dfs-and-bfs-using-javascript-5034f3cee9a1

export const parseInput = (input: string[]) => {
  return input.map((connection) => connection.split('-'));
};

export const createAdjacencyList = (input: string[][]): AdjacencyList => {
  const adjacencyList: AdjacencyList = {};

  input.forEach((path) =>
    path.forEach((cave) => {
      if (Object.keys(adjacencyList).includes(cave)) return;

      const adjacents = input
        .filter((path) => path.includes(cave))
        .map((path) => path.find((c) => c !== cave) ?? '');

      adjacencyList[cave] = adjacents;
    }),
  );

  return adjacencyList;
};

export const findPathsPart1 = (input: string[][]) => {
  const paths: string[][] = [];
  const adjacencyList = createAdjacencyList(input);

  function findPath(node: string, visited: string[], paths: string[][]) {
    visited.push(node);

    if (node === 'end') {
      paths.push(visited);
    }

    for (const adjacent of adjacencyList[node]) {
      if (adjacent !== adjacent.toLowerCase() || !visited.includes(adjacent)) {
        findPath(adjacent, [...visited], paths);
      }
    }
  }

  findPath('start', [], paths);

  return paths;
};

export const findPathsPart2 = (input: string[][]) => {
  const paths: string[][] = [];
  const adjacencyList = createAdjacencyList(input);

  const isExit = (cave: string) => cave === 'start' || cave === 'end';
  const isSmallCave = (cave: string) =>
    cave === cave.toLowerCase() && !isExit(cave);

  function findPath(
    node: string,
    visited: string[],
    smallCaveVisitedTwice: boolean,
    paths: string[][],
  ) {
    visited.push(node);

    if (node === 'end') {
      paths.push(visited);
      return;
    }

    for (const adjacent of adjacencyList[node]) {
      if (isExit(adjacent) && visited.includes(adjacent)) {
        continue;
      }

      if (isSmallCave(adjacent) && visited.includes(adjacent)) {
        if (smallCaveVisitedTwice) {
          continue;
        }

        if (visited.filter((c) => c === adjacent).length >= 2) {
          continue;
        }
        findPath(adjacent, [...visited], true, paths);
      } else {
        findPath(adjacent, [...visited], smallCaveVisitedTwice, paths);
      }
    }
  }

  findPath('start', [], false, paths);

  return paths;
};
