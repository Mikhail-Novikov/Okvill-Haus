'use strict';

import intializeMenu from './blocks/menu';
import bgSlider from './blocks/bg-slider';
import bgSliderSmall from './blocks/bg-slider-small';

intializeMenu();
bgSlider();
bgSliderSmall();

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

})
