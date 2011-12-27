var Sogou = {};
ImplementInterface(Sogou, SearchEngine);
Sogou.name = "Sogou";
Sogou.icon = "icons/sogou.ico"
Sogou.prefixes=["www", "pic", "image", "ditu", "map"];
Sogou.domains = ["com", "cn", "com.cn"];

Sogou.webSearch = {
	support : true,
	inputId   : "query", //another is upquery
	inputName : "query" 
};
Sogou.imageSearch = {
	support : true,
	inputId   : "form_querytext",
	inputName : "query"
};
Sogou.mapSearch = {
	support : true,
	inputId   : "query",
	inputName : "what"
};

Sogou.getQueryType = function(url){
	var uri = new Uri(url);
	var host = uri.host().toLowerCase();
	var path = uri.path().toLowerCase();
	var info = this.getHostInfo(host);
	if(!info) return "unknown";
	switch(info.prefix){
		case "www":
			return "web";
		case "image":
		case "pic":
			return "image";
		case "ditu":
		case "map":
			return "map";
		default:
			return "unknown";
	}
}

Sogou.parseWebSearchURI = function(url){
	var uri = new Uri(url);
	var query = new WebQuery();
	var content = uri.getQueryParamValue("query");
	query.content = this.decode(content);
	return query;
}

Sogou.getWebSearchURI = function(info){
	var prefix = "http://www.sogou.com/web?";
	if(!info) return prefix;
	info.content = (info.content || "").replace("+", " ");
	var query = {
		"query" : this.encode(info.content)
	};
	var queryURL = this.joinQueryKeyWords(query);
	return prefix + queryURL;	
}

Sogou.parseImageSearchURI = function(url){
	var info = Sogou.parseWebSearchURI(url);
	info.type = "image";
	return info;
};

Sogou.getImageSearchURI = function(info){
	var prefix = "http://pic.sogou.com/pics?";
	if(!info) return prefix;
	info.content = (info.content || "").replace("+", " ");
	var query = {
		"query" : this.encode(info.content)
	};
	var queryURL = this.joinQueryKeyWords(query);
	return prefix + queryURL;	
}

Sogou.parseMapSearchURI = function(url){
	var info = Sogou.parseWebSearchURI(url);
	info.type = "map";
	return info;
};

Sogou.getMapSearchURI = function(info){
	var prefix = "http://map.sogou.com/?#";
	if(!info) return prefix;
	info.content = (info.content || "").replace("+", " ");
	var query = {
		"lq" : this.encode(info.content)
	};
	var queryURL = this.joinQueryKeyWords(query);
	return prefix + queryURL;	
}