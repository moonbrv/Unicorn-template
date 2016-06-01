//setup carousel
$(document).ready(function(){
  $('.portfolio-slider').slick({
	infinite: true,
	slidesToShow: 3,
	slidesToScroll: 1,
	speed: 500,
	dots: true,
	variableWidth: true,
	autoplay: true,
	autoplaySpeed: 3000,
	responsive: [
    {
      breakpoint: 1199,
      settings: {
        slidesToShow: 3
      }
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 2,
        autoplay: false
      }
    }
    ]
  });
});