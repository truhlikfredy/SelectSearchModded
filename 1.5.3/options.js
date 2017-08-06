optionspage = document

function save_options() {
  for (i in myLinks) {
  	localStorage[myLinks[i].id] = optionspage.getElementById(i).firstChild.checked
  	
  	if (optionspage.getElementById(i+'locale') != null) {
  		localStorage[myLinks[i].id+"Locale"] = $('#'+i+'locale').val()
  		//localStorage[myLinks[i].id+"LocaleIndex"] = $('#'+i+'locale').attr('selectedIndex')
  	}
	if (optionspage.getElementById(i+'eng') != null) {
  		localStorage[myLinks[i].id+"eng"] = $('#'+i+'eng').val()
  		localStorage[myLinks[i].id+"img"] = $('#'+i+'img').val()
  	}

  }
  
  
  localStorage["openIn"] = optionspage.forms.display.openIn.value;
  localStorage["openInIndex"] = optionspage.forms.display.openIn.selectedIndex;		
  localStorage["transparency"] = optionspage.forms.display.transparency.value;	
  localStorage["maxNumberOfCols"] = optionspage.forms.display.maxNumberOfCols.value;	
  localStorage["fadeTime"] = optionspage.forms.display.fadeTime.value;	
  localStorage["removeTime"] = optionspage.forms.display.removeTime.value;	
  localStorage["lang"] = optionspage.forms.display.lang.value;	
		
		
  //Make new preview
  preview();	
 	 
  // Update status to let user know options were saved.
  var status = optionspage.getElementById("status");
  status.innerHTML = "Options Saved.";
  setTimeout(function() {
    status.innerHTML = "";
  }, 750);
}

function restore_option(x) {    
	value = getLocal( myLinks[x].id )
	el = optionspage.getElementById(x)
	if (el != null) { el.firstChild.checked = value;
	    if (localStorage[myLinks[x].id+"Locale"] != null) {
		    $('#'+x+'locale').val(localStorage[myLinks[x].id+"Locale"]) 
		    }
	    if (localStorage[myLinks[x].id+"eng"] != null) {
			$('#'+x+'eng').val(localStorage[myLinks[x].id+"eng"]) 
			$('#'+x+'img').val(localStorage[myLinks[x].id+"img"]) 
		}
	}
}

function restore_options() {
	for (x in myLinks)
  	{
  		restore_option(x)
  	}
    
  	if (localStorage["openInIndex"]!=null) {
  		var openInIndex = localStorage["openInIndex"];
  		optionspage.forms.display.openIn.selectedIndex = openInIndex;
  	} 
  	optionspage.forms.display.transparency.value = getTransparency();
  	optionspage.forms.display.maxNumberOfCols.value = getMaxNumberOfCols();
    optionspage.forms.display.fadeTime.value = getFadeTime();	
    optionspage.forms.display.removeTime.value = getRemoveTime();
    optionspage.forms.display.lang.value = getLang();		
  	 
}

function preview() {
	$('#SearchSelectBaloon').html(links());
	
	baloon = optionspage.getElementById('SearchSelectBaloon');
	
	var opac = getTransparency()
	baloon.style.opacity = '.'+opac;
	baloon.style.filter = "alpha(opacity:"+opac+")";
	
	var s = getWidth()
	optionspage.getElementById('SearchSelectBaloon').style.width = s + 'px';	
	var h = getHeight()
	//optionspage.getElementById('SearchSelectBaloon').style.height = h + 'px';	
		
}


function restore_order() {
	var IDs = localStorage["order"];
	if (IDs == null) return;
	
	//IDs = IDs.split(','); 
	IDs = getOrder()	
 	
 	var items = $('#boxes').sortable("toArray");
 	
 	var rebuild = new Array();
	for ( var v=0; v < items.length; v++) {
		rebuild[items[v]] = items[v];
	}
    
	for (var i = 0 ; i < IDs.length; i++) {
 
		// item id from saved order
		var itemID = IDs[i];
 
		if (itemID in rebuild) {
 
			// select item id from current order
			var item = rebuild[itemID];
 
			// select the item according to current order
			var child = $("#boxes").children("#" + item);
 
			// select the item according to the saved order
			var savedOrd = $("#boxes").children("#" + itemID);
 
			// remove all the items
			child.remove();
 		$("#boxes").append(savedOrd);
		}
	}
}

  
$(document).ready(function() {
    optionspage = document
    
	restore_options();	
	$('#boxes').sortable({
                update: function(event, ui) {
                        var result = $(this).sortable('toArray');
                        localStorage["order"] = result;
                        preview();
                        }
        });

	$("#boxes").disableSelection();
	restore_order();	
	preview();
	
	$("#transparency, #maxNumberOfCols, #fadeTime, #removeTime").keydown(function(event) {
        // Allow only backspace and delete
        if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 13) {
                // let it happen, don't do anything
        }
        else {
                // Ensure that it is a number and stop the keypress
                if (event.keyCode < 48 || event.keyCode > 57 ) {
                        event.preventDefault(); 
                }       
        }
    });
       
    $("#transparency").change(function(){
    	 if ( optionspage.forms.display.transparency.value > 99 ) optionspage.forms.display.transparency.value = 99;
    	 save_options()
    	});   
    
    $("#maxNumberOfCols, #fadeTime, #removeTime").change(function(){
    	 save_options()
    	});  
    
    	 
    $(".saveoptionsonchange").change(function(){
        save_options()
        });
    $("#saver").click(function(){
        save_options()
        });    
    $("#reset").click(function(){
        localStorage.clear();
    });   
    
	
	
});


