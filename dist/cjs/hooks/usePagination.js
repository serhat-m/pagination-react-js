"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
/**
 *
 * @param initialPage Initial active page number
 * @param maxEntriesPerPage Maximum number of entries per page
 */
function usePagination(initialPage, maxEntriesPerPage) {
    const [currentPage, setCurrentPage] = (0, react_1.useState)(initialPage);
    const [entriesPerPage, setEntriesPerPage] = (0, react_1.useState)(maxEntriesPerPage);
    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    return {
        currentPage: { get: currentPage, set: setCurrentPage },
        entriesPerPage: { get: entriesPerPage, set: setEntriesPerPage },
        entries: { indexOfFirst: indexOfFirstEntry, indexOfLast: indexOfLastEntry }
    };
}
exports.default = usePagination;
