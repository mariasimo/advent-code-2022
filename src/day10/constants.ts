export const pairs: { [openChar: string]: string } = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
};

export const part1Scores: { [openChar: string]: number } = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};

export const part2Scores: { [openChar: string]: number } = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
};
