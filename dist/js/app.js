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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _checkTimeline = __webpack_require__(2);

var _checkTimeline2 = _interopRequireDefault(_checkTimeline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _checkTimeline2.default)();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = checkTimeLine;


function checkTimeLine() {
  checkTimeLine.bindUIActions();
}

checkTimeLine.bindUIActions = function () {
  document.addEventListener('click', checkCenterLabel);
  document.addEventListener('click', checkDownLabel);
};

function checkCenterLabel(event) {
  var target = event.target;
  if (target.closest('.btn-center-label')) {
    target.closest('.section').classList.toggle('label-center');

    if (target.textContent == "хочу по центру чек-поинта") {
      target.textContent = "хочу по центру прогресс-линии";
    } else {
      target.textContent = "хочу по центру чек-поинта";
    }
  } else {
    document.querySelectorAll('.section').forEach(function (item) {
      if (target.closest('.btn-center-label')) {
        item.classList.remove('label-center');
      }
    });
  }
}

function checkDownLabel(event) {
  var target = event.target;
  if (target.closest('.btn-down-label')) {
    target.closest('.section').classList.toggle('label-down');

    if (target.textContent == "хочу над таймлайном") {
      target.textContent = "хочу под таймлайном";
    } else {
      target.textContent = "хочу над таймлайном";
    }
  } else {
    document.querySelectorAll('.section').forEach(function (item) {
      if (target.closest('.btn-down-label')) {
        item.classList.remove('label-down');
      }
    });
  }
}

/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map