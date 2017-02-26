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

var repoVersion = 'v3.3.0-r4';
//var repoVersion = 'v3.2.1-beta.1';
//var repoVersion = 'v3.2.1b-1';
//var repoVersion = 'v3.2.1r-2';

//var iPhoneModel = '6';

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

addFooter((new Date).getFullYear());

$('.link').attr('ontouchstart', '');

$('.version-num').html(repoVersion);
$('#inner-body-wrapper').after('<div id="page-bottom">HKG Repo ' + repoVersion + '</div>');

$("a").parent().on("touchstart", function(e) {
	
	console.log($(this));
	
	var selectedElement = $(this);
	
	if(selectedElement.hasClass('link')) {
		
		selectedElement.addClass('link-active');
		
	}
	
	setTimeout(function() {
			selectedElement.blur(); // Works... but I should do this every time?
			selectedElement.removeClass('link-active');
		}, 800);
	
});

/*(function(a) {
	"use strict";
	navigator.userAgent.indexOf("Cydia")!=-1?(
		a.title=a.title.split(" \u00b7 ")[0],
		a.documentElement.classList.add("cydia")
	):a.documentElement.classList.remove("cydia","depiction")
})(document)*/
