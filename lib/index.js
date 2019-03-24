'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _require = require('./parameters'),
    Parameters = _require.Parameters;

var _require2 = require('./storage'),
    Storage = _require2.Storage;

var _require3 = require('./history'),
    History = _require3.History;

var _require4 = require('./querystring'),
    Querystring = _require4.Querystring;

var _require5 = require('./options'),
    Options = _require5.Options;

var updateUrl = function updateUrl() {
  return History.push(Parameters.get(), getQuery());
};

var getQuery = function getQuery() {
  return '?' + Querystring.generate(Parameters.get());
};

var updateStore = function updateStore() {
  return Storage.update(Parameters.get());
};

var updateUrlAndStore = function updateUrlAndStore() {
  updateUrl();
  updateStore();
};

var processParametersFromUrlAndStorage = function processParametersFromUrlAndStorage() {
  Parameters.update(Options.get('defaultValues'));
  Parameters.update(Storage.get());
  Parameters.update(Querystring.get());
  updateUrlAndStore();
};

var processParameters = function processParameters() {
  return Parameters.areProcessed() ? false : processParametersFromUrlAndStorage();
};

var start = function start() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  Options.merge(options);
  processParameters();
};

var querystringme = {
  load: function load(options) {
    start(options);
  },
  getParameters: function getParameters(options) {
    start(options);
    return Parameters.get();
  },
  getParameter: function getParameter(key) {
    start();

    var _Parameters$get = Parameters.get(),
        _Parameters$get$key = _Parameters$get[key],
        value = _Parameters$get$key === void 0 ? null : _Parameters$get$key;

    return value;
  },
  updateParameters: function updateParameters(values, options) {
    start(options);
    Parameters.update(values);
    Storage.update(Parameters.get());
    updateUrl();
    return Parameters.get();
  }
};
var _default = querystringme;
exports.default = _default;

if (window && (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object') {
  window['querystringme'] = querystringme;
}