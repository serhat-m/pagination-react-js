import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment } from "react";
import generateNumArr from "../functions/generateNumArr";
import PaginationItem from "./PaginationItem";
var Pagination = function (_a) {
    var entriesPerPage = _a.entriesPerPage, totalEntries = _a.totalEntries, currentPage = _a.currentPage, offset = _a.offset, classNames = _a.classNames, showFirstNumberAlways = _a.showFirstNumberAlways, showLastNumberAlways = _a.showLastNumberAlways, navStart = _a.navStart, navEnd = _a.navEnd, navPrev = _a.navPrev, navNext = _a.navNext, navPrevCustom = _a.navPrevCustom, navNextCustom = _a.navNextCustom;
    function generatePagination(pageNumbers, currentPage, offset) {
        if (offset === undefined) {
            return pageNumbers.map(function (pageNumber) {
                return (_jsx(PaginationItem, { onClick: function () { return currentPage.set(pageNumber); }, className: classNames === null || classNames === void 0 ? void 0 : classNames.item, activeClassName: classNames === null || classNames === void 0 ? void 0 : classNames.itemActive, active: pageNumber === currentPage.get, children: pageNumber }, pageNumber));
            });
        }
        else {
            var firstNumber_1 = pageNumbers[0];
            var lastNumber_1 = pageNumbers[pageNumbers.length - 1];
            var offsetNumbers_1 = generateNumArr(1, offset);
            var offsetToHideStart_1 = 1 + offset; // Example: 1 2 3 4 5 6 7 8 -> offset 3, 1 element in the middle -> Result 4 -> hide from 5
            var offsetToHideEnd_1 = 1 + offset; // offsetToHideStart reversed
            var maxOffsetStart_1 = firstNumber_1 + offset * 2 + (showFirstNumberAlways ? 1 : 0); // Example: 1 2 3 4 5 6 7 8 -> 1 element at the beginning, 1 element in the middle, offset 3*2=6 (before and after the middle number) -> Result 8
            var maxOffsetEnd_1 = lastNumber_1 - offset * 2 - (showLastNumberAlways ? 1 : 0); // maxOffsetStart reversed
            return (_jsx(Fragment, { children: firstNumber_1 && lastNumber_1 ? (_jsxs(Fragment, { children: [showFirstNumberAlways && (_jsx(PaginationItem, { onClick: function () { return currentPage.set(firstNumber_1); }, className: classNames === null || classNames === void 0 ? void 0 : classNames.item, activeClassName: classNames === null || classNames === void 0 ? void 0 : classNames.itemActive, active: firstNumber_1 === currentPage.get, children: firstNumber_1 }, firstNumber_1)), navPrevCustom && currentPage.get > offsetToHideStart_1 + 1 && (_jsx("li", { onClick: function () {
                                return currentPage.get - navPrevCustom.steps >= firstNumber_1
                                    ? currentPage.set(currentPage.get - navPrevCustom.steps)
                                    : currentPage.set(firstNumber_1);
                            }, className: (classNames === null || classNames === void 0 ? void 0 : classNames.navPrevCustom) ? classNames.navPrevCustom : undefined, children: navPrevCustom.content })), pageNumbers.map(function (pageNumber) {
                            var numberIsDisabled = false;
                            if ((pageNumber === firstNumber_1 && showFirstNumberAlways) || (pageNumber === lastNumber_1 && showLastNumberAlways)) {
                                numberIsDisabled = true;
                            }
                            if (!numberIsDisabled && pageNumber !== currentPage.get) {
                                var showNumber = false;
                                for (var _i = 0, offsetNumbers_2 = offsetNumbers_1; _i < offsetNumbers_2.length; _i++) {
                                    var offsetNumber = offsetNumbers_2[_i];
                                    if (currentPage.get - offsetNumber === pageNumber) {
                                        showNumber = true;
                                    }
                                    else if (currentPage.get + offsetNumber === pageNumber) {
                                        showNumber = true;
                                    }
                                    else if (pageNumber <= maxOffsetStart_1 && pageNumber > currentPage.get - offsetToHideStart_1) {
                                        showNumber = true;
                                    }
                                    else if (pageNumber >= maxOffsetEnd_1 && currentPage.get > lastNumber_1 - offsetToHideEnd_1) {
                                        showNumber = true;
                                    }
                                    if (showNumber) {
                                        break;
                                    }
                                }
                                if (showNumber) {
                                    return (_jsx(PaginationItem, { onClick: function () { return currentPage.set(pageNumber); }, className: classNames === null || classNames === void 0 ? void 0 : classNames.item, children: pageNumber }, pageNumber));
                                }
                                return null;
                            }
                            else if (!numberIsDisabled && pageNumber === currentPage.get) {
                                return (_jsx(PaginationItem, { onClick: function () { return currentPage.set(pageNumber); }, className: classNames === null || classNames === void 0 ? void 0 : classNames.item, activeClassName: classNames === null || classNames === void 0 ? void 0 : classNames.itemActive, active: pageNumber === currentPage.get, children: pageNumber }, pageNumber));
                            }
                            else {
                                return null;
                            }
                        }), navNextCustom && currentPage.get <= lastNumber_1 - offsetToHideEnd_1 - 1 && (_jsx("li", { onClick: function () {
                                return currentPage.get + navNextCustom.steps <= lastNumber_1
                                    ? currentPage.set(currentPage.get + navNextCustom.steps)
                                    : currentPage.set(lastNumber_1);
                            }, className: (classNames === null || classNames === void 0 ? void 0 : classNames.navNextCustom) ? classNames.navNextCustom : undefined, children: navNextCustom.content })), showLastNumberAlways && lastNumber_1 !== firstNumber_1 && (_jsx(PaginationItem, { onClick: function () { return currentPage.set(lastNumber_1); }, className: classNames === null || classNames === void 0 ? void 0 : classNames.item, activeClassName: classNames === null || classNames === void 0 ? void 0 : classNames.itemActive, active: lastNumber_1 === currentPage.get, children: lastNumber_1 }, lastNumber_1))] })) : null }));
        }
    }
    var pageNumbers = generateNumArr(1, Math.ceil(totalEntries / entriesPerPage));
    return (_jsxs("ul", { className: classNames === null || classNames === void 0 ? void 0 : classNames.wrapper, children: [navStart && pageNumbers.length > 1 && (_jsx("li", { className: (classNames === null || classNames === void 0 ? void 0 : classNames.navStart) ? classNames.navStart : undefined, onClick: function () { return currentPage.set(1); }, children: navStart })), navPrev && pageNumbers.length > 1 && (_jsx("li", { className: (classNames === null || classNames === void 0 ? void 0 : classNames.navPrev) ? classNames.navPrev : undefined, onClick: function () { return currentPage.get > 1 && currentPage.set(currentPage.get - 1); }, children: navPrev })), generatePagination(pageNumbers, currentPage, offset), navNext && pageNumbers.length > 1 && (_jsx("li", { className: (classNames === null || classNames === void 0 ? void 0 : classNames.navNext) ? classNames.navNext : undefined, onClick: function () { return currentPage.get < pageNumbers.length && currentPage.set(currentPage.get + 1); }, children: navNext })), navEnd && pageNumbers.length > 1 && (_jsx("li", { className: (classNames === null || classNames === void 0 ? void 0 : classNames.navEnd) ? classNames.navEnd : undefined, onClick: function () { return currentPage.set(pageNumbers[pageNumbers.length - 1]); }, children: navEnd }))] }));
};
export default Pagination;
