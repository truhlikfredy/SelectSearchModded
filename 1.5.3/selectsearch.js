Array.prototype.inArray = function (value) {
	var i;
	for (i = 0; i < this.length; i++) {
		if (this[i] === value) {
			return true;
		}
	}
	return false;
};


function addEvent(obj, type, fn) {
	if (obj.addEventListener) {
		obj.addEventListener(type, fn, false);
		EventCache.add(obj, type, fn);
	} else if (obj.attachEvent) {
		obj["e" + type + fn] = fn;
		obj[type + fn] = function () {
			obj["e" + type + fn](window.event);
		}
		obj.attachEvent("on" + type, obj[type + fn]);
		EventCache.add(obj, type, fn);
	} else {
		obj["on" + type] = obj["e" + type + fn];
	}
}


function goto(e) {
	_dest = e.srcElement.parentElement.getAttribute('href');
	chrome.extension.sendMessage({
		options: "goto",
		dest: _dest
	}, function (response) {});
	e.preventDefault();
	e.stopPropagation();
	return false;
}


function gotofront(e) {
	_dest = e.srcElement.parentElement.getAttribute('href');
	chrome.extension.sendMessage({
		options: "gotofront",
		dest: _dest
	}, function (response) {});
	e.preventDefault();
	e.stopPropagation();
	return false;
}


var EventCache = function () {
	var listEvents = [];
	return {
		listEvents: listEvents,
		add: function (node, sEventName, fHandler) {
			listEvents.push(arguments);
		},
		flush: function () {
			var i, item;
			for (i = listEvents.length - 1; i >= 0; i = i - 1) {
				item = listEvents[i];
				if (item[0].removeEventListener) {
					item[0].removeEventListener(item[1], item[2], item[3]);
				};
				if (item[1].substring(0, 2) != "on") {
					item[1] = "on" + item[1];
				};
				if (item[0].detachEvent) {
					item[0].detachEvent(item[1], item[2]);
				};
				item[0][item[1]] = null;
			};
		}
	};
}();


