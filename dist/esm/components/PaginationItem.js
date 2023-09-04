import { jsx as _jsx } from "react/jsx-runtime";
var PaginationItem = function (_a) {
    var children = _a.children, onClick = _a.onClick, className = _a.className, activeClassName = _a.activeClassName, active = _a.active;
    return (_jsx("li", { className: !className && !activeClassName
            ? undefined
            : "".concat(className ? className : "").concat(className && activeClassName ? " " : "").concat(active && activeClassName ? activeClassName : ""), onClick: onClick, children: children }));
};
export default PaginationItem;
