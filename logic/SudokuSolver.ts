import config from '../config.json';
import GridUtils from '../utils/GridUtils';
import validate from './SudokuValidator';

const { NUMBERS, GRID_LENGTH } = config;
const {
  indexToRow,
  indexToCol,
  indexToSquare,
  indicesForCol,
  indicesForRow,
  indicesForSquare,
} = GridUtils;

const MAX_ITERATIONS = GRID_LENGTH * GRID_LENGTH;

function fillInValue(
  value: number,
  index: number,
  grid: number[],
  possibleValuesForIndices: number[][]
) {
  grid[index] = value;
  const indicesToRemoveValueFrom = [
    ...new Set([
      ...indicesForCol(indexToCol(index)),
      ...indicesForRow(indexToRow(index)),
      ...indicesForSquare(indexToSquare(index)),
    ]),
  ];
  possibleValuesForIndices[index] = [];
  indicesToRemoveValueFrom.forEach(
    (index) =>
      (possibleValuesForIndices[index] = possibleValuesForIndices[index].filter(
        (val) => val != value
      ))
  );
}

export function solve(grid: number[]): number[] {
  const possibleValuesForIndices: number[][] = new Array(81).fill(NUMBERS);

  grid.forEach((value, index) => {
    if (value !== 0) {
      fillInValue(value, index, grid, possibleValuesForIndices);
    }
  });

  let solved = false;
  let iteration = 0;
  while (!solved && iteration < MAX_ITERATIONS) {
    possibleValuesForIndices.forEach((values, index) => {
      if (values.length === 1) {
        fillInValue(values[0], index, grid, possibleValuesForIndices);
      }
    });

    solved = grid.filter((value) => value === 0).length === 0;
    iteration++;
  }

  return grid;
}

export function isSolveable(grid: number[]): boolean {
  const solution = solve([...grid]);
  return validate(solution.join(''));
}
