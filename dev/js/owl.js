;

document.addEventListener("DOMContentLoaded", function() {
    initializeOwlSpecialists()
    initializeOwlDocuments()
    initializeOwlRepair()
}, {passive:true});

function initializeOwlSpecialists(_destroy = false) {
    const carousel_Settings = {
        items: 1,
        loop: false,
        margin: 16,
        nav: false,
        lazyLoad: true,
        dots: true,
        navText: [
            '<svg xmlns="http://www.w3.org/2000/svg" width="56" height="49" viewBox="0 0 56 49" fill="none">\n' +
            '  <path d="M30.4854 16L22.0001 24.4853L30.4854 32.9706" stroke="black" stroke-width="2"/>\n' +
            '  <path d="M14.5773 1L41.4226 1L54.8453 24.2487L41.4226 47.4974H14.5773L1.1547 24.2487L14.5773 1Z" stroke="black" stroke-width="2"/>\n' +
            '</svg>',
            '<svg xmlns="http://www.w3.org/2000/svg" width="56" height="49" viewBox="0 0 56 49" fill="none">\n' +
            '  <path d="M26.4854 16.2485L34.9706 24.7338L26.4854 33.2191" stroke="black" stroke-width="2"/>\n' +
            '  <path d="M14.5773 1L41.4226 1L54.8453 24.2487L41.4226 47.4974H14.5773L1.1547 24.2487L14.5773 1Z" stroke="black" stroke-width="2"/>\n' +
            '</svg>'
        ],

        responsive:{
            0:{
                autoWidth: false,
            },
            576:{
                autoWidth: false,
            },
            1200:{
                nav: true,
            }
        }
    }
    const $owl = $('[data-slider="OwlSpecialists"]')

    if (document.querySelector('[data-slider="OwlSpecialists"]')) {
        if (_destroy) {
            $owl.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
            $owl.find('.owl-stage-outer').children().unwrap();
        } else {
            $owl.addClass('owl-carousel')
            $owl.owlCarousel(carousel_Settings)
        }
    }
}

function initializeOwlDocuments(_destroy = false) {
    const carousel_Settings = {
        loop: false,
        nav: false,
        lazyLoad: true,
        dots: false,
        responsive: {
            0: {
                items: 1,
                autoWidth: true,
                margin: 16,
            },
            768: {
                items: 2,
                autoWidth: true,
                margin: 16,
            },
            1200: {
                margin: 24,
                items: 3,
            },
        }
    }
    const $owl = $('[data-slider="OwlDocuments"]')

    if (document.querySelector('[data-slider="OwlDocuments"]')) {
        if (_destroy) {
            $owl.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
            $owl.find('.owl-stage-outer').children().unwrap();
        } else {
            $owl.addClass('owl-carousel')
            $owl.owlCarousel(carousel_Settings)

            $('.customDocumentsNextBtn').click(function() {
                $owl.trigger('next.owl.carousel');
            })
            $('.customDocumentsPrevBtn').click(function() {
                $owl.trigger('prev.owl.carousel');
            })

            $owl.on('changed.owl.carousel', function (e) {
                if (e.item.index >= 1)
                    $('.customDocumentsPrevBtn').removeClass('disabled')
                else
                    $('.customDocumentsPrevBtn').addClass('disabled')

                if (e.item.index === (e.item.count - 3))
                    $('.customDocumentsNextBtn').addClass('disabled')
                else
                    $('.customDocumentsNextBtn').removeClass('disabled')
            })
        }
    }
}

