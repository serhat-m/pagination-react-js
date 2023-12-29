export type TPaginationData = {
    readonly records: {
        perPage: number;
        indexOfFirst: number;
        indexOfLast: number;
    };
    readonly pageNumbers: {
        activePage: number;
        firstPage: number;
        lastPage: number;
        previousPage: number | false;
        nextPage: number | false;
        customPreviousPage: number | false;
        customNextPage: number | false;
        navigation: number[];
    };
    readonly setActivePage: (pageNumber: number) => void;
    readonly setRecordsPerPage: (recordsPerPage: number) => void;
};
export type TFnOptions = {
    activePage: number;
    recordsPerPage: number;
    totalRecordsLength: number;
    offset: number;
    navCustomPageSteps?: {
        prev?: number;
        next?: number;
    };
    permanentFirstNumber?: boolean;
    permanentLastNumber?: boolean;
};
export declare function usePagination({ activePage: initialActivePage, recordsPerPage: initialRecordsPerPage, totalRecordsLength, offset, navCustomPageSteps, permanentFirstNumber, permanentLastNumber, }: TFnOptions): TPaginationData;
