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

/***/ "./node_modules/compareme/lib/array.comparator.js":
/*!********************************************************!*\
  !*** ./node_modules/compareme/lib/array.comparator.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _empty = __webpack_require__(/*! ./empty.comparator */ "./node_modules/compareme/lib/empty.comparator.js");

var range = function range(start, end) {
  return Array(start > end ? 0 : end - start).fill().map(function (_, index) {
    return start + index;
  });
};

var arrayComparator = function arrayComparator(comparator) {
  return function (options, level, index) {
    return {
      compare: function compare(a1, a2) {
        var getMinLength = function getMinLength() {
          return Math.min(a1.length, a2.length);
        };

        var getPos = function getPos(a, pos) {
          return pos < a.length ? a[pos] : undefined;
        };

        var getA1 = function getA1(pos) {
          return getPos(a1, pos);
        };

        var getA2 = function getA2(pos) {
          return getPos(a2, pos);
        };

        var ind = function ind(i) {
          return index ? "".concat(index, ".").concat(i) : i.toString();
        };

        var comparePos = function comparePos(i) {
          return comparator(getA1(i), getA2(i), options, level + 1, ind(i));
        };

        var compareSection = function compareSection(start, end) {
          return range(start, end).reduce(function (result, i) {
            return (0, _empty.mergeResult)(result, comparePos(i));
          }, (0, _empty.emptyResult)());
        };

        var checkCommon = function checkCommon() {
          return compareSection(0, getMinLength());
        };

        var doStrict = function doStrict(_ref) {
          var _ref$strict = _ref.strict,
              strict = _ref$strict === void 0 ? false : _ref$strict;
          return strict ? compareStrict() : (0, _empty.emptyResult)();
        };

        var compareA1Remains = function compareA1Remains() {
          return compareSection(getMinLength(), a1.length);
        };

        var compareA2Remains = function compareA2Remains() {
          return compareSection(a1.length, a2.length);
        };

        var compareStrict = function compareStrict() {
          return (0, _empty.mergeResult)(compareA1Remains(), compareA2Remains());
        };

        var mustCheckDeep = function mustCheckDeep(_ref2) {
          var _ref2$deep = _ref2.deep,
              deep = _ref2$deep === void 0 ? false : _ref2$deep,
              _ref2$strict = _ref2.strict,
              strict = _ref2$strict === void 0 ? false : _ref2$strict;
          return deep || strict;
        };

        var checkDeep = function checkDeep() {
          return (0, _empty.mergeResult)(checkCommon(), doStrict(options));
        };

        return mustCheckDeep(options) ? checkDeep() : (0, _empty.emptyResult)();
      }
    };
  };
};

var _default = arrayComparator;
exports.default = _default;

/***/ }),

/***/ "./node_modules/compareme/lib/compare.js":
/*!***********************************************!*\
  !*** ./node_modules/compareme/lib/compare.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _whatsme = _interopRequireDefault(__webpack_require__(/*! whatsme */ "./node_modules/whatsme/lib/index.js"));

var _empty = __webpack_require__(/*! ./empty.comparator */ "./node_modules/compareme/lib/empty.comparator.js");

var _array = _interopRequireDefault(__webpack_require__(/*! ./array.comparator */ "./node_modules/compareme/lib/array.comparator.js"));

var _object = _interopRequireDefault(__webpack_require__(/*! ./object.comparator */ "./node_modules/compareme/lib/object.comparator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var withIndex = function withIndex(index, obj) {
  return _whatsme.default.isDefined(index) ? _objectSpread({}, obj, {
    index: index
  }) : obj;
};

var getDifference = function getDifference(type1, type2, index) {
  return type1 === type2 ? [] : [withIndex(index, {
    first: type1,
    second: type2
  })];
};

var getResult = function getResult(type1, type2, index) {
  return {
    success: type1 === type2,
    differences: getDifference(type1, type2, index)
  };
};

var mustGoDeep = function mustGoDeep(level, _ref) {
  var _ref$deep = _ref.deep,
      deep = _ref$deep === void 0 ? false : _ref$deep;
  return deep || level === 1;
};

var compare = function compare(obj1, obj2) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var level = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
  var index = arguments.length > 4 ? arguments[4] : undefined;

  var type1 = _whatsme.default.whats(obj1);

  var type2 = _whatsme.default.whats(obj2);

  var result = getResult(type1, type2, index);
  return mustGoDeep(level, options) ? (0, _empty.mergeResult)(result, getComparator(type1)(options, level, index).compare(obj1, obj2)) : result;
};

var comparators = {
  array: (0, _array.default)(compare),
  object: (0, _object.default)(compare)
};

var getComparator = function getComparator(type) {
  return comparators[type] || _empty.emptyComparator;
};

var _default = compare;
exports.default = _default;

/***/ }),

