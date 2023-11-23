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
var Wbs = /*#__PURE__*/function () {
  function Wbs() {
    _classCallCheck(this, Wbs);
  }
  _createClass(Wbs, [{
    key: "drawBody",
    value: function drawBody(rects) {
      rects.attr("x", function (d) {
        return d.location().x;
      }).attr("y", function (d) {
        return d.location().y;
      }).attr("width", function (d) {
        return d.size().w;
      }).attr("height", function (d) {
        return d.size().h;
      })
      // .attr("rx", d=> d.size.h/2)
      // .attr("ry", d=> d.size.h/2)
      .attr("stroke-width", 0.5).attr("stroke", "#888").attr("fill", 'rgba(255,255,255,0.1');
    }
  }, {
    key: "drawTitle",
    value: function drawTitle(texts) {
      return texts.attr("x", function (d) {
        return d.location().x + 44;
      }).attr("y", function (d) {
        return d.location().y + 111;
      })
      // .attr("x", d=> d.location().x + (d.style.padding * 3))
      // .attr("y", d=> d.location().y + d.style.padding + (d.size().h/2) + d.style.padding)
      .attr("font-family", "Verdana").attr("font-size", function (d) {
        return 88;
      }).attr("font-weight", function (d) {
        return 'bold';
      }).text(function (d) {
        return d.name();
      });
    }
  }, {
    key: "drawAdd",
    value: function drawAdd(selection) {
      var enterd = selection.enter().append("g").attr("class", 'chart_wbs');
      this.drawBody(enterd.append("rect").attr("class", 'chart_wbs'));
      this.drawTitle(enterd.append("text").attr("class", 'chart_wbs'));
    }
  }, {
    key: "drawUpdate",
    value: function drawUpdate(selection) {
      this.drawBody(selection);
      selection.selectAll("text.chart_wbs");
    }
  }, {
    key: "drawRemove",
    value: function drawRemove(selection) {
      selection.exit().remove();
    }
  }, {
    key: "draw",
    value: function draw(place, data) {
      var wbs_list = data.wbs.list;
      var eq = function eq(wbs) {
        return wbs.id;
      };
      var selection = place.selectAll("g.chart_wbs").data(wbs_list, eq);
      this.drawAdd(selection);
      this.drawUpdate(selection);
      this.drawRemove(selection);
    }
  }]);
  return Wbs;
}();
exports["default"] = Wbs;