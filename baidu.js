var Baidu = {};
ImplementInterface(Baidu, SearchEngine);
Baidu.name = "Baidu";
Baidu.webSearchSupported   = true;
Baidu.imageSearchSupported = false;
Baidu.mapSearchSupported   = false;
Baidu.prefixes=["www"];
Baidu.domains = ["com","com.cn","cn","com.jp","jp"];

Baidu.parseWebSearchURI = function(url){
	return {};
}

Baidu.getQueryType = function(host, path){
	var info = this.getHostInfo(host);
	if(!info) return "unknown";
	switch(info.prefix){
		case "www":
			return "web";
		default :
			return "unknown";
	}
}

Baidu.getWebSearchURI = function(info){
	return "http://www.baidu.com";
}