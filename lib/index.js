/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/history.js":
/*!************************!*\
  !*** ./src/history.js ***!
  \************************/
/*! exports provided: History */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "History", function() { return History; });


var _require = __webpack_require__(/*! ./options */ "./src/options.js"),
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


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = __webpack_require__(/*! ./parameters */ "./src/parameters.js"),
    Parameters = _require.Parameters;

var _require2 = __webpack_require__(/*! ./storage */ "./src/storage.js"),
    Storage = _require2.Storage;

var _require3 = __webpack_require__(/*! ./history */ "./src/history.js"),
    History = _require3.History;

var _require4 = __webpack_require__(/*! ./querystring */ "./src/querystring.js"),
    Querystring = _require4.Querystring;

var _require5 = __webpack_require__(/*! ./options */ "./src/options.js"),
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
  if (Storage.size() > 0) {
    updateUrl();
    updateStore();
  }
};

var processParametersFromUrlAndStorage = function processParametersFromUrlAndStorage() {
  Parameters.update(_objectSpread({}, Storage.get(), Querystring.get(), Options.get('defaultValues')));
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
/* harmony default export */ __webpack_exports__["default"] = (querystringme);

if (window && (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object') {
  window['querystringme'] = querystringme;
}

/***/ }),

/***/ "./src/options.js":
/*!************************!*\
  !*** ./src/options.js ***!
  \************************/
/*! exports provided: Options */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Options", function() { return Options; });


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


/***/ }),

/***/ "./src/parameters.js":
/*!***************************!*\
  !*** ./src/parameters.js ***!
  \***************************/
/*! exports provided: Parameters */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Parameters", function() { return Parameters; });


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = __webpack_require__(/*! ./options */ "./src/options.js"),
    Options = _require.Options;

var parameters = {};

var areParametersEmpty = function areParametersEmpty() {
  return Object.entries(parameters).length === 0;
};

var isFunction = function isFunction(obj) {
  return typeof obj === 'function';
};

var isStringable = function isStringable(_ref) {
  var toString = _ref.toString;
  return toString && isFunction(toString);
};

var checkStringable = function checkStringable(obj) {
  return obj && isStringable(obj);
};

var toString = function toString(value) {
  return checkStringable(value) ? value.toString() : value;
};

var Parameters = {
  areProcessed: function areProcessed() {
    return !areParametersEmpty() && !Options.get('force');
  },
  get: function get() {
    return parameters;
  },
  update: function update(values) {
    Object.entries(values).forEach(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 2),
          key = _ref3[0],
          value = _ref3[1];

      parameters[key] = toString(value) || null;
    }, []);
  },
  merge: function merge(values) {
    Object.entries(values).forEach(function (_ref4) {
      var _ref5 = _slicedToArray(_ref4, 2),
          key = _ref5[0],
          _ref5$ = _ref5[1],
          value = _ref5$ === void 0 ? '' : _ref5$;

      if (!parameters.hasOwnProperty(key) || !parameters[key]) {
        parameters[key] = value;
      }
    });
  }
};


/***/ }),

/***/ "./src/querystring.js":
/*!****************************!*\
  !*** ./src/querystring.js ***!
  \****************************/
/*! exports provided: Querystring */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Querystring", function() { return Querystring; });


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

var getParameterValue = function getParameterValue(value) {
  return value === '' ? null : value;
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


/***/ }),

/***/ "./src/storage.js":
/*!************************!*\
  !*** ./src/storage.js ***!
  \************************/
/*! exports provided: Storage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Storage", function() { return Storage; });


var _require = __webpack_require__(/*! ./options */ "./src/options.js"),
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


/***/ })

/******/ });
//# sourceMappingURL=index.js.map