/***/ "./node_modules/compareme/lib/empty.comparator.js":
/*!********************************************************!*\
  !*** ./node_modules/compareme/lib/empty.comparator.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeResult = exports.emptyComparator = exports.emptyResult = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var emptyResult = function emptyResult() {
  return {
    success: true,
    differences: []
  };
};

exports.emptyResult = emptyResult;

var emptyComparator = function emptyComparator() {
  return {
    compare: function compare() {
      return emptyResult();
    }
  };
};

exports.emptyComparator = emptyComparator;

var mergeResult = function mergeResult(res1, res2) {
  return Object.assign(res1, {
    success: res1.success && res2.success,
    differences: [].concat(_toConsumableArray(res1.differences), _toConsumableArray(res2.differences))
  });
};

exports.mergeResult = mergeResult;

/***/ }),

/***/ "./node_modules/compareme/lib/get.js":
/*!*******************************************!*\
  !*** ./node_modules/compareme/lib/get.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _compare = _interopRequireDefault(__webpack_require__(/*! ./compare */ "./node_modules/compareme/lib/compare.js"));

var _properties = __webpack_require__(/*! ./properties */ "./node_modules/compareme/lib/properties.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var createInstance = function createInstance(value) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var instance = {
    with: function _with(obj) {
      return (0, _compare.default)(value, obj, options);
    }
  };
  (0, _properties.defineProperties)(instance, {
    differences: function differences() {
      return instance;
    },
    deeply: function deeply() {
      return createInstance(value, _objectSpread({}, options, {
        deep: true
      }));
    },
    strictly: function strictly() {
      return createInstance(value, _objectSpread({}, options, {
        strict: true
      }));
    }
  });
  return instance;
};

var get = function get(obj) {
  return createInstance(obj);
};

var _default = get;
exports.default = _default;

/***/ }),

/***/ "./node_modules/compareme/lib/index.js":
/*!*********************************************!*\
  !*** ./node_modules/compareme/lib/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _is = _interopRequireDefault(__webpack_require__(/*! ./is */ "./node_modules/compareme/lib/is.js"));

var _get = _interopRequireDefault(__webpack_require__(/*! ./get */ "./node_modules/compareme/lib/get.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  is: _is.default,
  get: _get.default
};
exports.default = _default;

/***/ }),

/***/ "./node_modules/compareme/lib/is.js":
/*!******************************************!*\
  !*** ./node_modules/compareme/lib/is.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _compare = _interopRequireDefault(__webpack_require__(/*! ./compare */ "./node_modules/compareme/lib/compare.js"));

var _properties = __webpack_require__(/*! ./properties */ "./node_modules/compareme/lib/properties.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var createInstance = function createInstance(value) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$comparison = options.comparison,
      comparison = _options$comparison === void 0 ? true : _options$comparison;
  var instance = {
    like: function like(obj) {
      return comparison === (0, _compare.default)(value, obj, options).success;
    }
  };
  (0, _properties.defineProperties)(instance, {
    not: function not() {
      return createInstance(value, _objectSpread({}, options, {
        comparison: !comparison
      }));
    },
    deeply: function deeply() {
      return createInstance(value, _objectSpread({}, options, {
        deep: true
      }));
    },
    strictly: function strictly() {
      return createInstance(value, _objectSpread({}, options, {
        strict: true
      }));
    }
  });
  return instance;
};

var is = function is(obj) {
  return createInstance(obj);
};

var _default = is;
exports.default = _default;

/***/ }),

/***/ "./node_modules/compareme/lib/object.comparator.js":
/*!*********************************************************!*\
  !*** ./node_modules/compareme/lib/object.comparator.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _empty = __webpack_require__(/*! ./empty.comparator */ "./node_modules/compareme/lib/empty.comparator.js");

