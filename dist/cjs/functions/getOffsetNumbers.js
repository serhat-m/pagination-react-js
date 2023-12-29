"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOffsetNumbers = void 0;
function getOffsetNumbers(_a) {
    var pageNumbers = _a.pageNumbers, firstNumber = _a.firstNumber, lastNumber = _a.lastNumber, activeNumber = _a.activeNumber, offset = _a.offset, permanentFirstNumber = _a.permanentFirstNumber, permanentLastNumber = _a.permanentLastNumber;
    // Example: Offset: 3, Current page: 1
    // With these settings there is no possible offset before page 1 -> [] 1 [2 3 4]. The goal is to always return (offset * 2 + activeNumber) values -> In this case 1 [2 3 4] [6 7 8]
    var additionalOffsetStart = firstNumber + offset * 2 + (permanentFirstNumber ? 1 : 0);
    var additionalOffsetEnd = lastNumber - offset * 2 - (permanentLastNumber ? 1 : 0);
    var pageOffsetNumbers = [];
    for (var _i = 0, pageNumbers_1 = pageNumbers; _i < pageNumbers_1.length; _i++) {
        var pageNumber = pageNumbers_1[_i];
        if (pageNumber === activeNumber ||
            (pageNumber <= activeNumber + offset && pageNumber > activeNumber) ||
            (pageNumber >= activeNumber - offset && pageNumber < activeNumber) ||
            (activeNumber - offset <= firstNumber && pageNumber <= additionalOffsetStart) ||
            (activeNumber + offset >= lastNumber && pageNumber >= additionalOffsetEnd)) {
            pageOffsetNumbers.push(pageNumber);
        }
    }
    return { pageOffsetNumbers: pageOffsetNumbers };
}
exports.getOffsetNumbers = getOffsetNumbers;
