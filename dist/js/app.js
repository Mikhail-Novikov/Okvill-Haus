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
/* WEBPACK VAR INJECTION */(function($) {

var _menu = __webpack_require__(3);

var _menu2 = _interopRequireDefault(_menu);

var _bgSlider = __webpack_require__(4);

var _bgSlider2 = _interopRequireDefault(_bgSlider);

var _bgSliderSmall = __webpack_require__(5);

var _bgSliderSmall2 = _interopRequireDefault(_bgSliderSmall);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _menu2.default)();
(0, _bgSlider2.default)();
(0, _bgSliderSmall2.default)();

$('.js-slide-big').slide({
  'slideSpeed': 6000000,
  'isShowArrow': true,
  'dotsEvent': 'mouseenter',
  'isLoadAllImgs': true,
  dotActiveClass: 'active',
  dotsClass: 'dots',
  arrowClass: 'arrow',
  arrowLeftClass: 'arrow-left',
  arrowRightClass: 'arrow-right'
});

$('.js-slide-small').each(function () {

  $(this).slideSmall({
    'slideSpeed': 3000000,
    'isShowArrow': true,
    'dotsEvent': 'mouseenter',
    'isLoadAllImgs': true,
    dotActiveClass: 'active',
    dotsClass: 'dots',
    arrowClass: 'arrow',
    arrowLeftClass: 'arrow-left arrow--small',
    arrowRightClass: 'arrow-right arrow--small'
  });
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(2)))

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = intializeMenu;


var settings = {
	shrinktogglerAfter: 'firstpage',
	dismissmenuDelay: 200
};

function intializeMenu() {
	var $menuwrapper = $('.hamburger-icon-menu-wrapper');
	var $fullscreenmenu = $menuwrapper.find('.full-screen-menu');
	var $hamburgerui = $('.hamburger-ui');
	var $toggler = $('.nav-toggler').parent();
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
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(2)))

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = bgSlider;


