(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('ramda'), require('karet.util'), require('kefir'), require('date-fns'), require('x-ray')) :
	typeof define === 'function' && define.amd ? define(['exports', 'ramda', 'karet.util', 'kefir', 'date-fns', 'x-ray'], factory) :
	(factory((global.lab = global.lab || {}, global.lab.util = global.lab.util || {}),global.R,global.U,global.Kefir,global.Dfns,global.Xray));
}(this, (function (exports,R,U,kefir,Dfns,xray) { 'use strict';

xray = xray && 'default' in xray ? xray['default'] : xray;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

// Prepare some functions

var Dfns_dateFormat = R.flip(Dfns.format);

// Basic helper functions

var trim = function trim(value) {
  return R.is(String, value) ? value.trim() : value;
};
var asNumber = function asNumber(value) {
  return parseInt(value, 10);
};
var asFloat = function asFloat(value) {
  return parseFloat(value, 10);
};
var unLocalizeNumber = R.compose(R.replace(/[^\d.-]+/), asNumber);

// Strings

var replaceSeparator = R.replace(' - ', '');
var emptyJoin = R.join('');
var fstTo = R.adjust(R.__, 0);

var capitalize = R.compose(emptyJoin, fstTo(R.toUpper), R.splitAt(1), R.toLower);
var camelCase = R.compose(emptyJoin, fstTo(R.toLower), R.map(capitalize), R.split(' '), replaceSeparator);

// X-ray

var x = xray({ filters: { trim: trim, asNumber: asNumber, asFloat: asFloat, unLocalizeNumber: unLocalizeNumber } });
var xF1 = x;
var xF2 = R.curry(function (data, sel) {
  return x(data, sel);
});
var xF3 = R.curry(function (data, ctx, sel) {
  return x(data, ctx, sel);
});
var xU2 = function xU2(a, b) {
  return U.lift(xF2)(a, b);
}; // lifted version might not be needed
var xU3 = function xU3(a, b, c) {
  return U.lift(xF3)(a, b, c);
}; // lifted version might not be needed

// Kefir

var toConstant = function toConstant(a) {
  return a instanceof kefir.Observable ? a : kefir.constant(a);
};
var fromPromise$1 = R.curry(kefir.fromPromise);
var fromNodeCallback$1 = R.curry(kefir.fromNodeCallback);

// date-fns

var dateFormat = R.curry(Dfns_dateFormat);

//

var seq = function seq(a) {
  for (var _len = arguments.length, fns = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    fns[_key - 1] = arguments[_key];
  }

  return R.pipe.apply(R, fns)(a);
};
var seqR = function seqR(a) {
  for (var _len2 = arguments.length, fns = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    fns[_key2 - 1] = arguments[_key2];
  }

  return R.compose.apply(R, fns)(a);
};
var sndU = function sndU(_, t) {
  return t;
};

// Objects

var getKeyByValue = R.curry(function (val, obj) {
  return seq(obj, R.head, R.find(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        v = _ref2[1];

    return R.equals(val, v);
  }), R.toPairs);
});
var flipObject = R.compose(R.fromPairs, R.map(R.reverse), R.toPairs);
var mapPairs = function mapPairs(fn) {
  return R.compose(R.fromPairs, R.map(fn), R.toPairs);
};
var seqPairs = function seqPairs() {
  return R.compose(R.fromPairs, R.pipe.apply(R, arguments), R.toPairs);
};

exports.trim = trim;
exports.asNumber = asNumber;
exports.asFloat = asFloat;
exports.unLocalizeNumber = unLocalizeNumber;
exports.capitalize = capitalize;
exports.camelCase = camelCase;
exports.x = x;
exports.xF1 = xF1;
exports.xF2 = xF2;
exports.xF3 = xF3;
exports.xU2 = xU2;
exports.xU3 = xU3;
exports.toConstant = toConstant;
exports.fromPromise = fromPromise$1;
exports.fromNodeCallback = fromNodeCallback$1;
exports.dateFormat = dateFormat;
exports.seq = seq;
exports.seqR = seqR;
exports.sndU = sndU;
exports.getKeyByValue = getKeyByValue;
exports.flipObject = flipObject;
exports.mapPairs = mapPairs;
exports.seqPairs = seqPairs;

Object.defineProperty(exports, '__esModule', { value: true });

})));
