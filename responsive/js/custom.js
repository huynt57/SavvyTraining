var comments = [
    {
        'username': 'Thea',
        'time': '3 minutes',
        'content': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.Lorem ipsum dolor sit amet',
        'avatar': '../img/new/avatar (1).jpg',
        'url': '#'
    },
    {
        'username': 'Tommy',
        'time': '25 minutes',
        'content': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.Lorem ipsum dolor sit amet',
        'avatar': '../img/new/avatar (3).jpg',
        'url': '#'
    },
    {
        'username': 'Sarah',
        'time': '55 minutes',
        'content': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.Lorem ipsum dolor sit amet',
        'avatar': '../img/new/avatar (4).jpg',
        'url': '#'
    }
];

$(document).ready(function() {
    $('#btn_load').click(function() {
        $.each(comments, function(index, value) {
            // alert(this.username);$()
            $('.comment_list').append(
                    '<div class ="row">' +
                    '<div class ="col-xs-12">' +
                    '<img src="http://placehold.it/75x71" alt=""/>' +
                    '<div class="comment">' +
                    '<p>' +
                    '<a href="' + this.url + '" class="username">' + this.username + '</a>' +
                    '<small class="pull-right">' + this.time + '</small>' +
                    '</p>' +
                    '<p>'
                    + this.content +
                    '</p>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                    ).fadeIn('slow');
        });
    });

    $('#account_choose').click(function() {
        $('#comment_list_acc').slideToggle();
    });

    $('#acc_choose a').click(function() {
        var acc = $(this).html();
        $('#login_name').html(acc);
        $('#comment_list_acc').slideUp()();

    });

    $('#tab_footer li').click(function() {
        var tab = $(this).find('i').attr('tab_name');
        switch (tab) {
            case 'follow':
                $('#social_links').hide();
                $('#follow_mess').stop().show().animate({
                    'bottom': '50px'
                });
                $('#follow_mess').css({
                    'position': 'fixed'
                });
                setTimeout(function() {
                    $('#follow_mess').stop().show().animate({
                        'bottom': '-50px'
                    });
                }, 3000);
                break;
            case 'home':
                $('#video').hide();
                $('#social_links').hide();
                $('#follow_mess').hide();
                $('#home').hide();
                $('#company').hide();
                $('#content').show();
                break;
            case 'video':
                $('#content').fadeOut(500, function() {
                    $('#home').hide();
                    $('#company').hide();
                    $('#social_links').hide();
                    $('#follow_mess').hide();
                    $('#video').fadeIn(500);
                });
                break;
            case 'company':
                $('#content').fadeOut(500, function() {
                    $('#home').hide();
                    $('#video').hide();
                    $('#social_links').hide();
                    $('#follow_mess').hide();
                    $('#company').fadeIn(500);
                });
                break;
            case 'share':
                $('#follow_mess').hide();
                $('#social_links').stop().show().animate({
                    'bottom': '50px'
                });
                $('#social_links').css({
                    'position': 'fixed'
                });
                break;
        }

    });

    function removeOldContent()
    {
        $('#video').hide();
        $('#social_links').stop().show().animate({
            'bottom': '-50px'
        });
        $('#follow_mess').stop().show().animate({
            'bottom': '-50px'
        });
        $('#home').hide();
        $('#company').hide();
    }

    //$('#page').height($(window).height());

    $('#list_image > li > a > img').click(function() {
        //$(this).height(100).width(100);
//        var i
//        for (i = 0; i < 8; i++) {
//            $('#wrapper_swipe').append('<div><img src="https://placeholdit.imgix.net/~text?txtsize=14&txt=128%C3%9790&w=125&h=90" alt="" /></div>');
//            //$('#wrapper_swipe').append('<div>' + i + '</div>');
//        }
        var viewportHeight;
        var viewportWidth;
        if (document.compatMode === 'BackCompat') {
            viewportHeight = document.body.clientHeight;
            viewportWidth = document.body.clientWidth;
        } else {
            viewportHeight = document.documentElement.clientHeight;
            viewportWidth = document.documentElement.clientWidth;
        }
        $('#fullscreen_slider').show().height($(window).height()).width($(window).width());
        window.mySwipe = Swipe(document.getElementById('fullscreen_slider'));
        //  $('#fullscreen_slider').show().height(2000).width(2000);
        //alert('h');
        //   window.mySwipe = Swipe(document.getElementById('fullscreen_slider'));
        ///  $('#fullscreen_slider').show();
    });

    $('#hide_slider').click(function() {
        $('#fullscreen_slider').hide();
    });

    $('#info').click(function() {
        var des = $('#fullscreen_slider img[image_index="' + mySwipe.getPos() + '"]').attr('des');
        $('#info_toggle').html(des).animate({
            'bottom': 'toggle'
        });
    });

    $('#tab_footer > li').click(function() {
//        var tab_name = $(this).attr('tab_name');
//        alert(tab_name);

        $("#tab_footer").find('li').removeClass('selected');
        $(this).addClass('selected');
    });


});

