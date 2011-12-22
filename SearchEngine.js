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
		var reg = new RegExp("(.*)+\." + this.name + "\.(.*)+", "i");
		var pattern = reg.exec(host);
		if(!pattern || pattern.length != 3){
			return false;
		}
		if(binarySearch(pattern[1], this.prefixes) == -1){
			return false;
		}
		if(binarySearch(pattern[2], this.domains) == -1){
			return false;
		}
		return true;
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
	getMapSearchURI       : function(mapQuery){}
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