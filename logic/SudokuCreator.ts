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
const {
  rand,
  printGrid,
  shuffle,
  orderByValues,
  getIndexWithFewestAvailableValues,
} = Utils;

function solveCollisions(values: number[], square: number, grid: number[]) {
  const indices = indicesForSquare(square);
  const freeIndices = unsetIndices(indices, grid);

  for (const index of freeIndices) {
    for (const value of values) {
      const rowValues = valuesInRow(indexToRow(index), grid);
      const colValues = valuesInCol(indexToCol(index), grid);

      const valInRow = rowValues.includes(value);
      const valInCol = colValues.includes(value);

      let indexToChangeWith = -1;

      if (valInCol && valInRow) {
        const otherIndices = nonOrthogonalIndices(index);

        for (const otherIndex of otherIndices) {
          const isValueInOtherCol = valuesInCol(
            indexToCol(otherIndex),
            grid
          ).includes(value);

          const isValueInOtherRow = valuesInRow(
            indexToRow(otherIndex),
            grid
          ).includes(value);

          if (isValueInOtherCol || isValueInOtherRow) continue;

          const otherValue = grid[otherIndex];

          const isOtherValueInCol = valuesInCol(
            indexToCol(index),
            grid
          ).includes(otherValue);

          const isOtherValueInRow = valuesInRow(
            indexToRow(index),
            grid
          ).includes(otherValue);

          if (isOtherValueInRow || isOtherValueInCol) continue;

          indexToChangeWith = otherIndex;
          break;
        }
      } else if (valInRow) {
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
        grid[index] = grid[indexToChangeWith];
        grid[indexToChangeWith] = value;
        values = values.filter((val) => val! + value);
        break;
      } else {
        return false;
      }
    }
  }

  return true;
}

function fillInSquare(square: number, grid: number[]) {
  const indices = indicesForSquare(square);
  let indicesToBeFilled = [...indices];
  let valuesToFillIn = [...NUMBERS];
  let problematicValues = [];

  while (valuesToFillIn.length > 0) {
    const indicesToValues = getIndicesToValues(indicesToBeFilled, grid);
    const sortedValues = orderByValues(valuesToFillIn, indicesToValues);
    const valuesPerIndex = getValuesPerIndex(indicesToBeFilled, grid);
    const value = sortedValues[0];
    const index = getIndexWithFewestAvailableValues(
      indicesToValues[value],
      valuesPerIndex
    );

    if (index !== undefined) {
      grid[index] = value;
    } else {
      problematicValues.push(value);
    }

    valuesToFillIn = valuesToFillIn.filter((val) => val !== value);
    indicesToBeFilled = indicesToBeFilled.filter((ind) => ind !== index);
  }

  return problematicValues;
}

export default function create() {
  let grid;

  while (true) {
    grid = new Array(81).fill(0);

    let valid = true;
    for (let index = 0; index < SQUARE_ORDER.length; index++) {
      const square = SQUARE_ORDER[index];
      const problematicValues = fillInSquare(square, grid);

      if (problematicValues.length > 0) {
        const collisionSolved = solveCollisions(
          problematicValues,
          square,
          grid
        );
        if (!collisionSolved) {
          valid = false;
          break;
        }
      }
    }

    if (valid) break;
  }

  return grid;
}
