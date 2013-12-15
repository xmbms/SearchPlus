var So = {};
ImplementInterface(So, SearchEngine);
So.name = "360";
So.host = "so";
So.icon = "icons/so.ico"
So.prefixes=["www", "image", "ditu", "map"];
So.domains = ["com"];

So.webSearch = {
	support : true,
	inputId   : "input",
	inputName : "q" 
};
So.imageSearch = {
	support : true,
	inputId   : "search_kw",
	inputName : "q"
};
So.mapSearch = {
	support : true,
	inputId   : "keywordTxt",
	inputName : "q"
};

So.getQueryType = function(url){
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

So.parseWebSearchURI = function(url){
	var uri = new Uri(url);
	var query = new WebQuery();
	var content = uri.getQueryParamValue("w");
	query.content = this.decode(content);
	return query;
}

So.getWebSearchURI = function(info){
	var prefix = "http://www.so.com/s?ie=utf-8&src=SearchPlus&ms=&";
	if(!info) return prefix;
	info.content = (info.content || "").replace("+", " ");
	var query = {
		"q" : this.encode(info.content)
	};
	var queryURL = this.joinQueryKeyWords(query);
	return prefix + queryURL;	
}

So.parseImageSearchURI = function(url){
	var info = So.parseWebSearchURI(url);
	info.type = "image";
	return info;
};

So.getImageSearchURI = function(info){
	var prefix = "http://image.so.com/i?ie=utf-8&src=SearchPlus&";
	if(!info) return prefix;
	info.content = (info.content || "").replace("+", " ");
	var query = {
		"q" : this.encode(info.content)
	};
	var queryURL = this.joinQueryKeyWords(query);
	return prefix + queryURL;	
}

So.parseMapSearchURI = function(url){
	var info = So.parseWebSearchURI(url);
	info.type = "map";
	return info;
};

So.getMapSearchURI = function(info){
	var prefix = "http://map.so.com/?ie=utf-8&t=map&src=SearchPlus&";
	if(!info) return prefix;
	info.content = (info.content || "").replace("+", " ");
	var query = {
		"k" : this.encode(info.content)
	};
	var queryURL = this.joinQueryKeyWords(query);
	return prefix + queryURL;	
}