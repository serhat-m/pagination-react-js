"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function generateNumArr(loopStart, loopMax) {
    const numArr = [];
    for (let i = loopStart; i <= loopMax; i++) {
        numArr.push(i);
    }
    return numArr;
}
exports.default = generateNumArr;
