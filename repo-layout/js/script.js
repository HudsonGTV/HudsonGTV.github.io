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

document.getElementById('detected-version').innerHTML = 'iOS ' + iOS;