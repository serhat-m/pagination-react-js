import { useState } from "react";
/**
 *
 * @param initialPage Initial active page number
 * @param maxEntriesPerPage Maximum number of entries per page
 */
function usePagination(initialPage, maxEntriesPerPage) {
    var _a = useState(initialPage), currentPage = _a[0], setCurrentPage = _a[1];
    var _b = useState(maxEntriesPerPage), entriesPerPage = _b[0], setEntriesPerPage = _b[1];
    var indexOfLastEntry = currentPage * entriesPerPage;
    var indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    return {
        currentPage: { get: currentPage, set: setCurrentPage },
        entriesPerPage: { get: entriesPerPage, set: setEntriesPerPage },
        entries: { indexOfFirst: indexOfFirstEntry, indexOfLast: indexOfLastEntry },
    };
}
export default usePagination;
