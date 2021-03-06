"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _assh0le = _interopRequireDefault(require("@yanqirenshi/assh0le"));

var _Stylist = _interopRequireDefault(require("./Stylist.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

var Core = /*#__PURE__*/function (_Asshole) {
  _inherits(Core, _Asshole);

  var _super = _createSuper(Core);

  function Core(params) {
    var _this;

    _classCallCheck(this, Core);

    _this = _super.call(this, params);
    _this.stylist = new _Stylist["default"]();
    return _this;
  }

  _createClass(Core, [{
    key: "drawStage",
    value: function drawStage(place, data) {
      place.selectAll("rect.stage").data([data.stage]).enter().append("rect").attr("class", 'stage').attr("x", function (d) {
        return d.location().x;
      }).attr("y", function (d) {
        return d.location().y;
      }).attr("width", function (d) {
        return d.size().w;
      }).attr("height", function (d) {
        return d.size().h;
      }).attr("fill", function (d) {
        return d.style.background;
      });
    }
  }, {
    key: "drawHead",
    value: function drawHead(place, data) {
      place.selectAll("rect.head").data([data.head]).enter().append("rect").attr("class", 'head').attr("x", function (d) {
        return d.location().x;
      }).attr("y", function (d) {
        return d.location().y;
      }).attr("width", function (d) {
        return d.size().w;
      }).attr("height", function (d) {
        return d.size().h;
      }).attr("fill", function (d) {
        return d.style.background;
      });
    }
  }, {
    key: "drawHeadGrit",
    value: function drawHeadGrit(place, data) {}
  }, {
    key: "drawCell",
    value: function drawCell(place, data) {
      var cells = place.selectAll("g.cell").data(data.timescale).enter().append("g").attr("class", 'cell');
      cells.append("text").attr("class", 'chart').attr("x", function (d) {
        return d.location().x + 22;
      }).attr("y", function (d) {
        return d.location().y + 77;
      }).attr("font-family", "Verdana").attr("font-size", function (d) {
        return 55;
      }).text(function (d) {
        return d.core.start.format('MM月');
      });
    }
  }, {
    key: "drawBody",
    value: function drawBody(place, data) {
      place.selectAll("rect.body").data([data.body]).enter().append("rect").attr("class", 'body').attr("x", function (d) {
        return d.location().x;
      }).attr("y", function (d) {
        return d.location().y;
      }).attr("width", function (d) {
        return d.size().w;
      }).attr("height", function (d) {
        return d.size().h;
      }).attr("fill", function (d) {
        return d.style.background;
      });
    }
  }, {
    key: "drawBodyGrid",
    value: function drawBodyGrid(place, data) {
      place.selectAll("line.grid").data(data.grid).enter().append("line").attr("class", 'grid').attr("x1", function (d) {
        return d.location.x;
      }).attr("y1", function (d) {
        return d.location.y;
      }).attr("x2", function (d) {
        return d.location.x;
      }).attr("y2", function (d) {
        return d.location.y + d.size.h;
      }).attr("stroke", "black");
    }
  }, {
    key: "drawFoot",
    value: function drawFoot(place, data) {
      place.selectAll("rect.foot").data([data.foot]).enter().append("rect").attr("class", 'foot').attr("x", function (d) {
        return d.location().x;
      }).attr("y", function (d) {
        return d.location().y;
      }).attr("width", function (d) {
        return d.size().w;
      }).attr("height", function (d) {
        return d.size().h;
      }).attr("fill", function (d) {
        return d.style.background;
      });
    }
  }, {
    key: "drawRows",
    value: function drawRows(place, data) {
      place.selectAll("rect.row").data(data.wbs.list).enter().append("rect").attr("class", 'row').attr("x", function (d) {
        return d.location().x;
      }).attr("y", function (d) {
        return d.location().y;
      }).attr("width", function (d) {
        return d.size().w;
      }).attr("height", function (d) {
        return d.size().h;
      }).attr("fill", function (d) {
        return d.style.background;
      });
    }
  }, {
    key: "drawChart",
    value: function drawChart(place, data) {
      var charts = place.selectAll("g.chart").data(data.workpackages.list).enter().append("g");

      var fontSize = function fontSize(d) {
        return Math.floor((d.size().h - d.style.padding * 2) * 0.7);
      };

      charts.append("rect").attr("class", 'chart').attr("x", function (d) {
        return d.location().x;
      }).attr("y", function (d) {
        return d.location().y;
      }).attr("width", function (d) {
        return d.size().w;
      }).attr("height", function (d) {
        return d.size().h;
      }).attr("rx", function (d) {
        return d.size().h / 2;
      }).attr("ry", function (d) {
        return d.size().h / 2;
      }).attr("fill", function (d) {
        return d.style.background;
      });
      charts.append("text").attr("class", 'chart').attr("x", function (d) {
        return d.location().x + d.style.padding * 3;
      }).attr("y", function (d) {
        return d.location().y + d.style.padding + d.size().h / 2 + d.style.padding;
      }).attr("font-family", "Verdana").attr("font-size", function (d) {
        return fontSize(d);
      }).text(function (d) {
        return d.core.name;
      });
    }
  }, {
    key: "draw",
    value: function draw(data) {
      var place = this.getLayerForeground();
      this.drawStage(place, data);
      this.drawHead(place, data);
      this.drawBody(place, data);
      this.drawFoot(place, data);
      this.drawCell(place, data);
      this.drawRows(place, data);
      this.drawBodyGrid(place, data);
      this.drawHeadGrit(place, data);
      this.drawChart(place, data);
    }
  }, {
    key: "data",
    value: function data(_data) {
      var model = this.stylist.styling(_data);
      this.draw(model);
      return this;
    }
  }]);

  return Core;
}(_assh0le["default"]);

exports["default"] = Core;