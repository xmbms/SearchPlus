/**
 * Search Engine Interface and Query Interface
 */
 
var SearchEngine = {
	name : "Search Engine",
	webSearchSupported   : false,
	imageSearchSupported : false,
	mapSearchSupported   : false,
	prefixes : [], //ascend order
	domains  : [], //ascend order
	/**
	 * @param host in lower case
	 */
	isValidHost  : function(host){
		var info = this.getHostInfo(host);
		if(!info){
			return false;
		}
		if(binarySearch(info.prefix, this.prefixes) == -1){
			return false;
		}
		if(binarySearch(info.postfix, this.domains) == -1){
			return false;
		}
		return true;
	},
	getHostInfo : function(host){
		var reg = new RegExp("(.*)+\." + this.name + "\.(.*)+", "i");
		var pattern = reg.exec(host);
		if(pattern && pattern.length == 3){
			return {
				prefix : pattern[1],
				postfix: pattern[2]
			}
		}
		return null;
	},
	/**
	 * @return query type in (web, image, map, unknown)
	 */
	getQueryType : function(host, path){},
	/**
	 * if the query type is unknown, try to give a safe uri.
	 */
	getFixURI : function(URI){},
	/**
	 * @param web query uri of this search engine
	 * @return WebQuery
	 */
	parseWebSearchURI     : function(webSearchURI){},
	/**
	 * @param  WebQuery
	 * @return full query uri of this search engine
	 */
	getWebSearchURI       : function(webQuery){},
	/**
	 * @param image query uri of this search engine
	 * @return WebQuery
	 */
	parseImageSearchURI   : function(imageSearchURI){},
	/**
	 * @param  ImageQuery
	 * @return full query uri of this search engine
	 */
	getImaegSearchURI     : function(imageQuery){},
	/**
	 * @param map query uri of this search engine
	 * @return WebQuery
	 */
	parseMapSearchURI     : function(mapSearchURI){},
	/**
	 * @param  MapQuery
	 * @return full query uri of this search engine
	 */
	getMapSearchURI       : function(mapQuery){},
	getQueryInfo : function(url, type){
		switch(type){
			case "web":
				return this.parseWebSearchURI(url);
			case "image":
				return this.parseImageSearchURI(url);
			case "map":
				return this.parseMapSearchURI(url);
			default:
				return "";
		}
	},
	getQueryURL : function(info, type){
		switch(type){
			case "web":
				return this.getWebSearchURI(info);
			case "image":
				return this.getImaegSearchURI(info);
			case "map":
				return this.getMapSearchURI(info);
			default:
				return "";
		}
	}
}

function WebQuery(){
	this.content = "";
	this.site    = "";
}

function imageQuery(){
	this.content = "";
}

function MapQuery(){
	this.content = "";
}

function ImplementInterface(dest, src){
	for(var i in src){
		if(!dest[i]){
			dest[i] = src[i];
		}
	}
}

function binarySearch(dest, src){
	var start = 0;
	var end = src.length - 1;
	var mid = 0;
	while(start <= end){
		mid = Math.floor((start + end) / 2);
		if(src[mid] == dest){
			return mid;
		}
		if(src[mid] < dest){
			start = mid + 1;
		} else {
			end = mid - 1;
		}
	}
	return -1;
}