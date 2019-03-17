'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Querystring = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var QUERYSTRING_DELIMITER = '?';
var PARAM_DELIMITER = '&';
var VALUE_DELIMITER = '=';

var getBrowserUrl = function getBrowserUrl() {
  return window.location.href;
};

var getFromUrl = function getFromUrl() {
  var _getBrowserUrl$split = getBrowserUrl().split(QUERYSTRING_DELIMITER),
      _getBrowserUrl$split2 = _slicedToArray(_getBrowserUrl$split, 2),
      _getBrowserUrl$split3 = _getBrowserUrl$split2[1],
      second = _getBrowserUrl$split3 === void 0 ? '' : _getBrowserUrl$split3;

  return second;
};

var getValue = function getValue(value) {
  return value === '' ? null : value;
};

var getParameterValue = function getParameterValue(value) {
  return {
    value: getValue(value)
  };
};

var Querystring = {
  get: function get() {
    return getFromUrl().split(PARAM_DELIMITER).reduce(function (result, parameter) {
      var _parameter$split = parameter.split(VALUE_DELIMITER),
          _parameter$split2 = _slicedToArray(_parameter$split, 2),
          key = _parameter$split2[0],
          _parameter$split2$ = _parameter$split2[1],
          value = _parameter$split2$ === void 0 ? null : _parameter$split2$;

      return key && key !== '' ? _objectSpread({}, result, _defineProperty({}, key, getParameterValue(value))) : result;
    }, {});
  },
  generate: function generate() {
    var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return Object.entries(parameters).reduce(function (result, _ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          key = _ref2[0],
          value = _ref2[1];

      return [].concat(_toConsumableArray(result), ["".concat(key).concat(VALUE_DELIMITER).concat(value || '')]);
    }, []).join(PARAM_DELIMITER);
  }
};
exports.Querystring = Querystring;