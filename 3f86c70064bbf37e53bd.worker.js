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
/******/ 	return __webpack_require__(__webpack_require__.s = "./node_modules/babel-loader/lib/index.js!./client/diffy/worker.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./client/diffy/utils.js":
/*!*******************************!*\
  !*** ./client/diffy/utils.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.polarize = exports.abs = exports.round = exports.$ = exports.createOnceLog = void 0;

/* eslint-disable no-console */

/*
  utility function to log only once
  useful for logging in loops
*/
var createOnceLog = function createOnceLog() {
  var counter = 0;
  return function onceLog() {
    if (counter < 1) {
      var _console;

      (_console = console).log.apply(_console, arguments);
    }

    counter++;
  };
};
/*
  utility function to access DOM references
*/


exports.createOnceLog = createOnceLog;

var $ = function $(selector) {
  return document.querySelector(selector);
};
/*
  bitwise Math.round
*/


exports.$ = $;

var round = function round(number) {
  return number + .5 >> 0;
};
/*
  bitwise Math.abs
*/


exports.round = round;

var abs = function abs(value) {
  return (value ^ value >> 31) - (value >> 31);
};
/*
  polarize pixel values based on value and threshold
*/


exports.abs = abs;

var polarize = function polarize(value, threshold) {
  return value > threshold ? 0x00 : 0XFF;
};

exports.polarize = polarize;

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./client/diffy/worker.js":
/*!****************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./client/diffy/worker.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _utils = __webpack_require__(/*! ./utils */ "./client/diffy/utils.js");

var pixelData;
var average1;
var average2;
var delta;
var actualSensitivity;

var createDiffBuffer = function createDiffBuffer(_ref) {
  var _ref$data = _ref.data,
      buffer = _ref$data.buffer,
      data1 = _ref$data.data1,
      data2 = _ref$data.data2,
      width = _ref$data.width,
      height = _ref$data.height,
      sensitivity = _ref$data.sensitivity,
      threshold = _ref$data.threshold;
  var i = 0;
  actualSensitivity = 1 - sensitivity;
  pixelData = new Uint32Array(buffer);

  for (var y = 0; y < height; ++y) {
    for (var x = 0; x < width; ++x) {
      i = y * width + x;
      average1 = (data1[i * 4] + data1[i * 4 + 1] + data1[i * 4 + 2]) / 3 / actualSensitivity;
      average2 = (data2[i * 4] + data2[i * 4 + 1] + data2[i * 4 + 2]) / 3 / actualSensitivity;
      delta = (0, _utils.polarize)((0, _utils.abs)(average1 - average2), threshold);
      pixelData[i] = 255 << 24 | // alpha
      delta << 16 | // blue
      delta << 8 | // green
      delta; // red
    }
  }

  postMessage(buffer);
};

onmessage = createDiffBuffer;

/***/ })

/******/ });
//# sourceMappingURL=3f86c70064bbf37e53bd.worker.js.map