var hasBeenClicked = false;
var enableReverseList = true;
var toggleIsOn = false;

var toggleValues = [];
var toggleTypes = [];

var lastTouchEnd = 0;

var disableCheckStateSave = 'undefined';

var dataID = $(this).attr('toggle-id');

var packageLink;
var cydiaLink;

ReverseList = (function(list) {
	
	list = $(list);
	var listItems = list.children('li');
	
	list.append(listItems.get().reverse());
	
});

OpenInBrowser = (function(item, replaceWithPackageLink = true) {
	
	packageLink = item.children('a').attr('web-link').toString();
	cydiaLink = item.children('a').attr('cydia-link').toString();
	
	if(replaceWithPackageLink) {
		
		item.children('a').attr('href', 'depic' + packageLink + '');
		
		$('.package-right').each(function() {
			$(this).html('Open in Safari');
		});
		
	} else {
		
		item.children('a').attr('href', cydiaLink);
		
		$('.package-right').each(function() {
			$(this).html('Open in Cydia');
		});
		
	}
	
	replaceWithPackageLink = false;
	
});

IsInputChecked = (function(wasClicked = false, toggleID = -1) {
	
	$('.toggle-input').each(function() {
		
		dataID = $(this).attr('toggle-id');
		
		/*if(toggleID == -1) {
			dataID = $(this).attr('toggle-id');
		} else {
			dataID = toggleID;
		}*/
		
		var dataType = $(this).attr('toggle-type').toString();
		
		if($(this).attr('disable-cache-save') != undefined) {
			disableCheckStateSave = $(this).attr('disable-cache-save').toString();
		} else {
			disableCheckStateSave = 'false';
		}
		
		if($(this).prop('checked') == true) {
			toggleIsOn = true;
			if(wasClicked && disableCheckStateSave == 'false') {
				localStorage.setItem(('HKG_Toggle_Check_ID_' + dataID), 'checked');
			}
		} else {
			toggleIsOn = false;
			if(wasClicked && disableCheckStateSave == 'false') {
				localStorage.setItem(('HKG_Toggle_Check_ID_' + dataID), 'unchecked');
			}
		}
		
		//////////////////////////////////////////////////////////////////////
		
		if(localStorage.getItem('HKG_Toggle_Check_ID_' + dataID) != 'undefined') {
			if(localStorage.getItem('HKG_Toggle_Check_ID_' + dataID) == 'checked') {
				$(this).prop('checked', true);
				toggleIsOn = true;
			} else {
				$(this).prop('checked', false);
				toggleIsOn = false;
			}
		} else {
			localStorage.setItem('HKG_Toggle_Check_ID_' + dataID, 'unchecked');
			toggleIsOn = false;
		}
		
		//////////////////////////////////////////////////////////////////////
		
		dataID = $(this).attr('toggle-id');
		
		toggleValues[dataID] = toggleIsOn;
		toggleTypes[dataID] = dataType;
		
		/*if(toggleID != 0 && toggleID != -1) {
			return;
		}*/
		
		if(toggleID == 1 || dataID == 1) {
			
			toggleValues[toggleID] = toggleIsOn;
			
			if(toggleValues[toggleID] == true) {
				replaceWithPackageLink = true;
			}
			
			$('li#package-link').each(function() {
				OpenInBrowser($(this), toggleValues[dataID]);
			});
			
		}
		
		if(toggleID > 0 || dataID > 0) {
			return;
		}
		
		if(toggleTypes[dataID].toString() == 'reverse') {
			
			var list = $(this).attr('reverse-list');
			
			if(toggleIsOn) {
				
				ReverseList(list);
				
				hasBeenClicked = true;
				
				
			} else if(!hasBeenClicked) {
				// STOP FROM CONTINUING TO THE NEXT STATEMENT
			} else if(!toggleIsOn) {
				ReverseList(list);
			}
			
		}
		
	});
	
});

IsInputChecked();

$('.toggle-input').click(function() {
	hasBeenClicked = true;
	IsInputChecked(true, $(this).attr('toggle-id'));
});

/*IsInputChecked = (function(dataType) {
	
	console.log(toggleIsOn);
	
	if($('input[name="toggle"]:checked').val() && !toggleIsOn) {
		
		if(enableReverseList) {
			ReverseList();
		}
		
		hasBeenClicked = true;
		
	} else if(!hasBeenClicked) {
		
	} else if(toggleIsOn) {
		if(enableReverseList) {
			ReverseList();
		}
	}
	
	
	
});

IsInputChecked();*/

/*
document.documentElement.addEventListener('touchend', function (event) {
  var now = (new Date()).getTime();
  if (now - lastTouchEnd <= 300) {
    event.preventDefault();
  }
  lastTouchEnd = now;
}, false);
*/