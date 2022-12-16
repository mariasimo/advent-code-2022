type OpponentPlays = 'A' | 'B' | 'C';
type OwnPlays = 'X' | 'Y' | 'Z';
export type Round = [OpponentPlays, OwnPlays];

const scoresRound = { isLoose: 0, isDraw: 3, isWin: 6 };
const shapes = { rock: 1, paper: 2, scissors: 3 };
const ownNewValues = { loose: 'X', draw: 'Y', win: 'Z' };

const plays = [
  ['A', 'X'],
  ['B', 'Y'],
  ['C', 'Z'],
];

const wins = [
  [shapes.rock, shapes.paper],
  [shapes.paper, shapes.scissors],
  [shapes.scissors, shapes.rock],
];

const loose = [
  [shapes.rock, shapes.scissors],
  [shapes.paper, shapes.rock],
  [shapes.scissors, shapes.paper],
];

export const getShapeResult = (shape: string) => {
  return plays.findIndex((el) => el.includes(shape)) + 1;
};

export const getRoundResult = (opponent: OpponentPlays, own: OwnPlays) => {
  const ownPlay = getShapeResult(own);
  const opponentPlay = getShapeResult(opponent);
  if (ownPlay === opponentPlay) return scoresRound.isDraw;

  if (wins.find((round) => round[0] === opponentPlay && round[1] === ownPlay)) {
    return scoresRound.isWin;
  }

  return scoresRound.isLoose;
};

export const getRoundScore = ([opponent, own]: Round) => {
  return getShapeResult(own) + getRoundResult(opponent, own);
};

export const getTournamentScore = (
  matchs: Round[],
  mapper: (round: Round) => number,
) => {
  return matchs.reduce((acc, cu) => acc + mapper(cu), 0);
};

// part 2
export const getRoundNewScore = ([opponent, own]: Round) => {
  const opponentPlay = getShapeResult(opponent);
  let play = 0;

  if (own === ownNewValues.loose) {
    const loosePlay = loose.find((round) => round[0] === opponentPlay);
    play = loosePlay?.[1] ?? 0;
    return play;
  }

  if (own === ownNewValues.draw) {
    play += scoresRound.isDraw + getShapeResult(opponent);
    return play;
  }

  if (own === ownNewValues.win) {
    const winPlay = wins.find((round) => round[0] === opponentPlay);
    play += scoresRound.isWin;
    play += winPlay?.[1] ?? 0;

    return play;
  }
  return play;
};
