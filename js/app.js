(function ($) {
  "use strict;"
  
  $(document).ready(function() {

    // prevent the # links to scroll to the top of the page
    $("[href=#]").click(function(e) {
      e.preventDefault();
    });

    // activate bootstrap popover funcionality
    $("[data-toggle=popover]").popover();
    
    // activate bootstrap tooltip functionality
    $("[data-toggle=tooltip]").tooltip();

    // Sticky header style change on sroll
    $(window).scroll(function() {
      if ($(this).scrollTop() > 5) {
        $('header').addClass('stuck');
      } else {
        $('header').removeClass('stuck');
      }
    });

    // Smooth scroll functionality
    if(window.location.pathname == '/') {
      $('.smoothScroll').smoothScroll({
        speed: 600,
        offset: -80 
      });
    }

    // closing menu on mobile after click on item menu
    $(".navbar li a").click(function(event) {
      if ($(window).width() <= 767) {
        $(".navbar-collapse").removeClass("in");
      }
    });

    // Lightbox
    $('.venobox').venobox();

    // Sliders
    $(".owl-carousel").owlCarousel({
      slideSpeed: 500,
      navigation: true,
      singleItem: true,
      autoHeight: true,
      pagination: true,
      navigationText: ['<i class="ion-ios7-arrow-left"></i>','<i class="ion-ios7-arrow-right"></i>']
    });

    $(".owl-highlighted").owlCarousel({
      slideSpeed: 500,
      singleItem: true,
      autoHeight: true,
      pagination: true,
      navigationText: ['<i class="ion-ios7-arrow-left"></i>','<i class="ion-ios7-arrow-right"></i>']
    });

    /* Form submission code */
    // Get the form.
    var form = $('#theme-contact');

    // Get the messages div.
    var formMessages = $('#theme-form-messages');


  });
  
})(jQuery);

jQuery(window).load(function() {
  "use strict";

  // Vertical center functionality to elements using .vertical-center class
  $('.vertical-center').flexVerticalCenter('padding-top');

  // Fade in functionality to elements using .fade-in class
  $('.fade-in').fadeIn(1500);

});