interface Configuration {
  COLS: number[];
  NUMBERS: number[];
  SQUARE_LENGTH: number;
  GRID_LENGTH: number;
  SQUARE_ORDER: number[];
}

declare module 'config.json' {
  const value: Configuration;
  export default value;
}
