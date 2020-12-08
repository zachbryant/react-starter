"use strict";
exports.__esModule = true;
var reactn_1 = require("reactn");
var react_dom_1 = require("react-dom");
var App_1 = require("@components/App");
require("@assets/tailwind.scss");
react_dom_1["default"].render(reactn_1["default"].createElement("div", { className: "flex items-center", style: { backgroundColor: '#48bb78', height: '100vh' } },
    reactn_1["default"].createElement(App_1.App, null)), document.getElementById('root'));
