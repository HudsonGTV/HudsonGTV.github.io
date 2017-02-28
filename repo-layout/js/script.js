var iOS = parseFloat(
	('' + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0,''])[1])
	.replace('undefined', '3_2').replace('_', '.').replace('_', '')
) || false;

var fulliOS = ('' + (/CPU.*OS ([0-9_]{1,8})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0,''])[1]);
//var verMajor = fulliOS.split('.')[0];
//var verMinor = fulliOS.split('.')[1];
//var verFix   = fulliOS.split('.')[2];

var supportedVersionMin = $('.depiction').data('version-min');
var supportedVersionMax = $('.depiction').data('version-max');

var supportedVersionMinBug = $('.depiction').data('version-min-bug');
var supportedVersionMaxBug = $('.depiction').data('version-max-bug');

var repoVersion = 'v2.5.2-r12';

var force = 0.0;
var clickStart = ('ontouchstart' in document.documentElement)  ? 'touchstart' : 'mousedown';
var clickEnded = ('ontouchend' in document.documentElement)  ? 'touchend' : 'mouseup';

var userDraggedFinger = false;

fulliOS = fulliOS.replace('undefined', '3_2').replace('_', '.').replace('_', '.') || false;

(function() {
	
	if(iOS != false) {
		
		if(iOS < supportedVersionMin || iOS > supportedVersionMax) {
			$('.is-supported').addClass('is-unsupported');
			$('.is-supported').removeClass('is-supported');
		}
		
	} else {
		$('.is-supported').addClass('is-unsupported');
		$('.is-supported').removeClass('is-supported');
		iOS = 0;
		fulliOS = '[Not iOS]';
	}

	addFooter = (function(year) {
		
		$('footer').html('</div><h2 id="detected-version">'
							+ navigator.platform + ' - iOS ' + fulliOS +
						'</h2>' +
						'<h2 id="copyright">'
							+ '&copy; ' + year + ' H.K.G. - All rights reserved' +
						'</h2>'
		);
		
	});

	TouchSelectHightlight = (function(selectedElement, timeout) {
		setTimeout(function() {
			selectedElement.blur();
			selectedElement.removeClass('link-active');
		}, timeout);
	});

	addFooter((new Date).getFullYear());

	$('.version-num').html(repoVersion);
	$('#inner-body-wrapper').after('<div id="page-bottom"><a href="about.html" target="_popup">HKG Repo ' + repoVersion + '</a></div>');

})();


/**
	MANAGE TABLE LINKS (MAINLY HIGHLIGHTING SELECTED TABLE LINKS)
**/

(function() {
	
	// ALLOW TOUCH EVENTS ON MOBILE (SPECIFICALLY iOS)
	$('.link').attr('ontouchstart', '');

	/* RUN ON TOUCH START */
	$("a").parent().on(clickStart, function(e) {
		
		console.log($(this));
		
		selectedElement = $(this);
		
		if(selectedElement.hasClass('link')) {
			
			selectedElement.addClass('link-active');
			
		}
		
	});
	
	/* RUN ON TOUCH END */
	$("a").parent().on(clickEnded, function(e) {
		
		console.log($(this));
		
		selectedElement = $(this);
		
		TouchSelectHightlight(selectedElement, 600);
		
	});

})();


/**
	PAGE ALERT POPUPS
**/

alertBox = (function(alertTitle, alertStr, dismissButton, tvosStyleEnabled) {
	
	if(alertTitle == '') {
		alertTitle = 'HKG Repository';
	}
	
	if(alertStr == '__strInsertTechnicalInfo') {
		alertStr = 'Version 2.5.2-r12 (01F48A4)';
	}
	
	$('body').wrapInner('<div class="alert-blur"></div>');
	$('body').addClass('alert-body-bg');
	$('body').append('<div id="alert-popup"><div class="alert-title">' + alertTitle + '</div><div class="alert-body"><div class="alert-string">' + alertStr + '</div><div class="alert-button">' + dismissButton + '</div></div></div>');
	$('.info-btn-main').css('pointer-events', 'none');
	
	$('.alert-button').on(clickEnded, function() {
		AlertKill();
	});
	
});

$("body").on("touchmove", function() {
	userDraggedFinger = true;
});

