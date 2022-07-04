"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Charts = /*#__PURE__*/function () {
  function Charts() {
    _classCallCheck(this, Charts);
  }

  _createClass(Charts, [{
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
    key: "drawResult",
    value: function drawResult(rects) {
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
        return d.style.result.background;
      });
    }
  }, {
    key: "drawPlan",
    value: function drawPlan(rects) {
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
        if (d.core.style && d.core.style.background) return d.core.style.background;
        return d.style.plan.background;
      });
    }
  }, {
    key: "drawProgress",
    value: function drawProgress(rects) {
      rects.attr("x", function (d) {
        return d._progress.location.x;
      }).attr("y", function (d) {
        return d._progress.location.y;
      }).attr("width", function (d) {
        return d._progress.size.w;
      }).attr("height", function (d) {
        console.log(d._progress.size);
        return d._progress.size.h;
      }).attr("rx", function (d) {
        return d._progress.size.h / 2;
      }).attr("ry", function (d) {
        return d._progress.size.h / 2;
      }).attr("fill", function (d) {
        return d.style.progress.background;
      });
    }
  }, {
    key: "draw",
    value: function draw(place, data) {
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
      this.drawTextsWithLink('enter', enterd.filter(isTextWithLink).append("a")); // update

      var workpackages = data.workpackages.list;
      this.drawResult(selection.filter(function (d) {
        return d._result.size.w > 0;
      }).selectAll("rect.result").data(workpackages, eqWp));
      this.drawPlan(selection.selectAll("rect.chart").data(workpackages, eqWp));
      this.drawProgress(selection.filter(function (d) {
        return d._progress.size.w > 0;
      }).selectAll("rect.progress-chart").data(workpackages, eqWp));
      this.drawTexts(selection.filter(isText).selectAll("text.chart").data(workpackages, eqWp));
      this.drawTextsWithLink('update', selection.filter(isTextWithLink).selectAll("a").data(workpackages, eqWp)); // delete

      selection.exit().remove();
    }
  }]);

  return Charts;
}();

exports["default"] = Charts;