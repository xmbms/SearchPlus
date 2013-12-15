var Duckduckgo = {};
ImplementInterface(Duckduckgo, SearchEngine);
Duckduckgo.name = "Duckgo";
Duckduckgo.host = "duckduckgo";
Duckduckgo.icon = "icons/duckduckgo.ico"
Duckduckgo.prefixes=[""];
Duckduckgo.domains = ["com"];

Duckduckgo.webSearch = {
	support : true,
	inputId   : "input",
	inputName : "q" 
};
Duckduckgo.imageSearch = {
	support : false
};
Duckduckgo.mapSearch = {
	support : false
};

Duckduckgo.getQueryType = function(url){
	var uri = new Uri(url);
	var host = uri.host().toLowerCase();
	var path = uri.path().toLowerCase();
	var info = this.getHostInfo(host);
	if(!info) return "unknown";
	switch(info.prefix){
		case "www":
		default:
			return "web";
	}
}

Duckduckgo.parseWebSearchURI = function(url){
	var uri = new Uri(url);
	var query = new WebQuery();
	var content = uri.getQueryParamValue("q");
	query.content = this.decode(content);
	return query;
}

Duckduckgo.getWebSearchURI = function(info){
	var prefix = "https://duckduckgo.com/?";
	if(!info) return prefix;
	info.content = (info.content || "").replace("+", " ");
	var query = {
		"q" : this.encode(info.content)
	};
	var queryURL = this.joinQueryKeyWords(query);
	return prefix + queryURL;	
}