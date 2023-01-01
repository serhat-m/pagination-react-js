import { useState } from "react";
/**
 *
 * @param initialPage Initial active page number
 * @param maxEntriesPerPage Maximum number of entries per page
 */
function usePagination(initialPage, maxEntriesPerPage) {
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [entriesPerPage, setEntriesPerPage] = useState(maxEntriesPerPage);
    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    return {
        currentPage: { get: currentPage, set: setCurrentPage },
        entriesPerPage: { get: entriesPerPage, set: setEntriesPerPage },
        entries: { indexOfFirst: indexOfFirstEntry, indexOfLast: indexOfLastEntry }
    };
}
export default usePagination;
