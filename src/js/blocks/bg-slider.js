export default bgSlider;

function bgSlider(){

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
    init: function(elem, options) {
      var $self = $(elem),
          list = $self.find('ul li'),

          self = this,
          o;
console.log(list)
      o = this.options = $.extend({}, this.defaults, options);

      if (o.isShowDots) {
        this._createDots(elem, list);
      }

      if (o.isShowArrow) {
        this._createArrow(elem, list);
      }

      if (o.isLoadAllImgs) {
        list.each(function() {
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
          $self.on('mouseenter', function(e) {
            clearInterval(self.timer);
          }).on('mouseleave', function() {
            clearInterval(self.timer);
            self._defaultSlide(list);
          });
        }

        if (o.isBlurStop) {
          $(window).on('blur', function() {
            clearInterval(self.timer);
          }).on('focus', function() {
            clearInterval(self.timer);
            self._defaultSlide(list);
          });
        }
      }
    },

    // default slide
    _defaultSlide: function(list) {
      var self = this;
      
      this.timer = setInterval(function() {
        self._hideBlock(list[self.curIndex]);
        self.curIndex =  (self.curIndex + 1) % list.length;
        self._showBlock(list[self.curIndex]);
      }, this.options.slideSpeed);
    },

    // show block
    _showBlock: function(block) {
      
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
    _hideBlock: function(block) {
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
    _createDots: function(elem, list) {
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
        dots.find('li').on(dotsEvent, function() {
          self._hideBlock(list[self.curIndex]);
          self.curIndex =  $(this).index();
          self._showBlock(list[self.curIndex]);
        });
      }
    },

    // create arrowClass
    _createArrow: function(elem, list) {
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
        $(elem).on('mouseenter', function() {
          arrow.css('opacity', 1);
        }).on('mouseleave', function() {
          arrow.css('opacity', 0.5);
        });
      }

      leftArrow.on('click', function() {
        self._hideBlock(list[self.curIndex]);
        self.curIndex = (list.length + (self.curIndex - 1)) % list.length;
        self._showBlock(list[self.curIndex]);
      });

      rightArrow.on('click', function() {
        self._hideBlock(list[self.curIndex]);
        self.curIndex =  (self.curIndex + 1) % list.length;
        self._showBlock(list[self.curIndex]);
      });
    }
  };

  // main function
  $.fn.slide = function(options) {
    
    var self = this;
    slide.init(self, options);
    return self;
  };

}