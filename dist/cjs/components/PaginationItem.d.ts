import { MouseEvent } from "react";
interface PaginationItem {
    children: string | number;
    onClick: (e: MouseEvent<HTMLLIElement>) => void;
    className?: string;
    activeClassName?: string;
    active?: boolean;
}
declare const PaginationItem: ({ children, onClick, className, activeClassName, active }: PaginationItem) => JSX.Element;
export default PaginationItem;
