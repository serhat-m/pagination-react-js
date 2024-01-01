"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTestData = exports.usePagination = void 0;
var usePagination_1 = require("./hooks/usePagination");
Object.defineProperty(exports, "usePagination", { enumerable: true, get: function () { return usePagination_1.usePagination; } });
var generateTestData_1 = require("./functions/generateTestData");
exports.generateTestData = generateTestData_1.default;
