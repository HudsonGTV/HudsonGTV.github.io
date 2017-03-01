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

var repoVersionRaw = '2.5.4-r1';
var repoVersion = 'v' + repoVersionRaw;
var repoVersionHex = '01F4961';

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
		alertTitle = 'H.K.G. Repository';
	}
	
	if(alertStr == '') {
		alertStr == 'Error: null';
	}
	
	if(alertStr == '__strInsertTechnicalInfo') {
		alertStr = 'Version ' + repoVersionRaw + ' (' + repoVersionHex + ')';
	}
	
	$('body').wrapInner('<div class="alert-blur"></div>');
	$('body').addClass('alert-body-bg');
	$('body').append('<div id="alert-popup"><div class="alert-title">' + alertTitle + '</div><div class="alert-body"><div class="alert-string">' + alertStr + '</div><div class="alert-button">' + dismissButton + '</div></div></div>');
	$('.info-btn-main').css('pointer-events', 'none');
	
	$('.alert-button').on(clickEnded, function() {
		AlertKill();
	});
	
});

$("body").on('touchmove', function() {
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
			ForceTouchMenu(force, event);
		}
	}, {only: 'touch'});
	
	ForceTouchMenu = (function(force, e) {
		
			console.log(force);

			//$('label.link-no-click').html(force);
			
			if(force >= 0.001 && !isAlreadyWrapped) {
				$('#inner-body-wrapper').wrapInner('<div class="alert-blur ft-blur"></div>');
				$('body').addClass('ft-bg');
				document.body.style.overflow = "hidden";
				isAlreadyWrapped = true;
			}

			if(force >= 0.75 && !forceMenuExists) {
				
				$('body').append(
					'<div id="force-touch-popup">' +
						'<a href="index.html" class="force-touch-link ft-top ft-1">' +
							'<i class="forceTouchIcon fa fa-home" aria-hidden="true"></i>' +
							'<i class="forceTouchText">Home</i>' +
						'</a>' +
						'<a href="http://repo.hudsongreen.com/about" target="_popup" class="force-touch-link ft-middle ft-2">' +
							'<i class="forceTouchIcon fa fa-info-circle" aria-hidden="true"></i>' +
							'<i class="forceTouchText">About Us</i>' +
						'</a>' +
						'<a href="cydia://url/https://cydia.saurik.com/api/share#?source=http%3A%2F%2Frepo.hudsongreen.com/" target="_blank" class="force-touch-link ft-middle ft-3">' +
							'<i class="forceTouchIcon fa fa-plus" aria-hidden="true"></i>' +
							'<i class="forceTouchText">Add To Cydia</i>' +
						'</a>' +
						'<a onClick="KillAllMenus()" class="force-touch-link ft-bottom ft-4">' +
							'<i class="forceTouchIcon fa fa-times" aria-hidden="true"></i>' +
							'<i class="forceTouchText">Force Close</i>' +
						'</a>' +
					'</div>'
				);
				
				$('#force-touch-popup').hide();
				$('#force-touch-popup').addClass('ft-open');
				$('#force-touch-popup').show(250);
				
				//var e = new jQuery.Event('clickEnded');
				//e.pageX = 0;
				//e.pageY = 250;
				//$("#inner-body-wrapper").trigger(e);
				
				forceMenuExists = true;
				window.navigator.vibrate(200);
				
			}
			
			if(force <= 0.75 && !forceMenuExists) {
				$('.ft-blur').css({
					'filter': 'blur(' + (force.toFixed(2) * 22.5) + 'px)'//,
					//'transform': 'scale(' + ((-(force.toFixed(2) * 10) / 40) + 1) + ')'
				});
			} else if(force > 0.75) {
				$('.ft-blur').css({
					'filter': 'blur(' + (0.75 * 22.5) + 'px)'//,
					//'transform': 'scale(0.80)'
				});
			}
			
			jQuery('body').bind('touchmove', function(e) { 
				e.preventDefault();
			});
			
	});
	
	var tapped = false;
	
	$(".info-btn-main").on("touchstart",function(e) {
		
		if(!tapped) { 							/* SINGLE TAP */
		
			tapped = setTimeout(function() {
				
				tapped = null;
				
			}, 300);
			
		} else {								/* DOUBLE TAP */
			
			clearTimeout(tapped);
			tapped = null;
			
			ForceTouchMenu(1.0, e);
			
		}
		
		e.preventDefault();
		
	});
	
	$('#inner-body-wrapper').on(clickEnded, function() {
		
		//if(!userDraggedFinger) {
			
			setTimeout(function() {
				
				if(forceCancelled) {

					isAlreadyWrapped = false;

					ForceMenuKill();

					return;

				}
				
				forceCancelled = true;
				
			}, 150);
			
			return;
			
		//} else {
		//	userDraggedFinger = false;
		//}
		
	});
	
	KillAllMenus = (function() {
		isAlreadyWrapped = false;
		
		ForceMenuKill();
	});
	
	ForceMenuKill = (function() {
		
		jQuery('body').unbind('touchmove');
		
		$('#force-touch-popup').hide(250);
		
		document.body.style.overflow = "visible";
		
		setTimeout(function() {
			$('#force-touch-popup').remove();
		}, 245);
		
		$('body').removeClass('ft-bg');
		$('#inner-body-wrapper > .alert-blur.ft-blur').contents().unwrap();
		//$('#force-touch-popup').css('display', 'none');
		//$('#force-touch-popup').html(' ');
		
		//var element = document.getElementById("force-touch-popup");
		//element.parentNode.removeChild(element);
		
		isAlreadyWrapped = false;
		forceCancelled = false;
		forceMenuExists = false;
		
		//RefreshPressureJS();
		
	});
	
})();

/*RefreshPressureJS = (function() {
	
	$('#pressure-js').remove();

	$.getScript("http://repo.hudsongreen.com/repo-layout/js/pressure.js", function() {
		$('script:last').attr('id', 'pressure-js');
	});
	
});*/


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




