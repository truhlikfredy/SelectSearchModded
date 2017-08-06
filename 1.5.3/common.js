var text = '<<text>>';
var textb = '<<textb>>';
myLinks = [
			{   
				id : 'google',
				dest:'http://www.google.<<googleLocale>>/search?q='+text, 
				title:'Google search: '+textb,
				img:'<img src="'+chrome.extension.getURL('google-ico.png')+'">',
				defaut:'true',
				defaultLocale: 'com',
			},
			{	
				id : 'googleimg',
				dest:'http://www.google.<<googleimgLocale>>/images?q='+text,
	 	    	title:'Google Image search: '+textb,
	 	    	img:'<img src="'+chrome.extension.getURL('Google-img-ico.png')+'">',
	 	    	defaut:'false',
	 	    	defaultLocale: 'com',
			},
			{	
				id : 'wikipedia',
				dest:'http://'+'<<wikipediaLocale>>'+'.wikipedia.org/wiki/?search='+text,
				title:'Wikipedia search: '+textb,
				img:'<img src="'+chrome.extension.getURL('wikipedia-ico.png')+'">',
				defaut:'false',
				defaultLocale: 'en',
			},
			{	
				id : 'twitter',
				dest:'http://search.twitter.com/search?q='+text,
				title:'Twitter search: '+textb,
				img:'<img src="'+chrome.extension.getURL('twitter.png')+'">',
				defaut:'false',
			},	
			{   
				id : 'binsearch',
				dest:'http://www.binsearch.info/index.php?q='+text,
				title:'Binsearch: '+textb,
				img:'<img src="'+chrome.extension.getURL('binsearch.png')+'">',
				defaut:'false',
			},	
			{   
				id : 'facebook',
				dest:'http://www.facebook.com/srch.php?nm='+text,
				title:'Facebook: '+textb,
				img:'<img src="'+chrome.extension.getURL('facebook.png')+'">',
				defaut:'false',
			},	
			{   
				id : 'ebay',
				dest:'http://shop.ebay.<<ebayLocale>>/'+text,
				title:'Search on Ebay: '+textb,
				img:'<img src="'+chrome.extension.getURL('ebay.png')+'">',
				defaut:'false',
				defaultLocale: 'com',
			},
			{   
				id : 'gmap',
				dest:'http://maps.google.<<gmapLocale>>/?q='+text,
				title:'Search on Google Maps: '+textb,
				img:'<img src="'+chrome.extension.getURL('gmap.png')+'">',
				defaut:'false',
				defaultLocale: 'com',
			},
			{   
				id : 'youtube',
				dest:'http://www.youtube.<<youtubeLocale>>/results?search_query='+text,
				title:'Search on Youtube: '+textb,
				img:'<img src="'+chrome.extension.getURL('youtube.png')+'">',
				defaut:'false',
				defaultLocale: 'com',
			},
			{   
				id : 'geograph',
				dest:'http://www.geograph.org.uk/search.php?q='+text,
				title:'Search on Geograph: '+textb,
				img:'<img src="'+chrome.extension.getURL('geograph.png')+'">',
				defaut:'false',
			},
			{   
				id : 'Flickr',
				dest:'http://www.flickr.com/search/?q='+text,
				title:'Search with Flickr: '+textb,
				img:'<img src="'+chrome.extension.getURL('flickr.png')+'">',
				defaut:'false',
			},
			{   
				id : 'asLink',
				dest:'<<http>>'+textb,
				title:'Direct open: '+textb,
				img:'<img src="'+chrome.extension.getURL('link.png')+'">',
				defaut:'true',
			},
			{   
				id : 'nzbindex',
				dest:'http://nzbindex.nl/search/?q='+text,
				title:'Search with Nzbindex.nl: '+textb,
				img:'<img src="'+chrome.extension.getURL('nzbnl.png')+'">',
				defaut:'false',
			},
			{   
				id : 'cpboard',
				dest:'Not used'+text,
				title:'Copy to clipboad: '+text,
				img:chrome.extension.getURL('cp.png'),
				defaut:'false',
			},
			{   
				id : '14',
				dest:'<<14eng>>',
				title:'Custom search: '+textb,
				img:'<img src="<<14img>>"/>',
				defaut:'false',
				custom:'true',
			},
			{   
				id : '15',
				dest:'<<15eng>>',
				title:'Custom search: '+textb,
				img:'<img src="<<15img>>"/>',
				defaut:'false',
				custom:'true',
			},
			{   
				id : 'googletr',
				dest:'http://translate.google.fr/?q='+text, 
				title:'Google translate: '+textb,
				img:'<img src="'+chrome.extension.getURL('GoogleTranslate.png')+'">',
				defaut:'false',
				defaultLocale: 'com',
			},
			{   
				id : '17',
				dest:'<<17eng>>',
				title:'Custom search: '+textb,
				img:'<img src="<<17img>>"/>',
				defaut:'false',
				custom:'true',
			},
			{   
				id : '18',
				dest:'<<18eng>>',
				title:'Custom search: '+textb,
				img:'<img src="<<18img>>"/>',
				defaut:'false',
				custom:'true',
			},
			{   
				id : '19',
				dest:'<<19eng>>',
				title:'Custom search: '+textb,
				img:'<img src="<<19img>>"/>',
				defaut:'false',
				custom:'true',
			},                    
			{   
				id : '20',
				dest:'<<20eng>>',
				title:'Custom search: '+textb,
				img:'<img src="<<20img>>"/>',
				defaut:'false',
				custom:'true',
			},
			{   
				id : 'baidu',
				dest:'http://www.baidu.com/s?wd='+text, 
				title:'Baidu search: '+textb,
				img:'<img src="'+chrome.extension.getURL('baidu-ico.png')+'">',
				defaut:'false',
			},
			{   
				id : '22',
				dest:'<<22eng>>',
				title:'Custom search: '+textb,
				img:'<img src="<<22img>>"/>',
				defaut:'false',
				custom:'true',
			},
			{   
				id : '23',
				dest:'<<22eng>>',
				title:'Custom search: '+textb,
				img:'<img src="<<23img>>"/>',
				defaut:'false',
				custom:'true',
			}	                              			
		];
      


