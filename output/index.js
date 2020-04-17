"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SudokuCreator_1 = __importDefault(require("./logic/SudokuCreator"));
const Utils_1 = __importDefault(require("./utils/Utils"));
const { printGrid } = Utils_1.default;
const NUM_TESTS = 1;
for (let test = 1; test <= NUM_TESTS; test++) {
    const grid = SudokuCreator_1.default();
    printGrid(grid);
}
