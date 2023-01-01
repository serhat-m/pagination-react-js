import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment } from "react";
import generateNumArr from "../functions/generateNumArr";
import PaginationItem from "./PaginationItem";
const Pagination = ({ entriesPerPage, totalEntries, currentPage, offset, classNames, showFirstNumberAlways, showLastNumberAlways, navStart, navEnd, navPrev, navNext, navPrevCustom, navNextCustom }) => {
    function generatePagination(pageNumbers, currentPage, offset) {
        if (offset === undefined) {
            return pageNumbers.map(pageNumber => {
                return _jsx(PaginationItem, Object.assign({ onClick: () => currentPage.set(pageNumber), className: classNames === null || classNames === void 0 ? void 0 : classNames.item, activeClassName: classNames === null || classNames === void 0 ? void 0 : classNames.itemActive, active: pageNumber === currentPage.get }, { children: pageNumber }), pageNumber);
            });
        }
        else {
            const firstNumber = pageNumbers[0];
            const lastNumber = pageNumbers[pageNumbers.length - 1];
            const offsetNumbers = generateNumArr(1, offset);
            const offsetToHideStart = 1 + offset; // Example: 1 2 3 4 5 6 7 8 -> offset 3, 1 element in the middle -> Result 4 -> hide from 5
            const offsetToHideEnd = 1 + offset; // offsetToHideStart reversed
            const maxOffsetStart = firstNumber + (offset * 2) + (showFirstNumberAlways ? 1 : 0); // Example: 1 2 3 4 5 6 7 8 -> 1 element at the beginning, 1 element in the middle, offset 3*2=6 (before and after the middle number) -> Result 8                                      
            const maxOffsetEnd = lastNumber - (offset * 2) - (showLastNumberAlways ? 1 : 0); // maxOffsetStart reversed
            return _jsx(Fragment, { children: firstNumber && lastNumber
                    ?
                        _jsxs(Fragment, { children: [showFirstNumberAlways && _jsx(PaginationItem, Object.assign({ onClick: () => currentPage.set(firstNumber), className: classNames === null || classNames === void 0 ? void 0 : classNames.item, activeClassName: classNames === null || classNames === void 0 ? void 0 : classNames.itemActive, active: firstNumber === currentPage.get }, { children: firstNumber }), firstNumber), navPrevCustom && currentPage.get > offsetToHideStart + 1
                                    &&
                                        _jsx("li", Object.assign({ onClick: () => (currentPage.get - navPrevCustom.steps >= firstNumber) ? currentPage.set(currentPage.get - navPrevCustom.steps) : currentPage.set(firstNumber), className: (classNames === null || classNames === void 0 ? void 0 : classNames.navPrevCustom) ? classNames.navPrevCustom : undefined }, { children: navPrevCustom.content })), pageNumbers.map(pageNumber => {
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
                                            return _jsx(PaginationItem, Object.assign({ onClick: () => currentPage.set(pageNumber), className: classNames === null || classNames === void 0 ? void 0 : classNames.item }, { children: pageNumber }), pageNumber);
                                        }
                                        return null;
                                    }
                                    else if (!numberIsDisabled && pageNumber === currentPage.get) {
                                        return _jsx(PaginationItem, Object.assign({ onClick: () => currentPage.set(pageNumber), className: classNames === null || classNames === void 0 ? void 0 : classNames.item, activeClassName: classNames === null || classNames === void 0 ? void 0 : classNames.itemActive, active: pageNumber === currentPage.get }, { children: pageNumber }), pageNumber);
                                    }
                                    else {
                                        return null;
                                    }
                                }), navNextCustom && currentPage.get <= lastNumber - offsetToHideEnd - 1
                                    &&
                                        _jsx("li", Object.assign({ onClick: () => (currentPage.get + navNextCustom.steps <= lastNumber) ? currentPage.set(currentPage.get + navNextCustom.steps) : currentPage.set(lastNumber), className: (classNames === null || classNames === void 0 ? void 0 : classNames.navNextCustom) ? classNames.navNextCustom : undefined }, { children: navNextCustom.content })), showLastNumberAlways && (lastNumber !== firstNumber)
                                    &&
                                        _jsx(PaginationItem, Object.assign({ onClick: () => currentPage.set(lastNumber), className: classNames === null || classNames === void 0 ? void 0 : classNames.item, activeClassName: classNames === null || classNames === void 0 ? void 0 : classNames.itemActive, active: lastNumber === currentPage.get }, { children: lastNumber }), lastNumber)] })
                    :
                        null });
        }
    }
    const pageNumbers = generateNumArr(1, Math.ceil(totalEntries / entriesPerPage));
    return (_jsxs("ul", Object.assign({ className: classNames === null || classNames === void 0 ? void 0 : classNames.wrapper }, { children: [navStart && pageNumbers.length > 1
                &&
                    _jsx("li", Object.assign({ className: (classNames === null || classNames === void 0 ? void 0 : classNames.navStart) ? classNames.navStart : undefined, onClick: () => currentPage.set(1) }, { children: navStart })), navPrev && pageNumbers.length > 1
                &&
                    _jsx("li", Object.assign({ className: (classNames === null || classNames === void 0 ? void 0 : classNames.navPrev) ? classNames.navPrev : undefined, onClick: () => currentPage.get > 1 && currentPage.set(currentPage.get - 1) }, { children: navPrev })), generatePagination(pageNumbers, currentPage, offset), navNext && pageNumbers.length > 1
                &&
                    _jsx("li", Object.assign({ className: (classNames === null || classNames === void 0 ? void 0 : classNames.navNext) ? classNames.navNext : undefined, onClick: () => currentPage.get < pageNumbers.length && currentPage.set(currentPage.get + 1) }, { children: navNext })), navEnd && pageNumbers.length > 1
                &&
                    _jsx("li", Object.assign({ className: (classNames === null || classNames === void 0 ? void 0 : classNames.navEnd) ? classNames.navEnd : undefined, onClick: () => currentPage.set(pageNumbers[pageNumbers.length - 1]) }, { children: navEnd }))] })));
};
export default Pagination;
