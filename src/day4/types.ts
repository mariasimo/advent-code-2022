export type Maybe<T> = T | undefined;

type FixedLengthArray<TItem, TLength extends number> = [TItem, ...TItem[]] & {
  length: TLength;
};

export type Row = FixedLengthArray<number, 5>;
export type Board = FixedLengthArray<Row, 5>;
export type FilteredBoard = (Row | (number | null)[])[];