var searchSelectBaloon = {
	x: 0,
	y: 0,
	opacity: 0,
	size: 0,
	height: 0,
	isHover: false,
	nbIcons: 0,
	maxTransparency: 0,
	minTransparency: 0,
	wikipediaLocale: '',
	fadeTime: 0,
	removeTime: 0,
	linksText: '',
	inactive: Object,
	baloon: Object,
	init: function (textbrut, text, e) {
		var i, j;
		searchSelectBaloon.remove();
		searchSelectBaloon.baloon = document.createElement('div');
		searchSelectBaloon.baloon.id = 'SearchSelectBaloon';
		document.getElementsByTagName('body')[0].appendChild(this.baloon);
		searchSelectBaloon.findGoodPosition(e);
		searchSelectBaloon.links(text, textbrut);
		searchSelectBaloon.setOpacity(searchSelectBaloon.maxTransparency);
		searchSelectBaloon.baloon.style.left = this.x + 'px';
		searchSelectBaloon.baloon.style.top = this.y + 'px';
		addEvent(searchSelectBaloon.baloon, 'mouseout', searchSelectBaloon.baloonOut);
		addEvent(searchSelectBaloon.baloon, 'mouseover', searchSelectBaloon.baloonOver);

		//Clipboard stuff
		if (document.getElementById("selectsearchcpboard")) {
			chrome.extension.sendMessage({
				options: "setcp",
				text: textbrut
			}, function (response) {});
			addEvent(document.getElementById("selectsearchcpboard"), 'click', searchSelectBaloon.cpToClipboard);
		}

		searchSelectBaloon.baloonOut();
	},

	cpToClipboard: function () {
		chrome.extension.sendMessage({
			options: "toClipBoard"
		}, function (response) {});
		//searchSelectBaloon.remove()
		$(this).attr('style', 'width: 16px !important; margin:3px !important;');
		setTimeout(function () {
			$("#selectsearchcpboard").attr('style', 'width: 20px !important; margin:2px !important;');
		}, 150);

	},

	findGoodPosition: function (e) {
		searchSelectBaloon.x = e.pageX;
		searchSelectBaloon.y = e.pageY;
		searchSelectBaloon.x -= Math.floor(searchSelectBaloon.size / 2);
		searchSelectBaloon.y -= searchSelectBaloon.height + 15;
		if (searchSelectBaloon.x < 0) searchSelectBaloon.x = 0;
		if (searchSelectBaloon.y < 0) searchSelectBaloon.y = 0;
		if (searchSelectBaloon.x + searchSelectBaloon.size + Math.floor(searchSelectBaloon.size / 2) > window.innerWidth + window.pageXOffset) searchSelectBaloon.x = window.innerWidth + window.pageXOffset - (searchSelectBaloon.size + Math.floor(searchSelectBaloon.size / 2) - 3);
		var d = searchSelectBaloon.height
		if (searchSelectBaloon.y + d > window.innerHeight + window.pageYOffset) searchSelectBaloon.y = window.innerHeight + window.pageYOffset - d;

	},

	links: function (text, textbrut) {
		//console.log(text);
		var reg = new RegExp("(<<text>>)", "g");
		tmpstr = searchSelectBaloon.linksText.replace(reg, text);

		var reg = new RegExp("(<<textb>>)", "g");
		tmpstr = tmpstr.replace(reg, textbrut);


		var regh = new RegExp("(<<http>>)", "g");
		if (tmpstr.indexOf("<<http>>http") == -1) {
			str = tmpstr.replace(regh, "http://");
		} else {
			str = tmpstr.replace(regh, "");
		}
		searchSelectBaloon.baloon.innerHTML = str;

		if (searchSelectBaloon.openIn == '_back') {
			var fils = searchSelectBaloon.baloon.childNodes;
			var nbFils = fils.length;
			for (var i = 0; i < nbFils; i++) {
				if (fils[i].id != 'selectsearchcpboard') {
					fils[i].addEventListener("click", function (e) {
						goto(e);
					}, false);
				}
			}
		}

		if (searchSelectBaloon.openIn == '_backf') {
			var fils = searchSelectBaloon.baloon.childNodes;
			var nbFils = fils.length;
			for (var i = 0; i < nbFils; i++) {
				if (fils[i].id != 'selectsearchcpboard') {
					fils[i].addEventListener("click", function (e) {
						gotofront(e);
					}, false);
					fils[i].addEventListener("contextmenu", function (e) {
						goto(e);
					}, false);
				}
			}
		}

		if (searchSelectBaloon.openIn == '_backfo') {
			var fils = searchSelectBaloon.baloon.childNodes;
			var nbFils = fils.length;
			for (var i = 0; i < nbFils; i++) {
				if (fils[i].id != 'selectsearchcpboard') {
					fils[i].addEventListener("click", function (e) {
						goto(e);
					}, false);
					fils[i].addEventListener("contextmenu", function (e) {
						gotofront(e);
					}, false);
				}
			}
		}

	},


	remove: function () {
		searchSelectBaloon.isHover = false;
		if (document.getElementById('SearchSelectBaloon')) {
			window.clearTimeout(searchSelectBaloon.inactive);
			var parent = document.getElementsByTagName('body')[0];
			parent.removeChild(document.getElementById('SearchSelectBaloon'));
		}
	},

	baloonOut: function () {
		searchSelectBaloon.isHover = false;
		searchSelectBaloon.inactive = window.setTimeout("searchSelectBaloon.fade(" + searchSelectBaloon.minTransparency + ")", searchSelectBaloon.fadeTime);
		//document.getElementById('log').innerHTML+= 'mouseOut<br/>';
	},

	baloonOver: function () {
		searchSelectBaloon.isHover = true;
		searchSelectBaloon.setOpacity(searchSelectBaloon.maxTransparency);
		window.clearTimeout(searchSelectBaloon.inactive);
		//document.getElementById('log').innerHTML+= 'mouseOver<br/>'	
	},

	setOpacity: function (opac) {
		searchSelectBaloon.opacity = opac;
		searchSelectBaloon.baloon.style.opacity = '.' + opac;
		searchSelectBaloon.baloon.style.filter = "alpha(opacity:" + opac + ")";
	},

	fade: function (opac) {
		var sign = 1;
		currentOpac = searchSelectBaloon.opacity;
		if (Math.abs(currentOpac - opac) > 10) {
			if (opac < currentOpac) sign = -1;
			searchSelectBaloon.setOpacity(currentOpac + sign * 10);
			searchSelectBaloon.inactive = window.setTimeout("searchSelectBaloon.fade('" + opac + "')", 20);
		} else {
			searchSelectBaloon.setOpacity(opac);
			if (opac < currentOpac) { //if we just decided to have the baloon inactive (and fading ended) 
				searchSelectBaloon.inactive = window.setTimeout("searchSelectBaloon.remove()", searchSelectBaloon.removeTime); //Remove the baloon	
			}
		}
	},

	getSelText: function (e) {
		if (searchSelectBaloon.isHover) return;  
		var txt = document.getSelection().toString() // To prevent any change of getSelection 
		 
		if ((txt != "") && (txt != "\n") && (txt != "\t") && (txt.length < 600)) {
			txt = txt.replace(/^ +/g, "").replace(/ +$/g, "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
			txtu = encodeURIComponent(txt)
			//txt = txt.replace(/\"/g, "");
			//txt = txt.replace(/&/g, "&#38;");
			searchSelectBaloon.init(txt, txtu, e);
			//console.log(txt)
		} else {    
			searchSelectBaloon.remove()    
		}    
	},

	mouseDown: function (e) {
		if (searchSelectBaloon.isHover) {
			searchSelectBaloon.away = window.setTimeout("searchSelectBaloon.baloon.style.visibility='hidden';", 1000);
		}
	},

	keyPress: function (e) {
		if (!searchSelectBaloon.isHover) {
			searchSelectBaloon.remove()
		}
	},

	lostFocus: function (e) {
		searchSelectBaloon.remove()
	},
}




//---------------------------
// Messages from background
//---------------------------
chrome.extension.sendMessage({
	options: "size"
}, function (response) {
	searchSelectBaloon.size = response.size;
	searchSelectBaloon.height = response.height;
	//console.log(response.height);
});

chrome.extension.sendMessage({
	options: "times"
}, function (response) {
	searchSelectBaloon.fadeTime = response.fadeTime;
	searchSelectBaloon.removeTime = response.removeTime;
	//console.log(response.height);
});

chrome.extension.sendMessage({
	options: "transparency"
}, function (response) {
	searchSelectBaloon.maxTransparency = response.transparency;
	searchSelectBaloon.minTransparency = Math.floor(response.transparency / 3);
});

chrome.extension.sendMessage({
	options: "openIn"
}, function (response) {
	searchSelectBaloon.openIn = response.openIn;
});
chrome.extension.sendMessage({
	options: "links"
}, function (response) {
	searchSelectBaloon.linksText = response.linksText;
	//console.log( response.linksText );
});



addEvent(window, 'unload', EventCache.flush);
addEvent(document, 'mouseup', searchSelectBaloon.getSelText);
//addEvent(document,'mousedown',searchSelectBaloon.mouseDown);
addEvent(document, 'keydown', searchSelectBaloon.keyPress);

/*
//Injection of js in the user space
var clipscript = document.createElement('script');
clipscript.type = "text/javascript";
clipscript.innerHTML = 'function cpToClipboard(text) {
    document.execCommand(\'Copy\');
    clipboardholder.style.display = \'none\';
    alert(text+\' copied to clipboard!\');
};
';
document.head.appendChild(clipscript);
*/