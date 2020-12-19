$('#arriba').click(function(e){

    e.preventDefault();

    $('html, body').animate({
        scrollTop: $('#header').offset().top
    },1000);
});