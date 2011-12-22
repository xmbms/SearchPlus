chrome.webNavigation.onErrorOccurred.addListener(function(details) {
	//console.log("TabId:" + details.tabId + "\nFrameID:" + details.frameId + "\nURL:" + details.url);
	if(details.frameId == 0){
		chrome.tabs.update(details.tabId,{url:"http://www.baidu.com"})
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

function switchSearchEngine(tab){
	var info = SEManager.getSearchEngineInfo(tab.url);
	if(!info) return false;
	var se = SEManager.getSearchEngine(info.index);
	var queryInfo = se.getQueryInfo(tab.url, info.type);
	var index = SEManager.searchNextSearchIndexInOrder(info.index, info.type);
	var nextSE = SEManager.getSearchEngine(index);
	var gotoURL = nextSE.getQueryURL(queryInfo, info.type);
	chrome.tabs.update(tab.id,{url:gotoURL});
}


chrome.tabs.onUpdated.addListener(checkValidSearchEngineUrl);
chrome.pageAction.onClicked.addListener(switchSearchEngine);

SEManager.addSearchEngine(Google);
SEManager.addSearchEngine(Baidu);
