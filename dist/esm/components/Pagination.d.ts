import { Dispatch, SetStateAction } from "react";
export interface Pagination {
    entriesPerPage: number;
    totalEntries: number;
    currentPage: {
        get: number;
        set: Dispatch<SetStateAction<number>>;
    };
    offset: number;
    classNames?: {
        wrapper?: string;
        item?: string;
        itemActive?: string;
        navStart?: string;
        navEnd?: string;
        navPrev?: string;
        navNext?: string;
        navPrevCustom?: string;
        navNextCustom?: string;
    };
    showFirstNumberAlways?: true;
    showLastNumberAlways?: true;
    navStart?: any;
    navEnd?: any;
    navPrev?: any;
    navNext?: any;
    navPrevCustom?: {
        steps: number;
        content: any;
    };
    navNextCustom?: {
        steps: number;
        content: any;
    };
}
declare const Pagination: ({ entriesPerPage, totalEntries, currentPage, offset, classNames, showFirstNumberAlways, showLastNumberAlways, navStart, navEnd, navPrev, navNext, navPrevCustom, navNextCustom }: Pagination) => JSX.Element;
export default Pagination;