var objectComparator = function objectComparator(comparator) {
  return function (options, level, index) {
    return {
      compare: function compare(o1, o2) {
        var o1Keys = Object.keys(o1);
        var o2Keys = Object.keys(o2);

        var ind = function ind(key) {
          return index ? "".concat(index, ".").concat(key) : key.toString();
        };

        var compKey = function compKey(key) {
          return comparator(o1[key], o2[key], options, level + 1, ind(key));
        };

        var compareByKeys = function compareByKeys(keys) {
          return keys.reduce(function (result, key) {
            return (0, _empty.mergeResult)(result, compKey(key));
          }, (0, _empty.emptyResult)());
        };

        var getCommonKeys = function getCommonKeys() {
          return o1Keys.filter(function (key) {
            return o2Keys.includes(key);
          });
        };

        var checkCommon = function checkCommon() {
          return compareByKeys(getCommonKeys());
        };

        var doStrict = function doStrict(_ref) {
          var _ref$strict = _ref.strict,
              strict = _ref$strict === void 0 ? false : _ref$strict;
          return strict ? compareStrict() : (0, _empty.emptyResult)();
        };

        var getO1Remains = function getO1Remains() {
          return o1Keys.filter(function (key) {
            return !o2Keys.includes(key);
          });
        };

        var getO2Remains = function getO2Remains() {
          return o2Keys.filter(function (key) {
            return !o1Keys.includes(key);
          });
        };

        var compareO1Remains = function compareO1Remains() {
          return compareByKeys(getO1Remains());
        };

        var compareO2Remains = function compareO2Remains() {
          return compareByKeys(getO2Remains());
        };

        var compareStrict = function compareStrict() {
          return (0, _empty.mergeResult)(compareO1Remains(), compareO2Remains());
        };

        var mustCheckDeep = function mustCheckDeep(_ref2) {
          var _ref2$deep = _ref2.deep,
              deep = _ref2$deep === void 0 ? false : _ref2$deep,
              _ref2$strict = _ref2.strict,
              strict = _ref2$strict === void 0 ? false : _ref2$strict;
          return deep || strict;
        };

        var checkDeep = function checkDeep() {
          return (0, _empty.mergeResult)(checkCommon(), doStrict(options));
        };

        return mustCheckDeep(options) ? checkDeep() : (0, _empty.emptyResult)();
      }
    };
  };
};

var _default = objectComparator;
exports.default = _default;

/***/ }),

/***/ "./node_modules/compareme/lib/properties.js":
/*!**************************************************!*\
  !*** ./node_modules/compareme/lib/properties.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defineProperties = exports.defineProperty = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var defineProperty = function defineProperty(instance, name, getter) {
  Object.defineProperty(instance, name, {
    get: getter,
    configurable: false
  });
};

exports.defineProperty = defineProperty;

var defineProperties = function defineProperties(instance, properties) {
  Object.entries(properties).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        name = _ref2[0],
        getter = _ref2[1];

    defineProperty(instance, name, getter);
  });
};

exports.defineProperties = defineProperties;

/***/ }),

/***/ "./node_modules/whatsme/lib/index.js":
/*!*******************************************!*\
  !*** ./node_modules/whatsme/lib/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var isType = _interopRequireWildcard(__webpack_require__(/*! ./is.type */ "./node_modules/whatsme/lib/is.type.js"));

var isOther = _interopRequireWildcard(__webpack_require__(/*! ./is.other */ "./node_modules/whatsme/lib/is.other.js"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var whats = function whats(obj) {
  return geyKey(getFirstType(obj));
};
/* Aux */


var geyKey = function geyKey() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return obj.type || '';
};

var getFirstType = function getFirstType(obj) {
  return isType.validators.find(function (_ref) {
    var check = _ref.check;
    return check(obj);
  });
};

var whatsme = _objectSpread({}, isType.exposedMethods, isOther, {
  whats: whats
});

var _default = whatsme;
exports.default = _default;

/***/ }),

/***/ "./node_modules/whatsme/lib/is.other.js":
/*!**********************************************!*\
  !*** ./node_modules/whatsme/lib/is.other.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "isNotNull", {
  enumerable: true,
  get: function get() {
    return _is.isNotNull;
  }
});
Object.defineProperty(exports, "isBoolean", {
  enumerable: true,
  get: function get() {
    return _is.isBoolean;
  }
});
exports.isNotEmpty = exports.isEmpty = exports.isFalsy = exports.isTruthy = exports.isSomething = exports.isDefined = void 0;

var _is = __webpack_require__(/*! ./is.type */ "./node_modules/whatsme/lib/is.type.js");

var isDefined = function isDefined(obj) {
  return !(0, _is.isUndefined)(obj);
};

exports.isDefined = isDefined;

var isSomething = function isSomething(obj) {
  return (0, _is.isNotNull)(obj) && isDefined(obj);
};

exports.isSomething = isSomething;

var isTruthy = function isTruthy(obj) {
  return !isFalsy(obj);
};

exports.isTruthy = isTruthy;

var isFalsy = function isFalsy(obj) {
  return (0, _is.isFalse)(obj) || !isSomething(obj) || (0, _is.isNaN)(obj) || obj === 0 || obj === '';
};

exports.isFalsy = isFalsy;

var isEmpty = function isEmpty(obj) {
  return isFalsy(obj) || (0, _is.isArray)(obj) && obj.length === 0 || (0, _is.isObject)(obj) && Object.keys(obj).length === 0;
};

exports.isEmpty = isEmpty;

var isNotEmpty = function isNotEmpty(obj) {
  return !isEmpty(obj);
};

exports.isNotEmpty = isNotEmpty;

/***/ }),

