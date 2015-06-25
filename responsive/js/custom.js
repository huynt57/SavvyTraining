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
        var tab = $(this).find('i').attr('class');
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
                break;
            case 'video':
                $('#content').fadeOut(500, function() {
                    removeOldContent();
                    $('#video').fadeIn(500);
                });
                break;
            case 'company':
                $('#content').fadeOut(500, function() {
                    removeOldContent();
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
    
    $('#list_image > li > a > img').click(function() {
       //$(this).height(100).width(100);
       $('fullscreen_slider').show().height($(window).height()).width($(window).height());;
       
    });
});

