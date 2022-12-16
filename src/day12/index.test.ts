import { readInputAsArray } from '../utils';
import {
  createAdjacencyList,
  findPathsPart2,
  findPathsPart1,
  parseInput,
} from './logic';

const input = readInputAsArray({ dayNumber: 12, isExample: true });
const parsedInput = parseInput(input);

describe('Day12:Passage Pathing', () => {
  describe('Generic', () => {
    describe('Parse input', () => {
      test('Should return an array', () => {
        expect(parseInput(input)).toEqual(expect.any(Array));
      });
      test('Should return a 2d array', () => {
        expect(parseInput(input)[0]).toEqual(expect.any(Array));
      });
      test('Should return a 2d array fill with numbers', () => {
        expect(parseInput(input)[0][0]).toEqual(expect.any(String));
      });
    });
    describe('CreateAdjacencyList', () => {
      test('Should return an object with every node as property, and an array of its adjacent nodes as value', () => {
        expect(createAdjacencyList(parsedInput)).toHaveProperty('start');
      });
      test('Should return an object with every node as property, and an array of its adjacent nodes as value', () => {
        expect(createAdjacencyList(parsedInput)).toHaveProperty('end');
      });
      test('Should return an object with every node as property, and an array of its adjacent nodes as value', () => {
        expect(createAdjacencyList(parsedInput).end).toStrictEqual(['A', 'b']);
      });
    });
  });
  describe('Part 1', () => {
    describe('Find paths', () => {
      test('Should return all posible graph vertex combinations from start to end. Rules: can visit vertex called with lowercase letters only once', () => {
        expect(findPathsPart1(parsedInput).length).toBe(10);
      });
    });
  });
  describe('Part 1', () => {
    describe('Find paths', () => {
      test('Should return all posible graph vertex combinations from start to end: Rules: can visit 1 of the vertex called with lowercase letters twice, and the rest once', () => {
        expect(findPathsPart2(parsedInput).length).toBe(36);
      });
    });
  });
});
