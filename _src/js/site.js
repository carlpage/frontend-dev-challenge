$(document).ready(() => {

    $(window).resize(function () {
        var windowWidth = $(window).width();
        if (windowWidth > 1000) {
            $('.navigation--toggle').removeClass('active');
            $('.navigation__list').attr('style', '');
            $('.navigation__item__dropdown').attr('style', '');
        }
    });

    $('.navigation__list .navigation__item__dropdown').click(function (e) {
        e.preventDefault();
        var windowWidth = $(window).width();
        if (windowWidth < 1000) {
            $('.navigation__item__dropdown').slideToggle();
        }
    });

    $(".navigation--toggle").click(function () {
        this.classList.toggle("active");
        $(".navigation__list").slideToggle();
    });

    $('.js-slick').slick({
        autoplay: true,
        autoplaySpeed: 100000,
        // dots: true,
        draggable: false,
        fade: true,
        speed: 1000
    });

    $('.js-slick').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        $(slick.$slides).removeClass('is-animating');
    });

    $('.js-slick').on('afterChange', function (event, slick, currentSlide, nextSlide) {
        $(slick.$slides.get(currentSlide)).addClass('is-animating');
    });

    $('.search-panel .dropdown-menu').find('a').click(function (e) {
        e.preventDefault();
        var param = $(this).attr("href").replace("#", "");
        var concept = $(this).text();
        $('.search-panel span#search_concept').text(concept);
        $('.input-group #search_param').val(param);
    });

});