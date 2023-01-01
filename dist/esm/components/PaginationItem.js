import { jsx as _jsx } from "react/jsx-runtime";
const PaginationItem = ({ children, onClick, className, activeClassName, active }) => {
    return (_jsx("li", Object.assign({ className: !className && !activeClassName ? undefined : `${className ? className : ""}${(className && activeClassName) ? " " : ""}${(active && activeClassName) ? activeClassName : ""}`, onClick: onClick }, { children: children })));
};
export default PaginationItem;
