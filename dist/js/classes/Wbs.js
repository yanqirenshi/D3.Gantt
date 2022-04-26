"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Element2 = _interopRequireDefault(require("./Element.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Wbs = /*#__PURE__*/function (_Element) {
  _inherits(Wbs, _Element);

  var _super = _createSuper(Wbs);

  function Wbs() {
    _classCallCheck(this, Wbs);

    return _super.apply(this, arguments);
  }

  _createClass(Wbs, [{
    key: "padding",
    value: function padding() {
      return this.style.padding || 0;
    }
  }, {
    key: "layoutChildrenAddTemp",
    value: function layoutChildrenAddTemp(wp, tmp) {
      // 矩形が被るものがないか確認する。 被る=true, 被らない=false
      // const isPuton = (targets) => {
      //     for (const target of targets) {
      //         const wp_l = wp.location();
      //         const wp_s = wp.size();
      //         const trg_l = target.location();
      //         const trg_s = target.size();
      //         if (Math.abs(wp_l.x - trg_l.x) < wp_s.w / 2 + trg_s.w / 2 &&
      //             Math.abs(wp_l.y - trg_l.y) < wp_s.h / 2 + trg_s.h / 2)
      //             return true;
      //     }
      //     return false;
      // };
      // TODO: 仮設
      var isPuton = function isPuton(targets) {
        return true;
      };

      var _iterator = _createForOfIteratorHelper(tmp),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var wp_list = _step.value;
          if (isPuton(wp_list)) continue;
          wp_list.push(wp);
          return;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      tmp.push([wp]);
    }
  }, {
    key: "layoutChildrenMakeTmp",
    value: function layoutChildrenMakeTmp(children) {
      var _this = this;

      var func = function func(tmp, child) {
        if (tmp.length === 0) {
          tmp.push([child]);
          return tmp;
        }

        _this.layoutChildrenAddTemp(child, tmp);

        return tmp;
      };

      return children.reduce(func, []);
    }
  }, {
    key: "layoutChildren",
    value: function layoutChildren(children) {
      var cal = function cal(ht, wp) {
        var y = wp.location().y;
        var h = wp.size().h;
        if (y > ht.y) ht.y = y;
        if (h > ht.h) ht.h = h;
        return ht;
      };

      var tmp = this.layoutChildrenMakeTmp(children);
      var before = null;

      var _iterator2 = _createForOfIteratorHelper(tmp),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var wp_list = _step2.value;

          if (!before) {
            before = wp_list.reduce(cal, {
              y: -1,
              h: -1
            });
            continue;
          }

          var _iterator3 = _createForOfIteratorHelper(wp_list),
              _step3;

          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var wp = _step3.value;
              wp.location({
                y: before.y + before.h + 11
              });
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }

          before = wp_list.reduce(cal, {
            y: -1,
            h: -1
          });
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  }, {
    key: "childrenH",
    value: function childrenH(children) {
      var h = 0;

      var _iterator4 = _createForOfIteratorHelper(children),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var child = _step4.value;
          var child_h = child.location().y + child.size().h;
          if (h < child_h) h = child_h;
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      return h;
    }
  }, {
    key: "styling",
    value: function styling(children) {
      this.layoutChildren(children);
      this.childrenH(children);
      var children_h = this.childrenH(children);
      var h = children_h === 0 ? this.style.h : this.childrenH(children) + (this.style.padding * 2 || 0);
      this.size({
        w: 888,
        h: h
      });
      return this;
    }
  }]);

  return Wbs;
}(_Element2["default"]);

exports["default"] = Wbs;
;