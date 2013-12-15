var Bing = {};
ImplementInterface(Bing, SearchEngine);
Bing.name = "Bing";
Bing.host = "Bing";
Bing.icon = "icons/bing.ico"
Bing.prefixes=[];
Bing.domains = ["com","com.cn","cn"];

Bing.webSearch = {
	support : true,
	inputId   : "sb_form_q",
	inputName : "q" 
};
Bing.imageSearch = {
	support : true,
	inputId   : "sb_form_q",
	inputName : "q"
};
Bing.mapSearch = {
	support : true,
	inputId   : "sb_form_q",
	inputName : "q"
};

Bing.getQueryType = function(url){
	var uri = new Uri(url);
	var host = uri.host().toLowerCase();
	var path = uri.path().toLowerCase();
	var info = this.getHostInfo(host);
	if(!info) return "unknown";
	switch(path){
		case "/":
		case "/search":
			return "web";
		case "/images/search":
			return "image";
		case "/ditu/":
		case "/maps/":
			return "map";
		default:
			return "unknown";
	}
}

Bing.parseWebSearchURI = function(url){
	var uri = new Uri(url);
	var query = new WebQuery();
	var content = uri.getQueryParamValue("q");
	query.content = this.decode(content);
	return query;
}

Bing.getWebSearchURI = function(info){
	var prefix = "http://www.bing.com/search?";
	if(!info) return prefix;
	info.content = (info.content || "").replace("+", " ");
	var query = {
		"q" : this.encode(info.content)
	};
	var queryURL = this.joinQueryKeyWords(query);
	return prefix + queryURL;	
}

Bing.parseImageSearchURI = function(url){
	var info = Bing.parseWebSearchURI(url);
	info.type = "image";
	return info;
};

Bing.getImageSearchURI = function(info){
	var prefix = "http://www.bing.com/images/search?";
	if(!info) return prefix;
	info.content = (info.content || "").replace("+", " ");
	var query = {
		"q" : this.encode(info.content)
	};
	var queryURL = this.joinQueryKeyWords(query);
	return prefix + queryURL;	
}

Bing.parseMapSearchURI = function(url){
	var info = Bing.parseWebSearchURI(url);
	info.type = "map";
	return info;
};

Bing.getMapSearchURI = function(info){
	var prefix = "http://www.bing.com/maps/?";
	if(chrome.i18n.getMessage("@@ui_locale") == "zh_CN" 
		|| chrome.i18n.getMessage("@@ui_locale") == "zh_TW"){
		prefix = "http://www.bing.com/ditu/?";
	}
	if(!info) return prefix;
	info.content = (info.content || "").replace("+", " ");
	var query = {
		"q" : this.encode(info.content)
	};
	var queryURL = this.joinQueryKeyWords(query);
	return prefix + queryURL;	
}