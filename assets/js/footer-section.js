//inside form in textarea, when indicator jump to new line,
//height of text area will increase at scroll height,
//until max-height of element 
$(document).ready(function(){
	$('.feedback').css('height', '+=100');
	$('.feedback__message').css('height', '24px');
  $('.feedback__message').keyup(function(){
    this.style.height = '24px';
  if (parseInt(this.style.height, 10) < 100) {
    this.style.height = this.scrollHeight+"px";
    }
  })
});

//when windows resize, blocks copyright and info-nav will swap places at breakpoint 768px
//i use window.innerWidth because $(window).width will show wrong value
$(document).ready(function(){
  var copyR = $('.copyright');
  if (window.innerWidth < 768) {
    copyR.appendTo(copyR.parent());
    };
    $(window).resize(function() {
      if ( window.innerWidth < 768) {
        copyR.appendTo(copyR.parent());
      } else {
        copyR.prependTo(copyR.parent());
      }
    });
});