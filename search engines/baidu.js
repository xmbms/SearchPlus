var Baidu = {};
ImplementInterface(Baidu, SearchEngine);
Baidu.name = "Baidu";
Baidu.host = "Baidu";
Baidu.prefixes=["www", "image", "tupian", "map", "ditu"];
Baidu.domains = ["com","com.cn","cn","com.jp","jp"];

Baidu.icon = "icons/baidu.ico"

Baidu.webSearch = {
	support : true,
	inputId   : "kw",
	inputName : "wd" 
};
Baidu.imageSearch = {
	support : true,
	inputId   : "kw",
	inputName : "word"
};
Baidu.mapSearch = {
	support : true,
	inputId   : "PoiSearch",
	inputName : "word"
};

Baidu.getQueryType = function(url){
	var uri = new Uri(url);
	var host = uri.host().toLowerCase();
	var path = uri.path().toLowerCase();
	var info = this.getHostInfo(host);
	if(!info) return "unknown";
	switch(info.prefix){
		case "www":
			switch(path){
				case "/":
				case "/s":
					return "web";
				case "/i":
					return "image";
				default:
					return "unknown";
			}
		case "image":
		case "tupian":
			return "image";
		case "map":
		case "ditu":
			return "map";			
		default :
			return "unknown";
	}
}

Baidu.parseWebSearchURI = function(url){
	var uri = new Uri(url);
	var query = new WebQuery();
	query.content = this.decode(uri.getQueryParamValue("wd"));
	return query;
}

Baidu.getWebSearchURI = function(info){
	var prefix = "http://www.baidu.com/s?";
	if(!info) return prefix;
	info.content = (info.content || "").replace("+", " ");
	var query = {
		"wd" : this.encode(info.content)
	}
	var queryURL = this.joinQueryKeyWords(query);
	return prefix + queryURL;
}

Baidu.parseImageSearchURI = function(url){
	var uri = new Uri(url);
	var query = new ImageQuery();
	query.content = this.decode(uri.getQueryParamValue("word"));
	return query;
}

Baidu.getImageSearchURI = function(info){
	var prefix = "http://image.baidu.com/i?tn=baiduimag&ct=201326592&"; //magic number???
	if(!info) return prefix;
	info.content = (info.content || "").replace("+", " ");
	var query = {
		"word" : this.encode(info.content, "gbk")
	}
	var queryURL = this.joinQueryKeyWords(query);
	return prefix + queryURL;
}

Baidu.parseMapSearchURI = function(url){
	var uri = new Uri(url);
	var query = new MapQuery();
	query.content = this.decode(uri.getQueryParamValue("s"));
	query.content = query.content.replace("s&wd=", "");
	return query;
}

Baidu.getMapSearchURI = function(info){
	var prefix = "http://map.baidu.com/?ie=utf-8&";
	if(!info) return prefix;
	info.content = (info.content || "").replace("+", " ");
	var query = {
		"s" : "s%26wd%3D" + this.encode(info.content) //another magic number
	}
	var queryURL = this.joinQueryKeyWords(query);
	return prefix + queryURL;
}