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

if(iOS != false) {
	
	if(iOS < supportedVersionMin || iOS > supportedVersionMax) {
		$('.is-supported').addClass('is-unsupported');
		$('.is-supported').removeClass('is-supported');
	}
	
} else {
	$('.is-supported').addClass('is-unsupported');
	$('.is-supported').removeClass('is-supported');
}

document.getElementById('detected-version').innerHTML = 'iOS ' + iOS;