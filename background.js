chrome.webNavigation.onErrorOccurred.addListener(function(details) {
	//console.log("TabId:" + details.tabId + "\nFrameID:" + details.frameId + "\nURL:" + details.url);
	if(details.frameId == 0){
	//	chrome.tabs.update(details.tabId,{url:"http://www.baidu.com"})
	}
});



function checkValidSearchEngineUrl(tabId, changeInfo, tab) {
	var info = null;
	var msg = "Switch to";
	if ((info = SEManager.getSearchEngineInfo(tab.url))) {
		var name = SEManager.getNextSearchEngineName(info);
		if(name){
			msg = msg + " " + name;
			chrome.pageAction.show(tabId);
			chrome.pageAction.setTitle({tabId : tabId, title : msg});
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
function switchSearchEngine(tab){
	ActiveTabContent = "";
	ActiveTabKey = true;
	var info = SEManager.getSearchEngineInfo(tab.url);
	if(!info) return false;
	var se = SEManager.getSearchEngine(info.index);
	var inputInfo = se.getInputInfo(info.type);
	ActiveQuery.info = se.getQueryInfo(tab.url, info.type);
	ActiveQuery.id = tab.id;
	ActiveQuery.index = SEManager.searchNextSearchIndexInOrder(info.index, info.type);
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
