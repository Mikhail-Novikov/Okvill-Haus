'use strict';

import 'slick-carousel';

export default carousel;

carousel.slickOptions = {
  dots: true,
  infinite: false,
  prevArrow: '<a href="#" type="button" class="arrow-left arrow--small"></a>',
  nextArrow: '<a href="#" type="button" class="arrow-right arrow--small"></a>'
};

function carousel() {
  document.querySelectorAll('.carousel').forEach(function (item) {
    if (item.classList.contains('carousel--cart')) {
      carousel.slickOptions.slidesToShow = 3;
      carousel.slickOptions.responsive = [{
        breakpoint: 1200,
        settings: {
          slidesToShow: 3
        }
      }, {
        breakpoint: 900,
        settings: {
          slidesToShow: 2
        }
      }, {
        breakpoint: 600,
        settings: {
          slidesToShow: 1
        }
      }];
    } else if (item.classList.contains('carousel--history')) {
      carousel.slickOptions.slidesToShow = 3;
      carousel.slickOptions.responsive = [{
        breakpoint: 900,
        settings: {
          slidesToShow: 2
        }
      }, {
        breakpoint: 600,
        settings: {
          slidesToShow: 1
        }
      }];
    } else if (item.classList.contains('carousel--gallery')) {
      carousel.slickOptions.infinite = true;
      carousel.slickOptions.slidesToShow = 1;
      carousel.slickOptions.slidesToScroll = 1;
      carousel.slickOptions.centerMode = true;
      carousel.slickOptions.centerPadding = '0px';
      carousel.slickOptions.variableWidth = true;
    } else if (item.classList.contains('carousel--participants')) {
      carousel.slickOptions.mobileFirst = true;
      carousel.slickOptions.responsive = [{
        breakpoint: 0,
        settings: 'unslick'
      }];
    }

    carousel.slickOptions.appendArrows = item.querySelector('.carousel__arrows');
    $(item.querySelector('.carousel__inner')).slick(carousel.slickOptions);
    item.classList.add('carousel--initialized');
  });
}