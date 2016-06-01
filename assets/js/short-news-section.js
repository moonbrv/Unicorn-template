//setup carousel
$(document).ready(function(){
  $('.short-news__container').slick({
	infinite: true,
	slidesToShow: 3,
	slidesToScroll: 1,
	speed: 500,
	dots: false,
	autoplay: true,
  arrows: true,
  prevArrow: '',
  nextArrow: '<i class="fa fa-chevron-right fa-lg next-arrow"></i>',
	autoplaySpeed: 5000,
	responsive: [
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        autoplay: true,
        arrows: false
      }
    }
    ]
  });
});