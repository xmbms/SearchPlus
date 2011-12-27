var dragsort = ToolMan.dragsort();
var junkdrawer = ToolMan.junkdrawer();
var searchType = "web";
window.onload = function(){
	i18n();
	resetSearchOrder();
}

function i18n(){
	var map = [
		"title", "WebSearch", "ImageSearch", "MapSearch", "AboutSearch",	
		"autoredirecttips",	"homepagetips",	"tryfixtips", "advanced", 
		"primayopt", "primary", "secondary", "savedtips", "features",
		"f1", "f2", "author", "dragsort", "selisti18n", "antiBlock"
	];
	var elem = null;
	for(var i = 0, len = map.length; i < len; i++){
		elem = document.getElementById(map[i]);
		if(elem){
			var msg = chrome.i18n.getMessage(map[i]);
			if(msg){
				elem.innerHTML = msg;
			}
		}
	}
	document.getElementById("applybtn").value = chrome.i18n.getMessage("apply");
	document.getElementById("resetbtn").value = chrome.i18n.getMessage("reset");
}

function verticalOnly(item) {
	item.toolManDragGroup.verticalOnly()
}

function showOptions(type){
	searchType = type;
	deselectTab();
	showTab(type);
	switch(type){
		case "web":
		case "image":
		case "map":
			showSEOptions(type);
			break;
		case "general":
			showGeneral();
			break;
		case "about":
			showAbout();
			break;
	}
}

function showGeneral(){
	var content = document.getElementById("generalcontent");
	content.style.display = "";
	var bg = chrome.extension.getBackgroundPage();
	document.getElementById("autoredirect").checked = bg.SEManager.general.redirect;
	document.getElementById("tryfix").checked = bg.SEManager.general.tryfix;
	document.getElementById("homepage").checked = bg.SEManager.general.homepage;
}

function showAbout(){
	var content = document.getElementById("aboutcontent");
	content.style.display = "";
}

function showSEOptions(type){
	var content = document.getElementById("searchcontent");
	content.style.display = "";
	var bg = chrome.extension.getBackgroundPage();
	var order = bg.SEManager.getSEOrder(searchType);
	var primary = document.getElementById("imageOnlyTwo");
	primary.checked  = bg.SEManager.getPrimaryOptions(searchType);
	var lists = document.getElementById("searchlists");
	lists.innerHTML = "";
	var template = [
		"<img class=\"arrow\" src=\"arrow.png\"><img class=\"seicon\" src=\"",
		"", //image src
		"\">",
		"" //se name
	]
	for(var i = 0, len = order.length; i < len; i++){
		template[1] = order[i].icon;
		template[3] = order[i].name;
		var li = document.createElement("li");
		li.id = order[i].name;
		li.innerHTML = template.join("");
		lists.appendChild(li);
	}
	dragsort.makeListSortable(document.getElementById("searchlists"),
			verticalOnly, saveOrder)
}

function saveOrder(item) {
	var group = item.toolManDragGroup
	group.register('dragend', function() {
		hideSaveTips();
	})
}

function hideSaveTips(){
	var elem = document.getElementById("savedtips");
	elem.style.display = "none";
}

function showTab(type){
	var id = type + "search";
	var elem = document.getElementById(id);
	if(elem){
		elem.className = "selected";
	}
}

function deselectTab(){
	var ids = ["generalsearch", "websearch", "imagesearch", "mapsearch", "aboutsearch"];
	for(var i = 0, len = ids.length; i < len; i++){
		var elem = document.getElementById(ids[i]);
		elem.className = "";
	}
	var contents = ["generalcontent", "searchcontent", "aboutcontent", "savedtips"];
	for(var i = 0, len = contents.length; i < len; i++){
		var elem = document.getElementById(contents[i]);
		elem.style.display = "none";
	}
}

function resetSearchOrder(){
	showOptions(searchType);
}

function saveSearchOrder(){
	var lists = document.getElementById("searchlists");
	var orders = lists.getElementsByTagName("li");
	var savedStr = "";
	for(var i = 0, len= orders.length; i < len; i++){
		savedStr = savedStr + orders[i].id + ";";
	}
	var primary = document.getElementById("imageOnlyTwo").checked;
	var bg = chrome.extension.getBackgroundPage();
	bg.SEManager.saveSEOrder(primary, savedStr, searchType);
	var elem = document.getElementById("savedtips");
	elem.style.display = "";
}

function setGeneralOption(){
	var redirect = document.getElementById("autoredirect").checked;
	var tryfix = document.getElementById("tryfix").checked;
	var homepage = document.getElementById("homepage").checked;
	var bg = chrome.extension.getBackgroundPage();
	bg.SEManager.setGeneralOptions(redirect, homepage, tryfix);
}