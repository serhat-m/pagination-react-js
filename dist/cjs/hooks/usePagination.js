"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePagination = void 0;
var react_1 = require("react");
var generateNumArr_1 = require("../functions/generateNumArr");
var getOffsetNumbers_1 = require("../functions/getOffsetNumbers");
function usePagination(_a) {
    var initialActivePage = _a.activePage, initialRecordsPerPage = _a.recordsPerPage, totalRecordsLength = _a.totalRecordsLength, offset = _a.offset, navCustomPageSteps = _a.navCustomPageSteps, permanentFirstNumber = _a.permanentFirstNumber, permanentLastNumber = _a.permanentLastNumber;
    var _b = (0, react_1.useState)(initialActivePage), activePage = _b[0], setActivePage = _b[1];
    var _c = (0, react_1.useState)(initialRecordsPerPage), recordsPerPage = _c[0], setRecordsPerPage = _c[1];
    var indexOfLastRecord = (recordsPerPage > totalRecordsLength ? totalRecordsLength : activePage * recordsPerPage) - 1;
    var indexOfFirstRecord = recordsPerPage > indexOfLastRecord ? 0 : indexOfLastRecord - recordsPerPage + 1;
    var pageNumbers = (0, generateNumArr_1.default)(1, Math.ceil(totalRecordsLength / recordsPerPage));
    var firstPage = pageNumbers[0];
    var lastPage = pageNumbers[pageNumbers.length - 1];
    var pageOffsetNumbers = (0, getOffsetNumbers_1.getOffsetNumbers)({
        pageNumbers: pageNumbers,
        firstNumber: firstPage,
        lastNumber: lastPage,
        activeNumber: activePage,
        offset: offset,
        permanentFirstNumber: permanentFirstNumber,
        permanentLastNumber: permanentLastNumber,
    }).pageOffsetNumbers;
    return {
        records: {
            perPage: recordsPerPage,
            indexOfFirst: indexOfFirstRecord,
            indexOfLast: indexOfLastRecord,
        },
        pageNumbers: {
            activePage: activePage,
            firstPage: firstPage,
            lastPage: lastPage,
            previousPage: activePage > firstPage ? activePage - 1 : false,
            nextPage: activePage < lastPage ? activePage + 1 : false,
            customPreviousPage: (navCustomPageSteps === null || navCustomPageSteps === void 0 ? void 0 : navCustomPageSteps.prev) && activePage - navCustomPageSteps.prev >= firstPage + 1 ? activePage - navCustomPageSteps.prev : false,
            customNextPage: (navCustomPageSteps === null || navCustomPageSteps === void 0 ? void 0 : navCustomPageSteps.next) && activePage + navCustomPageSteps.next <= lastPage - 1 ? activePage + navCustomPageSteps.next : false,
            navigation: pageOffsetNumbers,
        },
        setRecordsPerPage: function (recordsPerPage) {
            setRecordsPerPage(recordsPerPage);
        },
        setActivePage: function (pageNumber) {
            setActivePage(pageNumber);
        },
    };
}
exports.usePagination = usePagination;