function tbool(txt) {
	if (txt=='true') return(true); else return(false);
	}

function is_default(id){
	for (i in myLinks) {
		if (myLinks[i].id == id) return tbool( myLinks[i].defaut )
		}
	return true	
	}

function getLocal(txt){
	if (localStorage[txt] == null) { return( is_default(txt) ) };
	return(tbool(localStorage[txt]));
	}


function getOpenIn() {
		var rep = localStorage['openIn']
      	if (rep == null) rep = '_new';
        return rep;
	}
	
function getUse(){
	var use = []
	for (i in myLinks) {
	  use[i] = getLocal(myLinks[i].id)
	}
	return use 	
}

function getFadeTime() {
	var rep = localStorage['fadeTime']
    if (rep == null) rep = '1000';
    return(rep);
	}

function getRemoveTime() {
	var rep = localStorage['removeTime']
    if (rep == null) rep = '1500';
    return(rep);
	}


function getOrder(){
	var rep = localStorage['order'] 
	var defaut = [];
	for (i in  myLinks) {
		defaut[i] = i
		}
	if ( rep == null) { return defaut }

	values = rep.split(',')
	for (i in values) {
		defaut[i]=values[i]	
	}
	return defaut
}

function getDefaultLocale(id){
	for (i in myLinks) {
		if (myLinks[i].id == id) return  myLinks[i].defaultLocale 
	}
	return 'com'
	}

function getLocale(id){
	var rep = localStorage[id+'Locale']
    if (rep == null) rep = getDefaultLocale(id);
    return(rep);
	}

