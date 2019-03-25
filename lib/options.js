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

var getInvalidOptions = function getInvalidOptions(options) {
  return _compareme.default.get(defaultOptions).unexpected.elements.strictly.with(options).map(function (diff) {
    return {
      key: diff.index
    };
  });
};

var getWrongTypeOptions = function getWrongTypeOptions(options) {
  return _compareme.default.get(defaultOptions).type.differences.strictly.with(options).map(function (diff) {
    return {
      key: diff.index,
      expected: diff.first,
      actual: diff.second
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