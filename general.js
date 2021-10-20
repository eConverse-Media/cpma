$(function () {
	handlePageTitles();
	handleSearch();
	handleHero();
	handlePopularDiscussions();
	handleNews();
	handleFeaturedCompany();
	handleFeaturedEvent();
});

function handlePageTitles() {
	var headerImg = $(".interior-header-img img").attr("src");
	$("#PageTitleH1").css("background-image", 'url("' + headerImg + '")');
}

function handleSearch() {
	$(".search-bar-top").appendTo("#MPOuterHeader");
	$(".search-btn-top").appendTo("#MPOuterHeader #NAV .nav");
	$(".search-bar-top").prepend($(".search-bar-title"));
	$(".search-bar-top").prepend($(".search-close-btn"));
	$(".search-bar-top").hide();
	$(".search-btn-top, .dashboard-button.search a").bind("click", function (e) {
		if ($(".search-bar-top button").is(e.target)) {
			return;
		} else if (
			$(".search-btn-top, .dashboard-button.search a").is(e.target) ||
			$(".search-btn-top, .dashboard-button.search a").is(e.target) ||
			$(".search-btn-top i, .dashboard-button.search a").is(e.target)
		) {
			$(".search-bar-top").slideToggle("fast");
			$(".search-bar-top .form-control").focus();
		} else if (
			$(".search-bar-top").css("display") == "block" &&
			!$(".SearchInputs .form-control").is(e.target)
		) {
			$(".search-bar-top").slideToggle("fast");
		} else {
			return;
		}
	});
	$('.search-bar-top .input-group input[id*="SearchTerm"]').attr(
		"placeholder",
		"Search..."
	);
	$('#searchColumn input[id$="SearchTerm"]').attr("placeholder", "Search...");

	$(document).click(function (e) {
		var searchBar = $(".search-bar-top"),
			searchButton = $(".search-btn-top, .dashboard-button.search a"),
			target = e.target;

		if (!$(target).is(searchBar) &&
			!$(target).is(searchButton) &&
			!$(target).closest(".search-bar-top").html() &&
			!$(target).closest(".search-btn-top").html()
		) {
			closeSearch();
		}
	});

	function closeSearch() {
		$("body").removeClass("search-open");
		$(".search-btn-top").removeClass("open");
		$(".search-bar-top").hide();
	}

	$(".search-btn-top, .dashboard-button.search a").bind("click", function () {
		if ($(".search-btn-top").hasClass("open")) {
			$(".search-btn-top").removeClass("open");
			$("body").removeClass("search-open");
		} else if (!$(".search-btn-top").hasClass("open")) {
			$(".search-btn-top").addClass("open");
			$("body").addClass("search-open");
		} else {
			return;
		}
	});
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

	$('.hero-search input[id$="SearchTerm"]').attr(
		"placeholder",
		"Search the directory, communities, resources..."
	);

	$(".top-tile").each(function () {
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
}

function handlePopularDiscussions() {
	$(".home .ContentUserControl .HLLandingControl.HLDiscussions ul li").each(
		function () {
			var byline = $(this).find(".ByLine");
			var communityName = $(this).find("h5");

			$(byline).appendTo(this);
			$(communityName).appendTo(this);

			$(communityName)
				.contents()
				.filter(function () {
					return this.nodeType === 3;
				})
				.remove();
		}
	);
}

function handleNews() {
	$(".home .HLLandingControl.HLRecentBlogs .Content .col-md-12>ul, .home .HLLandingControl.HLRSSReader .Content>ul").slick({
		dots: false,
		arrows: true,
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 7000,
		nextArrow: '<button type="button" class="slick-arrow next-arrow"><i class="far fa-arrow-right"></i></button>',
		prevArrow: '<button type="button" class="slick-arrow prev-arrow"><i class="far fa-arrow-left"></i></button>',
	});

	$('.home .HLLandingControl.HLRSSReader h2').append($('.home .HLLandingControl.HLRSSReader .Content a[id*="lnkMore"]'))
	$('.home .HLLandingControl.HLRecentBlogs h2').append($('.home .HLLandingControl.HLRecentBlogs .Content a[id*="MoreLink"]'))
}

function handleFeaturedCompany() {
	$(".featured-company .HtmlContent > *").each(function () {
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