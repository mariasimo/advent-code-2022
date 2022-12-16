export type Point = [number, number];
export type Line = [Point, Point];
export type Diagram = (number | null)[][];

export enum TypeOfLineOptions {
  horizontal = 'horizontal',
  vertical = 'vertical',
  diagonal = 'diagonal',
}

export type TypeOfLine = keyof typeof TypeOfLineOptions;
