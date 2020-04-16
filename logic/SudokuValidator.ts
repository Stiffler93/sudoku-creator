export default function validate(data: string): boolean {
  const charArr = data.split("");

  const rows = charArr.reduce(
    (object: string[], nextChar: string, index: number) => {
      const row = Math.floor(index / 9);
      object[row] = object[row] ? `${object[row]}${nextChar}` : nextChar;
      return object;
    },
    [] as string[]
  );

  const cols = charArr.reduce(
    (object: string[], nextChar: string, index: number) => {
      const col = index % 9;
      object[col] = object[col] ? `${object[col]}${nextChar}` : nextChar;
      return object;
    },
    [] as string[]
  );

  const squares = charArr.reduce(
    (object: string[], nextChar: string, index: number) => {
      const row = Math.floor(index / 9);
      const col = index % 9;
      const horizThird = Math.floor(col / 3);
      const vertThird = Math.floor(row / 3);
      const square = horizThird + 3 * vertThird;

      object[square] = object[square]
        ? `${object[square]}${nextChar}`
        : nextChar;
      return object;
    },
    [] as string[]
  );

  const faultyCombinations = [...rows, ...cols, ...squares]
    .map((str) => str.split("").sort().join(""))
    .filter((str) => str !== "123456789");

  return faultyCombinations.length === 0;
}
