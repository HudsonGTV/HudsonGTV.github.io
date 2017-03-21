$.urlParam = function(name) {
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	if(results == null) {
		return null;
	} else {
		return results[1] || 0;
	}
}

$(document).ready(function() {
	
	$.ajax({
		type : 'GET',
		dataType : 'xml',
		url : ('http://repo.hudsongreen.com/depic/Themes/' + $.urlParam('package') + '/info.xml'),
		success : function(xml) {
			
			var iOS = parseFloat(
				('' + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0,''])[1])
				.replace('undefined', '3_2').replace('_', '.').replace('_', '')
			) || false;
			
			var packageID = $(xml).find('package>id').text();
			var packageName = $(xml).find('package>name').text();
			var packageVersion = $(xml).find('package>version').text();
			var packageIcon = $(xml).find('package>favicon').text();
			
			var compatibleVerMin = $(xml).find('package>compatibility>miniOS').text();
			var compatibleVerMax = $(xml).find('package>compatibility>maxiOS').text();
			var compatibleString = $(xml).find('package>compatibility>displayedVer').text();
			
			$('.depiction').attr('version-min', compatibleVerMin);
			$('.depiction').attr('version-min', compatibleVerMax);
			
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
				iOS = 0;
			}
			
			document.title = packageName;
			
			$('#web-header>#package-icon>div>span>img').attr('src', packageIcon);
			
			$('#web-content>#web-name').html(packageName);
			$('#web-content>#web-latest').html(packageVersion);
			$('.support-number').html('&' + compatibleString);
			
		},
		cache : false,
		error: function() {
			console.log('ERROR: Could not load XML file!');
		}
	}); //ajax
	
}); // ready

$(document).ready(function() {
	$('a#package-link').each(function() {
		$(this).attr('href', ($(this).attr('href') + $.urlParam('package')));
	});
});