function bgSlider() {

  var slide = {
    defaults: {
      isAutoSlide: true,
      isHoverStop: true,
      isBlurStop: true,
      isShowDots: true,
      isShowArrow: true,
      isHoverShowArrow: true,
      isLoadAllImgs: false,
      slideSpeed: 10000,
      switchSpeed: 500,
      dotsClass: 'dots',
      dotActiveClass: 'active',
      dotsEvent: 'click',
      arrowClass: 'arrow',
      arrowLeftClass: 'arrow-left',
      arrowRightClass: 'arrow-right'
    },

    // curr options
    options: null,

    curIndex: 0,

    timer: null,

    dotsList: [],

    // init function
    init: function init(elem, options) {
      var $self = $(elem),
          list = $self.find('ul li'),
          self = this,
          o;
      console.log(list);
      o = this.options = $.extend({}, this.defaults, options);

      if (o.isShowDots) {
        this._createDots(elem, list);
      }

      if (o.isShowArrow) {
        this._createArrow(elem, list);
      }

      if (o.isLoadAllImgs) {
        list.each(function () {
          $(this).css({
            'background': 'url(' + $(this).attr('data-bg') + ')',
            'opacity': '0',
            'z-index': '0',
            'background-position': '50% 50%',
            'background-size': 'cover'
          });
          $(this).attr('data-bg', '');
        });
      }

      this._showBlock(list[this.curIndex]);

      if (o.isAutoSlide) {
        this._defaultSlide(list);

        if (o.isHoverStop) {
          var className = $self.attr('class');
          $self.on('mouseenter', function (e) {
            clearInterval(self.timer);
          }).on('mouseleave', function () {
            clearInterval(self.timer);
            self._defaultSlide(list);
          });
        }

        if (o.isBlurStop) {
          $(window).on('blur', function () {
            clearInterval(self.timer);
          }).on('focus', function () {
            clearInterval(self.timer);
            self._defaultSlide(list);
          });
        }
      }
    },

    // default slide
    _defaultSlide: function _defaultSlide(list) {
      var self = this;

      this.timer = setInterval(function () {
        self._hideBlock(list[self.curIndex]);
        self.curIndex = (self.curIndex + 1) % list.length;
        self._showBlock(list[self.curIndex]);
      }, this.options.slideSpeed);
    },

    // show block
    _showBlock: function _showBlock(block) {

      var self = this;
      var o = self.options,
          $block = $(block),
          bg = $(block).attr('data-bg');

      if (bg) {
        $block.css({
          'background': 'url(' + bg + ')',
          'opacity': '0',
          'z-index': '0',
          'background-position': '50% 50%',
          'background-size': 'cover'
        });
        $block.attr('data-bg', '');
      }

      $block.stop().animate({
        'opacity': '1',
        'z-index': '1'
      }, o.switchSpeed);

      if (o.isShowDots) {
        $(this.dotsList[this.curIndex]).addClass(o.dotActiveClass);
      }
    },

    // hide block
    _hideBlock: function _hideBlock(block) {
      var o = this.options;

      $(block).stop().animate({
        'opacity': '0',
        'z-index': '0'
      }, o.switchSpeed);

      if (o.isShowDots) {
        $(this.dotsList[this.curIndex]).removeClass(o.dotActiveClass);
      }
    },

    // create dots
    _createDots: function _createDots(elem, list) {
      var self = this,
          dotsEvent = this.options.dotsEvent;

      var dots = $('<ol/>', {
        class: this.options.dotsClass
      });

      var dotsList = [];
      for (var i = 0; i < list.length; i++) {
        dotsList[i] = $('<li/>');
        dots.append(dotsList[i]);
      }

      $(elem).append(dots);
      this.dotsList = dotsList;

      // dots
      if (dotsEvent === 'click' || dotsEvent === 'mouseover' || dotsEvent === 'mouseenter') {
        dots.find('li').on(dotsEvent, function () {
          self._hideBlock(list[self.curIndex]);
          self.curIndex = $(this).index();
          self._showBlock(list[self.curIndex]);
        });
      }
    },

    // create arrowClass
    _createArrow: function _createArrow(elem, list) {
      var self = this;

      var arrow = $('<div/>', {
        class: this.options.arrowClass
      });

      var leftArrow = $('<a/>', {
        class: this.options.arrowLeftClass
      });

      var rightArrow = $('<a/>', {
        class: this.options.arrowRightClass
      });

      arrow.append(leftArrow).append(rightArrow);
      $(elem).append(arrow);

      if (this.options.isHoverShowArrow) {
        arrow.css('opacity', 0.5);
        $(elem).on('mouseenter', function () {
          arrow.css('opacity', 1);
        }).on('mouseleave', function () {
          arrow.css('opacity', 0.5);
        });
      }

      leftArrow.on('click', function () {
        self._hideBlock(list[self.curIndex]);
        self.curIndex = (list.length + (self.curIndex - 1)) % list.length;
        self._showBlock(list[self.curIndex]);
      });

      rightArrow.on('click', function () {
        self._hideBlock(list[self.curIndex]);
        self.curIndex = (self.curIndex + 1) % list.length;
        self._showBlock(list[self.curIndex]);
      });
    }
  };

  // main function
  $.fn.slide = function (options) {

    var self = this;
    slide.init(self, options);
    return self;
  };
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(2)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = bgSliderSmall;


function bgSliderSmall() {

  var slide = {
    defaults: {
      isAutoSlide: true,
      isHoverStop: true,
      isBlurStop: true,
      isShowDots: true,
      isShowArrow: true,
      isHoverShowArrow: true,
      isLoadAllImgs: false,
      slideSpeed: 10000,
      switchSpeed: 500,
      dotsClass: 'dots',
      dotActiveClass: 'active',
      dotsEvent: 'click',
      arrowClass: 'arrow',
      arrowLeftClass: 'arrow-left',
      arrowRightClass: 'arrow-right'
    },

    // curr options
    options: null,

    curIndex: 0,

    timer: null,

    dotsList: [],

    // init function
    init: function init(elem, options) {
      var $self = $(elem),
          list = $self.find('ul li'),
          self = this,
          o;

      o = this.options = $.extend({}, this.defaults, options);

      if (o.isShowDots) {
        this._createDots(elem, list);
      }

      if (o.isShowArrow) {
        this._createArrow(elem, list);
      }

      if (o.isLoadAllImgs) {
        list.each(function () {
          $(this).css({
            'background': 'url(' + $(this).attr('data-bg') + ')',
            'opacity': '0',
            'z-index': '0',
            'background-position': '50% 50%',
            'background-size': 'cover'
          });
          $(this).attr('data-bg', '');
        });
      }

      this._showBlock(list[this.curIndex]);

      if (o.isAutoSlide) {
        this._defaultSlide(list);

        if (o.isHoverStop) {
          var className = $self.attr('class');
          $self.on('mouseenter', function (e) {
            clearInterval(self.timer);
          }).on('mouseleave', function () {
            clearInterval(self.timer);
            self._defaultSlide(list);
          });
        }

        if (o.isBlurStop) {
          $(window).on('blur', function () {
            clearInterval(self.timer);
          }).on('focus', function () {
            clearInterval(self.timer);
            self._defaultSlide(list);
          });
        }
      }
    },

    // default slide
    _defaultSlide: function _defaultSlide(list) {
      var self = this;

      this.timer = setInterval(function () {
        self._hideBlock(list[self.curIndex]);
        self.curIndex = (self.curIndex + 1) % list.length;
        self._showBlock(list[self.curIndex]);
      }, this.options.slideSpeed);
    },

    // show block
    _showBlock: function _showBlock(block) {

      var self = this;
      var o = self.options,
          $block = $(block),
          bg = $(block).attr('data-bg');

      if (bg) {
        $block.css({
          'background': 'url(' + bg + ')',
          'opacity': '0',
          'z-index': '0',
          'background-position': '50% 50%',
          'background-size': 'cover'
        });
        $block.attr('data-bg', '');
      }

      $block.stop().animate({
        'opacity': '1',
        'z-index': '1'
      }, o.switchSpeed);

      if (o.isShowDots) {
        $(this.dotsList[this.curIndex]).addClass(o.dotActiveClass);
      }
    },

    // hide block
    _hideBlock: function _hideBlock(block) {
      var o = this.options;

      $(block).stop().animate({
        'opacity': '0',
        'z-index': '0'
      }, o.switchSpeed);

      if (o.isShowDots) {
        $(this.dotsList[this.curIndex]).removeClass(o.dotActiveClass);
      }
    },

    // create dots
    _createDots: function _createDots(elem, list) {
      var self = this,
          dotsEvent = this.options.dotsEvent;

      var dots = $('<ol/>', {
        class: this.options.dotsClass
      });

      var dotsList = [];
      for (var i = 0; i < list.length; i++) {
        dotsList[i] = $('<li/>');
        dots.append(dotsList[i]);
      }

      $(elem).append(dots);
      this.dotsList = dotsList;

      // dots
      if (dotsEvent === 'click' || dotsEvent === 'mouseover' || dotsEvent === 'mouseenter') {
        dots.find('li').on(dotsEvent, function () {
          self._hideBlock(list[self.curIndex]);
          self.curIndex = $(this).index();
          self._showBlock(list[self.curIndex]);
        });
      }
    },

    // create arrowClass
    _createArrow: function _createArrow(elem, list) {
      var self = this;

      var arrow = $('<div/>', {
        class: this.options.arrowClass
      });

      var leftArrow = $('<a/>', {
        class: this.options.arrowLeftClass
      });

      var rightArrow = $('<a/>', {
        class: this.options.arrowRightClass
      });

      arrow.append(leftArrow).append(rightArrow);
      $(elem).append(arrow);

      if (this.options.isHoverShowArrow) {
        arrow.css('opacity', 0.3);
        $(elem).on('mouseenter', function () {
          arrow.css('opacity', 1);
        }).on('mouseleave', function () {
          arrow.css('opacity', 0.3);
        });
      }

      leftArrow.on('click', function () {
        self._hideBlock(list[self.curIndex]);
        self.curIndex = (list.length + (self.curIndex - 1)) % list.length;
        self._showBlock(list[self.curIndex]);
      });

      rightArrow.on('click', function () {
        self._hideBlock(list[self.curIndex]);
        self.curIndex = (self.curIndex + 1) % list.length;
        self._showBlock(list[self.curIndex]);
      });
    }
  };

  // main function
  $.fn.slideSmall = function (options) {

    var self = this;
    slide.init(self, options);
    return self;
  };
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(2)))

/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map