AlertKill = (function() {
	
	if(!userDraggedFinger) {
		$('#alert-popup').fadeOut(500);
		setTimeout(function() {
			$('body').removeClass('alert-body-bg');
			$('body > .alert-blur').contents().unwrap();
		}, 75);
		setTimeout(function() {
			$('#alert-popup').remove();
			$('.info-btn-main').css('pointer-events', 'auto');
		}, 500);
	} else {
		userDraggedFinger = false;
	}
	
});

/**
	3D TOUCH EVENTS
**/

(function() {
	
	var isAlreadyWrapped = false;
	var forceCancelled = false;
	var forceMenuExists = false;
	
	Pressure.set('.info-btn-main', {
		change: function(force, event) {

			console.log(force);

			//$('label.link-no-click').html(force);
			
			if(force >= 0.001 && !isAlreadyWrapped) {
				$('body').wrapInner('<div class="alert-blur ft-blur"></div>');
				$('body').addClass('ft-bg');
				document.body.style.overflow = "hidden";
				isAlreadyWrapped = true;
			}

			if(force >= 0.75 && !forceMenuExists) {
				$('body').append(
					'<div id="force-touch-popup">' +
						'<a href="index.html" data-target="http://repo.hudsongreen.com/" class="force-touch-link ft-1">' +
							'<i class="forceTouchIcon fa fa-home" aria-hidden="true"></i>' +
							'<i class="forceTouchText">Home</i>' +
						'</a>' +
						'<a href="#" onClick="KillAllMenus()" class="force-touch-link ft-2">' +
							'<i class="forceTouchIcon fa fa-times" aria-hidden="true"></i>' +
							'<i class="forceTouchText">Click If I Don\'t Close On Double Tap</i>' +
						'</a>' +
					'</div>'
				);
				
				$('#force-touch-popup').hide();
				$('#force-touch-popup').addClass('ft-open');
				$('#force-touch-popup').show(250);
				
				forceMenuExists = true;
				window.navigator.vibrate(200);
			}
			
			if(force <= 0.75 && !forceMenuExists) {
				$('.ft-blur').css({'filter': 'blur(' + (force.toFixed(2) * 22.5) + 'px)'});
			} else if(force > 0.75) {
				$('.ft-blur').css({'filter': 'blur(' + (0.75 * 22.5) + 'px)'});
			}

		}
 
	}/*, {only: 'touch'}*/);
	
	$(document).on(clickEnded, function() {
		
		if(!userDraggedFinger) {
			
			setTimeout(function() {
				
				if(forceCancelled) {
				
					//$('#force-touch-popup').remove();

					isAlreadyWrapped = false;

					ForceMenuKill();

					//$('label.link-no-click').html(force);

					return;

				}
				
				forceCancelled = true;
				
			}, 150);
			
		} else {
			userDraggedFinger = false;
		}
		
	});
	
	KillAllMenus = (function() {
		$('#force-touch-popup').remove();

		isAlreadyWrapped = false;

		ForceMenuKill();
	});
	
	ForceMenuKill = (function() {
		
		$('#force-touch-popup').hide(250);
		
		document.body.style.overflow = "visible";
		
		setTimeout(function() {
			$('#force-touch-popup').remove();
		}, 250);
		
		$('body').removeClass('ft-bg');
		$('body > .alert-blur.ft-blur').contents().unwrap();
		//$('#force-touch-popup').css('display', 'none');
		//$('#force-touch-popup').html(' ');
		
		//var element = document.getElementById("force-touch-popup");
		//element.parentNode.removeChild(element);
		
		forceCancelled = false;
		forceMenuExists = false;
		
	});
	
})();


/*
$(".info-about").on("touchend", function(e) {
	
	selectedElement = $(this);
	
	
	
});

var isInCydia = false;

$(function() {
		
	if(typeof cydia != 'undefined') {
		isInCydia = true;
	}
	
	if(isInCydia == false) {
		$('a').each(function() {
			$(this).attr('target', '_self');
		});
	}

});

(function(a) {
	"use strict";
	navigator.userAgent.indexOf("Cydia")!=-1?(
		a.title=a.title.split(" \u00b7 ")[0],
		a.documentElement.classList.add("cydia")
	):a.documentElement.classList.remove("cydia","depiction")
})(document)
*/




