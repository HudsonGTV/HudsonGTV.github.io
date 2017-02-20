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

var repoVersion = 'v2.9.1';

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

// Google Analytics
(function(i,s,o,g,r,a,m) {
	i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)
	},i[r].l=1*new Date();
	a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];
	a.async=1;
	a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-92265922-1', 'auto');
ga('send', 'pageview');



