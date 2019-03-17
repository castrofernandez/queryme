'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Options = void 0;
var defaultOptions = {
  force: false,
  updateUrl: true,
  localStorage: false,
  defaultValues: {}
};
var compoundOptions = Object.assign({}, defaultOptions);
var Options = {
  get: function get() {
    var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return key ? compoundOptions[key] : compoundOptions;
  },
  merge: function merge() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return Object.assign(compoundOptions, options);
  }
};
exports.Options = Options;