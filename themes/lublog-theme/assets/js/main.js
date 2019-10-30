/*var mybutton = document.getElementsByClassName("scrolltotop");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 250 || document.documentElement.scrollTop > 20) {
    mybutton.display = "block";
  } else {
    mybutton.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
*/
/*
$(document).ready(function() {
  $(window).scroll(function() {
    if ($(this).scrollTop() > 20) {
      $(".scrolltotop").fadeIn();
    } else {
      $(".scrolltotop").fadeOut();
    }
  });
  $(".scrolltotop").click(function() {
    $("html, body").animate({ scrollTop: 0 }, 800);
    return false;
  });
});*/



(function ($) {

  "use strict";

  var cfg = {
      scrollDuration: 800, // smoothscroll duration
      mailChimpURL: 'https://facebook.us8.list-manage.com/subscribe/post?u=cdb7b577e41181934ed6a6a44&amp;id=e6957d85dc'   // mailchimp url
  },

      $WIN = $(window);

  // Add the User Agent to the <html>
  // will be used for IE10 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0))
  var doc = document.documentElement;
  doc.setAttribute('data-useragent', navigator.userAgent);


  
  /* search
   * ------------------------------------------------------ */
  var clSearch = function () {

      var searchWrap = $('.header__search'),
          searchField = searchWrap.find('.search-field'),
          closeSearch = searchWrap.find('.header__overlay-close'),
          searchTrigger = $('.header__search-trigger'),
          siteBody = $('body');


      searchTrigger.on('click', function (e) {

          e.preventDefault();
          e.stopPropagation();

          var $this = $(this);

          siteBody.addClass('search-is-visible');
          setTimeout(function () {
              searchWrap.find('.search-field').focus();
          }, 100);

      });

      closeSearch.on('click', function (e) {

          var $this = $(this);

          e.stopPropagation();

          if (siteBody.hasClass('search-is-visible')) {
              siteBody.removeClass('search-is-visible');
              setTimeout(function () {
                  searchWrap.find('.search-field').blur();
              }, 100);
          }
      });

      searchWrap.on('click', function (e) {
          if (!$(e.target).is('.search-field')) {
              closeSearch.trigger('click');
          }
      });

      searchField.on('click', function (e) {
          e.stopPropagation();
      });

      searchField.attr({ placeholder: 'Type Keywords', autocomplete: 'off' });

  };


  


  /* Smooth Scrolling
   * ------------------------------------------------------ */
  var clSmoothScroll = function () {

      $('.smoothscroll').on('click', function (e) {
          var target = this.hash,
              $target = $(target);

          e.preventDefault();
          e.stopPropagation();

          $('html, body').stop().animate({
              'scrollTop': $target.offset().top
          }, cfg.scrollDuration, 'swing').promise().done(function () {

              // check if menu is open
              if ($('body').hasClass('menu-is-open')) {
                  $('.header-menu-toggle').trigger('click');
              }

              window.location.hash = target;
          });
      });

  };

  /* Animate On Scroll
   * ------------------------------------------------------ */
  var clAOS = function () {

      AOS.init({
          offset: 200,
          duration: 600,
          easing: 'ease-in-sine',
          delay: 300,
          once: true,
          disable: 'mobile'
      });

  };


  /* AjaxChimp
   * ------------------------------------------------------ */
  var clAjaxChimp = function () {

      $('#mc-form').ajaxChimp({
          language: 'es',
          url: cfg.mailChimpURL
      });

      // Mailchimp translation
      //
      //  Defaults:
      //	 'submit': 'Submitting...',
      //  0: 'We have sent you a confirmation email',
      //  1: 'Please enter a value',
      //  2: 'An email address must contain a single @',
      //  3: 'The domain portion of the email address is invalid (the portion after the @: )',
      //  4: 'The username portion of the email address is invalid (the portion before the @: )',
      //  5: 'This email address looks fake or invalid. Please enter a real email address'

      $.ajaxChimp.translations.es = {
          'submit': 'Submitting...',
          0: '<i class="fas fa-check"></i> We have sent you a confirmation email',
          1: '<i class="fas fa-exclamation-circle"></i> You must enter a valid e-mail address.',
          2: '<i class="fas fa-exclamation-circle"></i> E-mail address is not valid.',
          3: '<i class="fas fa-exclamation-circle"></i> E-mail address is not valid.',
          4: '<i class="fas fa-exclamation-circle"></i> E-mail address is not valid.',
          5: '<i class="fas fa-exclamation-circle"></i> E-mail address is not valid.'
      }

  };


  /* Back to Top
   * ------------------------------------------------------ */
  var clBackToTop = function () {

      var pxShow = 500,
          goTopButton = $(".go-top")

      // Show or hide the button
      if ($(window).scrollTop() >= pxShow) goTopButton.addClass('link-is-visible');

      $(window).on('scroll', function () {
          if ($(window).scrollTop() >= pxShow) {
              if (!goTopButton.hasClass('link-is-visible')) goTopButton.addClass('link-is-visible')
          } else {
              goTopButton.removeClass('link-is-visible')
          }
      });
  };


  

      /* Initialize
       * ------------------------------------------------------ */
      (function clInit() {

         
          clSmoothScroll();
          
          clBackToTop();
      })();



})(jQuery);