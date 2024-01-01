type OffsetNumbers = {
    pageNumbers: number[];
    firstNumber: number;
    lastNumber: number;
    activeNumber: number;
    offset: number;
    permanentFirstNumber?: boolean;
    permanentLastNumber?: boolean;
};
export declare function getOffsetNumbers({ pageNumbers, firstNumber, lastNumber, activeNumber, offset, permanentFirstNumber, permanentLastNumber, }: OffsetNumbers): {
    pageOffsetNumbers: number[];
};
export {};
