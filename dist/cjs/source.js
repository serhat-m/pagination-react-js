"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTestData = exports.Pagination = exports.usePagination = void 0;
const Pagination_1 = __importDefault(require("./components/Pagination"));
exports.Pagination = Pagination_1.default;
const usePagination_1 = __importDefault(require("./hooks/usePagination"));
exports.usePagination = usePagination_1.default;
const generateTestData_1 = __importDefault(require("./functions/generateTestData"));
exports.generateTestData = generateTestData_1.default;
