//in each even news-item, fotoand text will swap their places
$(document).ready(function(){
  var first = $('.news-item:nth-child(even) .news-body');
  first.appendTo(first.parent());
}); 