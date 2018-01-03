window.onload = function () {
  var open = false;
  document.getElementById('icon-label').onclick = function () {
    document.getElementById('nav-bar-icon').style.transitionDuration = "500ms";
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
    $(this).delay(200 * i).fadeIn(750);
  });

  $('#title').fadeIn(2000);
  $('#footer').delay(500).fadeIn(1000);

  var prev_content = "home";

  $('#navbar-home').click(function () {
    $('#navbar-' + prev_content).removeClass("active-nav-bar");
    $(this).addClass("active-nav-bar");

    if (prev_content != "home") {
      $('#' + prev_content).fadeOut(500);
      $('#home').delay(499).fadeIn(500);
    }

    prev_content = "home";
  });

  $('#navbar-aboutme').click(function () {
    $('#navbar-' + prev_content).removeClass("active-nav-bar");
    $(this).addClass("active-nav-bar");

    if (prev_content != "aboutme") {
      $('#' + prev_content).fadeOut(500);
      $('#aboutme').delay(499).fadeIn(500);
    }

    prev_content = "aboutme";
  });

  $('#navbar-education').click(function () {
    $('#navbar-' + prev_content).removeClass("active-nav-bar");
    $(this).addClass("active-nav-bar");

    if (prev_content != "education") {
      $('#' + prev_content).fadeOut(500);
      $('#education').delay(499).fadeIn(500);
    }

    prev_content = "education";
  });

  $('#navbar-experience').click(function () {
    $('#navbar-' + prev_content).removeClass("active-nav-bar");
    $(this).addClass("active-nav-bar");

    if (prev_content != "experience") {
      $('#' + prev_content).fadeOut(500);
      $('#experience').delay(499).fadeIn(500);
    }

    prev_content = "experience";
  });

  $('#navbar-resume').click(function () {
    $('#navbar-' + prev_content).removeClass("active-nav-bar");
    $(this).addClass("active-nav-bar");

    if (prev_content != "resume") {
      $('#' + prev_content).fadeOut(500);
      $('#resume').delay(499).fadeIn(500);
    }

    prev_content = "resume";
  });

  $('#navbar-skills').click(function () {
    $('#navbar-' + prev_content).removeClass("active-nav-bar");
    $(this).addClass("active-nav-bar");

    if (prev_content != "skills") {
      $('#' + prev_content).fadeOut(500);
      $('#skills').delay(499).fadeIn(500);
    }

    prev_content = "skills";
  });

});