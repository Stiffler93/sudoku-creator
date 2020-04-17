import config from '../config.json';

const { SQUARE_LENGTH, GRID_LENGTH } = config;

function shuffle(array: any[]) {
  return array.sort(() => Math.random() - 0.5);
}

function rand(arr: number[]): number | undefined {
  if (!arr) return undefined;

  const i = Math.floor(Math.random() * arr.length);
  return arr[i];
}

function printGrid(grid: number[]): void {
  console.log();

  for (let i = 0; i < GRID_LENGTH; i++) {
    let str = '';
    for (let j = 0; j < GRID_LENGTH; j++) {
      const index = i * GRID_LENGTH + j;
      str = str + grid[index] + '';
      if (j % SQUARE_LENGTH === SQUARE_LENGTH - 1) {
        str = str + ' ';
      }
    }
    console.log(str);
    if (i % SQUARE_LENGTH === SQUARE_LENGTH - 1) {
      console.log();
    }
  }
}

function orderByValues(indices: number[], values: number[][]): number[] {
  return indices.sort(
    (index1, index2) =>
      (values[index1]?.length || 0) - (values[index2]?.length || 0)
  );
}

function getNextNotIn(array1: number[], array2: number[]): number | undefined {
  const notIn = array1.filter((el) => !array2.includes(el));
  return notIn[0];
}

function getIndexWithFewestAvailableValues(
  indices: number[],
  indicesWithValues: number[][]
): number | undefined {
  if (!indices || indices.length === 0) {
    return undefined;
  }

  const minAvailableNumbers = indices.reduce((value, index) => {
    const numValuesForIndex = indicesWithValues[index].length;
    return value < numValuesForIndex ? value : numValuesForIndex;
  }, 100000);

  const indicesToChoseFrom = indices.filter(
    (index) => indicesWithValues[index].length === minAvailableNumbers
  );

  return rand(indicesToChoseFrom);
}

export default {
  shuffle: shuffle,
  rand: rand,
  printGrid: printGrid,
  orderByValues: orderByValues,
  getNextNotIn: getNextNotIn,
  getIndexWithFewestAvailableValues: getIndexWithFewestAvailableValues,
};
