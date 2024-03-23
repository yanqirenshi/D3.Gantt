"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _assh0le = require("@yanqirenshi/assh0le");
var _Stylist = _interopRequireDefault(require("./Stylist.js"));
var _Builder = _interopRequireDefault(require("./Builder.js"));
var Painter = _interopRequireWildcard(require("./painter/index.js"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var Rectum = /*#__PURE__*/function (_Colon) {
  _inherits(Rectum, _Colon);
  var _super = _createSuper(Rectum);
  function Rectum(params) {
    var _this;
    _classCallCheck(this, Rectum);
    _this = _super.call(this, {
      layers: [{
        id: 1,
        code: 'background'
      }, {
        id: 2,
        code: 'foreground'
      }, {
        id: 3,
        code: 'canvas'
      }],
      transform: params.transform
    });
    _this.stylist = new _Stylist["default"]();
    return _this;
  }
  _createClass(Rectum, [{
    key: "drawStage",
    value: function drawStage(place, data) {
      var draw = function draw(selections) {
        selections.attr("x", function (d) {
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
      };
      var selections = place.selectAll("rect.stage").data([data.stage]);

      // update
      draw(selections);

      // add
      draw(selections.enter().append("rect").attr("class", 'stage'));

      // delete
      selections.exit().remove();
    }
  }, {
    key: "drawHead",
    value: function drawHead(place, data) {
      var draw = function draw(selection) {
        selection.attr("x", function (d) {
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
      };
      var selections = place.selectAll("rect.head").data([data.head]);

      // add
      draw(selections.enter().append("rect").attr("class", 'head'));

      // update
      draw(selections);

      // delete
      selections.exit().remove();
    }
  }, {
    key: "drawHeadGrit",
    value: function drawHeadGrit(place, data) {}
  }, {
    key: "drawCell",
    value: function drawCell(place, data) {
      var cells = place.selectAll("g.cell").data(data.timescale, function (d) {
        return d.core.start.format('YYYY-MM-DD');
      });
      var draw = function draw(selection) {
        selection.attr("x", function (d) {
          return d.location().x + 22;
        }).attr("y", function (d) {
          return d.location().y + 77;
        }).attr("font-family", "Verdana").attr("font-size", function (d) {
          return 55;
        }).text(function (d) {
          return d.core.start.format('yyyy-MM');
        });
      };
      var enterd = cells.enter().append("g").attr("class", 'cell');

      // add
      draw(enterd.append("text").attr("class", 'chart'));

      // update
      draw(cells.selectAll("text.chart").data(data.timescale, function (d) {
        return d.core.start.format('YYYY-MM-DD');
      }));

      // delete
      cells.exit().remove();
    }
  }, {
    key: "drawBody",
    value: function drawBody(place, data) {
      var draw = function draw(selection) {
        selection.attr("x", function (d) {
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
      };
      var selection = place.selectAll("rect.body").datum([data.body]);

      // add
      draw(selection.enter().append("rect").attr("class", 'body'));

      // update
      draw(selection.data([data.body]));

      // delete
      selection.exit().remove();
    }
  }, {
    key: "drawBodyGrid",
    value: function drawBodyGrid(place, data) {
      var draw = function draw(selection) {
        selection.attr("x1", function (d) {
          return d.location.x;
        }).attr("y1", function (d) {
          return d.location.y;
        }).attr("x2", function (d) {
          return d.location.x;
        }).attr("y2", function (d) {
          return d.location.y + d.size.h;
        }).attr("stroke", function (d) {
          return d.stroke.color;
        }).attr("stroke-width", function (d) {
          return d.stroke.width;
        }).attr("stroke-dasharray", function (d) {
          return d.stroke.dasharray;
        });
      };
      var grids = place.selectAll("line.grid").data(data.grid);

      // add
      draw(grids.enter().append("line").attr("class", 'grid'));

      // update
      draw(grids);

      // delete
      grids.exit().remove();
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
      var draw = function draw(selection) {
        selection.attr("x", function (d) {
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
      };
      var selection = place.selectAll("rect.row").data(data.wbs.list, function (wbs) {
        return wbs.id;
      });

      // add
      draw(selection.enter().append("rect").attr("class", 'row'));

      // update
      draw(selection);

      // delete
      selection.exit().remove();
    }
  }, {
    key: "drawNow",
    value: function drawNow(place, data) {
      var draw = function draw(selection) {
        selection.attr("x1", function (d) {
          return d.x1;
        }).attr("y1", function (d) {
          return d.y1;
        }).attr("x2", function (d) {
          return d.x2;
        }).attr("y2", function (d) {
          return d.y2;
        }).attr("stroke", "#d9333f").attr("stroke-width", 6);
      };
      var selection = place.selectAll("line.now").data([data.now], function (d) {
        return d.x1;
      });

      // add
      draw(selection.enter().append("line").attr("class", 'grid'));

      // update
      draw(selection);

      // delete
      selection.exit().remove();
    }
  }, {
    key: "draw",
    value: function draw() {
      var data = this.data();
      var place = this.layer('canvas');
      this.drawStage(place, data);
      this.drawHead(place, data);
      // this.drawBody(place, data);
      // this.drawFoot(place, data);

      this.drawBodyGrid(place, data);
      this.drawHeadGrit(place, data);
      this.drawCell(place, data);
      this.drawRows(place, data);
      new Painter.Wbs().draw(place, data);
      new Painter.Workpackages().draw(place, data);
      this.drawNow(place, data);
    }
  }, {
    key: "styling",
    value: function styling(data) {
      return this.stylist.styling(data);
    }
    /* ******** */
    /*  Data    */
    /* ******** */
  }, {
    key: "data",
    value: function data(_data) {
      if (arguments.length === 0) return _get(_getPrototypeOf(Rectum.prototype), "data", this).call(this);
      var builder = new _Builder["default"]();

      // builder.build(data.wbs, data.workpackages, data.style);

      return _get(_getPrototypeOf(Rectum.prototype), "data", this).call(this, this.styling(_data));
    }
  }]);
  return Rectum;
}(_assh0le.Colon);
exports["default"] = Rectum;