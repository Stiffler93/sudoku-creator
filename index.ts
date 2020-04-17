import create from './logic/SudokuCreator';
import Utils from './utils/Utils';

const { printGrid } = Utils;
const NUM_TESTS = 1;

for (let test = 1; test <= NUM_TESTS; test++) {
  const grid = create();

  printGrid(grid);
}
