(function($) {

    "use strict";



    //Hide Loading Box (Preloader)
    function handlePreloader() {
        if ($('.preloader_wrapper').length) {
            $('.preloader_wrapper').delay(200).fadeOut(300);
        }
        TweenMax.to($(".preloader_wrapper .overlay"), 1.2, {
            force3D: true,
            left: "100%",
            ease: Expo.easeInOut,
        });
    }



    $('select').niceSelect();


    // Isotop Layout
    function isotopeBlock() {
        if ($(".isotope-block").length) {
            var $grid = $('.isotope-block').isotope();

        }
    }

    isotopeBlock();
    if ($('.header_s1 li.dropdown ul').length) {
        $('.header_s1 .navigation li.dropdown').append('<div class="dropdown-btn"><span class="fa fa-angle-right"></span></div>');
    }

    if ($('.mobile-menu').length) {
        var mobileMenuContent = $('.header_s1 .nav-outer .main-menu').html();
        $('.mobile-menu .menu-box .menu-outer').append(mobileMenuContent);
        $('.sticky-header .main-menu').append(mobileMenuContent);
        $('.mobile-menu li.dropdown .dropdown-btn').on('click', function() {
            $(this).toggleClass('open');
            $(this).prev('ul').slideToggle(500);
        });
        $('.mobile-menu li.dropdown .dropdown-btn').on('click', function() {
            $(this).prev('.megamenu').slideToggle(900);
        });
        $('.mobile-nav-toggler').on('click', function() {
            $('body').addClass('mobile-menu-visible');
        });
        $('.mobile-menu .menu-backdrop,.mobile-menu .close-btn').on('click', function() {
            $('body').removeClass('mobile-menu-visible');
        });

    }

    function dynamicCurrentMenuClass(selector) {
        let FileName = window.location.href.split('/').reverse()[0];
        selector.find('li').each(function() {
            let anchor = $(this).find('a');
            if ($(anchor).attr('href') == FileName) {
                $(this).addClass('current');
            }        
		});
        selector.children('li').each(function() {
            if ($(this).find('.current').length) {
                $(this).addClass('current');
            }
        });
        if ('' == FileName) {
            selector.find('li').eq(0).addClass('current');
        }
    }
      
    let mainNavUL = $('.main-menu').find('.navigation');
    dynamicCurrentMenuClass(mainNavUL);
    function headerStyle() {
        if ($('.header_s1').length) {
            var windowpos = $(window).scrollTop();
            var siteHeader = $('.header_s1');
            var scrollLink = $('.scroll-to-top');
            var sticky_header = $('.header_s1 .sticky-header');
            if (windowpos > 100) {
                siteHeader.addClass('fixed-header');
                sticky_header.addClass("animated slideInDown");
                scrollLink.fadeIn(300);
            } else {
                siteHeader.removeClass('fixed-header');
                sticky_header.removeClass("animated slideInDown");
                scrollLink.fadeOut(300);
            }
        }
    }
    headerStyle();

    if ($('.side-menu').length) {

        $(".side-menu .menu-box").niceScroll({
            cursorborder: "none",
            cursorborderradius: "0px",
            touchbehavior: true,
            bouncescroll: false,
            scrollspeed: 120,
            mousescrollstep: 90,
            horizrailenabled: true,
            preservenativescrolling: true,
            cursordragontouch: true
        });
        $('.side-menu li.dropdown .dropdown-btn').on('click', function() {
            $(this).toggleClass('open');
            $(this).prev('ul').slideToggle(500);
        });

        $('body').addClass('side-menu-visible');
        $('.side-nav-toggler').on('click', function() {
            $('body').addClass('side-menu-visible');
        });
        $('.side-menu .side-menu-resize').on('click', function() {
            $('body').toggleClass('side-menu-visible');
        });
        $('.header_s1 .mobile-nav-toggler-two').on('click', function() {
            $('body').addClass('side-menu-visible-s2');
        });
        $('.header_s1 .side-menu-overlay').on('click', function() {
            $('body').removeClass('side-menu-visible-s2');
        });
    }

    if ($('#search_s1').length) {
        $('.search-toggler').on('click', function() {
            $('#search_s1').addClass('popup-visible');
        });
        $(document).keydown(function(e) {
            if (e.keyCode === 27) {
                $('#search_s1').removeClass('popup-visible');
            }
        });
        $('.close-search,.search_s1 .overlay-layer').on('click', function() {
            $('#search_s1').removeClass('popup-visible');
        });
    }

    if ($('.count-bar').length) {
        $('.count-bar').appear(function() {
            var el = $(this);
            var percent = el.data('percent');
            $(el).css('width', percent).addClass('counted');
        }, {
            accY: -50
        });

    }

    if ($('.count-box').length) {
        $('.count-box').appear(function() {

            var $t = $(this),
                n = $t.find(".count-text").attr("data-stop"),
                r = parseInt($t.find(".count-text").attr("data-speed"), 10);

            if (!$t.hasClass("counted")) {
                $t.addClass("counted");
                $({
                    countNum: $t.find(".count-text").text()
                }).animate({
                    countNum: n
                }, {
                    duration: r,
                    easing: "linear",
                    step: function() {
                        $t.find(".count-text").text(Math.floor(this.countNum));
                    },
                    complete: function() {
                        $t.find(".count-text").text(this.countNum);
                    }
                });
            }

        }, {
            accY: 0
        });
    }

    if ($('.accordion-box').length) {
        $(".accordion-box").on('click', '.acc-btn', function() {

            var outerBox = $(this).parents('.accordion-box');
            var target = $(this).parents('.accordion');

            if ($(this).hasClass('active') !== true) {
                $(outerBox).find('.accordion .acc-btn').removeClass('active');
            }

            if ($(this).next('.acc-content').is(':visible')) {
                return false;
            } else {
                $(this).addClass('active');
                $(outerBox).children('.accordion').removeClass('active-block');
                $(outerBox).find('.accordion').children('.acc-content').slideUp(300);
                target.addClass('active-block');
                $(this).next('.acc-content').slideDown(300);
            }
        });
    }


    function sortableMasonry() {
        if ($('.sortable-masonry').length) {
            var winDow = $(window);
            // Needed variables
            var $container = $('.sortable-masonry .items-container');
            var $filter = $('.filter-btns');
            $container.isotope({
                filter: '.all',
                animationOptions: {
                    duration: 500,
                    easing: 'linear'
                }
            });
            // Isotope Filter 
            $filter.find('li').on('click', function() {
                var selector = $(this).attr('data-filter');
                try {
                    $container.isotope({
                        filter: selector,
                        animationOptions: {
                            duration: 500,
                            easing: 'linear',
                            queue: false
                        }
                    });
                } catch (err) {}
                return false;
            });
            winDow.on('resize', function() {
                var selector = $filter.find('li.active').attr('data-filter');
                $container.isotope({
                    filter: selector,
                    animationOptions: {
                        duration: 500,
                        easing: 'linear',
                        queue: false
                    }
                });
                $container.isotope()
            });
            var filterItemA = $('.filter-btns li');
            filterItemA.on('click', function() {
                var $this = $(this);
                if (!$this.hasClass('active')) {
                    filterItemA.removeClass('active');
                    $this.addClass('active');
                }
            });
            $container.isotope("on", "layoutComplete", function(a, b) {
                var a = b.length,
                    pcn = $(".filters .count");
                pcn.html(a);
            });
        }
    }
    sortableMasonry();
    if ($('.dial').length) {
        $('.dial').appear(function() {
            var elm = $(this);
            var color = elm.attr('data-fgColor');
            var perc = elm.attr('value');
            elm.knob({
                'value': 0,
                'min': 0,
                'max': 100,
                'skin': 'tron',
                'readOnly': true,
                'thickness': 0.15,
                'dynamicDraw': true,
                'displayInput': false
            });
            $({
                value: 0
            }).animate({
                value: perc
            }, {
                duration: 2000,
                easing: 'swing',
                progress: function() {
                    elm.val(Math.ceil(this.value)).trigger('change');
                }
            });
            $(this).append(function() {});
        }, {
            accY: 20
        });
    }

    if ($('.sidebar_header').length) {
        var hiddenBar = $('.sidebar_header');
        var hiddenBarOpener = $('.sidebar_header-opener');
        var hiddenBarCloser = $('.sidebar_header-closer');
        var navToggler = $('.nav-toggler');
        hiddenBarOpener.on('click', function() {
            hiddenBar.toggleClass('visible-sidebar');
            navToggler.toggleClass('open');
        });
        hiddenBarCloser.on('click', function() {
            hiddenBar.toggleClass('visible-sidebar');
            navToggler.toggleClass('open');
        });
    }

    if ($("#polyglot-language-options").length) {
        $('#polyglotLanguageSwitcher').polyglotLanguageSwitcher({
            effect: 'slide',
            animSpeed: 500,
            testMode: true,
            onChange: function(evt) {
                alert("The selected language is: " + evt.selectedItem);
            }

        });
    }

    if ($('.count-bar').length) {
        $('.count-bar').appear(function() {
            var el = $(this);
            var percent = el.data('percent');
            $(el).css('width', percent).addClass('counted');
        }, {
            accY: -50
        });

    }

    if ($("#testimonials-one__thumb").length) {
        let testimonialsThumb = new Swiper("#testimonials-one__thumb", {
            slidesPerView: 3,
            spaceBetween: 10,
            speed: 1400,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            loop: true,
            autoplay: {
                delay: 5000
            }
        });

        let testimonialsCarousel = new Swiper("#testimonials-one__carousel", {
            observer: true,
            observeParents: true,
            speed: 1400,
            mousewheel: true,
            slidesPerView: 1,
            autoplay: {
                delay: 5000
            },
            thumbs: {
                swiper: testimonialsThumb
            },
            pagination: {
                el: '#testimonials-one__carousel-pagination',
                type: 'bullets',
                clickable: true
            },
        });
    }

    if ($('.project-tab').length) {
        $('.project-tab .project-tab-btns .p-tab-btn').on('click', function(e) {
            e.preventDefault();
            var target = $($(this).attr('data-tab'));

            if ($(target).hasClass('actve-tab')) {
                return false;
            } else {
                $('.project-tab .project-tab-btns .p-tab-btn').removeClass('active-btn');
                $(this).addClass('active-btn');
                $('.project-tab .p-tabs-content .p-tab').removeClass('active-tab');
                $(target).addClass('active-tab');
            }
        });
    }

    if ($('.single-image-carousel').length) {
        var productThumbs = new Swiper('.single-image-carousel', {
            preloadImages: false,
            loop: true,
            speed: 1400,
            spaceBetween: 0,
            effect: "fade",
            autoplay: {
                delay: 5000,
                disableOnInteraction: false
            },

            navigation: {
                nextEl: '.slider-button-next',
                prevEl: '.slider-button-prev',
            },
        });

    }

    if ($('.banner-section-one-carousel').length) {
        $('.banner-section-one-carousel').owlCarousel({
            animateOut: 'fadeOut',
            animateIn: 'fadeIn',
            loop: true,
            margin: 0,
            dots: false,
            nav: false,
            singleItem: true,
            smartSpeed: 500,
            autoplay: true,
            autoplayTimeout: 9000,
            navtext: ['<span class="flaticon-left-arrow-1"></span>', '<span class="flaticon-left-arrow-1 right"></span>'],
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                1024: {
                    items: 1
                }
            }
        });
    }


    if ($('.banner-section-two-carousel').length) {
        $('.banner-section-two-carousel').owlCarousel({
            animateOut: 'fadeOut',
            animateIn: 'fadeIn',
            loop: true,
            margin: 0,
            dots: false,
            nav: true,
            singleItem: true,
            smartSpeed: 500,
            autoplay: true,
            autoplayTimeout: 9000,
            navtext: [
                '<span class="flaticon-right-arrow-1 rotate"></span>',
                '<span class="flaticon-right-arrow-1"></span>',
            ],
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                1024: {
                    items: 1
                }
            }
        });
    }

    if ($('.news-page-addon-carousel').length) {
        $('.news-page-addon-carousel').owlCarousel({
            loop: true,
            margin: 0,
            dots: false,
            nav: true,
            singleItem: true,
            smartSpeed: 500,
            autoplay: true,
            autoplayTimeout: 9000,
            navtext: [
                '<span class="flaticon-right-arrow-1 rotate"></span>',
                '<span class="flaticon-right-arrow-1"></span>',
            ],
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                1024: {
                    items: 1
                }
            }
        });
    }


    if ($(".serivces-section-two-carousel").length) {
        $(".serivces-section-two-carousel").owlCarousel({
            loop: true,
            margin: 30,
            nav: true,
            smartSpeed: 500,
            autoHeight: false,
            autoplay: true,
            dots: false,
            autoplayTimeout: 10000,
            navtext: [
                '<span class="flaticon-right-arrow-1 rotate"></span>',
                '<span class="flaticon-right-arrow-1"></span>',
            ],
            responsive: {
                0: {
                    items: 1,
                },
                600: {
                    items: 1,
                },
                800: {
                    items: 2,
                },
                992: {
                    items: 2.6,
                },
                1200: {
                    items: 2.6,
                },
            },
        });
    }

    if ($(".testimonials-section-one-carousel").length) {
        $(".testimonials-section-one-carousel").owlCarousel({
            loop: true,
            margin: 30,
            nav: true,
            smartSpeed: 500,
            autoHeight: false,
            autoplay: true,
            dots: false,
            autoplayTimeout: 10000,
            navtext: [
                '<span class="flaticon-right-arrow-1 rotate"></span>',
                '<span class="flaticon-right-arrow-1"></span>',
            ],
            responsive: {
                0: {
                    items: 1,
                },
                600: {
                    items: 1,
                },
                800: {
                    items: 2,
                },
                1000: {
                    items: 2,
                },
                1350: {
                    items: 3,
                },
            },
        });
    }

    if ($('.progress-levels .progress-box .bar-fill').length) {
        $(".progress-box .bar-fill").each(function() {
            var progressWidth = $(this).attr('data-percent');
            $(this).css('width', progressWidth + '%');
            $(this).children('.percent').html(progressWidth + '%');
        });
    }

    var offset = 220;
    var duration = 500;
    jQuery(window).on('scroll', function() {
        if (jQuery(this).scrollTop() > offset) {
            jQuery('.back-to-top').fadeIn(duration);
        } else {
            jQuery('.back-to-top').fadeOut(duration);
        }
    });

    jQuery('.back-to-top').on("click", function() {
        event.preventDefault();
        jQuery('html, body').animate({
            scrollTop: 0
        }, duration);
        return false;
    });

    if ($('.wow').length) {
        var wow = new WOW({
            boxClass: 'wow',
            animateClass: 'animated',
            offset: 0,
            mobile: true,
            live: true
        });
        wow.init();
    }

    jQuery(window).on('scroll', function() {
        headerStyle();
    });

    jQuery(window).on('load', function() {
        handlePreloader();
        sortableMasonry();
        isotopeBlock();
    });

})(window.jQuery);