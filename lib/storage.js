'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Storage = void 0;

var _require = require('./options'),
    Options = _require.Options;

var localStorageKey = 'querystringme.parameters';

var readFromStorage = function readFromStorage() {
  return getStorage().getItem(localStorageKey) || '{}';
};

var getStorage = function getStorage() {
  return getStorageFromWindow(window);
};

var getStorageFromWindow = function getStorageFromWindow(_ref) {
  var _ref$localStorage = _ref.localStorage,
      localStorage = _ref$localStorage === void 0 ? {} : _ref$localStorage;
  return localStorage;
};

var isCompatible = function isCompatible() {
  return window && Object.keys(getStorage()).length > 0;
};

var isEnabled = function isEnabled() {
  return Options.get('localStorage') && isCompatible();
};

var Storage = {
  update: function update(data) {
    return isEnabled() ? getStorage().setItem(localStorageKey, JSON.stringify(data)) : false;
  },
  get: function get() {
    return isEnabled() ? JSON.parse(readFromStorage()) : {};
  },
  size: function size() {
    return isEnabled() ? Object.keys(getStorage()).length : 0;
  }
};
exports.Storage = Storage;