import config from '../config.json';

const { NUMBERS, SQUARE_LENGTH, GRID_LENGTH } = config;
const GRID_SIZE = GRID_LENGTH * GRID_LENGTH;
const ROW_CACHE: number[][] = [];
const COL_CACHE: number[][] = [];
const SQUARE_CACHE: number[][] = [];

function indicesForCol(n: number): number[] {
  if (COL_CACHE[n]) return COL_CACHE[n];

  const indices = [];
  for (let index = n; index < GRID_SIZE; index += GRID_LENGTH) {
    indices.push(index);
  }

  COL_CACHE[n] = indices;
  return indices;
}

function indicesForRow(n: number): number[] {
  if (ROW_CACHE[n]) return ROW_CACHE[n];

  const indices = [];
  const start = n * GRID_LENGTH;
  for (let index = start; index < start + GRID_LENGTH; index++) {
    indices.push(index);
  }

  ROW_CACHE[n] = indices;
  return indices;
}

function indicesForSquare(n: number): number[] {
  if (SQUARE_CACHE[n]) return SQUARE_CACHE[n];

  const horizThird = n % SQUARE_LENGTH;
  const vertThird = Math.floor(n / SQUARE_LENGTH);

  const start =
    vertThird * (SQUARE_LENGTH * GRID_LENGTH) + horizThird * SQUARE_LENGTH;

  const indices = [];
  for (let i = 0; i < SQUARE_LENGTH; i++) {
    for (let j = 0; j < SQUARE_LENGTH; j++) {
      const index = start + j + i * GRID_LENGTH;
      indices.push(index);
    }
  }

  SQUARE_CACHE[n] = indices;
  return indices;
}

function indexToRow(index: number) {
  return Math.floor(index / GRID_LENGTH);
}

function indexToCol(index: number) {
  return index % GRID_LENGTH;
}

function indexToSquare(index: number) {
  const horizThird = Math.floor((index % 9) / 3);
  const vertThird = Math.floor(Math.floor(index / 9) / 3);
  return horizThird + 3 * vertThird;
}

function valuesInRow(row: number, grid: number[]): number[] {
  const indices = indicesForRow(row);
  return indices.map((index) => grid[index]);
}

function valuesInCol(col: number, grid: number[]): number[] {
  const indices = indicesForCol(col);
  return indices.map((index) => grid[index]);
}

function valuesInSquare(square: number, grid: number[]): number[] {
  const indices = indicesForSquare(square);
  return indices.map((index) => grid[index]);
}

function missingInSquare(square: number, grid: number[]): number[] {
  const values = valuesInSquare(square, grid);
  return NUMBERS.filter((num) => !values.includes(num));
}

function availableNumbers(index: number, grid: number[]): number[] {
  const usedNumbers = [
    ...valuesInRow(indexToRow(index), grid),
    ...valuesInCol(indexToCol(index), grid),
    ...valuesInSquare(indexToSquare(index), grid),
  ];

  return NUMBERS.filter((num) => !usedNumbers.includes(num));
}

function getValuesPerIndex(indices: number[], grid: number[]): number[][] {
  const values = [];
  for (const index of indices) {
    values[index] = availableNumbers(index, grid);
  }

  return values;
}

function getIndicesToValues(indices: number[], grid: number[]): number[][] {
  const valuesPerIndex = getValuesPerIndex(indices, grid);
  return valuesPerIndex.reduce(
    (object: number[][], values: number[], index: number) => {
      for (const value of values) {
        if (object[value]) object[value].push(index);
        else object[value] = [index];
      }
      return object;
    },
    []
  );
}

function unsetIndices(indices: number[], grid: number[]): number[] {
  return indices.filter((index) => grid[index] === 0);
}

function nonOrthogonalIndices(index: number): number[] {
  const remainder = index % GRID_LENGTH;
  const indices = indicesForSquare(indexToSquare(index));
  return indices.filter(
    (ind) => ind % GRID_LENGTH !== remainder && Math.abs(ind - index) > 2
  );
}

function horizontalIndices(index: number): number[] {
  const indices = indicesForSquare(indexToSquare(index));
  return indices.filter((ind) => Math.abs(ind - index) <= 2);
}

function verticalIndices(index: number): number[] {
  const remainder = index % GRID_LENGTH;
  const indices = indicesForSquare(indexToSquare(index));
  return indices.filter((ind) => ind % GRID_LENGTH === remainder);
}

export default {
  indicesForCol: indicesForCol,
  indicesForRow: indicesForRow,
  indicesForSquare: indicesForSquare,
  indexToRow: indexToRow,
  indexToCol: indexToCol,
  indexToSquare: indexToSquare,
  valuesInRow: valuesInRow,
  valuesInCol: valuesInCol,
  valuesInSquare: valuesInSquare,
  missingInSquare: missingInSquare,
  availableNumbers: availableNumbers,
  getValuesPerIndex: getValuesPerIndex,
  getIndicesToValues: getIndicesToValues,
  unsetIndices: unsetIndices,
  nonOrthogonalIndices: nonOrthogonalIndices,
  horizontalIndices: horizontalIndices,
  verticalIndices: verticalIndices,
};
