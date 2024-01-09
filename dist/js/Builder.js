"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var c = _interopRequireWildcard(require("./Classes.js"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Builder = /*#__PURE__*/function () {
  function Builder() {
    _classCallCheck(this, Builder);
  }
  _createClass(Builder, [{
    key: "makeWbsNode",
    value: function makeWbsNode(data, fn) {
      return data.reduce(function (ht, d) {
        var obj = fn(d);
        ht[obj.id] = obj;
        return ht;
      }, {});
    }
    /**
     * WBS を階層構造に組み上げる。
     * */
  }, {
    key: "build",
    value: function build(data_wbs, data_workpackages, style) {
      // data で Wbs, Workpackage クラスインスタンスを生成する。
      var wbs_ht = this.makeWbsNode(data_wbs, function (d) {
        return new c.Wbs(d, style.body.row);
      });
      var wp_ht = this.makeWbsNode(data_workpackages, function (d) {
        return new c.Workpackage(d, style.body.chart);
      });
      var wbs_list = Object.values(wbs_ht);
      var wp_list = Object.values(wp_ht);

      // WBS のルートのリストを取得する。 WBS階層を作りながら。
      var roots = wbs_list.reduce(function (list, wbs) {
        var parent_id = wbs.parentId();
        if (!parent_id) {
          list.push(wbs);
          return list;
        }
        var parent = wbs_ht[parent_id];
        parent.addChild(wbs);
        return list;
      }, []);

      // WBS のルートのリストを取得する。 WBS階層を作りながら。
      for (var _i = 0, _wp_list = wp_list; _i < _wp_list.length; _i++) {
        var wp = _wp_list[_i];
        var parent = wbs_ht[wp.parentId()];
        parent.addChild(wp);
      }
      return {
        roots: roots,
        wbs_list: wbs_list,
        wp_list: wp_list
      };
    }
  }]);
  return Builder;
}();
exports["default"] = Builder;