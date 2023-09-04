import { Dispatch, SetStateAction, ReactNode } from "react";
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
    navStart?: ReactNode;
    navEnd?: ReactNode;
    navPrev?: ReactNode;
    navNext?: ReactNode;
    navPrevCustom?: {
        steps: number;
        content: ReactNode;
    };
    navNextCustom?: {
        steps: number;
        content: ReactNode;
    };
}
declare const Pagination: ({ entriesPerPage, totalEntries, currentPage, offset, classNames, showFirstNumberAlways, showLastNumberAlways, navStart, navEnd, navPrev, navNext, navPrevCustom, navNextCustom, }: Pagination) => import("react/jsx-runtime").JSX.Element;
export default Pagination;
