//setup carousel
$(document).ready(function(){
  $('.clients-slider').slick({
	infinite: false,
	speed: 500,
  arrows: true,
  prevArrow: '',
  nextArrow: '<i class="fa fa-chevron-right fa-lg next-arrow"></i>',
  slidesToShow: 6,
  slidesToScroll: 3,
	responsive: [
    {
      breakpoint: 1199,
      settings: {
        slidesToShow: 5
      }
    },
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 4
      }
    },
    {
      breakpoint: 767,
      settings: {
        arrows: false,
        slidesToShow: 3
      }
    },
    {
      breakpoint: 480,
      settings: {
        arrows: false,
        slidesToShow: 2
      }
    }
    ]
  });
});