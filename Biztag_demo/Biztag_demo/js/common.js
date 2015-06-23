var pageInfo = pageInfo || {};
var currentTab = 'home'; // store current tab after selected
var previousTab = 'home';  // store last active tab (does not store share and follow tab)
var currentTimer = null; // store timer object to clear when needed
var comments = comments || {};

var videoProviders = { // regex to match youtube or vimeo videos
        'youtube': /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube\.com\S*[^\w\-\s])(([\w\-]{11}))(?=[^\w\-]|$)(?![?=&+%\w]*(?:['"][^<>]*>|<\/a>))[?=&+%\w-]*/i,
        'vimeo': /https?:\/\/(player\.vimeo\.com)\/video\/(?:hd#)?([0-9]+)/i
    };

var allowedFileTypes = /(\.ogg)|(\.webm)|(\.mp4)+$/i; // allowed file extension for HTML5 video player

/* handling document ready events for all pages */
$(document).ready(function() {
    
	//add email button events
	$('#emailLoginBtn').click(function(){
		$('#emailLogin').slideDown("slow");
		$('#loginType').slideUp();
	});
	
	$('#back').click(function(){
		$('#loginType').slideDown("slow");
		$('#emailLogin').slideUp();
	});
	
	$('.description a').click(function(){
		$('.expandable').slideToggle();
	});
	
   //shorten content 
    var length = 110;
    var ellipsis = ' ...';
    $('.thumb p').each(function() {
        var text = $(this).text();
        var shortString = text.substring(0, length) + ellipsis;
        $(this).text(shortString);
    });
    
    var buildComment = function(username, avatar, url, time, content){
    	return  "<div class='row'>" +
    					"<div class='col-xs-12'>" +
    								"<img src='" + avatar + "'/>" +
    								"<div class='comment'>" +
    									"<p><a href='" + url + "' class='username'>" + username + "</a>" +
    									"<small class='pull-right'>" + time + "</small></p>" +
    									"<p>" + content + "</p>" +
    								"</div>" +
    					"</div>" +
    			 "</div>";
    };
    
    //load comment
    if(typeof comments != 'undefined' && comments.length > 0) {
    	//call ajax to get comments
    	for(var i = 0; i < comments.length; i++) {
			var buildHtml = buildComment(comments[i].username, comments[i].avatar,comments[i].url, comments[i].time, comments[i].content);
    		$( ".comment_list" ).append( buildHtml );
        }
    }
    
    //load more comment
	$('#loadMore_btn').click(function (e) {
		 e.preventDefault();
		//call ajax to get more comments
		 for(var i = 0; i < comments.length; i++) {
			 var buildHtml = buildComment(comments[i].username, comments[i].avatar,comments[i].url, comments[i].time, comments[i].content);
			 $( ".comment_list" ).append( $(buildHtml).fadeIn('slow') );
		 }
		 var top = $('#loadMore_btn').offset().top ;
		 $(window).scrollTop(top);
	});
	
	//spinner input
	$(".spinner").each(function(){
		var spinner = $(this).find('input');
	      $('<div class="input-group-btn-vertical"><button type="button" class="btn btn-default"><i class="fa fa-caret-up"></i></button><button type="button" class="btn btn-default"><i class="fa fa-caret-down"></i></button></div>')
	      		.insertAfter(spinner);
	    $(this).find('.btn:first-child').on('click', function() {
			var val= spinner.val();
			spinner.val($.isNumeric( val) ? (parseInt(val) + 1) : 1);
		});
		$(this).find('.btn:last-child').on('click', function() {
			var val= spinner.val();
			spinner.val(parseInt(val) > 0 ? (parseInt(val) - 1) : 0);
		});
		
	});
	
	//add event for comment block
	$('#account_choose').click(function(){
		$('#comments_account_list').slideToggle();
		return false;
	});
	
	$("#comments_account_list a").click(function(){
		$('#comments_account_list').slideUp();
		 $("#login_name").text($(this).text());
		 return false;
	});
	
	//add mask for image when selected image
	$('#poll_images a').click(function() {
		$('#poll_images a').removeClass('selected');
		$(this).addClass('selected');
		$('.mask').remove();
		$('<img class="mask img-responsive" src="../img/icons/mask2.png" />').appendTo(this);
		return false;
	});
	
    // create left navigation
    $('nav#menu').mmenu({
        classes: 'mm-light'
    });
    
    // add footer events
    $('#footer li').click(function(){
        // store previous tab
        if(currentTab != 'share' && currentTab != 'follow') {
            previousTab = currentTab;
        }
        
        // change selected tab
        $(this).parent().find('li.selected').removeClass('selected');
        $(this).addClass('selected');
        
        // clear timeout
        if(currentTimer) {
            clearTimeout(currentTimer);
        }
        
        // proceed new tab
        switch($(this).find('i').attr('class')) {
            // home page tab
            case 'biz_footer_home': 
                if(currentTab != 'home') {
                    switchTab(previousTab, currentTab, 'home-page');
                }
                currentTab = 'home';
                break;
                
            // follow this app
            case 'biz_footer_follow':
                if(currentTab != 'follow') {
                    $('#follow_fastapp_popup').stop().show().animate({
                        'bottom': '50px'
                    }, 500);
                    
                    // hide after 3 seconds
                    currentTimer = setTimeout(function(){
                        $('#follow_fastapp_popup').stop().animate({
                            'bottom': '-500px'
                        }, 500, function(){$('#follow_fastapp_popup').hide()});
                        
                        $('#footer').find('li.selected').removeClass('selected');
                        $('#footer').find('li[tab_name="' + previousTab + '"]').addClass('selected');
                        var tmp = previousTab;
                        previousTab = currentTab;
                        currentTab = tmp;
                    }, 3000);
                    
                }
                currentTab = 'follow';
                break;
                
            // video page
            case 'biz_footer_video': 
                if(currentTab != 'video') {
                    switchTab(previousTab, currentTab, 'video-page');
                }
                currentTab = 'video';
                
                // build video list after switch tab
                if(typeof pageInfo.isBuiltVideo == 'undefined' || !pageInfo.isBuiltVideo){
                    buildVideoList();
                }
                
                break;
                
            // comapny page
            case 'biz_footer_company': 
                if(currentTab != 'company') {
                    switchTab(previousTab, currentTab, 'company-page');
                }
                currentTab = 'company';
                break;
                
            // share page
            case 'biz_footer_share': 
                if(currentTab != 'share') {
                    $('#social_links_popup').stop().show().animate({
                        'bottom': '50px'
                    }, 500);
                }
                currentTab = 'share';
                break;
            default: break; // do nothing
                
        }
        
        // hide share popup if existed
        if($('#social_links_popup').is(':visible') && currentTab != 'share') {
            $('#social_links_popup').stop().animate({
                'bottom': '-500px'
            }, 500, function(){
                $('#social_links_popup').hide();
            });
        }
        
        // hide following popup if existed
        if($('#follow_fastapp_popup').is(':visible') && currentTab != 'follow') {
            $('#follow_fastapp_popup').stop().animate({
                'bottom': '-500px'
            }, 500, function(){
                $('#follow_fastapp_popup').hide();
            });
        }
    });
    
    // build social popup
    if(typeof pageInfo != 'undefined' && typeof pageInfo.social_links) {
        var socials = pageInfo.social_links;
        var container = $('#social_links_popup');
        var count = 0;
        container.empty();
        
        if(pageInfo.social_links) {
            for(var i in socials) {
                container.append('<li type="' + i + '"><a target="_blank" class="social_' + i + '_icon" href="' + socials[i] + '"></a></li>');
            }
        } else {
            container.append('<center>Sorry! No social links available on this app.</center>');
        }
    }
    
    // build image grid and full image slider
    if(typeof pageInfo.images != 'undefined' && pageInfo.images.length > 0) {
        // prepare html for gid layout and full slider
        var gridLayout = $('#image_grid').empty();
        var fullSlider = $('<ul class="swipe-wrap"></ul>');
        
        for(var i = 0; i < pageInfo.images.length; i++) {
            $('<li><a href="javascript:void(0)" data-des="' + escape(pageInfo.images[i].description) + '" image_index="' + i + '" style="background-image: url(\'' + pageInfo.images[i].source + '\');"></a></li>').appendTo(gridLayout);
            $('<li><a href="javascript:void(0)" style="background-image: url(\'' + pageInfo.images[i].source + '\');"></a></li>').appendTo(fullSlider);
        }
        
        $('#fullscreen_slider').empty().append(fullSlider).append('<div class="image_info"></div>');
        
        // attach event
        $('#image_grid > li > a').on('click', function(e){
            e.preventDefault();
            var imageIndex = parseInt($(this).attr('image_index'));
            
            $('#fullscreen_slider').height($(window).height()).width($(window).width());
            
            if(typeof window.mySwipe == 'undefined') {
                // init full screen slider if not existed
                var elem = document.getElementById('fullscreen_slider');
                $('#fullscreen_slider').show();
                window.mySwipe = Swipe(elem, {
                    startSlide: imageIndex,
                    // auto: 3000,
                    // continuous: true,
                    disableScroll: true,
                    stopPropagation: true,
                    callback: function(index, element) {
                        
                    },
                    transitionEnd: function(index, element) {
                        $('#fullscreen_slider .image_info').text(unescape($('#image_grid a[image_index="' + mySwipe.getPos() + '"]').attr('data-des')));
                    }
                });
                
                // button previous
                $('<a class="slider_left_btn" href="javascript:void(0)"><i class="fa fa-angle-left"></i></a>').click(function(){
                    mySwipe.prev();
                }).appendTo($(elem));
                
                // button next
                $('<a class="slider_right_btn" href="javascript:void(0)"><i class="fa fa-angle-right"></i></a>').click(function(){
                    mySwipe.next();
                }).appendTo($(elem));
                
                // button back to grid
                $('<a class="slider_grid_btn" href="javascript:void(0)"></a>').click(function(){
                    $('#fullscreen_slider').css('bottom', '-10000px');
                }).appendTo($(elem));
                
                // button info
                $('<a class="slider_info_btn" href="javascript:void(0)"></a>').click(function(){
                    $('#fullscreen_slider .image_info').text(unescape($('#image_grid a[image_index="' + mySwipe.getPos() + '"]').attr('data-des'))).animate({
                        'bottom': 'toggle'
                    }, 500);
                }).appendTo($(elem));
            } else {
                // show full screen slider if existed
                mySwipe.slide(imageIndex, 1);
                $('#fullscreen_slider').css('bottom', '0');
            }
        });
    }
    
    // update fullscreen slider size when change window size
    $(window).on('resize', function(){
        $('#fullscreen_slider').height($(window).height()).width($(window).width());
    });
    
    // build company info page
    if(typeof pageInfo.company_info != 'undefined') {
        var companyContainer = $('#company-page > div').empty();
        var comData = pageInfo.company_info;
        
        if(typeof comData.biz_logo != 'undefined' && comData.biz_logo.trim().length > 0) {
            companyContainer.append('<div class="company_logo"><img src="' + comData.biz_logo + '"/></div>');
        }
        if(typeof comData.name != 'undefined' && comData.name.trim().length > 0) {
            companyContainer.append('<div class="company_name">' + comData.name + '</div>');
        }
        if(typeof comData.address != 'undefined' && comData.address.trim().length > 0) {
            companyContainer.append('<p class="company_address">' + comData.address + '</p>');
        }
        if(typeof comData.phone != 'undefined' && comData.phone.trim().length > 0) {
            companyContainer.append('<p class="company_phone"><a href="tel:' + comData.phone + '">' + comData.phone + '</a></p>');
        }
        if(typeof comData.fax != 'undefined' && comData.fax.trim().length > 0) {
            companyContainer.append('<p class="company_fax"><a href="tel:' + comData.fax + '">' + comData.fax + '</a></p>');
        }
        if(typeof comData.website != 'undefined' && comData.website.trim().length > 0) {
            companyContainer.append('<p class="company_website"><a href="' + comData.website + '" target="_blank">' + comData.website + '</a></p>');
        }
        if(typeof comData.email != 'undefined' && comData.email.trim().length > 0) {
            companyContainer.append('<p class="company_email"><a href="mailto:' + comData.email + '">' + comData.email + '</a></p>');
        }
        if(typeof comData.business_hour != 'undefined' && comData.business_hour.trim().length > 0) {
            companyContainer.append('<p class="company_bhour">' + comData.business_hour + '</p>');
        }
        
        companyContainer.append('<p class="company_feedback"><a href="#letusknow">Let us know</a></p>');
    }
});

/**
 * build video list on the first showing tab
 */
function buildVideoList() {
    if(typeof pageInfo.videos != 'undefined' && pageInfo.videos.length > 0) {
        var videoContainer = $('#video-list');
        for(var i = 0; i < pageInfo.videos.length; i++) {
            var tag = getVideoTag(pageInfo.videos[i].source);
            $('<li></li>').append(tag).appendTo(videoContainer);
        }
        
        pageInfo.isBuiltVideo = true;
    }
}

/**
 * get video id from Youtube or Vimeo
 * @param string video URL
 * @return array(videoId, provider) or null
 */
function getVideoInfo(videoUrl) {
    if(typeof videoUrl == 'undefined' || !videoUrl) return null;
    var pro = 'youtube'; 
    
    // detect youtube id
    if(videoUrl.trim().match(videoProviders.youtube)) {
        var video_id = videoUrl.split('v=')[1];
        var ampersandPosition = video_id.indexOf('&');
        if(ampersandPosition != -1) {
            video_id = video_id.substring(0, ampersandPosition);
        }
        
        ampersandPosition = video_id.indexOf('#');
        if(ampersandPosition != -1) {
            video_id = video_id.substring(0, ampersandPosition);
        }
        
        if(video_id) {
            return [video_id, pro];
        } else {
            alert("Incorrect Youtube video url");
            return null;
        }
    } else {
        // detect vimeo id
        pro = 'vimeo';
        var regExp = /(https|http):\/\/(www\.)?vimeo.com\/(\d+)($|\/)/i;
        var match = videoUrl.match(regExp);
        if (match){
            return [match[3], pro];
        } else {
            return null;
        }
    }

    
}

/**
 * get embeded code to show video (only for youtube and vimeo)
 * @param videoId
 * @param provider
 * @return string embeded tag or empty string 
 */
function getVideoEmbedIframe(videoId, provider) {
    if(typeof videoId == 'undefined' || !videoId || typeof provider == 'undefined' || !provider) return '';
    if(provider == 'youtube') {
        return '<iframe height="100%" width="100%" type="text/html" src="http://www.youtube.com/embed/' + videoId + '?autoplay=0" webkitAllowFullScreen mozallowfullscreen allowFullScreen frameborder="0"></iframe>'; 
    } else if (provider == 'vimeo') {
        return '<iframe height="100%" width="100%" type="text/html" src="http://player.vimeo.com/video/' + videoId + '?autoplay=0" webkitAllowFullScreen mozallowfullscreen allowFullScreen frameborder="0"></iframe>';
    } else {
        return '';
    }
}

/**
 * get tag to show video
 * @param videoUrl
 * @returns youtube iframe, vimeo iframe or html5 tag or empty string
 */
function getVideoTag(videoUrl) {
    if(typeof videoUrl == 'undefined' || !videoUrl) return '';
    var vi = getVideoInfo(videoUrl);
    if(vi) {
        return getVideoEmbedIframe(vi[0], vi[1]);
    } else {
        return '<video controls preload="none" width="100%" height="100%"><source src="' + videoUrl + '" /></video>'
    }
}

/**
 * switch footer tabs
 * @param pTab
 * @param cTab
 * @param nTab
 */
function switchTab(pTab, cTab, nTab) {
    // hide current tab and show new tab
    if($('#' + cTab + '-page').length > 0) {
        $('#' + cTab + '-page').fadeOut(500, function(){
            $('#' + nTab).fadeIn(500);
        });
    } else if ($('#' + pTab + '-page').length) { // hide previous tab and show new tab
        $('#' + pTab + '-page').fadeOut(500, function(){
            $('#' + nTab).fadeIn(500);
        });
    } else { // only show new tab
        $('#' + nTab).fadeIn(500);
    }
}