// JavaScript Document
(function($) {
  "use strict";
	// makes sure the whole site is loaded	
	$(window).on('load', function() {
		// will first fade out the loading animation
		$(".throbber").fadeOut();
		// will fade out the whole DIV that covers the website.
		$(".throbbers_loader").delay(500).slideUp('slow');
		if(!(/Android|iPhone|iPad|iPod|BlackBerry/i).test(navigator.userAgent || navigator.vendor || window.opera)){
			skrollr.init({
				smoothScrolling: false,
				mobileDeceleration: 0.004,
				forceHeight: false
			});	
			// youtube video
			$(".player").each(function(){
				$(this).YTPlayer();
			});
		}
		else{
			$('html').addClass('no-Skrollr');			
			// animation
			$("div").removeClass('animate');
			
			$(".player").each(function(){
				$(this).addClass('player-background');
			});
			$('.section-video-controls').css({'display':'none'});
		}
		
	})
	
	$(function() {
		
		
		$("input,textarea").jqBootstrapValidation({
			preventSubmit: true,
			submitError: function($form, event, errors) {
				// additional error messages or events
			},
			submitSuccess: function($form, event) {
				event.preventDefault(); // prevent default submit behaviour
				// get values from FORM
				var name = $("input#name").val();
				var email = $("input#email").val();
				var website = $("input#website").val();
				var message = $("textarea#message").val();
				var firstName = name; // For Success/Failure Message
				// Check for white space in name for Success/Fail message
				if (firstName.indexOf(' ') >= 0) {
					firstName = name.split(' ').slice(0, -1).join(' ');
				}
				$.ajax({
					url: "././contact/contact.php",
					type: "POST",
					data: {
						name: name,
						website: website,
						email: email,
						message: message
					},
					cache: false,
					success: function() {
						// Success message
						$('#success').html("<div class='alert alert-success'>");
						$('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
							.append("</button>");
						$('#success > .alert-success')
							.append("<strong>Your message has been sent. </strong>");
						$('#success > .alert-success')
							.append('</div>');

						//clear all fields
						$('#contactForm').trigger("reset");
					},
					error: function() {
						// Fail message
						$('#success').html("<div class='alert alert-danger'>");
						$('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
							.append("</button>");
						$('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
						$('#success > .alert-danger').append('</div>');
						//clear all fields
						$('#contactForm').trigger("reset");
					},
				})
			},
			filter: function() {
				return $(this).is(":visible");
			},
		});

		$("a[data-toggle=\"tab\"]").click(function(e) {
			e.preventDefault();
			$(this).tab("show");
		});
	});


	/*When clicking on Full hide fail/success boxes */
	$('#name').on('focus', function() {
		$('#success').html('');
	});



	jQuery(document).on('ready', function(){
		
		// browser check
		var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
		var is_explorer = navigator.userAgent.indexOf('MSIE') > -1 || navigator.appVersion.indexOf('Trident/') > 0 ;
		var is_firefox = navigator.userAgent.indexOf('Firefox') > -1;
		var is_safari = navigator.userAgent.indexOf("Safari") > -1;
		var is_opera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;//navigator.userAgent.indexOf("Presto") > -1;
		if ((is_chrome)&&(is_safari)) {is_safari=false;}
		
		if( is_safari ){
			$('html').addClass('safari');	
		}
		else if( is_explorer ){
			$('html').addClass('ie');
		}
		else if( is_firefox ){
			$('html').addClass('firefox');	
		}
		else if( is_opera ){
			$('html').addClass('opera');	
		}
		else {
			$('html').addClass('chrome');
		}
		
		$('.animate').each(function () {
			$(this).one('inview', function (e) {
				$(this).addClass('animated').css('visibility', 'visible');
			});
		});		
		
		
		// back to top			
		$('#back-to-top').fadeOut(duration);
		var offset = 220;
		var duration = 1000;
		$(window).on('scroll', function() {
			if ($(this).scrollTop() > offset) {
				$('.back-to-top').fadeIn(duration);
			} else {
				$('.back-to-top').fadeOut(duration);
			}
		});
		
		$('#back-to-top').on('click', function(event) {
			event.preventDefault();
			$('html, body').animate({scrollTop: 0}, duration);
			return false;
		})
				
		// page scroll		
		$('.page-scroll a').on('click', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $('.header-sticky').width()?$($anchor.attr('href')).offset().top-80:$($anchor.attr('href')).offset().top, // sticky check
			}, 1500, 'easeInOutExpo');
			event.preventDefault();
			return false;
		});

		 /**
		 * This part handles the highlighting functionality.
		 * We use the scroll functionality again, some array creation and 
		 * manipulation, class adding and class removing, and conditional testing
		 */
		var aChildren = $("nav li").children(); // find the a children of the list items
		var aArray = []; // create the empty aArray
		for (var i=0; i < aChildren.length; i++) {    
			var aChild = aChildren[i];
			var ahref = $(aChild).attr('href');
			aArray.push(ahref);
		} // this for loop fills the aArray with attribute href values

		$(window).on('scroll', function(){
			var windowPos = $('.header-sticky').width()?$(window).scrollTop()+80:$(window).scrollTop(); // get the offset of the window from the top of page sticky check
			var windowHeight = $(window).height(); // get the height of the window
			var docHeight = $(document).height();

			for (var i=0; i < aArray.length; i++) {
				var theID = aArray[i];	
				
				var divPosid = $(theID);
				if (!divPosid.length) {
					return;
				}
				var divPos = divPosid.offset().top; // get the offset of the div from the top of page
				
				var divHeight = $(theID).height(); // get the height of the div in question
				if (windowPos >= divPos && windowPos < (divPos + divHeight)) {
					$("a[href='" + theID + "']").addClass("active");
				} else {
					$("a[href='" + theID + "']").removeClass("active");
				}
			}

			if(windowPos + windowHeight == docHeight) {
				if (!$("nav li:last-child a").hasClass("active")) {
					var navActiveCurrent = $(".active").attr("href");
					$("a[href='" + navActiveCurrent + "']").removeClass("active");
					$("nav li:last-child a").addClass("active");
				}
			}
		});
		
		$('.agni-slides').each(function(){
			// super slider	
			Hammer($(this)[0]).on("swipeleft", function(e) {
				$(this).data('superslides').animate('next');
			});
			Hammer($(this)[0]).on("swiperight", function(e) {
				$(this).data('superslides').animate('prev');
			});			
			$(this).superslides({
				animation_speed: 700,
				animation_easing: 'easeOutQuad',
				animation: 'slide',
				pagination:true,
				play: 7000
			});						
			$(this).find('.slide-title').each(function(){
				slideAnimation('.slide-title', 'fadeInDown');
			})			
		}); 
		$('.agni-video').each(function(){		
			Hammer($(this)[0]).on("swipeleft", function(e) {
				$(this).data('superslides').animate('next');
			});
			Hammer($(this)[0]).on("swiperight", function(e) {
				$(this).data('superslides').animate('prev');
			});			
			$(this).superslides({
				animation_speed: 700,
				animation: 'fade',
				play: 7000
				
			});
		});
		
		// text rotator
		$('.text-rotator').each(function() {
			$(this).find('.rotate').textrotator({
				separator: "|",
				speed: 4000
			});
		});

		if( $('.header-navigation-menu.transparent-nav-menu').width() ){
			var offset = 330; //$(window).height()-80;
			$('.header-navigation-menu').each(function(){					
				($(window).scrollTop() > offset)?$(this).removeClass('transparent-nav-menu'):$(this).addClass('transparent-nav-menu');
			}) 				
			$('.header-navigation-menu.change-style').each(function(){					
				($(window).scrollTop() > offset)?$(this).removeClass('dynamic-nav-menu'):$(this).addClass('dynamic-nav-menu');
						
			}) 			
			$(window).on('scroll', function() {
				$('.header-navigation-menu').each(function(){					
					($(window).scrollTop() > offset)?$(this).removeClass('transparent-nav-menu'):$(this).addClass('transparent-nav-menu');				
				}) 				
				$('.header-navigation-menu.change-style').each(function(){					
					($(window).scrollTop() > offset)?$(this).removeClass('dynamic-nav-menu'):$(this).addClass('dynamic-nav-menu');
				}) 						
			});
		}
		
		// tab-nav-menu
		$('.fullscreen-nav-menu .tab-nav-menu-content').parent('.tab-nav-menu').slideUp(400);
		$('.toggle-nav-menu').on('click', function(m){
			m.preventDefault();
			
			$(this).find('.burg').toggleClass('activeBurg')
			if ( $('.tab-nav-menu-content').is(':hidden') ) {		
				$('.tab-nav-menu-content').slideDown(400);
			}
			else{
				$('.tab-nav-menu-content').slideUp(400);				
			}
			if ( $('.fullscreen-nav-menu .tab-nav-menu-content').is(':hidden') ) {		
				$('.fullscreen-nav-menu .tab-nav-menu-content').parent('.tab-nav-menu').slideDown(400);
				$('.fullscreen-nav-menu .tab-nav-menu-content').fadeIn('slow');
			}
			else{
				$('.fullscreen-nav-menu .tab-nav-menu-content').parent('.tab-nav-menu').slideUp(400);	
				$('.fullscreen-nav-menu .tab-nav-menu-content').fadeOut('fast');				
			}
					
		});
		
		
		// tablet menu		
		$('.tab-nav-menu-content .menu-item-has-children >a').append("<a class=indicator href=#><i></i></a>");		
		$('.tab-nav-menu-content .menu-item-has-children >a .indicator i').addClass("ion-ios-plus-empty");		
		$('.tab-nav-menu-content .menu-item-has-children a.indicator').click(function(m){
			m.preventDefault();
			m.stopImmediatePropagation();
			if ( $(this).parent(' a ').parent(' li ').children('.sub-menu').is(':hidden')  ) {		
				$(this).parent(' a ').parent(' li ').children('.sub-menu').slideDown(400);
			}
			else
			{
				$(this).parent(' a ').parent(' li ').children('.sub-menu').slideUp(400);
			}		
			
		});			
		$(".nav-menu-content a").on('click', function(e){			
			$(this).addClass('active');
			$(this).parent().siblings().find('a').removeClass('active');
			return false;
		});

		$('.section-video-container').each(function() {
			
			$(this).siblings('div').find('.command-play').click(function(event) {
				event.preventDefault();
				$(this).parents('div').find("#bgndVideo-2").playYTP();	
				$(this).css({'display':'none'});	
				$(this).siblings('.command-pause').css({'display':'block'});
			})
			$(this).siblings('div').find('.command-pause').click(function(event) {
				event.preventDefault();
				$(this).parents('div').find("#bgndVideo-2").pauseYTP();	
				$(this).css({'display':'none'});	
				$(this).siblings('.command-play').css({'display':'block'});
			})			
			
		});
				
		// milestone count		
		$.fn.countUp = function( options ) {
			$('.count').each( function() {
				var defaults = {
					startVal: 0,
					endVal: $(this).attr( "data-count" ),
					decimals: 0,
					duration: 1.5,
					options: {
						useEasing: true,
						useGrouping: true 
					}
				},
				options = $.extend({}, defaults, options);
				var mile_count = new countUp( this, options.startVal, options.endVal, options.decimals, options.duration, options.options );
				$(this).one("inview", function (e) {
					mile_count.start();
				})								
			})		
		};
		$('.count').each( function() {
			$(this).countUp();
		});
		
		// portfolio magnific popup
		$('.portfolio-page').each(function(){
			$(this).magnificPopup({
				delegate: '.portfolio-post:not(.filterhide) a.portfolio-single-link',
				closeMarkup:'<div class="portfolio-navigation navigation"><div class="portfolio-nav-links container"><a title="%title%" href="#" class="mfp-close"><i class="ion-ios-close-empty mfp-close"></i></a></div></div>', 	//<i class="ion-android-close"></i>	
				closeOnBgClick:false,
				closeBtnInside: true,
				type: 'ajax',
				cursor: 'mfp-ajax-cur',
				fixedBgPos:true,
				fixedContentPos:true,
				overflowY: 'scroll',
				mainClass: 'mfp-fade mfp-main',
				alignTop: true,
				preloader: true,
				tLoading: '<div class="throbbers_loader"><div class="throbber"></div></div>',
				gallery: {
					enabled: true, 
					preload: [0,2], 
					navigateByImgClick: true,
					arrowMarkup: '<a title="%title%" href="#" class="mfp-arrow mfp-arrow-%dir%"></a>', // markup of an arrow button

					tPrev: 'Previous (Left arrow key)', // title for left button
					tNext: 'Next (Right arrow key)', // title for right button
					tCounter: '<span class="mfp-counter">%curr% of %total%</span>' // markup of counter
				},	
				callbacks: {
					beforeOpen: function() {
						$('.portfolio-thumbnail').each(function(){
							$(this).css({'overflow':'visible'});
						});
					},
					
					open: function(){						
						$('.portfolio-navigation').hide();	
						
					},
					close: function(){								
					},
					afterClose: function() {
						$('.portfolio-thumbnail').each(function(){
							$(this).css({'overflow':'hidden'});
						});
					},			
					parseAjax: function(mfpResponse) {
						mfpResponse.data = $(mfpResponse.data).find('.portfolio-single-content');
					},
					ajaxContentAdded: function() {	
						$('.portfolio-navigation').delay(500).show(500);
						$('.portfolio-navigation').children('.portfolio-nav-links').prepend(this.arrowLeft);
						$('.portfolio-navigation').children('.portfolio-nav-links').append(this.arrowRight);
						$('.portfolio-navigation').each(function(){
							$(this).find('a').click(function(c){
								c.preventDefault();
							})
						});	
						$('.post-sharing-buttons').each(function(){
							$(this).find('a').click(function(s){
								s.preventDefault();
								newPopup($(this).attr('href'));
							})		
						});
						$('.custom-slider').each(function(){
							$(this).owlCarousel({
								autoplay : true,
								autoplayTimeout:4000,
								smartSpeed:500,
								loop:true,
								dots : false,
								items:1,
								nav:true,
								navText: ['<i class="ion-ios-arrow-left small-icon">','<i class="ion-ios-arrow-right small-icon">']
							});
						})
					}
				}
			})
		});
		$('.custom-image').magnificPopup({
			type: 'image',
			mainClass: 'mfp-img-mobile',
			showCloseBtn:false,
			image: {
				verticalFit: true
			},
			zoom: {
				enabled: true, // By default it's false, so don't forget to enable it
				duration: 300, // duration of the effect, in milliseconds
				easing: 'ease-in-out' // CSS transition easing function 
			}
		});
		$('.custom-gallery').each(function() { // the containers for all your galleries
			$(this).magnificPopup({
				delegate: 'a', // the selector for gallery item
				type: 'image',
				mainClass: 'mfp-img-mobile mfp-image-popup',
				image: {
					verticalFit: true
				},
				gallery:{
					enabled:true,
					navigateByImgClick: false
				},
				zoom: {
					enabled: true, // By default it's false, so don't forget to enable it
					duration: 300, // duration of the effect, in milliseconds
					easing: 'ease-in-out' // CSS transition easing function 
				}
			})
		});
		
		// portfolio isotope & filter 			
		$("#filters a").on('click', function(e){
			e.preventDefault();
			$(this).addClass('active');
			$(this).parent().siblings().find('a').removeClass('active');
			return false;
		});
		
		var $portfolio_container = $('.portfolio-page');		
		$('.filter a').on('click', function(){
			var selector = $(this).attr('data-filter');
			$portfolio_container.isotope({ 
				itemSelector: '.portfolio-thumbnail',
				filter: selector
				
			});
			$('.portfolio-thumbnail').each(function(){
				if( !$(this).hasClass(selector.replace(".", ""))){
					$(this).addClass('filterhide');
				}
				else{
					$(this).removeClass('filterhide');
				}
			
			});			
			return false;  
		});		
		
		$portfolio_container.isotope();
		$portfolio_container.imagesLoaded(function() {
			$portfolio_container.isotope('layout');
		});		
				
		// progress bar
		$('.progress-bar-animate').each(function(){
			if( $(this).attr('role') == 'progressbar' ){
				$(this).one('inview', function (e) {
					$(this).css({'width':$(this).attr( 'aria-valuenow' )+'%'});
				});
			}
		});
		
		// Custom Slider	
		$('.custom-slider').each(function() {
			$(this).owlCarousel({
				autoplay : true,
				autoplayTimeout:4000,
				smartSpeed:500,
				loop:true,
				dots : false,
				items:1,
				nav:true,
				navText: ['<i class="ion-ios-arrow-left small-icon">','<i class="ion-ios-arrow-right small-icon">']			
			})
		});
		
		// carousel clients		
		$('.carousel-clients').each(function() {
			$(this).owlCarousel({
				autoplay : true,
				autoplayTimeout:4000,
				loop:true,
				margin:60,
				responsive:{
					0:{
						items:1
					},
					768:{
						items:2
					},
					992:{
						items:3
					},
					1200:{
						items:4
					}
				}			
			})
		});
		
		// carousel team	
		$('.carousel-team').each(function() {
			$(this).owlCarousel({
				autoplay : true,
				autoplayTimeout:5000,
				autoplayHoverPause : true,
				loop:true,
				margin:60,
				responsive:{
					0:{
						items:1
					},
					768:{
						items:1
					},
					992:{
						items:2
					},
					1200:{
						items:2
					}
				}			
			})
		});	
		// carousel team	
		$('.carousel-team-2').each(function() {
			$(this).owlCarousel({
				autoplay : true,
				autoplayTimeout:5000,
				autoplayHoverPause : true,
				loop:true,
				margin:60,
				responsive:{
					0:{
						items:1
					},
					768:{
						items:2
					},
					992:{
						items:3
					},
					1200:{
						items:3
					}
				}			
			})
		});	
		
		// carousel testimonials	
		$('.carousel-testimonials').each(function() {
			$(this).owlCarousel({
				autoplay : true,
				autoplayTimeout:4000, 
				smartSpeed:700,
				dots :false,
				loop:true,
				items:1
			
			})
		});	
		
		$('.blog-masonry').each(function(){
			var $container = $(this).imagesLoaded( function() {
				$container.isotope({
					itemSelector: '.blog-content',
					layoutMode: 'masonry'
				})
			})		
		});
			
		
		$('.post-details').each(function(){
			$(this).on({
				mouseenter: function(){
					$(this).siblings('.post-thumbnail').addClass('post-thumbnail-hovered');
				},
				mouseleave: function(){
					$(this).siblings('.post-thumbnail').removeClass('post-thumbnail-hovered');
				}
			})
		});
		
		$('.post-sharing-buttons').each(function(){
			$(this).find('a').on('click', function(s){
				s.preventDefault();
				newPopup($(this).attr('href'));
			})		
		});
		
		// Contact form
		
		$("body").on("input propertychange", ".floating-label-form-group", function(e) {
			$(this).toggleClass("floating-label-form-group-with-value", !! $(e.target).val());
		}).on("focus", ".floating-label-form-group", function() {
			$(this).addClass("floating-label-form-group-with-focus");
		}).on("blur", ".floating-label-form-group", function() {
			$(this).removeClass("floating-label-form-group-with-focus");
		});		
		
		
		if( $('#map_canvas').width() ){	
			// google map
			var mapstyle = $("#map_canvas").attr("data-map-style");
			
			var get_lat = '10.010509';
			var get_lng = '77.487774';
			var get_add1 ='AgniDesigns';
			var get_add2 ='Envato, Level 13, 2 Elizabeth St, Melbourne,';
			var get_add3 ='Victoria 3000, Australia.';
			
			var lat=get_lat;   // Latitude of location
			var lang=get_lng;  // Longitude  of location
			var desc='<div>'+
						  '<h6>'+get_add1+'</h6>'+
						  '<p>'+get_add2+'</p>'+
						  '<p>'+get_add3+'</p>'+
					 '</div>';
			var showImage='img/marker.png';
			var imageTitle=get_add1;
			var divId='map_canvas';			
			initializeMap(lat,lang,desc,showImage,imageTitle,divId,mapstyle);					
		}
		
	});

})(jQuery);
function slideAnimation(element, animation){
	$element = $(element);
	$(document).on('animating.slides',
		function() {
			$element.addClass('animate');   
			window.setTimeout( function(){
				$element.removeClass('animate');
			}, 900);       
		}
	);
	$(document).on('animated.slides',
		function() {
			$element.addClass('animated ' + animation);   
			window.setTimeout( function(){
				$element.removeClass('animated');
			}, 1000);       
		}
	);
}
// Popup window code
function newPopup(url) {
	popupWindow = window.open(
		url,'popUpWindow','height=700,width=800,left=10,top=10,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes')
}


