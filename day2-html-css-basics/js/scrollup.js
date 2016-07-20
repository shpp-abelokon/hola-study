/* ================================ Smooth scroll to anchor ==================================== */

   $('a[href^="#"]').click(function() {
       var target = $(this).attr('href');
       $('html, body').animate({
           scrollTop: $(target).offset().top - 50
       }, 1500);
       return false;
   });
