import { Dispatch, SetStateAction } from "react";
interface PaginationData {
    readonly currentPage: {
        readonly get: number;
        readonly set: Dispatch<SetStateAction<number>>;
    };
    readonly entriesPerPage: {
        readonly get: number;
        readonly set: Dispatch<SetStateAction<number>>;
    };
    readonly entries: {
        readonly indexOfFirst: number;
        readonly indexOfLast: number;
    };
}
/**
 *
 * @param initialPage Initial active page number
 * @param maxEntriesPerPage Maximum number of entries per page
 */
declare function usePagination(initialPage: number, maxEntriesPerPage: number): PaginationData;
export default usePagination;
