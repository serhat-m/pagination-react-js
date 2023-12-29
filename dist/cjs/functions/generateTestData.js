"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * @param numberOfRecords Number of records
 * @param cb Callback function which returns data
 * @returns Array with dummy data
 */
function generateTestData(numberOfRecords, cb) {
    var dataList = [];
    for (var i = 1; i <= numberOfRecords; i++) {
        dataList.push(cb(i));
    }
    return dataList;
}
exports.default = generateTestData;