/***/ "./node_modules/whatsme/lib/is.type.js":
/*!*********************************************!*\
  !*** ./node_modules/whatsme/lib/is.type.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exposedMethods = exports.validators = exports.isBoolean = exports.isNotNull = exports.isObject = exports.isDate = exports.isRegExp = exports.isFalse = exports.isTrue = exports.isArray = exports.isNaN = exports.isNumber = exports.isString = exports.isSymbol = exports.isUndefined = exports.isNull = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var isNull = function isNull(obj) {
  return obj === null;
};

exports.isNull = isNull;

var isUndefined = function isUndefined(obj) {
  return typeof obj === 'undefined';
};

exports.isUndefined = isUndefined;

var isSymbol = function isSymbol(obj) {
  return _typeof(obj) === 'symbol' || hasSymbolPrototype(obj);
};

exports.isSymbol = isSymbol;

var isString = function isString(obj) {
  return typeof obj === 'string' || obj instanceof String;
};

exports.isString = isString;

var isNumber = function isNumber(obj) {
  return !isNaN(parseFloat(obj)) && isFinite(obj);
};

exports.isNumber = isNumber;

var isNaN = function isNaN(obj) {
  return typeof obj === 'number' && Number.isNaN(obj);
};

exports.isNaN = isNaN;

var isArray = function isArray(obj) {
  return Array.isArray(obj);
};

exports.isArray = isArray;

var isTrue = function isTrue(obj) {
  return isBoolean(obj) && obj === true;
};

exports.isTrue = isTrue;

var isFalse = function isFalse(obj) {
  return isBoolean(obj) && obj === false;
};

exports.isFalse = isFalse;

var isRegExp = function isRegExp(obj) {
  return obj instanceof RegExp;
};

exports.isRegExp = isRegExp;

var isDate = function isDate(obj) {
  return comparePrototype(obj, '[object Date]');
};

exports.isDate = isDate;

var isObject = function isObject(obj) {
  return isNotNull(obj) && _typeof(obj) === 'object';
};
/* Aux */


exports.isObject = isObject;

var isBoolean = function isBoolean(obj) {
  return typeof obj === 'boolean';
};

exports.isBoolean = isBoolean;

var isNotNull = function isNotNull(obj) {
  return !isNull(obj);
};

exports.isNotNull = isNotNull;

var getPrototype = function getPrototype(obj) {
  return Object.prototype.toString.call(obj);
};

var comparePrototype = function comparePrototype(obj, prototype) {
  return getPrototype(obj) === prototype;
};

var hasSymbolPrototype = function hasSymbolPrototype(obj) {
  return comparePrototype(obj, '[object Symbol]');
};

var validators = [{
  name: 'isNull',
  check: isNull,
  type: 'null'
}, {
  name: 'isUndefined',
  check: isUndefined,
  type: 'undefined'
}, {
  name: 'isSymbol',
  check: isSymbol,
  type: 'symbol'
}, {
  name: 'isArray',
  check: isArray,
  type: 'array'
}, {
  name: 'isString',
  check: isString,
  type: 'string'
}, {
  name: 'isNumber',
  check: isNumber,
  type: 'number'
}, {
  name: 'isNaN',
  check: isNaN,
  type: 'NaN'
}, {
  name: 'isBoolean',
  check: isBoolean,
  type: 'boolean'
}, {
  name: 'isRegExp',
  check: isRegExp,
  type: 'RegExp'
}, {
  name: 'isDate',
  check: isDate,
  type: 'Date'
}, {
  name: 'isObject',
  check: isObject,
  type: 'object'
}];
exports.validators = validators;
var exposedMethods = {
  isNull: isNull,
  isUndefined: isUndefined,
  isSymbol: isSymbol,
  isArray: isArray,
  isString: isString,
  isNumber: isNumber,
  isNaN: isNaN,
  isTrue: isTrue,
  isFalse: isFalse,
  isRegExp: isRegExp,
  isDate: isDate,
  isObject: isObject
};
exports.exposedMethods = exposedMethods;

/***/ }),

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
/* harmony import */ var compareme__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! compareme */ "./node_modules/compareme/lib/index.js");
/* harmony import */ var compareme__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(compareme__WEBPACK_IMPORTED_MODULE_0__);



var defaultOptions = {
  force: false,
  updateUrl: true,
  localStorage: false,
  defaultValues: {}
};
var compoundOptions = Object.assign({}, defaultOptions);

var getDiffOptions = function getDiffOptions(options) {
  return compareme__WEBPACK_IMPORTED_MODULE_0___default.a.get(options).differences.strictly.with(defaultOptions).differences.filter(function (diff) {
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
    console.error("The option \"".concat(diff.key, "\" is expected to be ") + "\"".concat(diff.expected, "\" but received as \"").concat(diff.actual, "\"."));
  });
  getInvalidOptions(options).forEach(function (diff) {
    console.error("The option \"".concat(diff.key, "\" is not valid."));
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


function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _require = __webpack_require__(/*! ./options */ "./src/options.js"),
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