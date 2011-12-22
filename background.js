chrome.webNavigation.onErrorOccurred.addListener(function(details) {
	//console.log("TabId:" + details.tabId + "\nFrameID:" + details.frameId + "\nURL:" + details.url);
	if(details.frameId == 0){
		chrome.tabs.update(details.tabId,{url:"http://www.baidu.com"})
	}
});



function checkValidSearchEngineUrl(tabId, changeInfo, tab) {
  if (SEManager.isValidURL(tab.url)) {
    chrome.pageAction.show(tabId);
  }
};



chrome.tabs.onUpdated.addListener(checkValidSearchEngineUrl);

SEManager.addSearchEngine(Google);
SEManager.addSearchEngine(Baidu);
