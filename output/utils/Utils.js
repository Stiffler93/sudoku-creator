"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_json_1 = __importDefault(require("../config.json"));
const { SQUARE_LENGTH, GRID_LENGTH } = config_json_1.default;
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}
function rand(arr) {
    if (!arr)
        return undefined;
    const i = Math.floor(Math.random() * arr.length);
    return arr[i];
}
function printGrid(grid) {
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
function orderByValues(indices, values) {
    return indices.sort((index1, index2) => { var _a, _b; return (((_a = values[index1]) === null || _a === void 0 ? void 0 : _a.length) || 0) - (((_b = values[index2]) === null || _b === void 0 ? void 0 : _b.length) || 0); });
}
function getNextNotIn(array1, array2) {
    const notIn = array1.filter((el) => !array2.includes(el));
    return notIn[0];
}
exports.default = {
    shuffle: shuffle,
    rand: rand,
    printGrid: printGrid,
    orderByValues: orderByValues,
    getNextNotIn: getNextNotIn,
};
