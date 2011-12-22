var searchEngines = [];
var domainReg = new RegExp("");
var SEManager = {
	addSearchEngine : function(searchEngine){
		searchEngine.name = searchEngine.name.toLowerCase();
		searchEngine.prefixes.sort();
		searchEngine.domains.sort();
		searchEngines.push(searchEngine);
		this.updateDomainReg();
	},
	updateDomainReg : function(){
		var txt = "";
		for(var i = 0, len = searchEngines.length; i < len; i++){
			txt = txt + searchEngines[i].name + "\.|";
		}
		domainReg = new RegExp(txt, "i");
	},
	isValidURL : function(url){
		if(searchEngines.length && !domainReg.exec(uri)){
			return false;
		}
		var uri = new Uri(url);
		var host = uri.host().toLowerCase();
		for(var i = 0, len = searchEngines.length; i < len; i++){
			if(searchEngines[i].isValidHost(host)){
				return true;
			}
		}
		return false;
	}
}