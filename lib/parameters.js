'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Parameters = void 0;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _require = require('./options'),
    Options = _require.Options;

var parameters = {};

var areParametersEmpty = function areParametersEmpty() {
  return Object.entries(parameters).length === 0;
};

var isFunction = function isFunction(obj) {
  return typeof obj === 'function';
};

var checkStringable = function checkStringable(_ref) {
  var toString = _ref.toString;
  return toString && isFunction(toString);
};

var isStringable = function isStringable(obj) {
  return notNull(obj) && checkStringable(obj);
};

var orNull = function orNull(value) {
  return value || null;
};

var toStr = function toStr(value) {
  return isStringable(value) ? value.toString() : orNull(value);
};

var notNull = function notNull(obj) {
  return obj !== null;
};

var isObject = function isObject(obj) {
  return _typeof(obj) === 'object';
};

var hasValidator = function hasValidator(obj) {
  return obj.validator && isFunction(obj.validator);
};

var isValid = function isValid(obj, value) {
  return obj.validator(value);
};

var getRawValue = function getRawValue(obj) {
  return isObject(obj) ? null : obj;
};

var getDefault = function getDefault(obj) {
  return obj.default ? obj.default : getRawValue(obj);
};

var getValidValue = function getValidValue(obj, value) {
  return isValid(obj, value) ? toStr(value) : toStr(getDefault(obj));
};

var validate = function validate(obj, value) {
  return hasValidator(obj) ? getValidValue(obj, value) : toStr(getValueOrDefault(obj));
};

var getValueOrDefault = function getValueOrDefault(obj) {
  return getValue(obj) || getDefault(obj);
};

var getValue = function getValue(obj) {
  return obj.value || getRawValue(obj);
};

var wrapObject = function wrapObject(value) {
  return isObject(value) ? value : {
    value: value
  };
};

var processWrapperValue = function processWrapperValue(obj) {
  return validate(obj, getValue(obj));
};

var processValue = function processValue() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return processWrapperValue(wrapObject(obj));
};

var accumValue = function accumValue(key, obj) {
  var value = processValue(obj);
  return notNull(value) ? value : processValue(parameters[key]);
};

var Parameters = {
  areProcessed: function areProcessed() {
    return !areParametersEmpty() && !Options.get('force');
  },
  get: function get() {
    return Object.entries(parameters).reduce(function (result, _ref2) {
      var _ref3 = _slicedToArray(_ref2, 2),
          key = _ref3[0],
          obj = _ref3[1];

      return _objectSpread({}, result, _defineProperty({}, key, processValue(obj)));
    }, {});
  },
  update: function update(values) {
    Object.entries(values).forEach(function (_ref4) {
      var _ref5 = _slicedToArray(_ref4, 2),
          key = _ref5[0],
          obj = _ref5[1];

      parameters[key] = _objectSpread({}, parameters[key], obj, {
        value: accumValue(key, obj)
      });
    }, []);
  },
  merge: function merge(values) {
    Object.entries(values).forEach(function (_ref6) {
      var _ref7 = _slicedToArray(_ref6, 2),
          key = _ref7[0],
          _ref7$ = _ref7[1],
          obj = _ref7$ === void 0 ? '' : _ref7$;

      if (!parameters.hasOwnProperty(key) || !parameters[key]) {
        parameters[key] = _objectSpread({}, parameters[key], {
          value: accumValue(key, obj)
        });
      }
    });
  }
};
exports.Parameters = Parameters;