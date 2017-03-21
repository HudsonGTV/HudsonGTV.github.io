$(document).ready(function() {
	$.ajax({
		type : 'GET',
		dataType : 'xml',
		url : ('info.xml'),
		success : function(xml) {
			
			var packageID = $(xml).find('package>id').text();
			var packageName = $(xml).find('package>name').text();
			var packageVersion = $(xml).find('package>version').text();
			var packageIcon = $(xml).find('package>favicon').text();
			
			var compatibleVerMin = $(xml).find('package>compatibility>miniOS').text();
			var compatibleVerMax = $(xml).find('package>compatibility>maxiOS').text();
			
			var description = $(xml).find('package>description').text();
			
			/*var screenshotOne = $(xml).find('package>screenshots>screenshotOne').text();
			var screenshotTwo = $(xml).find('package>screenshots>screenshotTwo').text();
			var screenshotThree = $(xml).find('package>screenshots>screenshotThree').text();
			var screenshotFour = $(xml).find('package>screenshots>screenshotFour').text();
			var screenshotFive = $(xml).find('package>screenshots>screenshotFive').text();
			
			var latestChangesVer = $(xml).find('package>changelog>currentChanges>logVersion').text();
			var latestChangesItemOne*/
			
			$('#web-content>#web-name').html(packageName);
			
		},
		cache : false,
		error: function() {
			$('#packageError').show();
			$('#packageInformation').hide();
		}
	}); //ajax
}); // ready