var Google = {};
ImplementInterface(Google, SearchEngine);
Google.name = "Google";
Google.webSearchSupported   = true;
Google.imageSearchSupported = false;
Google.mapSearchSupported   = false;
Google.prefixes=["www"];
Google.domains = ["com","ae","com.ag","com.af","off.ai","am","com.ar","as","at","com.au","az","ba","com.bd","be","bg","com.bh","bi","com.bo","com.br","bs","co.bw","com.bz","ca","cd","cg","ch","ci","co.ck","cl","cn","com.co","co.cr","com.cu","de","dj","dk","dm","com.do","com.ec","com.eg","es","com.et","fi","com.fj","fm","fr","gg","com.gi","gl","gm","gr","com.gt","com.hk","hn","hrht","co.hu","co.id","ie","co.il","co.im","co.in","is","it","co.je","com.jm","jo","co.jp","co.ke","kg","co.kr","kz","li","lk","co.ls","lt","lu","lv","com.ly","co.ma","mn","ms","com.mt","mu","mw","com.mx","com.my","com.na","com.nf","com.ni","nl","no","com.np","nr","nu","co.nz","com.om","com.pa","com.pe","com.ph","com.pk","pl","pn","com.pr","pt","com.py","ro","ru","rw","com.sa","com.sb","sc","se","com.sg","sh","sk","sn","sm","com.sv","co.th","com.tj","tm","to","tp","com.tr","tt","com.tw","com.ua","co.ug","co.uk","com.uy","co.uz","com.vc","co.ve","vg","co.vi","com.vn","vu","ws","co.za","co.zm","cat"];

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

Google.rebuildURL = function(url){
	url = url.replace(/\/#sclient/i,"\/?sclient");
	if(url.indexOf("?") == -1){
		url = url.replace(/#sclient/i, "?sclient");
	} else {
		url = url.replace(/#sclient/i, "&sclient");
	}
	return url;
}

Google.getQueryType = function(url){
	var uri = new Uri(url);
	var host = uri.host().toLowerCase();
	var path = uri.path().toLowerCase();
	var info = this.getHostInfo(host);
	if(!info) return "unknown";
	switch(info.prefix){
		case "www":
			switch(path){
				case "/":
				case "/webhp":
				case "/search":
					return "web";
				default:
					return "unknown"
			}
		default :
			return "unknown";
	}
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