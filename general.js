$(function() {
    handlePageTitles();
    handleSearch();
    handleHero();
    handlePopularDiscussions();
    handleNews();
    handleCLP();
    handleFeaturedCompany();
    handleFeaturedEvent();
});

function handlePageTitles() {
    if ($('#MainCopy_ContentWrapper').hasClass('community-landing-page')) {
        $('#PageTitleH1').addClass('community-landing-page')
    }
}

function handleSearch() {
    $('#NAV .navbar-nav').append(
        '<li class="search-btn-top"><button type="button" onclick="toggleSearch();"><i class="far fa-search"></i></button></li>'
    );
    $('.search-bar-top').appendTo('#MPOuterHeader');

    if ($('.search-bar-top .form-control').length && $(window).width() < 651) {
        $('.search-bar-top .form-control').attr('placeholder', 'Search...');
    } else {
        $('.search-bar-top .form-control').attr('placeholder', 'Search the directory, committees, resources...');
    }

    $(document).click(function(e) {
        var searchBar = $('.search-bar-top'),
            searchButton = $('.search-btn-top'),
            target = e.target;

        if (!$(target).is(searchBar) &&
            !$(target).is(searchButton) &&
            !$(target).closest('.search-bar-top').html() &&
            !$(target).closest('.search-btn-top').html()
        ) {
            closeSearch();
        }
    });
}

function toggleSearch() {
    if ($('.search-bar-top').hasClass('open')) {
        closeSearch();
    } else {
        openSearch();
    }
}

function closeSearch() {
    $('.search-bar-top').removeClass('open');
    $('.search-btn-top').removeClass('open');
}

function openSearch() {
    $('.search-bar-top').addClass('open');
    $('.search-btn-top').addClass('open');
    $('.search-bar-top .form-control').focus();
}

function handleHero() {
    $(".hero .HtmlContent > *:not(img)").wrapAll(
        '<div class="text-container" />'
    );
    $(".hero .HtmlContent > img:first-of-type").wrap(
        '<div class="img-container" />'
    );

    handleBgImage(
        ".hero .HtmlContent .img-container",
        ".hero .HtmlContent .img-container"
    );

    $(".top-tile").wrapAll('<div class="top-tiles">');
    $(".hero-search").appendTo(".top-tiles");

    if ($('.hero-search .form-control').length && $(window).width() < 651) {
        $('.hero-search .form-control').attr('placeholder', 'Search...');
    } else {
        $('.hero-search .form-control').attr('placeholder', 'Search the directory, communities, resources...');
    }

    $(".top-tile:not(.resources)").each(function() {
        var self = $(this);

        var link = $(self).find("h3 a"),
            href = $(link).attr("href"),
            anchorText = $(link).text();
        link.replaceWith("<span>" + anchorText + "</span>");

        if ($(link).attr("target") == "_blank") {
            $(self).wrapInner(
                '<a href="' + href + '" target="_blank" rel="noopener" />'
            );
        } else {
            $(self).wrapInner('<a href="' + href + '" />');
        }
    });

    $('.top-tile.resources .HtmlContent').click(function() {
        $(this).parent().addClass('open')
    });

    $('.top-tile.resources').prepend(
        '<button type="button" onclick="toggleTile();"><i class="far fa-times"></i></button>'
    );
}

function toggleTile() {
    if ($('.top-tile.resources').hasClass('open')) {
        closeTile();
    }
}

function closeTile() {
    $('.top-tile.resources').removeClass('open');
}

function handlePopularDiscussions() {
    $(".ContentUserControl .HLLandingControl.HLDiscussions ul li").each(
        function() {
            var byline = $(this).find(".ByLine");
            var communityName = $(this).find("h5");

            $(byline).appendTo(this);
            $(communityName).appendTo(this);

            $(communityName)
                .contents()
                .filter(function() {
                    return this.nodeType === 3;
                })
                .remove();
        }
    );
}

function handleNews() {
    $(".home .HLLandingControl.HLRecentBlogs .Content .col-md-12>ul, .home .committee-news .HLLandingControl.HLRSSReader .Content>ul").slick({
        dots: false,
        arrows: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 7000,
        nextArrow: '<button type="button" class="slick-arrow next-arrow"><i class="far fa-arrow-right"></i></button>',
        prevArrow: '<button type="button" class="slick-arrow prev-arrow"><i class="far fa-arrow-left"></i></button>',
        responsive: [{
                breakpoint: 768,
                settings: {
                    arrows: false,
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 650,
                settings: {
                    arrows: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    });

    $('.home .committee-news .HLLandingControl.HLRSSReader h2').append($('.home .committee-news .HLLandingControl.HLRSSReader .Content a[id*="lnkMore"]'))
    $('.home .HLLandingControl.HLRecentBlogs h2').append($('.home .HLLandingControl.HLRecentBlogs .Content a[id*="MoreLink"]'))

}

function handleCLP() {
    $(".community-landing-page .ContentUserControl .HLLandingControl.HLRecentBlogs ul li").each(
        function() {
            var byline = $(this).find(".ByLine");
            // var content = $(this).find('.row.content-row')
            // $(content).appendTo(this);
            console.log(byline);
            $(byline).appendTo(this);

        }
    );
};

function handleFeaturedCompany() {
    $('.featured-company, .callout-box.company').each(function() {
        $(this).find('.HtmlContent > img:first-of-type').wrap('<div class="img-container" />');
        $(this).find('.HtmlContent > *:not(img)').wrapAll('<div class="text-container" />');
        $(this).find('.img-container').prependTo($(this).find('.text-container'));
        handleBgImage($(this), $(this).find('.img-container'));
    });

    $(".featured-company .HtmlContent > *").each(function() {
        var self = $(this)
        $(self).appendTo('.callout-box.company>.HtmlContent')
    });

    $('.featured-company').remove()
    $('.see-more-companies em').appendTo('.callout-box.company>.HtmlContent')

}

function handleFeaturedEvent() {
    $(".featured-event .HtmlContent > *:not(img)").wrapAll(
        '<div class="text-container" />'
    );
    $(".featured-event .HtmlContent > img:first-of-type").wrap(
        '<div class="img-container" />'
    );

    handleBgImage(
        ".featured-event .HtmlContent .img-container",
        ".featured-event .HtmlContent .img-container"
    );
}