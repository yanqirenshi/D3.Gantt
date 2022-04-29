"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Element2 = _interopRequireDefault(require("./Element.js"));

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Workpackage = /*#__PURE__*/function (_Element) {
  _inherits(Workpackage, _Element);

  var _super = _createSuper(Workpackage);

  function Workpackage(data, style) {
    var _this;

    _classCallCheck(this, Workpackage);

    _this = _super.call(this, data, style);

    var template = function template() {
      return {
        size: {
          w: 0,
          h: 0
        },
        location: {
          x: 0,
          y: 0
        }
      };
    };

    _this._label = template();
    _this._plan = template();
    _this._result = template();
    _this._progress = template();
    return _this;
  }

  _createClass(Workpackage, [{
    key: "location",
    value: function location(v) {
      if (arguments.length === 0) return this._location;

      var location_old = _objectSpread({}, this._location);

      _get(_getPrototypeOf(Workpackage.prototype), "location", this).call(this, v);

      var vec = {
        x: this._location.x - location_old.x,
        y: this._location.y - location_old.y
      };

      var addVec = function addVec(a, b) {
        return {
          x: a.x + b.x,
          y: a.y + b.y
        };
      };

      this._label.location = addVec(this._label.location, vec);
      this._plan.location = addVec(this._plan.location, vec);
      this._result.location = addVec(this._result.location, vec);
      this._progress.location = addVec(this._progress.location, vec);
      return this._location;
    }
  }, {
    key: "parentId",
    value: function parentId() {
      return this.core.parent || null;
    }
  }, {
    key: "url",
    value: function url() {
      return this.core.url || null;
    }
  }, {
    key: "stylingLabel",
    value: function stylingLabel() {
      var style = this.style;
      this._label.location.y = style.label.h;
      this._label.size.h = style.label.h;
    }
  }, {
    key: "stylingPlan",
    value: function stylingPlan(plan_w) {
      var style = this.style;
      this._plan.location.y = style.label.h + style.label.margin.bottom;
      this._plan.size.w = plan_w;
      this._plan.size.h = style.plan.h;
    }
  }, {
    key: "stylingResult",
    value: function stylingResult(result_x, result_w) {
      var style = this.style;
      this._result.location.y = style.label.h + style.label.margin.bottom + style.result.shift;
      this._result.location.x = result_x;
      this._result.size.w = result_w;
      this._result.size.h = style.plan.h;
    }
  }, {
    key: "stylingProgress",
    value: function stylingProgress(core, plan_w) {
      var progress = function () {
        if (!core.progress) return 0;
        if (core.progress > 100) return 100;
        if (core.progress < 0) return 0;
        return core.progress;
      }();

      var style = this.style;
      this._progress.location.y = style.label.h + style.label.margin.bottom;
      this._progress.size.w = progress === 0 || plan_w === 0 ? 0 : plan_w * (progress / 100);
      this._progress.size.h = style.progress.h;
    }
  }, {
    key: "calRect",
    value: function calRect(type, core, scale, style) {
      var term = core[type];
      var x = 0,
          y = 0,
          w = 0,
          h = 0;

      var result = function result() {
        return {
          x: x,
          y: y,
          w: w,
          h: h
        };
      };

      if (!term) return result();
      var start = term.start;
      var end = term.end;

      if (type === 'plan') {
        if (!start || !end) return result();
        x = scale(start);
        w = scale(end) - x;
        h = style[type].h;
      } else {
        if (!start) return result();
        x = scale(start);
        y = style[type].shift || 0;
        w = scale(end || (0, _moment["default"])()) - x;
        h = style[type].h;
      }

      return result();
    }
  }, {
    key: "styling",
    value: function styling(scale) {
      var core = this.core; // background を上書きする。

      if (core.style && core.style.background) {
        var new_style = _objectSpread({}, this.style);

        new_style.background = core.style.background;
        this.style = new_style;
      }

      var style = this.style;
      var plan_rect = this.calRect('plan', core, scale, style);
      var result_rect = this.calRect('result', core, scale, style);
      this.size({
        w: plan_rect.w,
        h: style.label.h + style.label.margin.bottom + style.plan.h + style.result.shift
      });
      this.location({
        x: plan_rect.x
      });
      this.stylingLabel();
      this.stylingPlan(plan_rect.w);
      this.stylingResult(result_rect.x, result_rect.w);
      this.stylingProgress(core, plan_rect.w);
      return this;
    }
  }]);

  return Workpackage;
}(_Element2["default"]);

exports["default"] = Workpackage;
;