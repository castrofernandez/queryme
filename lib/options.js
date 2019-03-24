'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Options = void 0;

var _compareme = _interopRequireDefault(require("compareme"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultOptions = {
  force: false,
  updateUrl: true,
  localStorage: false,
  defaultValues: {}
};
var compoundOptions = Object.assign({}, defaultOptions);

var getDiffOptions = function getDiffOptions(options) {
  return _compareme.default.get(options).differences.strictly.with(defaultOptions).differences.filter(function (diff) {
    return diff.first !== 'undefined';
  });
};

var getInvalidOptions = function getInvalidOptions(options) {
  return getDiffOptions(options).filter(function (diff) {
    return diff.second === 'undefined';
  }).map(function (diff) {
    return {
      key: diff.index
    };
  });
};

var getWrongTypeOptions = function getWrongTypeOptions(options) {
  return getDiffOptions(options).filter(function (diff) {
    return diff.second !== 'undefined';
  }).map(function (diff) {
    return {
      key: diff.index,
      expected: diff.second,
      actual: diff.first
    };
  });
};

var validateOptions = function validateOptions(options) {
  getWrongTypeOptions(options).forEach(function (diff) {
    console.error("[querystringme] The option \"".concat(diff.key, "\" is expected to be ") + "\"".concat(diff.expected, "\" but received as \"").concat(diff.actual, "\"."));
  });
  getInvalidOptions(options).forEach(function (diff) {
    console.error("[querystringme] The option \"".concat(diff.key, "\" is not valid."));
  });
};

var Options = {
  get: function get() {
    var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return key ? compoundOptions[key] : compoundOptions;
  },
  merge: function merge() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    validateOptions(options);
    return Object.assign(compoundOptions, options);
  }
};
exports.Options = Options;