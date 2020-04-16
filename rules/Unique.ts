import GridUtils from '../utils/GridUtils';

function isNotInRow(num: number, index: number, grid: number[]): boolean {
  const row = GridUtils.valuesInRow(GridUtils.indexToRow(index), grid);
  return !row.includes(num);
}

function isNotInCol(num: number, index: number, grid: number[]): boolean {
  const col = GridUtils.valuesInCol(GridUtils.indexToCol(index), grid);
  return !col.includes(num);
}

function isNotInSquare(num: number, index: number, grid: number[]): boolean {
  const square = GridUtils.valuesInSquare(GridUtils.indexToSquare(index), grid);
  return !square.includes(num);
}
