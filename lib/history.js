'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.History = void 0;

var _require = require('./options'),
    Options = _require.Options;

var getHistoryFromWindow = function getHistoryFromWindow(_ref) {
  var _ref$history = _ref.history,
      history = _ref$history === void 0 ? {} : _ref$history;
  return history;
};

var getHistory = function getHistory() {
  return getHistoryFromWindow(window);
};

var getTitle = function getTitle(url) {
  return "querystringme.updateUrl ".concat(url);
};

var isCompatible = function isCompatible() {
  return window && getHistory().pushState;
};

var isEnabled = function isEnabled() {
  return Options.get('updateUrl') && isCompatible();
};

var History = {
  push: function push(data, url) {
    return isEnabled() ? getHistory().pushState(data, getTitle(url), url) : false;
  }
};
exports.History = History;