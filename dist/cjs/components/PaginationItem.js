"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var PaginationItem = function (_a) {
    var children = _a.children, onClick = _a.onClick, className = _a.className, activeClassName = _a.activeClassName, active = _a.active;
    return ((0, jsx_runtime_1.jsx)("li", { className: !className && !activeClassName
            ? undefined
            : "".concat(className ? className : "").concat(className && activeClassName ? " " : "").concat(active && activeClassName ? activeClassName : ""), onClick: onClick, children: children }));
};
exports.default = PaginationItem;
