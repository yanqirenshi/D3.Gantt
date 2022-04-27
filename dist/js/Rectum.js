"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _assh0le = require("@yanqirenshi/assh0le");

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

var Rectum = /*#__PURE__*/function (_Colon) {
  _inherits(Rectum, _Colon);

  var _super = _createSuper(Rectum);

  function Rectum(params) {
    var _this;

    _classCallCheck(this, Rectum);

    _this = _super.call(this, params);
    _this.stylist = new _Stylist["default"]();
    return _this;
  }

  _createClass(Rectum, [{
    key: "drawStage",
    value: function drawStage(place, data) {
      var draw = function draw(selections) {
        selections.attr("class", 'stage').attr("x", function (d) {
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
      draw(selections);
      draw(selections.enter().append("rect"));
      selections.exit().remove();
    }
  }, {
    key: "drawHead",
    value: function drawHead(place, data) {
      var draw = function draw(selection) {
        selection.attr("class", 'head').attr("x", function (d) {
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
      draw(selections.enter().append("rect"));
      draw(selections);
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
      cells.exit().remove();
      var enterd = cells.enter().append("g").attr("class", 'cell');
      enterd.append("text").attr("class", 'chart').attr("x", function (d) {
        return d.location().x + 22;
      }).attr("y", function (d) {
        return d.location().y + 77;
      }).attr("font-family", "Verdana").attr("font-size", function (d) {
        return 55;
      }).text(function (d) {
        return d.core.start.format('MM月');
      });
      cells.exit().remove();
      cells.selectAll("text.chart").data(data.timescale, function (d) {
        return d.core.start.format('YYYY-MM-DD');
      }).attr("x", function (d) {
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
      var selection = place.selectAll("rect.body").datum([data.body]);
      var enterd = selection.enter().append("rect");
      enterd.attr("class", 'body').attr("x", function (d) {
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
      selection.data([data.body]).attr("x", function (d) {
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
      var draw = function draw(grids) {
        grids.attr("class", 'grid').attr("x1", function (d) {
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

      var grids = place.selectAll("line.grid").data(data.grid); // add

      draw(grids.enter().append("line")); // update

      draw(grids); // delete

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
      var selection = place.selectAll("rect.row").data(data.wbs.list, function (wbs) {
        return wbs.id;
      });
      var enterd = selection.enter().append("rect").attr("class", 'row');
      enterd.attr("x", function (d) {
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
    }
  }, {
    key: "drawChartTextsWithLink",
    value: function drawChartTextsWithLink(mode, anchers) {
      anchers.attr("href", function (d) {
        return d.url();
      }).attr('target', "_blank").attr('rel', "noopener noreferrer");
      if ('enter' === mode) this.drawChartTexts(anchers.append('text'));
      if ('update' === mode) this.drawChartTexts(anchers.selectAll("text"));
    }
  }, {
    key: "drawChartTexts",
    value: function drawChartTexts(texts) {
      var fontSize = function fontSize(d) {
        var h = d._label.size.h;
        return Math.floor((h - d.style.padding * 2) * 0.7);
      };

      return texts.attr("x", function (d) {
        return d._label.location.x;
      }).attr("y", function (d) {
        return d._label.location.y;
      }) // .attr("x", d=> d.location().x + (d.style.padding * 3))
      // .attr("y", d=> d.location().y + d.style.padding + (d.size().h/2) + d.style.padding)
      .attr("font-family", "Verdana").attr("font-size", function (d) {
        return fontSize(d);
      }).text(function (d) {
        return d.core.name;
      });
    }
  }, {
    key: "drawChartPlan",
    value: function drawChartPlan(rects) {
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
        return d.style.background;
      });
    }
  }, {
    key: "drawChart",
    value: function drawChart(place, data) {
      var selection = place.selectAll("g.chart").data(data.workpackages.list, function (wp) {
        return wp.id;
      }); // add

      var enterd = selection.enter().append("g").attr("class", 'chart');

      var isText = function isText(d) {
        return d.url() ? false : true;
      };

      var isTextWithLink = function isTextWithLink(d) {
        return d.url() ? true : false;
      };

      this.drawChartPlan(enterd.append("rect").attr("class", 'chart'));
      this.drawChartTexts(enterd.filter(isText).append("text").attr("class", 'chart'));
      this.drawChartTextsWithLink('enter', enterd.filter(isTextWithLink).append("a")); // update

      this.drawChartPlan(selection.selectAll("rect.chart").data(data.workpackages.list, function (wp) {
        return wp.id;
      }));
      this.drawChartTexts(selection.filter(isText).selectAll("text.chart").data(data.workpackages.list, function (wp) {
        return wp.id;
      }));
      this.drawChartTextsWithLink('update', selection.filter(isTextWithLink).selectAll("a").data(data.workpackages.list, function (wp) {
        return wp.id;
      })); // delete

      selection.exit().remove();
    }
  }, {
    key: "drawNow",
    value: function drawNow(place, data) {
      var selection = place.selectAll("line.now").data([data.now]);
      var enterd = selection.enter().append("line").attr("class", 'grid');
      enterd.attr("x1", function (d) {
        return d.x1;
      }).attr("y1", function (d) {
        return d.y1;
      }).attr("x2", function (d) {
        return d.x2;
      }).attr("y2", function (d) {
        return d.y2;
      }).attr("stroke", "#d9333f").attr("stroke-width", 5);
      selection.attr("x1", function (d) {
        return d.x1;
      }).attr("y1", function (d) {
        return d.y1;
      }).attr("x2", function (d) {
        return d.x2;
      }).attr("y2", function (d) {
        return d.y2;
      }).attr("stroke", "#d9333f").attr("stroke-width", 5);
    }
  }, {
    key: "draw",
    value: function draw() {
      var data = this.data();
      var place = this.layer('foreground');
      this.drawStage(place, data);
      this.drawHead(place, data);
      this.drawBody(place, data);
      this.drawFoot(place, data);
      this.drawCell(place, data);
      this.drawRows(place, data);
      this.drawBodyGrid(place, data);
      this.drawHeadGrit(place, data);
      this.drawNow(place, data);
      this.drawChart(place, data);
    }
  }, {
    key: "styling",
    value: function styling(data) {
      return this.stylist.styling(data);
    }
  }]);

  return Rectum;
}(_assh0le.Colon);

exports["default"] = Rectum;