var Youdao = {};
ImplementInterface(Youdao, SearchEngine);
Youdao.name = "Youdao";
Youdao.icon = "icons/youdao.ico"
Youdao.prefixes=["www", "image"]; //, "ditu", "map"
Youdao.domains = ["com"];

Youdao.webSearch = {
	support : true,
	inputId   : "query",
	inputName : "q" 
};
Youdao.imageSearch = {
	support : true,
	inputId   : "query",
	inputName : "q"
};
Youdao.mapSearch = {
	support : false
};

Youdao.getQueryType = function(url){
	var uri = new Uri(url);
	var host = uri.host().toLowerCase();
	var path = uri.path().toLowerCase();
	var info = this.getHostInfo(host);
	if(!info) return "unknown";
	switch(info.prefix){
		case "www":
			return "web";
		case "image":
			return "image";
		case "ditu":
		case "map":
		default:
			return "unknown";
	}
}

Youdao.parseWebSearchURI = function(url){
	var uri = new Uri(url);
	var query = new WebQuery();
	var content = uri.getQueryParamValue("q");
	query.content = this.decode(content);
	return query;
}

Youdao.getWebSearchURI = function(info){
	var prefix = "http://www.youdao.com/search?ue=utf8&keyfrom=searchPlus&";
	if(!info) return prefix;
	info.content = (info.content || "").replace("+", " ");
	var query = {
		"q" : this.encode(info.content)
	};
	var queryURL = this.joinQueryKeyWords(query);
	return prefix + queryURL;	
}

Youdao.parseImageSearchURI = function(url){
	var info = Youdao.parseWebSearchURI(url);
	info.type = "image";
	return info;
};

Youdao.getImageSearchURI = function(info){
	var prefix = "http://image.youdao.com/search?ue=utf8&keyfrom=searchPlus&";
	if(!info) return prefix;
	info.content = (info.content || "").replace("+", " ");
	var query = {
		"q" : this.encode(info.content)
	};
	var queryURL = this.joinQueryKeyWords(query);
	return prefix + queryURL;	
}

Youdao.parseMapSearchURI = function(url){
	var info = Youdao.parseWebSearchURI(url);
	info.type = "map";
	return info;
};

Youdao.getMapSearchURI = function(info){
	var prefix = "http://ditu.Youdao.cn/";
	if(!info) return prefix;
	info.content = (info.content || "").replace("+", " ");
	var query = {
		"q" : this.encode(info.content)
	};
	var queryURL = this.joinQueryKeyWords(query);
	return prefix + queryURL;	
}