function initializeOwlRepair(_destroy = false){
    var carousel;
    var carouselOptions = {

        nav: false,
        dots: true,
        slideBy: 'page',
        responsive: {
            320: {
                items: 1,
                rows: 1,
                slideBy: 1,
            },
            768: {
                margin: 16,
                items: 2,
                rows: 2,
                slideBy: 2,
            },
            1200: {
                margin: 24,
                items: 3,
                rows: 1,
                slideBy: 3,
            }
        }
    };

    var el = $('[data-slider="OwlRepair"]');

    var viewport = function() {
        var width;
        if (carouselOptions.responsiveBaseElement && carouselOptions.responsiveBaseElement !== window) {
            width = $(carouselOptions.responsiveBaseElement).width();
        } else if (window.innerWidth) {
            width = window.innerWidth;
        } else if (document.documentElement && document.documentElement.clientWidth) {
            width = document.documentElement.clientWidth;
        } else {
            console.warn('Can not detect viewport width.');
        }
        return width;
    };

    var severalRows = false;
    var orderedBreakpoints = [];
    for (var breakpoint in carouselOptions.responsive) {
        if (carouselOptions.responsive[breakpoint].rows > 1) {
            severalRows = true;
        }
        orderedBreakpoints.push(parseInt(breakpoint));
    }

    if (severalRows) {
        orderedBreakpoints.sort(function (a, b) {
            return b - a;
        });
        var slides = el.find('[data-slide-index]');
        var slidesNb = slides.length;
        if (slidesNb > 0) {
            var rowsNb;
            var previousRowsNb = undefined;
            var colsNb;
            var previousColsNb = undefined;

            var updateRowsColsNb = function () {
                var width =  viewport();
                for (var i = 0; i < orderedBreakpoints.length; i++) {
                    var breakpoint = orderedBreakpoints[i];
                    if (width >= breakpoint || i == (orderedBreakpoints.length - 1)) {
                        var breakpointSettings = carouselOptions.responsive['' + breakpoint];
                        rowsNb = breakpointSettings.rows;
                        colsNb = breakpointSettings.items;
                        break;
                    }
                }
            };

            var updateCarousel = function () {
                updateRowsColsNb();


                if (rowsNb != previousRowsNb || colsNb != previousColsNb) {
                    var reInit = false;
                    if (carousel) {
                        carousel.trigger('destroy.owl.carousel');
                        carousel = undefined;
                        slides = el.find('[data-slide-index]').detach().appendTo(el);
                        el.find('.fake-col-wrapper').remove();
                        reInit = true;
                    }

                    var perPage = rowsNb * colsNb;
                    var pageIndex = Math.floor(slidesNb / perPage);
                    var fakeColsNb = pageIndex * colsNb + (slidesNb >= (pageIndex * perPage + colsNb) ? colsNb : (slidesNb % colsNb));

                    var count = 0;
                    for (var i = 0; i < fakeColsNb; i++) {
                        var fakeCol = $('<div class="fake-col-wrapper"></div>').appendTo(el);
                        for (var j = 0; j < rowsNb; j++) {
                            var index = Math.floor(count / perPage) * perPage + (i % colsNb) + j * colsNb;
                            if (index < slidesNb) {
                                slides.filter('[data-slide-index=' + index + ']').detach().appendTo(fakeCol);
                            }
                            count++;
                        }
                    }

                    previousRowsNb = rowsNb;
                    previousColsNb = colsNb;

                    if (reInit) {
                        carousel = el.owlCarousel(carouselOptions);
                    }
                }
            };

            $(window).on('resize', updateCarousel);

            updateCarousel();
        }
    }

    if (document.querySelector('[data-slider="OwlRepair"]')) {
        if (_destroy) {
            el.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
            el.find('.owl-stage-outer').children().unwrap();
        } else {
            el.addClass('owl-carousel')
            carousel = el.owlCarousel(carouselOptions)


            $('.customRepairNextBtn').click(function() {
                carousel.trigger('next.owl.carousel');
            })
            $('.customRepairPrevBtn').click(function() {
                carousel.trigger('prev.owl.carousel');
            })

            carousel.on('changed.owl.carousel', function (e) {
                if (e.item.index >= 1)
                    $('.customRepairPrevBtn').removeClass('disabled')
                else
                    $('.customRepairPrevBtn').addClass('disabled')

                if (e.item.index === (e.item.count - 3))
                    $('.customRepairNextBtn').addClass('disabled')
                else
                    $('.customRepairNextBtn').removeClass('disabled')
            })
        }
    }
}
;