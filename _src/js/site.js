$(document).ready(function () {

    loadCallouts();

    function loadCallouts() {
        $.ajax({
            url: '/data.json',
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                console.log('got some callout data: ', response);
                for (var i = 0; i < response.callouts.length; i++) {
                    var title = response.callouts[i].title;
                    var button = response.callouts[i].buttonLabel;
                    var image = response.callouts[i].imagePath;
                    var color = response.callouts[i].color;
                    // if there is no button, append small callout box
                    if(button === '') {
                        var $div1 = $('<div class="callout callout--small" style="background-image:url(' + image + ')">');
                        $div1.append($('<h2 class="callout--small__h2">' + title + '</h2>'));
                        $('.content-main .container').append($div1);
                        // if there is a button, append large callout box
                    } else {
                        var $div2 = $('<div class="callout callout--large" style="background-image:url(' + image + ')">');
                        // if color is yellow, make top border yellow
                        if(color === 'yellow') {
                            $div2.append($(
                                '<div class="callout--large__inner">' +
                                '<h2 class="callout--large__h2">' + title + '</h2>' +
                                '<button class="button-callout">' + button + '</button>' +
                                '</div>'
                            ));
                        }
                        if (color === 'red') {
                            // if color is red, make top border red
                            $div2.append($(
                                '<div class="callout--large__inner">' +
                                '<h2 class="callout--large__h2 callout--large__h2--alt">' + title + '</h2>' +
                                '<button class="button-callout">' + button + '</button>' +
                                '</div>'
                            ));
                        }
                        $('.content-main .container').append($div2);
                    } // end conditional
                } // end for loop
            } // end success
        }); //end ajax
    };

    // remove added classes when window is resized to higher than 1000px
    $(window).resize(function () {
        var windowWidth = $(window).width();
        if (windowWidth > 1000) {
            $('.navigation--toggle').removeClass('active');
            $('.navigation__list').attr('style', '');
            $('.navigation__item__dropdown').attr('style', '');
        }
    });

    // if window width is less than 1000px, second level nav
    $('.navigation__list .navigation__item:first-child').click(function (e) {
        e.preventDefault();
        var windowWidth = $(window).width();
        if (windowWidth < 1000) {
            $('.navigation__item__dropdown').slideToggle();
        }
    });

    // open navigation upon clicking hamburger
    $(".navigation--toggle").click(function () {
        this.classList.toggle("active");
        $(".navigation__list").slideToggle();
    });

    // slick slide initiation
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

    // changes selcted option in dropdown
    $('.search-panel .dropdown-menu').find('a').click(function (e) {
        e.preventDefault();
        var param = $(this).attr("href").replace("#", "");
        var concept = $(this).text();
        $('.search-panel span#search_concept').text(concept);
        $('.input-group #search_param').val(param);
    });

});