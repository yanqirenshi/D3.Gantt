"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Element2 = _interopRequireDefault(require("./Element.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var Wbs = /*#__PURE__*/function (_Element) {
  _inherits(Wbs, _Element);
  var _super = _createSuper(Wbs);
  function Wbs() {
    _classCallCheck(this, Wbs);
    return _super.apply(this, arguments);
  }
  _createClass(Wbs, [{
    key: "name",
    value: function name() {
      return this.core.name;
    }
  }, {
    key: "padding",
    value: function padding() {
      return this.style.padding || 0;
    }
    /**
     * 矩形が被るものがないか確認する。 被る=true, 被らない=false
     */
  }, {
    key: "isPuton",
    value: function isPuton(targets) {
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

      // TODO: 仮設
      return true;
    }
    /**
     * Workpackage のチャートが被るかどうかを整える。(2/2)
     */
  }, {
    key: "layoutChildrenAddTemp",
    value: function layoutChildrenAddTemp(wp, tmp) {
      var isPuton = function isPuton(targets) {
        return true;
      };
      var _iterator = _createForOfIteratorHelper(tmp),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var wp_list = _step.value;
          // wp が 他 wp と被る場合、別の段での表示にする。
          if (this.isPuton(wp_list)) continue;

          // wp が 他 wp と被らない場合、同じ段での表示にする。
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
    /**
     * Workpackage のチャートが被るかどうかを整える。(1/2)
     */
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
    value: function layoutChildren(title_h, children) {
      var cal = function cal(ht, wp) {
        var y = wp.location().y;
        var h = wp.size().h;
        if (y > ht.y) ht.y = y;
        if (h > ht.h) ht.h = h;
        return ht;
      };

      // Workpackage のチャートが被るかどうかを整える。
      var rows = this.layoutChildrenMakeTmp(children);

      // TODO: 現在は Workpackage のみを children の対象としている。
      var before = null;
      var _iterator2 = _createForOfIteratorHelper(rows),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var wp_list = _step2.value;
          // 最初の wp の場合、なにかする。
          if (!before) {
            before = wp_list.reduce(cal, {
              y: title_h,
              h: -1
            });
            var _iterator3 = _createForOfIteratorHelper(wp_list),
              _step3;
            try {
              for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                var wp = _step3.value;
                wp.location({
                  y: title_h
                });
              }
            } catch (err) {
              _iterator3.e(err);
            } finally {
              _iterator3.f();
            }
            continue;
          }
          var _iterator4 = _createForOfIteratorHelper(wp_list),
            _step4;
          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              var _wp = _step4.value;
              _wp.location({
                y: before.y + before.h + 11
              });
            }
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
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
    key: "childrenRect",
    value: function childrenRect(children) {
      var h = 0;
      var x_min = null;
      var x_max = null;
      var _iterator5 = _createForOfIteratorHelper(children),
        _step5;
      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var child = _step5.value;
          var child_h = child.location().y + child.size().h;
          if (h < child_h) h = child_h;
          if (x_min === null || x_min > child.location().x) x_min = child.location().x;
          if (x_max === null || x_max < child.location().x + child.size().w) x_max = child.location().x + child.size().w;
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
      return {
        x: x_min,
        w: x_max - x_min,
        h: h
      };
    }
    /** ****************************************************************
     * @children List: Wbs, Workpackage
     * **************************************************************** */
  }, {
    key: "styling",
    value: function styling(children) {
      var title_h = 88;
      this.layoutChildren(title_h, children);
      var rect = this.childrenRect(children);
      var padding = this.style.padding;
      var h = rect.h === 0 ? this.style.h : rect.h + (padding * 2 || 0) + title_h;
      this.size({
        w: rect.w + padding * 4,
        h: h
      });

      // TODO: this.layoutChildren でやるべき？
      var l = this.location();
      this.location({
        x: rect.x - padding * 2,
        y: l.y
      });
      return this;
    }
  }]);
  return Wbs;
}(_Element2["default"]);
exports["default"] = Wbs;
;