function initializeMap(lat,lang,desc,showImage,imageTitle,divId,mapstyle) {
	if( mapstyle == '2' ){
		var styles = [{"stylers":[{"hue":"#ff1a00"},{"invert_lightness":true},{"saturation":-100},{"lightness":33},{"gamma":0.5}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#2D333C"}]}];
	}
	else{
		var styles = [{"featureType":"landscape","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"stylers":[{"hue":"#00aaff"},{"saturation":-100},{"gamma":2.15},{"lightness":12}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"visibility":"on"},{"lightness":24}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":57}]}]; 
	}
	var latlng = new google.maps.LatLng(lat,lang);
	var settings = {
		zoom: 16,
		center: latlng,
		mapTypeControl: false,
		scrollwheel: false,
		draggable: true,
		mapTypeControlOptions: {  
			mapTypeIds: ['Styled']  
		},    
		navigationControl: true,
		navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
		mapTypeId: 'Styled', 
	};
	var map = new google.maps.Map(document.getElementById(divId), settings);
	var styledMapType = new google.maps.StyledMapType(styles, { name: 'Styled' });  
    map.mapTypes.set('Styled', styledMapType);  
	
	var contentString = desc;
	var infowindow = new google.maps.InfoWindow({
		content: contentString
	});

	var companyImage = new google.maps.MarkerImage(showImage,
		new google.maps.Size(80,80),
		new google.maps.Point(0,0)
	);

	var companyPos = new google.maps.LatLng(lat,lang);

	var companyMarker = new google.maps.Marker({
		position: companyPos,
		map: map,
		icon: companyImage,
		title:imageTitle,
		zIndex: 3
	});
	google.maps.event.addListener(companyMarker, 'click', function() {
		infowindow.open(map,companyMarker);
	});
}