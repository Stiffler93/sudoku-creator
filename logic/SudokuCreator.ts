import config from '../config.json';
import GridUtils from '../utils/GridUtils';
import Utils from '../utils/Utils';

const { COLS, NUMBERS, SQUARE_LENGTH, GRID_LENGTH, SQUARE_ORDER } = config;
const {
  availableNumbers,
  unsetIndices,
  missingInSquare,
  indexToSquare,
  indicesForSquare,
  getValuesPerIndex,
  getIndicesToValues,
  valuesInRow,
  valuesInCol,
  indexToRow,
  indexToCol,
  horizontalIndices,
  verticalIndices,
  nonOrthogonalIndices,
} = GridUtils;
const { rand, printGrid, shuffle, orderByValues, getNextNotIn } = Utils;

function solveCollisions(values: number[], square: number, grid: number[]) {
  console.log({ 'Solve collisions for values': values });

  const indices = indicesForSquare(square);
  const freeIndices = unsetIndices(indices, grid);

  for (const index of freeIndices) {
    console.log(`For index ${index} check values:`);
    console.log(values);
    for (const value of values) {
      const rowValues = valuesInRow(indexToRow(index), grid);
      const colValues = valuesInCol(indexToCol(index), grid);

      console.log('Check value: ' + value);
      const valInRow = rowValues.includes(value);
      const valInCol = colValues.includes(value);

      let indexToChangeWith = -1;

      if (valInCol && valInRow) {
        // change diagonally
        console.log('Diagonal change not implemented yet');
      } else if (valInRow) {
        console.log('Change vertically');
        const otherIndices = verticalIndices(index);

        for (const otherIndex of otherIndices) {
          const isValueInOtherRow = valuesInRow(
            indexToRow(otherIndex),
            grid
          ).includes(value);

          if (isValueInOtherRow) continue;

          const otherValue = grid[otherIndex];
          const isOtherValueInRow = valuesInRow(
            indexToRow(index),
            grid
          ).includes(otherValue);

          if (isOtherValueInRow) continue;

          indexToChangeWith = otherIndex;
          break;
        }
      } else {
        console.log('Change horizontally');
        const otherIndices = horizontalIndices(index);

        for (const otherIndex of otherIndices) {
          const isValueInOtherCol = valuesInCol(
            indexToCol(otherIndex),
            grid
          ).includes(value);

          if (isValueInOtherCol) continue;

          const otherValue = grid[otherIndex];
          const isOtherValueInCol = valuesInCol(
            indexToCol(index),
            grid
          ).includes(otherValue);

          if (isOtherValueInCol) continue;

          indexToChangeWith = otherIndex;
          break;
        }
      }

      if (indexToChangeWith !== -1) {
        console.log(`Change index ${index} with ${indexToChangeWith}`);
        grid[index] = grid[indexToChangeWith];
        grid[indexToChangeWith] = value;
        values = values.filter((val) => val! + value);
        break;
      } else {
        console.log("Couldn't find an index to change values with!");
      }
    }
  }
}

function fillInSquare(square: number, grid: number[]) {
  console.log();
  console.log();
  console.log('Handle Square: ' + square);

  const indices = indicesForSquare(square);
  let indicesToBeFilled = [...indices];
  let valuesToFillIn = [...NUMBERS];
  let problematicValues = [];
  while (valuesToFillIn.length > 0) {
    const indicesToValues = getIndicesToValues(indicesToBeFilled, grid);
    const sortedIndices = orderByValues(valuesToFillIn, indicesToValues);
    // console.log(indicesToValues);
    // console.log(sortedIndices);
    const value = sortedIndices[0];
    const index = rand(indicesToValues[value]);
    // console.log(`Insert ${value} into ${index}`);
    if (index) {
      grid[index] = value;
    } else {
      problematicValues.push(value);
    }

    valuesToFillIn = valuesToFillIn.filter((val) => val !== value);
    indicesToBeFilled = indicesToBeFilled.filter((ind) => ind !== index);
  }

  if (problematicValues.length > 0) {
    solveCollisions(problematicValues, square, grid);
  }
}

function fillInSquareRandomly(square: number, grid: number[]) {
  const indices = indicesForSquare(square);
  const values = shuffle(NUMBERS);
  for (let i = 0; i < indices.length; i++) {
    const value = values[i];
    const index = indices[i];
    grid[index] = value;
  }
}

export default function create() {
  const grid = new Array(81).fill(0);

  for (let index = 0; index < SQUARE_ORDER.length; index++) {
    const square = SQUARE_ORDER[index];
    // if (index < SQUARE_LENGTH) fillInSquareRandomly(square, grid);
    // else
    fillInSquare(square, grid);
  }

  printGrid(grid);
}
