var hasBeenClicked = false;
var enableReverseList = true;
var toggleIsOn = false;

var toggleValues = [];
var toggleTypes = [];

var lastTouchEnd = 0;

var disableCheckStateSave = 'undefined';

var dataID = $(this).attr('toggle-id');

ReverseList = (function(list) {
	
	list = $(list);
	var listItems = list.children('li');
	
	list.append(listItems.get().reverse());
	
});

IsInputChecked = (function(wasClicked = false) {
	
	$('#toggle').each(function() {
		
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
			if(wasClicked && !disableCheckStateSave == 'false') {
				localStorage.setItem(('HKG_Toggle_Check_ID_' + dataID), 'unchecked');
			}
		}
		
		toggleValues[dataID] = toggleIsOn;
		toggleTypes[dataID] = dataType;
		
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
		
		if(localStorage.getItem('HKG_Toggle_Check_ID_' + dataID) != 'undefined') {
			if(localStorage.getItem('HKG_Toggle_Check_ID_' + dataID) == 'checked') {
				$(this).prop('checked', true);
			} else {
				$(this).prop('checked', false);
			}
		} else {
			localStorage.setItem('HKG_Toggle_Check_ID_' + dataID, 'unchecked');
		}
		
	});
	
});

IsInputChecked();

$('#toggle').click(function() {
	hasBeenClicked = true;
	IsInputChecked(true);
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