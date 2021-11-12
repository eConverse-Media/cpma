function slickify() {
    $('.dashboard-inner').slick({
        dots: !0,
        arrows: !1,
        infinite: !0,
        autoplay: !1,
        mobileFirst: !0,
        responsive: [{
            breakpoint: 992,
            settings: 'unslick'
        }]
    });
}

function toggleDashboard() {
    !!$('.member-dashboard').hasClass('open') ? handleClose() : handleOpen();
}

function handleOpen() {
    $('.member-dashboard').addClass('open'),
        $('.dashboard-toggle').addClass('open'),
        $('.dashboard-toggle button').text('Collapse');
}

function handleClose() {
    $('.member-dashboard').removeClass('open'),
        $('.dashboard-toggle').removeClass('open'),
        $('.dashboard-toggle button').text('Expand'),
        $(window).width() < 992 && $('.member-dashboard .slick-initialized').slick('slickGoTo', 0, !1),
        $('.member-dashboard > .row-wide').animate({
            scrollTop: 0
        });
}

function checkForDesktop() {
    $(window).width() > 991 ? (handleOpen(), $('.toggle-content').hide()) : (handleClose(), slickify());
}
$(function() {
    var a =
        '<div class="greeting"><span>Welcome back, </span><a href="profile">' +
        $('.HLWelcomeHeader .panel-body h4').text() +
        '!' +
        '</a></div>';
    var linkToInbox = '/network/members/profile/myaccount/inbox/';
    var unreadEmailCount =
        $('a[id^="Welcome_Details_MessagesCount"]').length !== 0 ?
        parseInt($('a[id^="Welcome_Details_MessagesCount"]').text()) :
        0;
    var emailContent =
        '<div class="email-content"><a href ="' +
        linkToInbox +
        '">' +
        unreadEmailCount +
        '<div class="unread">unread messages</div>' +
        '</a></div>';

    s = $('div[id*="CompleteBarProgress"]').clone();
    $('.member-dashboard-img').wrap('<div class="user-details" />'),
        $('.user-details').wrap('<div class="dashboard-col-1 col-md-5" />'),
        $('.user-details').append(a),
        $('.greeting').append(emailContent),
        $.trim($(s).html()) &&
        ($('.dashboard-col-1').append('<span class="progress-text">Profile Completion</span>'),
            $('.dashboard-col-1').append(s)),
        $('.dashboard-link').wrapAll('<div class="dashboard-links" />'),
        $('.dashboard-links').appendTo('.dashboard-col-1'),
        $('.getting-started, .dashboard-btn').wrapAll('<div class="dashboard-col-2 col-md-3" />'),
        $('div[class*="dashboard-col-"]').wrapAll('<div class="member-dashboard clearfix" />'),
        $('.member-dashboard').wrapInner('<div class="row row-wide dashboard-inner clearfix" />'),
        $('.dashboard-toggle').appendTo('.member-dashboard'),
        checkForDesktop(),
        $(window).on('resize orientationChange', function() {
            $(window).width() < 992 && !$('.dashboard-inner .slick-track').html() && slickify();
        });

    $('.see-more-btn').appendTo('.dashboard-col-3 div[id*="UpdatePanel"]')

    if (unreadEmailCount == 1) {
        $('.unread').text('unread message');
    }

    var membership = $('.membership-renewal-alert')

    if (membership.length > 0) {
        $('.member-dashboard').addClass('has-membership')
    }
});