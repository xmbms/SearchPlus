var Yahoo = {};
ImplementInterface(Yahoo, SearchEngine);
Yahoo.name = "Yahoo";
Yahoo.icon = "icons/yahoo.ico"
Yahoo.prefixes=["www", "image", "ditu", "map"];
Yahoo.domains = ["cn"];

Yahoo.webSearch = {
	support : true,
	inputId   : "p",
	inputName : "q" 
};
Yahoo.imageSearch = {
	support : true,
	inputId   : "p",
	inputName : "q"
};
Yahoo.mapSearch = {
	support : true,
	inputId   : "keyword",
	inputName : "q"
};

Yahoo.getQueryType = function(url){
	var uri = new Uri(url);
	var host = uri.host().toLowerCase();
	var path = uri.path().toLowerCase();
	var info = this.getHostInfo(host);
	if(!info || info.postfix != "cn") return "unknown";
	switch(info.prefix){
		case "www":
			return "web";
		case "image":
			return "image";
		case "ditu":
		case "map":
			return "map";
		default:
			return "unknown";
	}
}

Yahoo.parseWebSearchURI = function(url){
	var uri = new Uri(url);
	var query = new WebQuery();
	var content = uri.getQueryParamValue("q");
	query.content = this.decode(content);
	return query;
}

Yahoo.getWebSearchURI = function(info){
	var prefix = "http://www.yahoo.cn/s?";
	if(!info) return prefix;
	info.content = (info.content || "").replace("+", " ");
	var query = {
		"q" : this.encode(info.content)
	};
	var queryURL = this.joinQueryKeyWords(query);
	return prefix + queryURL;	
}

Yahoo.parseImageSearchURI = function(url){
	var info = Yahoo.parseWebSearchURI(url);
	info.type = "image";
	return info;
};

Yahoo.getImageSearchURI = function(info){
	var prefix = "http://image.yahoo.cn/s?";
	if(!info) return prefix;
	info.content = (info.content || "").replace("+", " ");
	var query = {
		"q" : this.encode(info.content)
	};
	var queryURL = this.joinQueryKeyWords(query);
	return prefix + queryURL;	
}

Yahoo.parseMapSearchURI = function(url){
	var info = Yahoo.parseWebSearchURI(url);
	info.type = "map";
	return info;
};

Yahoo.getMapSearchURI = function(info){
	var prefix = "http://ditu.yahoo.cn/?";
	if(!info) return prefix;
	info.content = (info.content || "").replace("+", " ");
	var query = {
		"q" : this.encode(info.content)
	};
	var queryURL = this.joinQueryKeyWords(query);
	return prefix + queryURL;	
}