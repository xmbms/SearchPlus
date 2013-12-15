var QQ = {};
ImplementInterface(QQ, SearchEngine);
QQ.name = "QQ";
QQ.host = "QQ";
QQ.icon = "icons/qq.ico"
QQ.prefixes=["map"];
QQ.domains = ["com"];

QQ.webSearch = {
	support : false
};
QQ.imageSearch = {
	support : false
};
QQ.mapSearch = {
	support : true,
	inputId   : "PoiSearch",
	inputName : "keyword"
};

QQ.getQueryType = function(url){
	var uri = new Uri(url);
	var host = uri.host().toLowerCase();
	var path = uri.path().toLowerCase();
	var info = this.getHostInfo(host);
	if(!info) return "unknown";
	switch(info.prefix){
		case "ditu":
		case "map":
			return "map";
		default:
			return "unknown";
	}
}

QQ.parseWebSearchURI = function(url){
	var uri = new Uri(url);
	var query = new WebQuery();
	var content = uri.getQueryParamValue("w");
	query.content = this.decode(content);
	return query;
}

QQ.parseMapSearchURI = function(url){
	var info = QQ.parseWebSearchURI(url);
	info.type = "map";
	return info;
};

QQ.getMapSearchURI = function(info){
	var prefix = "http://map.qq.com/?pid=web.map&ie=utf-8&from=SearchPlus&";
	if(!info) return prefix;
	info.content = (info.content || "").replace("+", " ");
	var query = {
		"w" : this.encode(info.content)
	};
	var queryURL = this.joinQueryKeyWords(query);
	return prefix + queryURL;	
}