function getLang(){
	var rep = localStorage['lang'];
	if (rep == null) return 'en';
	return(rep);
	} 

function getCustomEng(id){
    var rep = localStorage[id+'eng']
    if (rep == null) rep = getDefaultLocale(id);
    return(rep);
}
function getCustomImg(id){
    var rep = localStorage[id+'img']
    if (rep == null) rep = getDefaultLocale(id);
    return(rep);
}
	
	
function tr(text){
	switch (getLang()) {
		case 'fr': 
			switch (text) {
			case "Google search: <<text>>": return "Chercher <<text>> avec Google."
			case 'Google Image search: <<text>>': return "Chercher avec Google image : <<text>>"
			case 'Wikipedia search: <<text>>': return "Chercher <<text>> sur Wikipedia."
			case 'Twitter search: <<text>>': return "Chercher <<text>> sur Twitter."
			case 'Search on Ebay: <<text>>': return "Chercher <<text>> sur Ebay."
			case 'Search on Google Maps: <<text>>': return "Chercher <<text>> dans Google Maps." 
			case 'Search on Youtube: <<text>>': return "Chercher <<text>> sur Youtube."
			case 'Search on Geograph: <<text>>': return "Chercher <<text>> sur Geograph." 
			case 'Search with Flickr: <<text>>': return "Chercher <<text>> sur Flickr."
			case 'Search with Nzbindex.nl: <<text>>': return "Chercher <<text>> avec Nzbindex.nl."
			}
		case 'de':
			switch (text) {
			case "Google search: <<text>>": return "Suche auf Google <<text>>"
			case 'Google Image search: <<text>>': return "Suche auf Google Images <<text>>"
			case 'Wikipedia search: <<text>>': return "Suche auf Wikipedia<<text>>"
			case 'Twitter search: <<text>>': return "Suche auf Twitter <<text>>"
			case 'Search on Ebay: <<text>>': return "Suche auf Ebay <<text>>"
			case 'Search on Google Maps: <<text>>': return "Suche auf Google Maps <<text>>" 
			case 'Search on Youtube: <<text>>': return "Suche auf Youtube <<text>>"
			case 'Search on Geograph: <<text>>': return "Suche auf Geograph <<text>>" 
			case 'Search with Flickr: <<text>>': return "Suche auf Flickr <<text>>"
		}
		case 'nl': 
			switch (text) {
			case "Google search: <<text>>": return "Zoeken op Google narr <<text>>"
			case 'Google Image search: <<text>>': return "Zoeken op Google Afbeeldingen narr <<text>>"
			case 'Wikipedia search: <<text>>': return "Zoeken op Wikipedia narr <<text>>"
			case 'Twitter search: <<text>>': return "Zoeken op Twitter narr <<text>>"
			case 'Search on Ebay: <<text>>': return "Zoeken op Ebay narr <<text>>"
			case 'Search on Google Maps: <<text>>': return "Zoeken op Google Maps narr <<text>>" 
			case 'Search on Youtube: <<text>>': return "Zoeken op Youtube narr <<text>>"
			case 'Search on Geograph: <<text>>': return "Zoeken op Geograph narr <<text>>" 
			case 'Search with Flickr: <<text>>': return "Zoeken op Flickr narr <<text>>"
		}
		case 'es': 
			switch (text) {
			case "Google search: <<text>>": return "Búsqueda en Google <<text>>"
			case 'Google Image search: <<text>>': return "Búsqueda en Google Imágenes <<text>>"
			case 'Wikipedia search: <<text>>': return "Búsqueda en Wikipedia <<text>>"
			case 'Twitter search: <<text>>': return "Búsqueda en Twitter <<text>>"
			case 'Search on Ebay: <<text>>': return "Búsqueda en Ebay <<text>>"
			case 'Search on Google Maps: <<text>>': return "Búsqueda en Google Maps <<text>>" 
			case 'Search on Youtube: <<text>>': return "Búsqueda en Youtube <<text>>"
			case 'Search on Geograph: <<text>>': return "Búsqueda en Geograph <<text>>" 
			case 'Search with Flickr: <<text>>': return "Búsqueda en Flickr <<text>>"
			}
		case 'ru': 
			switch (text) {
			case "Google search: <<text>>": return "поиск в Google <<text>>"
			case 'Google Image search: <<text>>': return "поиск в Google Images <<text>>"
			case 'Wikipedia search: <<text>>': return "поиск в Wikipedia <<text>>"
			case 'Twitter search: <<text>>': return "поиск в Twitter <<text>>"
			case 'Search on Ebay: <<text>>': return "поиск в Ebay <<text>>"
			case 'Search on Google Maps: <<text>>': return "поиск в Google Maps <<text>>" 
			case 'Search on Youtube: <<text>>': return "поиск в Youtube <<text>>"
			case 'Search on Geograph: <<text>>': return "поиск в Geograph <<text>>" 
			case 'Search with Flickr: <<text>>': return "поиск в Flickr <<text>>"
			}

	
		}
	return(text)
	}

	
		

