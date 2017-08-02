/**
 * Created by Gee on 5/17/2017.
 */
$(document).ready(function() {
    $(".button-collapse").sideNav();

    $(window).scroll(function () {
        var wScroll = $(this).scrollTop();
        console.log(wScroll); //1430 for About page

        $("p[aria-label='CodePen']").css({
            'transform' : 'translate(0px, ' +wScroll/1.35+'px)'
        });

        $(".Iam").css({
            'transform' : 'translate(0px, ' +wScroll/1.7+'px)'
        });


        if ($(window).scrollTop() >= 1000) {
            $('.topCirlce').css({"display": "block"});
        }else {
            $('.topCirlce').css({"display": "none"});
        }

        if(wScroll > $('#portfolio').offset().top - ($(window).height()/1.8)) {
            $('#portfolio .square').each(function (i) {
                setTimeout(function () {
                    $('#portfolio .square').eq(i).addClass('is-showing');
                }, 150 * (i+1));
            });
        }

        if(wScroll > $('#blog').offset().top - ($(window).height()/1.8)){

            var offset = Math.min(0, wScroll - $('#blog').offset().top + $(window).height()-800);

            $('.post1').css({
                'transform' : 'translate('+ offset +'px, '+  Math.abs(offset * 0.4) +'px)'
            });

            $('.post3').css({
                'transform' : 'translate('+ Math.abs(offset) +'px, '+  Math.abs(offset * 0.4) +'px)'
            });
        }

    });

    $("a").click(function(){
        if($(this).attr('href') === "#about" || $(this).attr('href') === "#portfolio") {
            $('html, body').animate({
                scrollTop: $($(this).attr('href')).offset().top + 100
            }, 1000);
            return false;
        }else{
            $('html, body').animate({
                scrollTop: $($(this).attr('href')).offset().top
            }, 1000);
            return false;
        }
    });

    $(".topCirlce").hover(function() {
        setTimeout(
            function()
            {
                $(".dropdownContent").css({"display": "block"});
            }, 500);
        }, function() {
        $(".dropdownContent").css({"display": "none"});
    });

});