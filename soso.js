var Soso = {};
ImplementInterface(Soso, SearchEngine);
Soso.name = "Soso";
Soso.icon = "icons/soso.ico"
Soso.prefixes=["www", "image", "ditu", "map"];
Soso.domains = ["com", "com.cn"];

Soso.webSearch = {
	support : true,
	inputId   : "s_input",
	inputName : "w" 
};
Soso.imageSearch = {
	support : true,
	inputId   : "sb",
	inputName : "w"
};
Soso.mapSearch = {
	support : true,
	inputId   : "query",
	inputName : "what"
};

Soso.getQueryType = function(url){
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

Soso.parseWebSearchURI = function(url){
	var uri = new Uri(url);
	var query = new WebQuery();
	var content = uri.getQueryParamValue("w");
	query.content = this.decode(content);
	return query;
}

Soso.getWebSearchURI = function(info){
	var prefix = "http://www.soso.com/q?&ie=utf-8&";
	if(!info) return prefix;
	info.content = (info.content || "").replace("+", " ");
	var query = {
		"w" : this.encode(info.content)
	};
	var queryURL = this.joinQueryKeyWords(query);
	return prefix + queryURL;	
}

Soso.parseImageSearchURI = function(url){
	var info = Soso.parseWebSearchURI(url);
	info.type = "image";
	return info;
};

Soso.getImageSearchURI = function(info){
	var prefix = "http://image.soso.com/image.cgi?ie=utf-8&";
	if(!info) return prefix;
	info.content = (info.content || "").replace("+", " ");
	var query = {
		"w" : this.encode(info.content)
	};
	var queryURL = this.joinQueryKeyWords(query);
	return prefix + queryURL;	
}

Soso.parseMapSearchURI = function(url){
	var info = Soso.parseWebSearchURI(url);
	info.type = "map";
	return info;
};

Soso.getMapSearchURI = function(info){
	var prefix = "http://map.soso.com/?pid=img.map&ie=utf-8&";
	if(!info) return prefix;
	info.content = (info.content || "").replace("+", " ");
	var query = {
		"w" : this.encode(info.content)
	};
	var queryURL = this.joinQueryKeyWords(query);
	return prefix + queryURL;	
}