function getTransparency(){
	var rep = localStorage['transparency']
    if (rep == null) rep = '99';
    return(rep);
	}

function getMaxNumberOfCols(){
	var rep = localStorage['maxNumberOfCols']
    if (rep == null) rep = '4';
    return(rep);
	}


function createLink(_dest,_title,_method,_content) {
	switch (_method) {
	case "_backf" : 
	case "_backfo" : 
	case "_back"  : //here we will have to keep focus
	     return '<span href="'+_dest +'" title="'+_title+'" id="'+_title+' ">'+_content+'</span>';
	case "_new": 
		_method = '_ss'+_title;
	default:
		return '<a href="'+_dest +'" title="'+_title+'" target="'+_method+'">'+_content+'</a>';
	}
}

function getNbIcons(){
		var use = getUse()
        var nb = 0
		for (i=0; i<use.length; i++) {
			if (use[i]) nb++
		}
		return(nb)
}



function getNumberOfCols(){
	return ( Math.min( getMaxNumberOfCols(), getNbIcons() ) )
	}

function getWidth () {
		var col = getNumberOfCols()
		var s = ( col*20 + (col-1)*4 + 4);
		return (s)
		}
		
function getHeight(){
	   var row = Math.ceil( getNbIcons() / getNumberOfCols() )
	   return( 20*row + (row-1)*4 + 4 )
	}

function links() {
	    //var reg=new RegExp(" ", "g");
		var use = getUse();
		var openIn = getOpenIn();
		var order = getOrder();
		
		//console.log(myLinks);
		for (i in myLinks) {
			myLinks[i].use = use[i] ;
			}
		
		str = '';
      	
		//console.log(order);
		for ( okey in order  ) {
			//console.log(okey)
			var key = order[okey]
			//console.log(key)
			if ( myLinks[key].use ) {
			    if (myLinks[key].id == "cpboard" ) {
			        str += '<img id=\'selectsearchcpboard\'  src=\''+myLinks[key].img+'\' >';
			    } else {
				    str += createLink(	myLinks[key].dest,
									    tr(myLinks[key].title),
									    openIn,
									    myLinks[key].img
									);
				}
			}
		} 
		
		
		for (i in myLinks) {
			if (myLinks[i].defaultLocale != null) {
					var reg=new RegExp("(<<"+myLinks[i].id+"Locale>>)", "g");
					str = str.replace( reg , getLocale(myLinks[i].id) );
				}
			if (myLinks[i].custom != null) {
    					var reg=new RegExp("(<<"+myLinks[i].id+"eng>>)", "g");
    					str = str.replace( reg , getCustomEng(myLinks[i].id) );
    					reg = new RegExp("(<<"+myLinks[i].id+"img>>)", "g");
            			str = str.replace( reg , getCustomImg(myLinks[i].id) );
    				}	
		}
		
			
	return (str);
}
