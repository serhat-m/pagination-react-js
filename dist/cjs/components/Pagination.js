"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const generateNumArr_1 = __importDefault(require("../functions/generateNumArr"));
const PaginationItem_1 = __importDefault(require("./PaginationItem"));
const Pagination = ({ entriesPerPage, totalEntries, currentPage, offset, classNames, showFirstNumberAlways, showLastNumberAlways, navStart, navEnd, navPrev, navNext, navPrevCustom, navNextCustom }) => {
    function generatePagination(pageNumbers, currentPage, offset) {
        if (offset === undefined) {
            return pageNumbers.map(pageNumber => {
                return (0, jsx_runtime_1.jsx)(PaginationItem_1.default, Object.assign({ onClick: () => currentPage.set(pageNumber), className: classNames === null || classNames === void 0 ? void 0 : classNames.item, activeClassName: classNames === null || classNames === void 0 ? void 0 : classNames.itemActive, active: pageNumber === currentPage.get }, { children: pageNumber }), pageNumber);
            });
        }
        else {
            const firstNumber = pageNumbers[0];
            const lastNumber = pageNumbers[pageNumbers.length - 1];
            const offsetNumbers = (0, generateNumArr_1.default)(1, offset);
            const offsetToHideStart = 1 + offset; // Example: 1 2 3 4 5 6 7 8 -> offset 3, 1 element in the middle -> Result 4 -> hide from 5
            const offsetToHideEnd = 1 + offset; // offsetToHideStart reversed
            const maxOffsetStart = firstNumber + (offset * 2) + (showFirstNumberAlways ? 1 : 0); // Example: 1 2 3 4 5 6 7 8 -> 1 element at the beginning, 1 element in the middle, offset 3*2=6 (before and after the middle number) -> Result 8                                      
            const maxOffsetEnd = lastNumber - (offset * 2) - (showLastNumberAlways ? 1 : 0); // maxOffsetStart reversed
            return (0, jsx_runtime_1.jsx)(react_1.Fragment, { children: firstNumber && lastNumber
                    ?
                        (0, jsx_runtime_1.jsxs)(react_1.Fragment, { children: [showFirstNumberAlways && (0, jsx_runtime_1.jsx)(PaginationItem_1.default, Object.assign({ onClick: () => currentPage.set(firstNumber), className: classNames === null || classNames === void 0 ? void 0 : classNames.item, activeClassName: classNames === null || classNames === void 0 ? void 0 : classNames.itemActive, active: firstNumber === currentPage.get }, { children: firstNumber }), firstNumber), navPrevCustom && currentPage.get > offsetToHideStart + 1
                                    &&
                                        (0, jsx_runtime_1.jsx)("li", Object.assign({ onClick: () => (currentPage.get - navPrevCustom.steps >= firstNumber) ? currentPage.set(currentPage.get - navPrevCustom.steps) : currentPage.set(firstNumber), className: (classNames === null || classNames === void 0 ? void 0 : classNames.navPrevCustom) ? classNames.navPrevCustom : undefined }, { children: navPrevCustom.content })), pageNumbers.map(pageNumber => {
                                    let numberIsDisabled = false;
                                    if ((pageNumber === firstNumber && showFirstNumberAlways) || (pageNumber === lastNumber && showLastNumberAlways)) {
                                        numberIsDisabled = true;
                                    }
                                    if (!numberIsDisabled && pageNumber !== currentPage.get) {
                                        let showNumber = false;
                                        for (const offsetNumber of offsetNumbers) {
                                            if ((currentPage.get - offsetNumber) === pageNumber) {
                                                showNumber = true;
                                            }
                                            else if ((currentPage.get + offsetNumber) === pageNumber) {
                                                showNumber = true;
                                            }
                                            else if (pageNumber <= maxOffsetStart && pageNumber > (currentPage.get - offsetToHideStart)) {
                                                showNumber = true;
                                            }
                                            else if (pageNumber >= maxOffsetEnd && currentPage.get > (lastNumber - offsetToHideEnd)) {
                                                showNumber = true;
                                            }
                                            if (showNumber) {
                                                break;
                                            }
                                        }
                                        if (showNumber) {
                                            return (0, jsx_runtime_1.jsx)(PaginationItem_1.default, Object.assign({ onClick: () => currentPage.set(pageNumber), className: classNames === null || classNames === void 0 ? void 0 : classNames.item }, { children: pageNumber }), pageNumber);
                                        }
                                        return null;
                                    }
                                    else if (!numberIsDisabled && pageNumber === currentPage.get) {
                                        return (0, jsx_runtime_1.jsx)(PaginationItem_1.default, Object.assign({ onClick: () => currentPage.set(pageNumber), className: classNames === null || classNames === void 0 ? void 0 : classNames.item, activeClassName: classNames === null || classNames === void 0 ? void 0 : classNames.itemActive, active: pageNumber === currentPage.get }, { children: pageNumber }), pageNumber);
                                    }
                                    else {
                                        return null;
                                    }
                                }), navNextCustom && currentPage.get <= lastNumber - offsetToHideEnd - 1
                                    &&
                                        (0, jsx_runtime_1.jsx)("li", Object.assign({ onClick: () => (currentPage.get + navNextCustom.steps <= lastNumber) ? currentPage.set(currentPage.get + navNextCustom.steps) : currentPage.set(lastNumber), className: (classNames === null || classNames === void 0 ? void 0 : classNames.navNextCustom) ? classNames.navNextCustom : undefined }, { children: navNextCustom.content })), showLastNumberAlways && (lastNumber !== firstNumber)
                                    &&
                                        (0, jsx_runtime_1.jsx)(PaginationItem_1.default, Object.assign({ onClick: () => currentPage.set(lastNumber), className: classNames === null || classNames === void 0 ? void 0 : classNames.item, activeClassName: classNames === null || classNames === void 0 ? void 0 : classNames.itemActive, active: lastNumber === currentPage.get }, { children: lastNumber }), lastNumber)] })
                    :
                        null });
        }
    }
    const pageNumbers = (0, generateNumArr_1.default)(1, Math.ceil(totalEntries / entriesPerPage));
    return ((0, jsx_runtime_1.jsxs)("ul", Object.assign({ className: classNames === null || classNames === void 0 ? void 0 : classNames.wrapper }, { children: [navStart && pageNumbers.length > 1
                &&
                    (0, jsx_runtime_1.jsx)("li", Object.assign({ className: (classNames === null || classNames === void 0 ? void 0 : classNames.navStart) ? classNames.navStart : undefined, onClick: () => currentPage.set(1) }, { children: navStart })), navPrev && pageNumbers.length > 1
                &&
                    (0, jsx_runtime_1.jsx)("li", Object.assign({ className: (classNames === null || classNames === void 0 ? void 0 : classNames.navPrev) ? classNames.navPrev : undefined, onClick: () => currentPage.get > 1 && currentPage.set(currentPage.get - 1) }, { children: navPrev })), generatePagination(pageNumbers, currentPage, offset), navNext && pageNumbers.length > 1
                &&
                    (0, jsx_runtime_1.jsx)("li", Object.assign({ className: (classNames === null || classNames === void 0 ? void 0 : classNames.navNext) ? classNames.navNext : undefined, onClick: () => currentPage.get < pageNumbers.length && currentPage.set(currentPage.get + 1) }, { children: navNext })), navEnd && pageNumbers.length > 1
                &&
                    (0, jsx_runtime_1.jsx)("li", Object.assign({ className: (classNames === null || classNames === void 0 ? void 0 : classNames.navEnd) ? classNames.navEnd : undefined, onClick: () => currentPage.set(pageNumbers[pageNumbers.length - 1]) }, { children: navEnd }))] })));
};
exports.default = Pagination;
