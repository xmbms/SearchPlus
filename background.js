chrome.webNavigation.onErrorOccurred.addListener(function(details) {
	if(details.frameId == 0){
		var info = SEManager.getSearchEngineInfo(details.url);
		if(info.name && info.name.toLowerCase() == "google"){
			var google = SEManager.getSearchEngine(info.index);
			var queryInfo = google.getQueryInfo(details.url, info.type);
			if(!(queryInfo.content || SEManager.general.homepage)){
				return false;
			}
			var uri = new Uri(details.url);
			var gotoURL = "";
			if(uri.path().toLowerCase() == "/url" && SEManager.general.tryfix){
				var fixURL = uri.getQueryParamValue("url");
				gotoURL = SearchEngine.decode(fixURL); //need more details
			}
			if(SEManager.general.redirect){
				var index = SEManager.searchNextSearchIndexInOrder(info.index, 
										info.type);
				if(index != -1){
					var se = SEManager.getSearchEngine(index);
					gotoURL = se.getQueryURL(queryInfo);
				}
			}
			if(gotoURL){
				gotoURL = markSearchPlus(gotoURL);
				chrome.tabs.update(details.tabId,{url:gotoURL});
			}
		}
	}
});



function checkValidSearchEngineUrl(tabId, changeInfo, tab) {
	var info = null;
	var msg = "Switch to";
	var switchMsg = "Switch Search Engines";
	if ((info = SEManager.getSearchEngineInfo(tab.url))) {
		var name = SEManager.getNextSearchEngineName(info);
		if(name){
			msg = msg + " " + name;
			chrome.pageAction.show(tabId);
			var primary = SEManager.getPrimaryOptions(info.type);
			if(!primary){
				chrome.pageAction.setTitle({tabId : tabId, title : switchMsg});
				chrome.pageAction.setPopup({tabId: tabId, popup : "popup.html"});
				return ;
			} else {
				chrome.pageAction.setTitle({tabId : tabId, title : msg});
			}
		}
	}
};

function markSearchPlus(url){
	if(!url) return "";
	if(url.indexOf("?") == -1){
		return url + "?from=searchPlus";
	} else {
		return url + "&form=searchPlus";
	}
}

function getQueryContent(id, name){
	var value = "";
	var elem = document.getElementById(id || "");
	if(!elem){
		elem = document.getElementByName(name || "");
	}
	if(elem){
		value = elem.value;
	}
	chrome.extension.sendRequest({content: value}, function() {});
}

var ActiveTabContent = "";
var ActiveTabKey = true;
var ActiveTimer = null;
var ActiveQuery = {
	id : -1,
	info : {},
	index : -1,
};
var waitResponseTime = 15;
function switchSearchEngine(tab, nextSEIndex){
	ActiveTabContent = "";
	ActiveTabKey = true;
	var info = SEManager.getSearchEngineInfo(tab.url);
	if(!info || info.type == "unknown") return false;
	var se = SEManager.getSearchEngine(info.index);
	var inputInfo = se.getInputInfo(info.type);
	ActiveQuery.info = se.getQueryInfo(tab.url, info.type);
	ActiveQuery.id = tab.id;
	if(nextSEIndex != undefined && nextSEIndex >= 0 
		&& nextSEIndex < SEManager.count()){
		ActiveQuery.index = nextSEIndex;
	} else {
		ActiveQuery.index = SEManager.searchNextSearchIndexInOrder(info.index, info.type);
	}
	var contentScript = getQueryContent.toString() + "; getQueryContent(\"" + 
		inputInfo.id + "\", \"" + inputInfo.name + "\")";
	try{
		chrome.tabs.executeScript(null, {code:contentScript}, function(a){
			ActiveTimer = setTimeout(function(){
				switchURL();
			}, waitResponseTime);
		});
	} catch(e){
		switchURL(tab.id, index, ActiveQueryInfo);
	}
}

function switchURL(){
	clearTimeout(ActiveTimer);
	if(ActiveTabKey){
		ActiveTabKey = false;
		var se = SEManager.getSearchEngine(ActiveQuery.index);
		if(se){
			var gotoURL = se.getQueryURL(ActiveQuery.info);
			if(gotoURL){
				gotoURL = markSearchPlus(gotoURL);
				chrome.tabs.update(ActiveQuery.id,{url:gotoURL});
			}
		}
	}
	ActiveQuery = {
		id : -1,
		info : {},
		index : -1
	}
}

chrome.extension.onRequest.addListener(
	function(request, sender, sendResponse) {
		if(ActiveTabKey && request.content){
			ActiveQuery.info.content = request.content;
			switchURL();
		}
 });

chrome.tabs.onUpdated.addListener(checkValidSearchEngineUrl);
chrome.pageAction.onClicked.addListener(switchSearchEngine);

SEManager.addSearchEngine(Google);
SEManager.addSearchEngine(Baidu);
SEManager.addSearchEngine(Bing);
SEManager.addSearchEngine(Sogou);
SEManager.addSearchEngine(Soso);
SEManager.addSearchEngine(Yahoo);
SEManager.initOptions();