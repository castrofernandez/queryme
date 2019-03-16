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


var getHistoryFromWindow = function getHistoryFromWindow(_ref) {
  var _ref$history = _ref.history,
      history = _ref$history === void 0 ? {} : _ref$history;
  return history;
};

var getHistory = function getHistory() {
  return getHistoryFromWindow(window);
};

var History = {
  isCompatible: function isCompatible(options) {
    if (!window || !getHistory().pushState) {
      options.update_url = false;
    }
  },
  push: function push(data, title, url) {
    getHistory().pushState(data, title, url);
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

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = __webpack_require__(/*! ./storage */ "./src/storage.js"),
    Storage = _require.Storage;

var _require2 = __webpack_require__(/*! ./history */ "./src/history.js"),
    History = _require2.History;

var querystringme = function () {
  var parameters = {};
  var defaultOptions = {
    force: false,
    update_url: true,
    local_storage: false,
    default_values: {}
  };
  /* Aux functions */

  var getParameterValue = function getParameterValue(value) {
    return value === '' ? null : value;
  };

  var areParametersEmpty = function areParametersEmpty() {
    return Object.entries(parameters).length === 0;
  };

  var getBrowserUrl = function getBrowserUrl() {
    return window.location.href;
  };

  var getQueryStringFromUrl = function getQueryStringFromUrl() {
    var _getBrowserUrl$split = getBrowserUrl().split('?'),
        _getBrowserUrl$split2 = _slicedToArray(_getBrowserUrl$split, 2),
        _getBrowserUrl$split3 = _getBrowserUrl$split2[1],
        second = _getBrowserUrl$split3 === void 0 ? '' : _getBrowserUrl$split3;

    return second;
  };

  var areParametersAlreadyProcessed = function areParametersAlreadyProcessed(options) {
    return !areParametersEmpty() && !options.force;
  };

  var updateUrl = function updateUrl(options) {
    if (!options.update_url) {
      return;
    }

    var paramString = generateQueryString();
    var title = 'querystringme.updateUrl ' + paramString;
    History.push(parameters, title, '?' + paramString);
  };

  var generateQueryString = function generateQueryString() {
    return Object.entries(parameters).reduce(function (result, _ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          key = _ref2[0],
          value = _ref2[1];

      return [].concat(_toConsumableArray(result), ["".concat(key, "=").concat(value || '')]);
    }, []).join('&');
  };

  var processOptions = function processOptions() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var clonedDefaultOptions = Object.assign({}, defaultOptions, options);
    History.isCompatible(clonedDefaultOptions);
    Storage.isCompatible(clonedDefaultOptions);
    return clonedDefaultOptions;
  };

  var processParametersFromUrl = function processParametersFromUrl() {
    getQueryStringFromUrl().split('&').forEach(function (parameter) {
      var _parameter$split = parameter.split('='),
          _parameter$split2 = _slicedToArray(_parameter$split, 2),
          key = _parameter$split2[0],
          _parameter$split2$ = _parameter$split2[1],
          value = _parameter$split2$ === void 0 ? null : _parameter$split2$;

      if (key && key !== '') {
        parameters[key] = getParameterValue(value);
      }
    });
  };

  var setDefaultValues = function setDefaultValues(options) {
    Object.entries(options.default_values).forEach(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          key = _ref4[0],
          _ref4$ = _ref4[1],
          value = _ref4$ === void 0 ? '' : _ref4$;

      if (!parameters.hasOwnProperty(key) || !parameters[key]) {
        parameters[key] = value;
      }
    });
  };

  var getParametersFromUrlAndStorage = function getParametersFromUrlAndStorage(options) {
    var fromStorage = Storage.get(options);
    Object.assign(parameters, fromStorage);
    processParametersFromUrl();
    setDefaultValues(options);

    if (Object.keys(fromStorage).length > 0) {
      updateUrl(options);
      Storage.update(parameters, options);
    }

    return parameters;
  };
  /* Public methods */


  var load = function load(options) {
    defaultOptions = processOptions(options);
    getParametersFromUrlAndStorage(defaultOptions);
    updateUrl(defaultOptions);
  };

  var getParameters = function getParameters(options) {
    options = processOptions(options);

    if (areParametersAlreadyProcessed(options)) {
      return parameters;
    }

    return getParametersFromUrlAndStorage(options);
  };

  var getParameter = function getParameter(key, options) {
    options = processOptions(options);

    if (!key) {
      return null;
    }

    var storedParameters = getParameters(options);
    return storedParameters && storedParameters[key] ? storedParameters[key] : null;
  };

  var updateParameters = function updateParameters(values, options) {
    options = processOptions(options);
    getParameters(options);
    Object.entries(values).forEach(function (_ref5) {
      var _ref6 = _slicedToArray(_ref5, 2),
          key = _ref6[0],
          value = _ref6[1];

      parameters[key] = toString(value) || null;
    }, []);
    updateUrl(options);
    Storage.update(parameters, options);
    return parameters;
  };

  var toString = function toString(value) {
    return value && value.toString && typeof value.toString === 'function' ? value.toString() : value;
  };

  return {
    load: load,
    getParameters: getParameters,
    getParameter: getParameter,
    updateParameters: updateParameters
  };
}();

/* harmony default export */ __webpack_exports__["default"] = (querystringme);

if (window && (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object') {
  window['querystringme'] = querystringme;
}

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

var Storage = {
  isCompatible: function isCompatible(options) {
    if (!window || Object.keys(getStorage()).length === 0) {
      options.local_storage = false;
    }
  },
  update: function update(data, options) {
    return options.local_storage ? getStorage().setItem(localStorageKey, JSON.stringify(data)) : false;
  },
  get: function get(options) {
    return options.local_storage ? JSON.parse(readFromStorage()) : {};
  }
};


/***/ })

/******/ });
//# sourceMappingURL=index.js.map