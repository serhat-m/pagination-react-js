"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const PaginationItem = ({ children, onClick, className, activeClassName, active }) => {
    return ((0, jsx_runtime_1.jsx)("li", Object.assign({ className: !className && !activeClassName ? undefined : `${className ? className : ""}${(className && activeClassName) ? " " : ""}${(active && activeClassName) ? activeClassName : ""}`, onClick: onClick }, { children: children })));
};
exports.default = PaginationItem;
