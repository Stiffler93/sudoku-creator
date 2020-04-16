"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RuleSet {
    constructor(rules) {
        this.rules = rules;
    }
    validate(num, index, grid) {
        for (const rule of this.rules) {
            const valid = rule(num, index, grid);
            if (!valid)
                return false;
        }
        return true;
    }
}
exports.RuleSet = RuleSet;
