var Baidu = {};
ImplementInterface(Baidu, SearchEngine);
Baidu.name = "Baidu";
Baidu.webSearchSupported   = true;
Baidu.imageSearchSupported = false;
Baidu.mapSearchSupported   = false;
Baidu.prefixes=["www"];
Baidu.domains = ["com","com.cn","cn","com.jp","jp"];

Baidu.parseWebSearchURI = function(url){
	var uri = new Uri(url);
	var query = new WebQuery();
	query.content = this.decode(uri.getQueryParamValue("wd"));
	return query;
}

Baidu.getQueryType = function(url){
	var uri = new Uri(url);
	var host = uri.host().toLowerCase();
	var path = uri.path().toLowerCase();
	var info = this.getHostInfo(host);
	if(!info) return "unknown";
	switch(info.prefix){
		case "www":
			switch(path){
				case "/s":
				case "/":
					return "web";
				default:
					return "unknown";
			}
			
		default :
			return "unknown";
	}
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