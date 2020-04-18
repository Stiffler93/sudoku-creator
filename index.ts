import create from './logic/SudokuCreator';
import GridUtils from './utils/GridUtils';
import validate from './logic/SudokuValidator';
import { solve, isSolveable } from './logic/SudokuSolver';
import reduce from './logic/SudokuReducer';
import config from './config.json';
import { v1 as uuidv1 } from 'uuid';

import fs from 'fs';

const { CREATION_SETTINGS, GRID_LENGTH } = config;

function createSudoku(numValuesInGrid: number) {
  const sudoku = create();

  const sudokuString = sudoku.join('');
  if (!validate(sudokuString)) {
    throw Error('Error creating Sudoku. Sudoku is not valid.');
  }

  let reducedSudoku;

  while (true) {
    reducedSudoku = reduce(numValuesInGrid, sudoku);

    if (
      reducedSudoku.filter((value) => value !== 0).length === numValuesInGrid
    ) {
      break;
    } else {
      //   console.log('Sudoku was not reduced enough -> recreate');
    }
  }

  if (!isSolveable(reducedSudoku)) {
    throw Error('Error creating Sudoku. Reduced Sudoku is not solveable.');
  }

  const reducedSudokuString = reducedSudoku.join('');

  return {
    'id': uuidv1(),
    'sudoku': reducedSudokuString,
    'solution': sudokuString,
    'hints': numValuesInGrid,
  };
}

function createSudokus({
  lowerLimit,
  upperLimit,
  numCreations,
}: {
  lowerLimit: number;
  upperLimit: number;
  numCreations: number;
}) {
  const RANGE = upperLimit - lowerLimit + 1;

  const numSudokusPerValueInGrid = Math.floor(numCreations / RANGE);
  const numSudokusForLowerLimit =
    numCreations - numSudokusPerValueInGrid * (RANGE - 1);

  const sudokus = [];
  for (
    let numValuesInGrid = upperLimit;
    numValuesInGrid >= lowerLimit;
    numValuesInGrid--
  ) {
    const numSudokus =
      numValuesInGrid === lowerLimit
        ? numSudokusForLowerLimit
        : numSudokusPerValueInGrid;

    console.log(
      `Create ${numSudokus} Sudokus with ${numValuesInGrid} Values per Grid:`
    );

    for (let j = 1; j <= numSudokus; j++) {
      sudokus.push(createSudoku(numValuesInGrid));
      console.log(`Created Sudoku ${j}`);
    }
  }

  return sudokus;
}

const beginnerSudokus = createSudokus(CREATION_SETTINGS.Beginner);

// fs.writeFileSync(
//   'beginnerSudokus.json',
//   JSON.stringify({ 'sudokus': beginnerSudokus }, null, 2)
// );

const advancedSudokus = createSudokus(CREATION_SETTINGS.Advanced);

// fs.writeFileSync(
//   'advancedSudokus.json',
//   JSON.stringify({ 'sudokus': advancedSudokus }, null, 2)
// );

const profiSudokus = createSudokus(CREATION_SETTINGS.Profi);

fs.writeFileSync(
  'sudokus.json',
  JSON.stringify(
    {
      'Games': {
        'Beginner': beginnerSudokus,
        'Advaned': advancedSudokus,
        'Professional': profiSudokus,
      },
    },
    null,
    2
  )
);

// const maniacSudokus = createSudokus(CREATION_SETTINGS.Maniac);

// fs.writeFileSync(
//   'maniacSudokus.json',
//   JSON.stringify({ 'sudokus': maniacSudokus }, null, 2)
// );
