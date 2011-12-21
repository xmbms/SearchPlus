chrome.webNavigation.onErrorOccurred.addListener(function(details) {
	//console.log("TabId:" + details.tabId + "\nFrameID:" + details.frameId + "\nURL:" + details.url);
	if(details.frameId == 0){
		chrome.tabs.update(details.tabId,{url:"http://www.baidu.com"})
	}
});

function checkValidSearchEngineUrl(tabId, changeInfo, tab) {
  if (tab.url.indexOf('baidu') > -1 || tab.url.indexOf('google') > -1) {
    // ... show the page action.
    chrome.pageAction.show(tabId);
  }
};

chrome.tabs.onUpdated.addListener(checkValidSearchEngineUrl);
