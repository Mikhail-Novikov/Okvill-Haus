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


var _menu = __webpack_require__(2);

var _menu2 = _interopRequireDefault(_menu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _menu2.default)();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = intializeMenu;


var settings = {
	shrinktogglerAfter: 'firstpage', // shrink hamburgerui UL to just show last LI with hamburger icon when user scrolls the page down? 'firstpage' or px number (ie: 200)
	dismissmenuDelay: 200 // delay in miliseconds after user clicks on full screen menu before hiding it
};

function intializeMenu() {
	var $menuwrapper = $('#hamburgericonmenuwrapper');
	var $fullscreenmenu = $menuwrapper.find('#fullscreenmenu');
	var $hamburgerui = $('#hamburgerui');
	var $toggler = $('#navtoggler').parent();
	var scrolltop;
	var strinkafter;
	var shrinktimer;
	var dismisstimer;

	$toggler.on('click', function (e) {
		$menuwrapper.toggleClass('open');
		e.preventDefault();
	});

	$fullscreenmenu.on('click', function (e) {
		clearTimeout(dismisstimer);
		dismisstimer = setTimeout(function () {
			$menuwrapper.removeClass('open');
		}, settings.dismissmenuDelay);
	});

	if ($menuwrapper.length == 1 && settings.shrinktogglerAfter != 0) {
		var shrinktogglerAfter = settings.shrinktogglerAfter;
		$(window).on('scroll resize', function (e) {
			clearTimeout(shrinktimer);
			shrinktimer = setTimeout(function () {
				scrolltop = $(window).scrollTop();
				strinkafter = shrinktogglerAfter == 'firstpage' ? $(window).height() : parseInt(shrinktogglerAfter);
				if (scrolltop > strinkafter && !$hamburgerui.hasClass('shrink')) {
					$hamburgerui.addClass('shrink');
				} else if (scrolltop < strinkafter && $hamburgerui.hasClass('shrink')) {
					$hamburgerui.removeClass('shrink');
				}
			}, 50);
		});
	}
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)))

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map