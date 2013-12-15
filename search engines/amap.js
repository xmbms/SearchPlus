var Amap = {};
ImplementInterface(Amap, SearchEngine);
Amap.name = "Amap";
Amap.host = "Amap";
Amap.icon = "icons/amap.ico"
Amap.prefixes=["www"];
Amap.domains = ["com"];

Amap.webSearch = {
	support : false
};
Amap.imageSearch = {
	support : false
};
Amap.mapSearch = {
	support : true,
	inputId   : "keywordTxt",
	inputName : ""
};

Amap.getQueryType = function(url){
	var uri = new Uri(url);
	var host = uri.host().toLowerCase();
	var path = uri.path().toLowerCase();
	var info = this.getHostInfo(host);
	if(!info) return "unknown";
	switch(info.prefix){
		case "ditu":
		case "map":
		case "www":
			return "map";
		default:
			return "unknown";
	}
}

Amap.parseWebSearchURI = function(url){
	var uri = new Uri(url);
	var query = new WebQuery();
	var content = uri.getQueryParamValue("q");
	query.content = this.decode(content);
	return query;
}

Amap.parseMapSearchURI = function(url){
	var info = Amap.parseWebSearchURI(url);
	info.type = "map";
	return info;
};

Amap.getMapSearchURI = function(info){
	var prefix = "http://www.amap.com/?";
	if(!info) return prefix;
	info.content = (info.content || "").replace("+", " ");
	var query = {
		"q" : this.encode(info.content)
	};
	var queryURL = this.joinQueryKeyWords(query);
	return prefix + queryURL;	
}