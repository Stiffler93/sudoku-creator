import { isSolveable } from './SudokuSolver';
import Utils from '../utils/Utils';

const { rand, printGrid } = Utils;

const MAX_ITERATIONS = 1000;

function removeValues(numToRemove: number, grid: number[]): number[] {
  const newGrid = [...grid];
  for (let i = 0; i < numToRemove; i++) {
    const indices = newGrid
      .map((value, index) => (value !== 0 ? index : -1))
      .filter((value) => value !== -1);
    const index = rand(indices);
    if (index) {
      newGrid[index] = 0;
    }
  }

  return newGrid;
}

function numValuesInGrid(grid: number[]): number {
  return grid.filter((value) => value !== 0).length;
}

export default function reduce(
  requestedValuesInGrid: number,
  grid: number[]
): number[] {
  let cachedGrid = [...grid];
  let iteration = 0;

  while (
    numValuesInGrid(cachedGrid) > requestedValuesInGrid &&
    iteration < MAX_ITERATIONS
  ) {
    const newGrid = removeValues(1, cachedGrid);
    iteration++;

    if (isSolveable(newGrid)) {
      cachedGrid = [...newGrid];
    }
  }

  return cachedGrid;
}
