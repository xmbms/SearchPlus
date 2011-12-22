var searchEngines = [];

var webSearchOrder = [];
var imageSearchOrder = [];
var mapSearchOrder = [];

var domainReg = new RegExp("");
var SEManager = {
	getSearchEngine : function(index){
		if(index < 0 || index >= searchEngines.length){
			return null;
		}
		return searchEngines[index];
	},
	addSearchEngine : function(searchEngine){
		searchEngine.prefixes.sort();
		searchEngine.domains.sort();
		var index = searchEngines.push(searchEngine) - 1;
		if(searchEngine.webSearchSupported){
			webSearchOrder.push(index);
		}
		if(searchEngine.imageSearchSupported){
			imageSearchOrder.push(index);
		}
		if(searchEngine.mapSearchSupported){
			mapSearchOrder.push(index);
		}
		this.updateDomainReg();
	},
	updateDomainReg : function(){
		var txt = "";
		for(var i = 0, len = searchEngines.length; i < len; i++){
			txt = txt + searchEngines[i].name.toLowerCase() + "\.|";
		}
		domainReg = new RegExp(txt, "i");
	},
	getSearchEngineInfo : function(url){
		if(searchEngines.length && !domainReg.exec(uri)){
			return false;
		}
		var uri = new Uri(url);
		var host = uri.host().toLowerCase();
		var info = {
			index : -1,
			type  : "unknow",
			name  : "Search Engine"
		}
		for(var i = 0, len = searchEngines.length; i < len; i++){
			if(searchEngines[i].isValidHost(host)){
				info.index = i;
				info.name = searchEngines[i].name;
				info.type = searchEngines[i].getQueryType(host, uri.path().toLowerCase());
				return info;
			}
		}
		return null;
	},
	getNextSearchEngineName : function(info){
		var index = this.searchNextSearchIndexInOrder(info.index, info.type);
		if(index != -1){
			return searchEngines[index].name;
		} else {
			return null;
		}
	},
	searchNextSearchIndexInOrder : function(index, type){
		var searchOrder = [];
		switch(type){
			case "web":
				searchOrder = webSearchOrder;
				break;
			case "image":
				searchOrder = imageSearchOrder;
				break;
			case "map":
				searchOrder = mapSearchOrder;
				break;
			default:
				break;
		}
		for(var i = 0, len = searchOrder.length; i < len; i++){
			if(searchOrder[i] != index){
				return searchOrder[i];
			}
		}
		return -1;
	}
}