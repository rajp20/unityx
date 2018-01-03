window.onload = function () {
  var open = false;
  document.getElementById('icon-label').onclick = function () {
    document.getElementById('nav-bar-icon').style.transitionDuration = "250ms";
    if (open) {
      document.getElementById('nav-bar-icon').style.transform = "rotate(0deg)";
    } else {
      document.getElementById('nav-bar-icon').style.transform = "rotate(180deg)";
    }
    open = !open;
  };
};

$(document).ready(function(){
  var opennav = false;

  $("#icon-label").click(function(){
    if (opennav) {
      $("ul").slideUp();
    } else {
      $("ul").slideDown();
    }
    opennav = !opennav;
  });

  $("#top-nav-bar li").each(function(i) {
    $(this).delay(100 * i).slideDown(500);
  });

  $('#title').slideDown(1000);
  $('#footer').delay(1000).fadeIn(500);
});