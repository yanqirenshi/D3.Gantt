"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _moment = _interopRequireDefault(require("moment"));

var d3 = _interopRequireWildcard(require("d3"));

var Classes = _interopRequireWildcard(require("./Classes.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Stylist = /*#__PURE__*/function () {
  function Stylist() {
    _classCallCheck(this, Stylist);
  }

  _createClass(Stylist, [{
    key: "makePool",
    value: function makePool(list) {
      if (!list) return {
        ht: {},
        list: []
      };
      return list.reduce(function (pool, d) {
        pool.ht[d.id] = d;
        return pool;
      }, {
        ht: {},
        list: _toConsumableArray(list)
      });
    }
  }, {
    key: "makeIndexWpKeyParent",
    value: function makeIndexWpKeyParent(pool) {
      return pool.list.reduce(function (ht, d) {
        if (!ht[d.parent]) ht[d.parent] = [];
        ht[d.parent].push(d);
        return ht;
      }, {});
    }
  }, {
    key: "data2pools",
    value: function data2pools(data) {
      var makeIndex = function makeIndex(ht, d) {
        if (!ht[d.parent]) ht[d.parent] = [];
        ht[d.parent].push(d);
        return ht;
      };

      var groups = this.makePool(data.groups);
      var wbs = this.makePool(data.wbs);
      var workpackages = this.makePool(data.workpackages);
      return {
        gropus: groups,
        wbs: wbs,
        workpackages: workpackages,
        head: null,
        body: null,
        foot: null,
        stage: null,
        indexWpKeyParent: workpackages.list.reduce(makeIndex, {})
      };
    }
  }, {
    key: "stylingWorkpackages",
    value: function stylingWorkpackages(style, scale, data) {
      var pool = this.makePool();
      var index = {};

      var _iterator = _createForOfIteratorHelper(data.workpackages),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var wp = _step.value;
          var elem = new Classes.Workpackage(wp, style.body.chart);
          elem.styling(scale);
          pool.list.push(elem);
          pool.ht[elem.id] = elem;
          var parent_id = elem.parentId();
          if (!index[parent_id]) index[parent_id] = [];
          index[parent_id].push(elem);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return {
        pool: pool,
        index: index
      };
    }
  }, {
    key: "stylingWBS",
    value: function stylingWBS(style, data, index) {
      var pool = this.makePool();
      var before = null;

      var _iterator2 = _createForOfIteratorHelper(data.wbs),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var wbs_data = _step2.value;
          var children = index[wbs_data.id] || [];
          var wbs = new Classes.Wbs(wbs_data, style.body.row);
          if (before) wbs.location({
            y: before.location().y + before.size().h
          });
          wbs.styling(children);
          before = wbs;
          pool.list.push(wbs);
          pool.ht[wbs.id] = wbs;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      return pool;
    }
  }, {
    key: "stylingHead",
    value: function stylingHead(style, pools) {
      var obj = new Classes.Head({}, style.head);
      obj.size({
        w: pools.stage.contentsW(),
        h: style.head.h
      });
      obj.location({
        x: 0,
        y: 0
      });
      return obj;
    }
  }, {
    key: "stylingBody",
    value: function stylingBody(style, pools) {
      var header_h = pools.head.size().h;
      var location = {
        x: 0,
        y: header_h
      };
      var size = {
        w: pools.stage.contentsW(),
        h: 0
      };
      var h = 0;

      var _iterator3 = _createForOfIteratorHelper(pools.wbs.list),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var wbs = _step3.value;
          var l = wbs.location();
          var s = wbs.size();
          if (h < l.y + s.h) h = l.y + s.h;
          wbs.location({
            x: l.x + location.x,
            y: l.y + location.y
          });
          wbs.size({
            w: size.w
          });
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      ;
      size.h = h;
      var obj = new Classes.Body({}, style.body);
      obj.size(size);
      obj.location(location);
      return obj;
    }
  }, {
    key: "stylingFoot",
    value: function stylingFoot(style, pools) {
      var obj = new Classes.Foot({}, style.foot);
      obj.size({
        w: pools.stage.contentsW(),
        h: style.foot.h
      });
      obj.location({
        x: 0,
        y: pools.head.size().h + pools.body.size().h
      });
      return obj;
    }
  }, {
    key: "stylingStage",
    value: function stylingStage(pools) {
      var obj = pools.stage;
      var padding = obj.padding();
      var h = padding + pools.head.size().h + pools.body.size().h + pools.foot.size().h + padding;
      pools.head.location().x = pools.head.location().x + padding;
      pools.body.location().x = pools.body.location().x + padding;
      pools.foot.location().x = pools.foot.location().x + padding;
      pools.head.location().y = pools.head.location().y + padding;
      pools.body.location().y = pools.body.location().y + padding;
      pools.foot.location().y = pools.foot.location().y + padding;

      var _iterator4 = _createForOfIteratorHelper(pools.wbs.list),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var wbs = _step4.value;
          wbs.location({
            x: wbs.location().x + padding,
            y: wbs.location().y + padding
          });
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      var _iterator5 = _createForOfIteratorHelper(pools.workpackages.list),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var wp = _step5.value;
          var _wbs = pools.wbs.ht[wp.parentId()];
          wp.location({
            x: wp.location().x + padding,
            y: wp.location().y + _wbs.location().y + _wbs.padding()
          });
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }

      var w = pools.stage.w();
      obj.size({
        w: w,
        h: h
      });
      obj.location({
        x: 0,
        y: 0
      });
    }
  }, {
    key: "getTerm",
    value: function getTerm(pools) {
      var out = {
        start: null,
        end: null
      };

      var _iterator6 = _createForOfIteratorHelper(pools.workpackages),
          _step6;

      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var wp = _step6.value;
          if (out.start === null || out.start > wp.plan.start) out.start = wp.plan.start;
          if (out.end === null || out.end < wp.plan.end) out.end = wp.plan.end;
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }

      return out;
    }
  }, {
    key: "makeScale",
    value: function makeScale(stage, term) {
      return d3.scaleTime().range([0, stage.contentsW()]).domain([term.start, term.end]);
    }
  }, {
    key: "makeStage",
    value: function makeStage(data, term, style) {
      var stage = new Classes.Stage({}, style.stage);
      var cycle = data.scale.cycle;
      var len = (0, _moment["default"])(term.end).diff((0, _moment["default"])(term.start), cycle);
      var w = data.scale.w * len;
      stage.size({
        w: w + style.stage.padding * 2
      });
      return stage;
    }
  }, {
    key: "makeHeaderCells",
    value: function makeHeaderCells(style, pools) {
      var scale = pools.scale;
      var term = pools.term;
      var cells = [];
      var start = (0, _moment["default"])(term.start);
      var end = (0, _moment["default"])(term.end);
      var cell_start = (0, _moment["default"])(start);

      while (cell_start.isBefore(end)) {
        var cell_end = (0, _moment["default"])(cell_start).add('d', 1);
        var x_start = scale(cell_start.toDate());
        var x_end = scale(cell_end.toDate());
        var obj = new Classes.Cell({
          start: (0, _moment["default"])(cell_start),
          end: (0, _moment["default"])(cell_end)
        }, style.head.cell);
        obj.location({
          x: x_start + pools.stage.padding(),
          y: 0 + pools.stage.padding()
        });
        obj.size({
          w: x_end - x_start,
          h: style.head.h
        });
        cells.push(obj);
        cell_start.add('M', 1);
      }

      return cells;
    }
  }, {
    key: "makeGrid",
    value: function makeGrid(cycle, style, pools) {
      var scale = pools.scale;
      var term = pools.term;
      var cells = [];
      var start = (0, _moment["default"])(term.start);
      var end = (0, _moment["default"])(term.end);
      var h = pools.head._size.h + pools.body._size.h + pools.foot._size.h; // 月次の線を追加

      var cell_start = (0, _moment["default"])(start);

      while (cell_start.isBefore(end)) {
        var x_start = scale(cell_start.toDate());
        var obj = {
          location: {
            x: x_start,
            y: style.stage.padding
          },
          size: {
            w: 0,
            h: h
          },
          stroke: {
            color: '#666666',
            width: '1',
            dasharray: null
          }
        };
        if (obj.location.x > 0) cells.push(obj);
        cell_start.add('M', 1);
      } // 週次の線を追加


      if (cycle === 'w') {
        // 週の始め(月曜日)を算出
        var week_start = (0, _moment["default"])(term.start);
        if (week_start.day() > 0) week_start.startOf('week');
        week_start.add(1, 'd');

        while (week_start.isBefore(end)) {
          var _x_start = scale(week_start.toDate());

          var _obj = {
            location: {
              x: _x_start,
              y: style.stage.padding
            },
            size: {
              w: 0,
              h: h
            },
            stroke: {
              color: '#999999',
              width: '1',
              dasharray: 3
            }
          };
          if (_obj.location.x > 0) cells.push(_obj);
          week_start.add(1, 'w');
        }
      }

      return cells;
    }
  }, {
    key: "makeNow",
    value: function makeNow(style, pools) {
      var scale = pools.scale;
      var x = scale(new Date());
      var y = style.stage.padding;
      var h = pools.head._size.h + pools.body._size.h + pools.foot._size.h;
      return {
        x1: x,
        y1: y,
        x2: x,
        y2: y + h
      };
    }
  }, {
    key: "styling",
    value: function styling(data, children) {
      var style = data.style;
      var models = {
        stage: null,
        head: null,
        body: null,
        foot: null,
        gropus: null,
        wbs: null,
        workpackages: null,
        indexWpKeyParent: null,
        term: null,
        timescale: null,
        grid: null,
        scale: null,
        now: null
      };
      models.term = this.getTerm(data);
      var term = models.term;
      models.stage = this.makeStage(data, term, style);
      models.scale = this.makeScale(models.stage, models.term);
      models.timescale = this.makeHeaderCells(style, models);
      var ret = this.stylingWorkpackages(style, models.scale, data);
      models.workpackages = ret.pool;
      models.indexWpKeyParent = ret.index;
      models.wbs = this.stylingWBS(style, data, models.indexWpKeyParent);
      models.head = this.stylingHead(style, models);
      models.body = this.stylingBody(style, models);
      models.foot = this.stylingFoot(style, models);
      models.grid = this.makeGrid(data.scale.cycle, style, models);
      models.now = this.makeNow(style, models);
      this.stylingStage(models);
      return models;
    }
  }]);

  return Stylist;
}();

exports["default"] = Stylist;