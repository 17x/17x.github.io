"use strict";

var _App = _interopRequireDefault(require("./App"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _App["default"])();"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _a = _interopRequireDefault(require("./sub/a.js"));

var _b = _interopRequireDefault(require("./sub/b.js"));

var _c = _interopRequireDefault(require("./sub/c.js"));

var _d = _interopRequireDefault(require("./sub/d.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// list
// index 引用 C
// A 引用 B
// B 引用 A
// C 引用 A B
// D 引用 A B
var App = function App() {
  _c["default"].start(); // 5秒后停止


  setTimeout(function () {
    _c["default"].end();
  }, 5000); // 10秒后读取数据

  setTimeout(function () {
    _d["default"].readResult();
  }, 10000);
};

var _default = App;
exports["default"] = _default;"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _b = _interopRequireDefault(require("./b.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var A = /*#__PURE__*/function () {
  function A(props) {
    _classCallCheck(this, A);
  }

  _createClass(A, null, [{
    key: "plus",
    value: function plus() {
      _b["default"].obj.num++;
    }
  }]);

  return A;
}();

_defineProperty(A, "obj", {
  num: 0
});

var _default = A;
exports["default"] = _default;"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _a = _interopRequireDefault(require("./a.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var B = /*#__PURE__*/function () {
  function B() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        config = _ref.config;

    _classCallCheck(this, B);
  }

  _createClass(B, null, [{
    key: "plus",
    value: function plus() {
      _a["default"].obj.num++;
    }
  }]);

  return B;
}();

_defineProperty(B, "obj", {
  num: 0
});

var _default = B;
exports["default"] = _default;"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _a = _interopRequireDefault(require("./a"));

var _b = _interopRequireDefault(require("./b"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var C = /*#__PURE__*/function () {
  function C() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        config = _ref.config;

    _classCallCheck(this, C);
  }

  _createClass(C, null, [{
    key: "start",
    value: function start() {
      C._timer = setInterval(function () {
        _a["default"].plus();

        _b["default"].plus();
      }, 1000);
    }
  }, {
    key: "end",
    value: function end() {
      clearInterval(C._timer);
    }
  }]);

  return C;
}();

_defineProperty(C, "_timer", null);

var _default = C;
exports["default"] = _default;"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _a = _interopRequireDefault(require("./a"));

var _b = _interopRequireDefault(require("./b"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var D = /*#__PURE__*/function () {
  function D() {
    _classCallCheck(this, D);
  }

  _createClass(D, null, [{
    key: "readResult",
    value: function readResult() {
      console.log(_a["default"].obj, _b["default"].obj);
    }
  }]);

  return D;
}();

var _default = D;
exports["default"] = _default;