type Rule = (num: number, index: number, grid: number[]) => boolean;

export class RuleSet {
  private rules: Rule[];

  constructor(rules: Rule[]) {
    this.rules = rules;
  }

  public validate(num: number, index: number, grid: number[]): boolean {
    for (const rule of this.rules) {
      const valid = rule(num, index, grid);
      if (!valid) return false;
    }

    return true;
  }
}
