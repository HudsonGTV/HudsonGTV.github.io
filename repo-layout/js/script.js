var iOS = parseFloat(
	('' + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0,''])[1])
	.replace('undefined', '3_2').replace('_', '.').replace('_', '')
) || false;

var fulliOS = ('' + (/CPU.*OS ([0-9_]{1,8})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0,''])[1]);
//var verMajor = fulliOS.split('.')[0];
//var verMinor = fulliOS.split('.')[1];
//var verFix   = fulliOS.split('.')[2];

var isInCydia = false;

var supportedVersionMin = $('.depiction').data('version-min');
var supportedVersionMax = $('.depiction').data('version-max');

var supportedVersionMinBug = $('.depiction').data('version-min-bug');
var supportedVersionMaxBug = $('.depiction').data('version-max-bug');

var repoVersion = 'v2.4.0-r2';
//var repoVersion = 'v2.2.1-beta.1';
//var repoVersion = 'v2.2.1b-1';
//var repoVersion = 'v2.2.1r-2';

//var iPhoneModel = '6';

//var pageIsActive = false;
//var pageIsInactive = false;
//var selectedElement = $('.link-active');

var userDraggedFinger = false;


fulliOS = fulliOS.replace('undefined', '3_2').replace('_', '.').replace('_', '.') || false;

/*document.body.addEventListener('touchforcechange',function(e) {
	iPhoneModel = iPhoneModel + 'S';
});*/

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
						+ '&copy; ' + year + ' HKG Repo - All rights reserved' +
					'</h2>'
	);
	
});

TouchSelectHightlight = (function(selectedElement, timeout) {
	setTimeout(function() {
		//if(true) {
			selectedElement.blur(); // Works... but I should do this every time?
			selectedElement.removeClass('link-active');
			//$('.link-active').removeClass('link-active');
		//}
	}, timeout);
});

addFooter((new Date).getFullYear());

$('.link').attr('ontouchstart', '');

$('.version-num').html(repoVersion);
$('#inner-body-wrapper').after('<div id="page-bottom">HKG Repo ' + repoVersion + '</div>');

/*pageShowHideEvent = (function() {
	
	window.addEventListener('pagehide', function(e) {
		pageIsActive = false;
		pageIsInactive = true;
		console.log('page hidden');
	});

	window.addEventListener('pageshow', function(e) {
		pageIsActive = true;
		pageIsInactive = false;
		console.log('page shown');
	});
	
});*/

//pageShowHideEvent();

$("a").parent().on("touchstart", function(e) {
	
	console.log($(this));
	
	selectedElement = $(this);
	
	if(selectedElement.hasClass('link')) {
		
		selectedElement.addClass('link-active');
		
		//TouchSelectHightlight(selectedElement, 800);
		
	}
	
	//document.addEventListener('touchmove', TouchSelectHightlight(selectedElement, 800));
    //document.addEventListener('touchend', TouchSelectHightlight(selectedElement, 800));
	
});

$(window).focus(function() {
	TouchSelectHightlight($('.link-active'), 800);
	console.log('focus');
});

$("a").parent().on("touchend", function(e) {
	
	//pageShowHideEvent();
	
	console.log($(this));
	
	selectedElement = $(this);
	
	//if(pageIsActive && !pageIsInactive) {
	//}
	
	TouchSelectHightlight(selectedElement, 600);
	
});

alertBox = (function(alertTitle, alertStr, dismissButton, palertStyleEnabled) {
	
	$('body').wrapInner('<div class="alert-blur"></div>');
	$('body').addClass('alert-body-bg');
	$('body').append('<div id="alert-popup"><div class="alert-title">' + alertTitle + '</div><div class="alert-body"><div class="alert-string">' + alertStr + '</div><div class="alert-button">' + dismissButton + '</div></div></div>');
	
	$('.alert-button').on("touchend", function() {
		AlertKill();
	});
	
	$('.alert-button').click(function() {
		AlertKill();
	});
	
});

$("body").on("touchmove", function() {
	userDraggedFinger = true;
});

AlertKill = (function() {
	
	if(!userDraggedFinger) {
		setTimeout(function() {
			$('body').removeClass('alert-body-bg');
			$('body > .alert-blur').contents().unwrap();
			$('#alert-popup').remove();
		}, 75);
	} else {
		userDraggedFinger = false;
	}
});

/*$(".info-about").on("touchend", function(e) {
	
	selectedElement = $(this);
	
	
	
});*/

/*$(function() {
		
	if(typeof cydia != 'undefined') {
		isInCydia = true;
	}
	
	if(isInCydia == false) {
		$('a').each(function() {
			$(this).attr('target', '_self');
		});
	}

});*/

/*(function(a) {
	"use strict";
	navigator.userAgent.indexOf("Cydia")!=-1?(
		a.title=a.title.split(" \u00b7 ")[0],
		a.documentElement.classList.add("cydia")
	):a.documentElement.classList.remove("cydia","depiction")
})(document)*/
