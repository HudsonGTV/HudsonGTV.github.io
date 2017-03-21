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
			
			var latestVer = $(xml).find('package>version').text();
			var currChangesVersion = $(xml).find('package>changelog>currentChanges>logVersion').text();
			
			var currChangesListCount = $(xml).find('package>changelog>currentChanges>itemCount').text();
			var olderChangesListCount = $(xml).find('package>changelog>olderChanges>listCount').text();
			var knownIssuesCount = $(xml).find('package>changelog>issues>itemCount').text();
			
			$('.version-number.right').html(latestVer);
			$('.version-number.listed.latest-ver').html(currChangesVersion);
			
			if(currChangesListCount > 0) {
				for(var i = 0; i < currChangesListCount; ++i) {
					$(xml).find('package>changelog>currentChanges>listItem').eq(i).each(function() {
						var currVerFixList = $(this).text();
						$('#latest-version-table').html($('#latest-version-table').html() + '<br /><p>- ' + currVerFixList + '</p>');
					});
				}
			}
			
			if(knownIssuesCount > 0) {
				for(var i = 0; i < knownIssuesCount; ++i) {
					$(xml).find('package>changelog>issues>listItem').eq(i).each(function() {
						var knownIssuesList = $(this).text();
						$('.bugs-list').html($('.bugs-list').html() + '<li>' + knownIssuesList + '</li>');
					});
				}
			}
			
			if(olderChangesListCount > 0) {
				for(var i = 0; i < olderChangesListCount; ++i) {
					$(xml).find('package>changelog>olderChanges>changelogItem').eq(i).each(function() {
						
						var logVersion = $(this).find('logVersion').text();
						var itemCount = parseInt($(this).find('itemCount').text());
						
						$('#older-version-table').html($('#older-version-table').html() + '<p class="version-number listed">' + logVersion + '</p>');
						
						for(var j = 0; j < itemCount; ++j) {
							$(this).find('listItem').eq(j).each(function() {
								var changelogItem = $(this).text();
								$('#older-version-table').html($('#older-version-table').html() + '<p>-' + changelogItem + '</p>');
							});
						}
						
						if(i < olderChangesListCount - 1) {
							$('#older-version-table').html($('#older-version-table').html() + '<br />');
						}
						
					});
				}
			}
			
		},
		cache : false,
		error: function() {
			console.log('ERROR: Could not load XML file!');
		}
	}); //ajax
}); // ready