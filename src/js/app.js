'use strict';

import intializeMenu from './blocks/menu';
import bgSlider from './blocks/bg-slider';
import bgSliderSmall from './blocks/bg-slider-small';
import mapGoogle from './blocks/map';
import firstWord from './blocks/paint-first-word';
import carousel from './blocks/cart-carusel';
import afterBefore from './blocks/after-before';


$(() => {

  intializeMenu();
  bgSlider();
  bgSliderSmall();
  if($('#map').length){
    mapGoogle();
  }
  firstWord();
  carousel();

  afterBefore();

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

  $('.js-slide-small').each(function(){

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

  $.fn.paintFirstWord= function(e) {
    var str = this.text();
    var splited = str.split(' ');
    var replaced = str.split(splited[0]).join('<span class = "' + e + '">' + splited[0] + '</span>');
    this.html(replaced);
  };

  $('.js-text-fl').each(function (i,el) {
    $(el).paintFirstWord('text-fl');
  });

});

