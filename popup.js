var GTabId = -1;
window.onload = function(){
	chrome.tabs.getSelected(null,function(tab){
		GTabId = tab.id;
		var bg = chrome.extension.getBackgroundPage();
		var info = bg.SEManager.getSearchEngineInfo(tab.url);
		var orders = bg.SEManager.getSEOrder(info.type);
		var template = [
			"<li class=\"searchengine\" id=\"",
			"", //se name;
			"\"><a href=\"#\"><img class=\"seicon\" src=\"",
			"", //icon
			"\">",
			"", //se name
			"</a></li>"
		];
		var elem = document.getElementById("searchlists");
		elem.innerHTML = "";
		elem.addEventListener("click", switchSearchEngine, false);
		var html = "";
		for(var i = 0, len = orders.length; i < len; i++){
			if(bg.SEManager.isDisabledSearchEngine(orders[i].name, info.type)) continue;
			if(info.name != orders[i].name){
				template[1] = orders[i].name;
				template[3] = orders[i].icon;
				template[5] = orders[i].name;
				html = html + template.join("");
			}
		}
		elem.innerHTML = html;
	})
}

function switchSearchEngine(event){
	var name = getSearchEngineName(event.target);
	if(!name) return;
	chrome.tabs.get(GTabId, function(tab){
		var bg = chrome.extension.getBackgroundPage();
		var index = bg.SEManager.getSEIndexByName(name);
		if(tab){
			bg.switchSearchEngine(tab, index);
		}
		window.close();
	});
}

function getSearchEngineName(node) {
	if(!node || !node.tagName) {
		return "";
	}
	else if (node.tagName.toLowerCase() == "li") {
		return node.id;
	}
	else
	{
		return getSearchEngineName(node.parentNode);
	}
}

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-46462299-1']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();