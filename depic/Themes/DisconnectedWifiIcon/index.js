$(document).ready(function() {
	$.ajax({
		type : 'GET',
		dataType : 'xml',
		url : ('http://repo.hudsongreen.com/depic/Themes/DisconnectedWifiIcon/info.xml'),
		success : function(xml) {
			
			var description = $(xml).find('package>description').text();						$('.package-description').html(description);			
		},
		cache : false,
		error: function() {
			console.log('ERROR: Could not load XML file!');
		}
	}); //ajax
}); // ready