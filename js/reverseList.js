var hasBeenClicked = false;
var enableReverseList = true;
var toggleIsOn = false;

var toggleValues = [];
var toggleTypes = [];

var lastTouchEnd = 0;

ReverseList = (function(list) {
	
	list = $(list);
	var listItems = list.children('li');
	
	list.append(listItems.get().reverse());
	
});

IsInputChecked = (function() {
	
	$('#toggle').each(function() {
		
		var dataID = $(this).attr('toggle-id');
		var dataType = $(this).attr('toggle-type').toString();
		
		if($(this).is(':checked')) {
			toggleIsOn = true;
		} else {
			toggleIsOn = false;
		}
		
		toggleValues[dataID] = toggleIsOn;
		toggleTypes[dataID] = dataType;
		
		if(toggleTypes[dataID].toString() == 'reverse') {
			
			var list = $(this).attr('reverse-list');
			
			//console.log(toggleIsOn);
			
			if(toggleIsOn) {
				
				ReverseList(list);
				
				hasBeenClicked = true;
				
				
			} else if(!hasBeenClicked) {
				
			} else if(!toggleIsOn) {
				ReverseList(list);
			}
			
		}
		
	});
	
});

IsInputChecked();

$('#toggle').click(function() {
	hasBeenClicked = true;
	IsInputChecked();
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