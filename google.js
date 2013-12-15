var Google = {};
ImplementInterface(Google, SearchEngine);
Google.name = "Google";
Google.host = "Google";
Google.webSearchSupported   = true;
Google.imageSearchSupported = true;
Google.mapSearchSupported   = true;
Google.prefixes=["www", "image", "images", "tupian", "map", "maps", "ditu"];
Google.domains = ["com","ae","com.ag","com.af","off.ai","am","com.ar","as","at","com.au","az","ba","com.bd","be","bg","com.bh","bi","com.bo","com.br","bs","co.bw","com.bz","ca","cd","cg","ch","ci","co.ck","cl","cn","com.co","co.cr","com.cu","de","dj","dk","dm","com.do","com.ec","com.eg","es","com.et","fi","com.fj","fm","fr","gg","com.gi","gl","gm","gr","com.gt","com.hk","hn","hrht","co.hu","co.id","ie","co.il","co.im","co.in","is","it","co.je","com.jm","jo","co.jp","co.ke","kg","co.kr","kz","li","lk","co.ls","lt","lu","lv","com.ly","co.ma","mn","ms","com.mt","mu","mw","com.mx","com.my","com.na","com.nf","com.ni","nl","no","com.np","nr","nu","co.nz","com.om","com.pa","com.pe","com.ph","com.pk","pl","pn","com.pr","pt","com.py","ro","ru","rw","com.sa","com.sb","sc","se","com.sg","sh","sk","sn","sm","com.sv","co.th","com.tj","tm","to","tp","com.tr","tt","com.tw","com.ua","co.ug","co.uk","com.uy","co.uz","com.vc","co.ve","vg","co.vi","com.vn","vu","ws","co.za","co.zm","cat"];

Google.icon = "icons/google.ico"

Google.webSearch = {
	support : true,
	inputId   : "lst-ib",
	inputName : "q" 
};
Google.imageSearch = {
	support : true,
	inputId   : "lst-ib",
	inputName : "q"
};
Google.mapSearch = {
	support : true,
	inputId   : "q_d",
	inputName : "q"
};

Google.rebuildURL = function(url){
	if(url.indexOf("?") == -1){
		url = url.replace("#", "?");
	} else {
		url = url.replace("#", "&");
	}
	return url;
}

Google.getQueryType = function(url){
	var uri = new Uri(url);
	var host = uri.host().toLowerCase();
	var path = uri.path().toLowerCase();
	var info = this.getHostInfo(host);
	var tbm = "";
	if(!info) return "unknown";
	switch(info.prefix){
		case "www":
			switch(path){
				case "/":
				case "/webhp":
					return "web";
				case "/search":
					tbm = uri.getQueryParamValue("tbm");
					if(tbm == "isch"){
						return "image";
					} else {
						return "web"
					}
				case "/imghp":
					return "image";
				case "/maps":
					return "map";
				default:
					return "unknown"
			}
		case "images":
		case "image":
			return "image";
		case "maps":
		case "map":
		case "ditu":
			return "map";
		default :
			return "unknown";
	}
}

Google.parseWebSearchURI = function(url){
	url = this.rebuildURL(url);
	var uri = new Uri(url);
	var query = new WebQuery();
	var keys = uri.getQueryParamValues("q");
	var content = "";
	if(keys.length){
		content = keys[ keys.length - 1];
	}
	query.content = this.decode(content);
	return query;
}

Google.getWebSearchURI = function(info){
	var prefix = "http://www.google.com/search?";
	if(!info) return prefix;
	info.content = (info.content || "").replace("+", " ");
	var query = {
		"q" : this.encode(info.content)
	};
	var queryURL = this.joinQueryKeyWords(query);
	return prefix + queryURL;	
}

Google.parseImageSearchURI = function(url){
	var info = Google.parseWebSearchURI(url);
	info.type = "image";
	return info;
};

Google.getImageSearchURI = function(info){
	var prefix = "http://www.google.com/search?tbm=isch&";
	if(!info) return prefix;
	info.content = (info.content || "").replace("+", " ");
	var query = {
		"q" : this.encode(info.content)
	};
	var queryURL = this.joinQueryKeyWords(query);
	return prefix + queryURL;	
}

Google.parseMapSearchURI = function(url){
	var info = Google.parseWebSearchURI(url);
	info.type = "map";
	return info;
};
Google.getMapSearchURI = function(info){
	var prefix = "http://maps.google.com/maps?";
	if(!info) return prefix;
	info.content = (info.content || "").replace("+", " ");
	var query = {
		"q" : this.encode(info.content)
	};
	var queryURL = this.joinQueryKeyWords(query);
	return prefix + queryURL;	
}