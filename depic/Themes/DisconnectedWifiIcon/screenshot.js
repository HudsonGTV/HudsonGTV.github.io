$(document).ready(function() {
	$.ajax({
		type : 'GET',
		dataType : 'xml',
		url : ('http://repo.hudsongreen.com/depic/Themes/DisconnectedWifiIcon/info.xml'),
		success : function(xml) {
			
			/*var screenshotOne = $(xml).find('package>screenshots>screenshotOne').text();
			var screenshotTwo = $(xml).find('package>screenshots>screenshotTwo').text();
			var screenshotThree = $(xml).find('package>screenshots>screenshotThree').text();
			var screenshotFour = $(xml).find('package>screenshots>screenshotFour').text();
			var screenshotFive = $(xml).find('package>screenshots>screenshotFive').text();*/
			
			var screenshotCount = parseInt($(xml).find('package>screenshots>screenshotCount').text());
			
			for(var i = 0; i < screenshotCount; ++i) {
				$(xml).find('package>screenshots>screenshot').eq(i).each(function() {
					console.log($(this).text());
				});
			}
			
		},
		cache : false,
		error: function() {
			console.log('ERROR: Could not load XML file!');
		}
	}); //ajax
}); // ready