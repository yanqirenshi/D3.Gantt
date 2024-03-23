"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _moment = _interopRequireDefault(require("moment"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Workpackages = /*#__PURE__*/function () {
  function Workpackages() {
    _classCallCheck(this, Workpackages);
  }
  _createClass(Workpackages, [{
    key: "drawTextsWithLink",
    value: function drawTextsWithLink(mode, anchers) {
      anchers.attr("href", function (d) {
        return d.url();
      }).attr('target', "_blank").attr('rel', "noopener noreferrer");
      if ('enter' === mode) this.drawTexts(anchers.append('text'));
      if ('update' === mode) this.drawTexts(anchers.select("text"));
    }
  }, {
    key: "drawTexts",
    value: function drawTexts(texts) {
      var fontSize = function fontSize(d) {
        var h = d._label.size.h;
        return Math.floor((h - d.style.padding * 2) * 0.7);
      };
      var text = function text(d) {
        var s = (0, _moment["default"])(d.plan().start).format('MM-DD');
        var e = (0, _moment["default"])(d.plan().end).format('MM-DD');
        var term = "".concat(s, " \u301C ").concat(e);
        var progress = d.core.progress || 0;
        return "".concat(d.core.name, ",\u3000").concat(term, ",\u3000").concat(progress, "%,\u3000").concat(d.core.id);
      };
      return texts.attr("x", function (d) {
        return d._label.location.x;
      }).attr("y", function (d) {
        return d._label.location.y;
      }).attr("font-family", "Verdana").attr("font-size", function (d) {
        return fontSize(d);
      }).text(function (d) {
        return text(d);
      });
    }
  }, {
    key: "fillColor",
    value: function fillColor(d, type) {
      var core_style = d.core.style;
      var style = d.style;
      if (core_style && core_style[type] && core_style[type].background) return core_style[type].background;
      return style[type].background;
    }
  }, {
    key: "drawPlan",
    value: function drawPlan(rects) {
      var _this = this;
      rects.attr("x", function (d) {
        return d._plan.location.x;
      }).attr("y", function (d) {
        return d._plan.location.y;
      }).attr("width", function (d) {
        return d._plan.size.w;
      }).attr("height", function (d) {
        return d._plan.size.h;
      }).attr("rx", function (d) {
        return d._plan.size.h / 2;
      }).attr("ry", function (d) {
        return d._plan.size.h / 2;
      }).attr("fill", function (d) {
        return _this.fillColor(d, 'plan');
      });
    }
  }, {
    key: "drawResult",
    value: function drawResult(rects) {
      var _this2 = this;
      rects.attr("x", function (d) {
        return d._result.location.x;
      }).attr("y", function (d) {
        return d._result.location.y;
      }).attr("width", function (d) {
        return d._result.size.w;
      }).attr("height", function (d) {
        return d._result.size.h;
      }).attr("rx", function (d) {
        return d._result.size.h / 2;
      }).attr("ry", function (d) {
        return d._result.size.h / 2;
      }).attr("fill", function (d) {
        return _this2.fillColor(d, 'result');
      });
    }
  }, {
    key: "drawProgress",
    value: function drawProgress(rects) {
      var _this3 = this;
      rects.attr("x", function (d) {
        return d._progress.location.x;
      }).attr("y", function (d) {
        return d._progress.location.y;
      }).attr("width", function (d) {
        return d._progress.size.w;
      }).attr("height", function (d) {
        return d._progress.size.h;
      }).attr("rx", function (d) {
        return d._progress.size.h / 2;
      }).attr("ry", function (d) {
        return d._progress.size.h / 2;
      }).attr("fill", function (d) {
        return _this3.fillColor(d, 'progress');
      });
    }
  }, {
    key: "draw",
    value: function draw(place, data) {
      var selection = place.selectAll("g.chart").data(data.workpackages.list, function (wp) {
        return wp.id;
      });

      /* ****************************************************************
       *  Add
       * **************************************************************** */
      var enterd = selection.enter().append("g").attr("class", 'chart');
      var isText = function isText(d) {
        return d.url() ? false : true;
      };
      var isTextWithLink = function isTextWithLink(d) {
        return d.url() ? true : false;
      };
      var eqWp = function eqWp(wp) {
        return wp.id;
      };
      this.drawResult(enterd.filter(function (d) {
        return d._result.size.w > 0;
      }).append("rect").attr("class", 'result'));
      this.drawPlan(enterd.append("rect").attr("class", 'chart'));
      this.drawProgress(enterd.filter(function (d) {
        return d._progress.size.w > 0;
      }).append("rect").attr("class", 'progress-chart'));
      this.drawTexts(enterd.filter(isText).append("text").attr("class", 'chart'));
      this.drawTextsWithLink('enter', enterd.filter(isTextWithLink).append("a"));

      /* ****************************************************************
       *  Update
       * **************************************************************** */
      var workpackages = data.workpackages.list;
      this.drawResult(selection.filter(function (d) {
        return d._result.size.w > 0;
      }).selectAll("rect.result").data(workpackages, eqWp));
      this.drawPlan(selection.selectAll("rect.chart").data(workpackages, eqWp));
      this.drawProgress(selection.filter(function (d) {
        return d._progress.size.w > 0;
      }).selectAll("rect.progress-chart").data(workpackages, eqWp));
      this.drawTexts(selection.filter(isText).selectAll("text.chart").data(workpackages, eqWp));
      this.drawTextsWithLink('update', selection.filter(isTextWithLink).selectAll("a").data(workpackages, eqWp));

      /* ****************************************************************
       *  Delete
       * **************************************************************** */
      selection.exit().remove();
    }
  }]);
  return Workpackages;
}();
exports["default"] = Workpackages;