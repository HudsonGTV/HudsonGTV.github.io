/*(function(a) {
	"use strict";
	navigator.userAgent.indexOf("Cydia")!=-1?(
		a.title=a.title.split(" \u00b7 ")[0],
		a.documentElement.classList.add("cydia")
	):a.documentElement.classList.remove("cydia","depiction")
})(document)*/

var iOS = parseFloat(
	('' + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0,''])[1])
	.replace('undefined', '3_2').replace('_', '.').replace('_', '')
) || false;

var supportedVersionMin = $('.depiction').data('version-min');
var supportedVersionMax = $('.depiction').data('version-max');

var repoVersion = 'v3.2.1';

if(iOS != false) {
	
	if(iOS < supportedVersionMin || iOS > supportedVersionMax) {
		$('.is-supported').addClass('is-unsupported');
		$('.is-supported').removeClass('is-supported');
	}
	
} else {
	$('.is-supported').addClass('is-unsupported');
	$('.is-supported').removeClass('is-supported');
	iOS = 0.0;
}

addFooter = (function(year) {
	
	$('footer').html('</div><h2 id="detected-version">'
						+ 'iOS ' + iOS.toFixed(1) + '.x' +
					'</h2>' +
					'<h2 id="copyright">'
						+ '&copy; ' + year + ' HKG Repo - All rights reserved' +
					'</h2>'
	);
	
});

addFooter(2017);

$('.link').attr('ontouchstart', '');

$('.version-num').html(repoVersion);
$('#inner-body-wrapper').after('<div id="page-bottom">HKG Repo ' + repoVersion + '</div>');

$(window).unload( function () { $('a').blur(); } );
