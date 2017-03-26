/**
	TERRIBLY WRITTEN CONSOLE.LOG ALTERNATIVE
**/

var consoleEx = $(document);

jQuery.fn.extend({
	
	tagln: function(tag = 'H.K.G', text = '', tagColorfg = '#fff', tagColorbg = '#3F51B5', textColorfg = '#fff', textColorbg = 'transparent', radius = 5) {
		return this.each(function() {
			setTimeout(console.log.bind(console, '%c ' + tag + ' %c  :  ' + text, 'background: ' + tagColorbg + ';color: ' +
				tagColorfg + ';padding:2px;border-radius: ' + radius + 'px; line-height: 30px; font-weight: bold;' +
				'font-size: 15px;', ''));
		});
	},
	
	println: function(text, customCSS = '') {
		return this.each(function() {
			setTimeout(console.log.bind(console, '%c' + text, customCSS, ''));
		});
	}
	
});


/**
	MAIN SCRIPTS
**/

var iOS = parseFloat(
	('' + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0,''])[1])
	.replace('undefined', '3_2').replace('_', '.').replace('_', '')
) || false;

var fulliOS = ('' + (/CPU.*OS ([0-9_]{1,8})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0,''])[1]);
//var verMajor = fulliOS.split('.')[0];
//var verMinor = fulliOS.split('.')[1];
//var verFix   = fulliOS.split('.')[2];

var fullDeviceName = (WURFL.complete_device_name).replace('Apple ', '');

var supportedVersionMin = $('.depiction').data('version-min');
var supportedVersionMax = $('.depiction').data('version-max');

var supportedVersionMinBug = $('.depiction').data('version-min-bug');
var supportedVersionMaxBug = $('.depiction').data('version-max-bug');

var isInCydiaFrame = false;
var isInFocus = true;

var repoVersionRaw = '2.9.1-r3';
var repoVersion = 'v' + repoVersionRaw;
var repoVersionHex = '01FE477';

var year = (new Date).getFullYear();

var force = 0.0;
var clickStart = ('ontouchstart' in document.documentElement)  ? 'touchstart' : 'mousedown';
var clickEnded = ('ontouchend' in document.documentElement)  ? 'touchend' : 'mouseup';

var userDraggedFinger = false;

fulliOS = fulliOS.replace('undefined', '3_2').replace('_', '.').replace('_', '.') || false;

(function(a) {
	
	"use strict";
	
	navigator.userAgent.indexOf("Cydia") != -1 ? (
		a.title=a.title.split(" \u00b7 ")[0],
		a.documentElement.classList.add("cydia"),
		isInCydiaFrame = true,
		isInFocus = false
	):a.documentElement.classList.remove("cydia","depiction");
	
})(document);

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

	addFooter = (function() {
		
		$('footer').html('</div><h2 id="detected-version">'
							+ fullDeviceName + ' - iOS ' + fulliOS +
						'</h2>' +
						'<h2 id="copyright">'
							+ '&copy; ' + year + ' H.K.G. - All rights reserved' +
						'</h2>'
		);
		
	});
	
	var hidden, visibilityChange;
	
	if(typeof document.hidden !== "undefined") {
		hidden = "hidden";
		visibilityChange = "visibilitychange";
	} else if(typeof document.msHidden !== "undefined") {
		hidden = "msHidden";
		visibilityChange = "msvisibilitychange";
	} else if(typeof document.webkitHidden !== "undefined") {
		hidden = "webkitHidden";
		visibilityChange = "webkitvisibilitychange";
	} else if(typeof document.mozHidden !== "undefined") {
		hidden = "mozHidden";
		visibilityChange = "mozvisibilitychange";
	}
	
	function handleVisibilityChange() {
		if(document[hidden]) {
			isInFocus = false;
		} else {
			isInFocus = true;
		}
	}
	
	document.addEventListener(visibilityChange, handleVisibilityChange, false);

	TouchSelectHightlight = (function(selectedElement, timeout) {
		setTimeout(function() {
			var checkIfInFocus = setInterval(function() {
				if(isInFocus) {
					setTimeout(function() {
						selectedElement.blur();
						selectedElement.addClass('link-fadeout');
						selectedElement.removeClass('link-active');
						if(isInCydiaFrame) {
							isInFocus = false;
						} else {
							isInFocus = true;
						}
						setTimeout(function() {
							selectedElement.removeClass('link-fadeout');
						}, 400);
						clearInterval(checkIfInFocus);
					}, 50);
				}
			}, 250);
		}, timeout);
	});

	addFooter();

	$('.version-num').html(repoVersion);
	$('#inner-body-wrapper').after(
		'<div id="page-bottom">' +
			'<a href="/about.html" target="_popup" style="color: #111; border-bottom: 1px solid rgba(0, 0, 0, 0.25);">' +
				'HKG Repo ' + repoVersion + ' (' + repoVersionHex + ')' +
			'</a>' +
		'</div>'
	);

})();


/**
	MANAGE TABLE LINKS (MAINLY HIGHLIGHTING SELECTED TABLE LINKS)
**/

