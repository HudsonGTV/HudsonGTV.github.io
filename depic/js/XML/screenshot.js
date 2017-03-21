$(document).ready(function() {
	$.ajax({
		type : 'GET',
		dataType : 'xml',
		url : ('http://repo.hudsongreen.com/depic/Themes/DisconnectedWifiIcon/info.xml'),
		success : function(xml) {
			
			var screenshotCount = parseInt($(xml).find('package>screenshots>screenshotCount').text());
			var screenshotWrapper = $('.screenshot-wrapper');
			
			screenshotWrapper.html('');
			
			if(screenshotCount > 0) {
				for(var i = 0; i < screenshotCount; ++i) {
					$(xml).find('package>screenshots>screenshot').eq(i).each(function() {
						var screenshot = $(this).text();
						screenshotWrapper.html(screenshotWrapper.html() + '<img class="screenshot" src="' + screenshot + '">');
					});
				}
			} else {
				screenshotWrapper.html('There are no screenshots for this item');
			}
			
		},
		cache : false,
		error: function() {
			console.log('ERROR: Could not load XML file!');
		}
	}); //ajax
}); // ready