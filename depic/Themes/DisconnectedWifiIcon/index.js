$(document).ready(function() {
	$.ajax({
		type : 'GET',
		dataType : 'xml',
		url : ('http://repo.hudsongreen.com/depic/Themes/DisconnectedWifiIcon/info.xml'),
		success : function(xml) {						var iOS = parseFloat(				('' + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0,''])[1])				.replace('undefined', '3_2').replace('_', '.').replace('_', '')			) || false;
			
			var packageID = $(xml).find('package>id').text();
			var packageName = $(xml).find('package>name').text();
			var packageVersion = $(xml).find('package>version').text();
			var packageIcon = $(xml).find('package>favicon').text();
			
			var compatibleVerMin = $(xml).find('package>compatibility>miniOS').text();
			var compatibleVerMax = $(xml).find('package>compatibility>maxiOS').text();			var compatibilityString = $(xml).find('package>compatibility>compatibilityString').text();						$('.depiction').attr('version-min', compatibleVerMin);			$('.depiction').attr('version-min', compatibleVerMax);						var supportedVersionMin = $('.depiction').data('version-min');			var supportedVersionMax = $('.depiction').data('version-max');
			
			var description = $(xml).find('package>description').text();
			
			/*var screenshotOne = $(xml).find('package>screenshots>screenshotOne').text();
			var screenshotTwo = $(xml).find('package>screenshots>screenshotTwo').text();
			var screenshotThree = $(xml).find('package>screenshots>screenshotThree').text();
			var screenshotFour = $(xml).find('package>screenshots>screenshotFour').text();
			var screenshotFive = $(xml).find('package>screenshots>screenshotFive').text();
			
			var latestChangesVer = $(xml).find('package>changelog>currentChanges>logVersion').text();
			var latestChangesItemOne*/
			
			$('#web-content>#web-name').html(packageName);			$('#web-content>#web-latest').html(packageVersion);			$('#web-header>#package-icon>div>span>img').attr('src', packageIcon);						$('.support-number.right').html(compatibilityString);						if(iOS != false) {								if(iOS < supportedVersionMin || iOS > supportedVersionMax) {					$('.is-supported').addClass('is-unsupported');					$('.is-supported').removeClass('is-supported');				}							} else {				$('.is-supported').addClass('is-unsupported');				$('.is-supported').removeClass('is-supported');				iOS = 0;			}
			
		},
		cache : false,
		error: function() {
			$('#packageError').show();
			$('#packageInformation').hide();
		}
	}); //ajax
}); // ready