/*global $*/
$(document).ready(function () {
    $(".gallery-wrapper").slick({
        arrows: true,
        dots: true,
        infinite: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToScroll: 1,
                    slidesToShow: 1
                }
            }
        ],
        slidesToScroll: 2,
        slidesToShow: 3
    });
});