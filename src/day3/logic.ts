const UPPERCASE_ASCII_DIFF = 38;
const LOWERCASE_ASCII_DIFF = 96;

export const getStringHalves = (str: string): [string, string] => {
  return [str.slice(0, str.length / 2), str.slice(str.length / 2)];
};

export const getMatchesBetweenTwoStrings = ([str1, str2]: [string, string]) => {
  const matches: string[] = [];
  for (let letter of str1) {
    if (str2.includes(letter) && !matches.includes(letter)) {
      matches.push(letter);
    }
  }
  return matches;
};

export const getLetterPriority = (str: string) => {
  const letter = str[0];

  if (letter.toUpperCase() === letter) {
    return letter.charCodeAt(0) - UPPERCASE_ASCII_DIFF;
  }

  return letter.charCodeAt(0) - LOWERCASE_ASCII_DIFF;
};

export const getMatchesBetweenStrings = ([str1, ...rest]: string[]) => {
  const matches: string[] = [];
  for (let letter of str1) {
    if (
      rest.every((str) => str.includes(letter)) &&
      !matches.includes(letter)
    ) {
      matches.push(letter);
    }
  }

  return matches;
};

export const getTotalPriorityValue = (input: string[]) => {
  return input.reduce((totalValue, rucksack) => {
    const compartiments = getStringHalves(rucksack);
    const matches = getMatchesBetweenStrings(compartiments);
    const commonItemsPriority = matches.reduce(
      (total, letter) => total + getLetterPriority(letter),
      0,
    );
    return totalValue + commonItemsPriority;
  }, 0);
};

export const createGroupsOfThreeString = (input: string[]) => {
  return input.reduce((result, string, index) => {
    const chunkIndex = Math.floor(index / 3);
    if (!result[chunkIndex]) {
      result[chunkIndex] = [];
    }

    result[chunkIndex].push(string);

    return result;
  }, [] as string[][]);
};

export const getTotalPriorityValueInChunks = (input: string[]) => {
  const groups = createGroupsOfThreeString(input);
  return groups.reduce((sum, group) => {
    const matches = getMatchesBetweenStrings(group);
    const commonItemsPriority = matches.reduce(
      (total, letter) => total + getLetterPriority(letter),
      0,
    );
    return sum + commonItemsPriority;
  }, 0);
};