(function() {
	
	// ALLOW TOUCH EVENTS ON MOBILE (SPECIFICALLY iOS)
	$('.link').attr('ontouchstart', '');

	/* RUN ON TOUCH START */
	$("a").parent().on(clickStart, function(e) {
		
		selectedElement = $(this);
		
		if(selectedElement.hasClass('link')) {
			
			$('.link-active').removeClass('link-active');
			
			selectedElement.addClass('link-active');
			
			TouchSelectHightlight(selectedElement, 500);
			
		}
		
	});
	
	/* RUN ON TOUCH END */
	/*$("a").parent().on(clickEnded, function(e) {
		
		selectedElement = $(this);
		
		TouchSelectHightlight(selectedElement, 500);
		
	});*/

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
		alertTitle = alertTitle + '<br /><i style="font-style: normal; font-weight: normal;">Version ' + repoVersionRaw +
			' <b>(</b><i style="font-style: normal; font-weight: 100; opacity: 0.8;">' + repoVersionHex + '</i><b>)</b></i>';
		
		alertStr = '' +
			'To Use The Navigation Menu with 3D touch, 3D touch on the the H.K.G. Repo text. You must have a 3D touch enabled ' +
			'device AND must be viewing this <a target="_parent" href="http://repo.hudsongreen.com/">' +
			'<hkg class="safari-link">in Safari</hkg></a> due to Cydia\'s built in browser lacking 3D touch support. ' +
			'If you are viewing this in Cydia and/or do not have a 3D touch enabled device, double tap the H.K.G. Repo text.';
	}
	
	$('body').wrapInner('<div class="alert-blur"></div>');
	$('body').addClass('alert-body-bg');
	$('body').append('<div id="alert-popup"><div class="alert-title">' + alertTitle + '</div><div class="alert-body"><div class="alert-string">' + alertStr + '</div><div class="alert-button">' + dismissButton + '</div></div></div>');
	
	if(!isInCydiaFrame) {
		$('.safari-link').unwrap();
	}
	
	//$('.info-btn-main').css('pointer-events', 'none');
	
	if(alertStr.length > 50) {
		
		$('#alert-popup').css('top', 'calc(50% - ' + (alertStr.length / 2 + 125) * 0.6 + 'px)');
		
	}
	
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
				
				if(!isInCydiaFrame) {
					$('.force-touch-link').attr('target', '_self');
				}
				
				$('#force-touch-popup').hide();
				$('#force-touch-popup').addClass('ft-open');
				$('#force-touch-popup').show(250);
				
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
	
	$(".info-btn-main").on(clickStart, function(e) {
		
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
		
		setTimeout(function() {
			
			if(forceCancelled) {

				isAlreadyWrapped = false;

				ForceMenuKill();

				return;

			}
			
			forceCancelled = true;
			
		}, 150);
		
		return;
		
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
		
		isAlreadyWrapped = false;
		forceCancelled = false;
		forceMenuExists = false;
		
		//RefreshPressureJS();
		
	});
	
})();

UserOpenedDevTools = (function() {
	
	consoleEx.println('© ' + year +
		' H.K.G. - All rights (and code) reserved!\nDo not copy/sell!',
		'font-weight: bold; text-align: center; color: red; font-size: 35px;');
	
	consoleEx.tagln('IMPORTANT', 'Close this window... plzzz!!!');
	
});

UserOpenedDevTools();

$(document).keydown(function(event) {
	
	console.clear();
	setTimeout(console.clear.bind(console, '', '', ''));
	
	UserOpenedDevTools();
	
});


/**
	FUNCTIONS FOR NON-CYDIA WEB VIEWS/BROWSERS
**/

$(function() {
	
	if(!isInCydiaFrame) {
		
		if(!$('body').hasClass('main-page')) {
			
			var packageName = $('body').attr('package-name').toString();
			var packageIcon = $('body').attr('package-icon').toString();
			var packageVersion = $('body').attr('package-version').toString();
			
			$('.repo-link').addClass('repo-link-dark');
			$('.light-link').addClass('link').removeClass('light-link');
			$('.light-chevron').addClass('chevron').removeClass('light-chevron');
			$('body').css('background', '#1B1B1B');
			
			$('head').append('<link rel="icon" type="image/png" href="http://repo.hudsongreen.com/icon/' + packageIcon + '" />');
			
			$('#web-view-header').html(
				'<div id="web-header">' +
					'<div id="package-icon">' +
						'<div>' +
							'<span><img src="http://repo.hudsongreen.com/icon/' + packageIcon + '"></span>' +
						'</div>' +
					'</div>' +
					'<div id="web-content">' +
						'<p id="web-name">' + packageName + '</p>' +
						'<p id="web-latest">' + packageVersion + '</p>' +
					'</div>' +
				'</div>'
			);
			
		}
		
		$('a').each(function() {
			var linkTarget = $(this).attr('target');
			if(linkTarget == '_blank' || linkTarget == '_popup' || linkTarget == '_system') {
				$(this).attr('target', '_self');
				consoleEx.tagln('DEBUG', 'Replaced link targets to target="_self"', '#500', '#f09000');
			}
		});
		
	}
	
});


$(document).on('click', 'a[target="_system"]', function(ev) {
	
	var url;
	
	ev.preventDefault();
	
	url = $(this).attr('href');
	
	window.open(url, '_system');
	
	consoleEx.println('Opened in system browser...');
	
});

function goBack() {
	
	var iframe = $('#ipadcontentframe');
	var storedItem = localStorage.getItem('HKG_SESSION_IPAD_IFRAME_MAIN');
	
	if(storedItem == undefined) {
		window.open('tweaks.html', 'ipadcontentframe');
		return;
	}
	
	window.open(storedItem, 'ipadcontentframe');
	
	//window.history.back();
	
}




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
*/




