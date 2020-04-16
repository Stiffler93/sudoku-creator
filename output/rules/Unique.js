"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GridUtils_1 = __importDefault(require("../utils/GridUtils"));
function isNotInRow(num, index, grid) {
    const row = GridUtils_1.default.valuesInRow(GridUtils_1.default.indexToRow(index), grid);
    return !row.includes(num);
}
function isNotInCol(num, index, grid) {
    const col = GridUtils_1.default.valuesInCol(GridUtils_1.default.indexToCol(index), grid);
    return !col.includes(num);
}
function isNotInSquare(num, index, grid) {
    const square = GridUtils_1.default.valuesInSquare(GridUtils_1.default.indexToSquare(index), grid);
    return !square.includes(num);
}
