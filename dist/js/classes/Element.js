"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Element = /*#__PURE__*/function () {
  function Element(data, style) {
    _classCallCheck(this, Element);
    this._size = {
      w: 0,
      h: 0
    };
    this._location = {
      x: 0,
      y: 0
    };
    this.core = data;
    data.obj = this;
    this.style = style;
    this.id = data.id;
  }
  _createClass(Element, [{
    key: "size",
    value: function size(v) {
      if (arguments.length === 0) return this._size;
      if (v.w && v.w !== this._size.w) this._size.w = v.w;
      if (v.h && v.h !== this._size.h) this._size.h = v.h;
      return this._size;
    }
  }, {
    key: "location",
    value: function location(v) {
      if (arguments.length === 0) return this._location;
      if (v.x && v.x !== this._location.x) this._location.x = v.x;
      if (v.y && v.y !== this._location.y) this._location.y = v.y;
      return this._location;
    }
  }, {
    key: "children",
    value: function children(v) {
      if (arguments.length === 0) return this._children || [];
      this._children = v;
      return this._children;
    }
  }]);
  return Element;
}();
exports["default"] = Element;
;