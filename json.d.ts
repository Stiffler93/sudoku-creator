interface Setting {
  upperLimit: string;
  lowerLimit: string;
  numCreations: string;
}

interface CreationSetting {
  (index: string): Setting;
}

interface Configuration {
  COLS: number[];
  NUMBERS: number[];
  SQUARE_LENGTH: number;
  GRID_LENGTH: number;
  SQUARE_ORDER: number[];
  CREATION_SETTINGS: CreationSetting;
}

declare module 'config.json' {
  const value: Configuration;
  export default value;
}
