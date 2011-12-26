var searchEngines = [];
var domainReg = new RegExp("");

var SEManager = {
	general : {
		get redirect(){
			return localStorage["general.redirect"] != "false";
		},
		set redirect(value){
			localStorage["general.redirect"] = (value != false);
		},
		get tryfix(){
			return localStorage["general.tryfix"] != "false";
		},
		set tryfix(value){
			localStorage["general.tryfix"] = (value != false);
		},
		get homepage(){
			return localStorage["general.homepage"] == "true";
		},
		set homepage(value){
			localStorage["general.homepage"] = (value == true);
		}
	},
	webSearch : {
		primary : false,
		order  : []
	},
	imageSearch : {
		primary : false,
		order   : []
	},
	count : function(){
		return searchEngines.length;
	},
	mapSearch : {
		primary : false,
		order : []
	},
	getSearchEngine : function(index){
		if(index < 0 || index >= searchEngines.length){
			return null;
		}
		return searchEngines[index];
	},
	getSEIndexByName : function(name){
		for(var i = 0, len = searchEngines.length; i < len; i++){
			if(searchEngines[i].name == name){
				return i;
			}
		}
		return -1;
	},
	addSearchEngine : function(searchEngine){
		searchEngine.prefixes.sort();
		searchEngine.domains.sort();
		var index = searchEngines.push(searchEngine) - 1;
		if(searchEngine.webSearch && searchEngine.webSearch.support){
			this.webSearch.order.push(index);
		}
		if(searchEngine.imageSearch && searchEngine.imageSearch.support){
			this.imageSearch.order.push(index);
		}
		if(searchEngine.mapSearch && searchEngine.mapSearch.support){
			this.mapSearch.order.push(index);
		}
		this.updateDomainReg();
	},
	updateDomainReg : function(){
		var txt = "";
		for(var i = 0, len = searchEngines.length; i < len; i++){
			txt = txt + searchEngines[i].name.toLowerCase() + "\.|";
		}
		if(txt){
			txt = txt.substr(0, txt.length - 1);
		}
		domainReg = new RegExp(txt, "i");
	},
	getSearchEngineInfo : function(url){
		if(!(searchEngines.length && (url || "").match(domainReg))){
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
				info.type = searchEngines[i].getQueryType(url);
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
				searchOrder = this.webSearch.order;
				break;
			case "image":
				searchOrder = this.imageSearch.order;
				break;
			case "map":
				searchOrder = this.mapSearch.order;
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
	},
	getPrimaryOptions : function(type){
		var opt = true;
		switch(type){
			case "web":
				opt = (settings.webSearch.primary == "true");
				break;
			case "image":
				opt = (settings.imageSearch.primary == "true");
				break;
			case "map":
				opt = (settings.mapSearch.primary == "true");
				break;
			default:
				break;
		}
		return opt;
	},
	getSEOrder : function(type){
		var order = [];
		var searchOrder = [];
		switch(type){
			case "web":
				searchOrder = this.webSearch.order;
				break;
			case "image":
				searchOrder = this.imageSearch.order;
				break;
			case "map":
				searchOrder = this.mapSearch.order;
				break;
			default:
				break;
		}
		for(var i = 0, len = searchOrder.length; i < len; i++){
			var info = {
				name : searchEngines[searchOrder[i]].name,
				icon : searchEngines[searchOrder[i]].icon
			}
			order.push(info);
		}
		return order;
	},
	setGeneralOptions : function(redirect, homepage, tryfix){
		this.general.redirect = redirect;
		this.general.tryfix = tryfix;
		this.general.homepage = homepage;
	},
	saveSEOrder : function(primary, value, type){
		var name = "";
		var order = [];
		switch(type){
			case "web":
				name = "webSearch";
				settings.webSearch.primary = primary;
				order = this.webSearch.order;
				break;
			case "image":
				name = "imageSearch";
				settings.imageSearch.primary = primary;
				order = this.webSearch.order;
				break;
			case "map":
				name = "mapSearch";
				settings.mapSearch.primary = primary;
				order = this.mapSearch.order;
				break;
			default:
				break;
		}
		if(name){
			settings[name].order = value;
		}
		this.initOrder(type, order);		
	},
	initOptions : function(){
		this.initOrder("web");
		this.initOrder("image");
		this.initOrder("map");
	},
	initOrder : function(type){
		var orderStr = settings[type+"Search"].order;
		this[type+"Search"].primary = this.getPrimaryOptions(type);
		if(!orderStr){
			var orderStr = "";
			var orders = this[type+"Search"].order;
			for(var i = 0, len = orders.length; i < len; i++){
				orderStr = orderStr + searchEngines[orders[i]].name + ";";
			}
			settings[type+"Search"].order = orderStr;
		} else {
			var splits = orderStr.split(";");
			var map = [];
			this[type+"Search"].order = [];
			for(var i =0, len = splits.length; i < len; i++){
				if(splits[i]){
					var index = this.getSEIndexByName(splits[i]);
					if(index != -1){
						this[type+"Search"].order.push(index);
						map[index] = 1;
					}
				}
			}
			for(var i = 0, len = searchEngines.length; i < len; i++){
				if(!map[i] && searchEngines[i][type+"Search"].support){
					this[type+"Search"].order.push(i);
				}
			}
		}
	}
}