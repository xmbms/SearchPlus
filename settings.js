var settings = {
	general : {
		get redirect(){
			return localStorage["general.redirect"];
		},
		set redirect(value){
			localStorage["general.redirect"] = value;
		},
		get tryfix(){
			return localStorage["general.tryfix"];
		},
		set tryfix(value){
			localStorage["general.tryfix"] = value;
		}
	},
	webSearch : {
		get primary() {
			return localStorage["webSearch.primary"];
		},
		set primary(value) {
			localStorage["webSearch.primary"] = value;
		},
		get order(){
			return localStorage["webSearch.order"];
		},
		set order(value){
			localStorage["webSearch.order"] = value;
		},
		get disabledSearchEngine () {
			return localStorage["webSearch.disabledSearchEngine"] || "";
		},
		set disabledSearchEngine (value){
			localStorage["webSearch.disabledSearchEngine"] = value || "";
		}
	},
	imageSearch : {
		get primary() {
			return localStorage["imageSearch.primary"];
		},
		set primary(value) {
			localStorage["imageSearch.primary"] = value;
		},
		get order(){
			return localStorage["imageSearch.order"];
		},
		set order(value){
			localStorage["imageSearch.order"] = value;
		},
		get disabledSearchEngine () {
			return localStorage["imageSearch.disabledSearchEngine"] || "";
		},
		set disabledSearchEngine (value){
			localStorage["imageSearch.disabledSearchEngine"] = value || "";
		}
	},
	mapSearch : {
		get primary() {
			return localStorage["mapSearch.primary"];
		},
		set primary(value) {
			localStorage["mapSearch.primary"] = value;
		},
		get order(){
			return localStorage["mapSearch.order"];
		},
		set order(value){
			localStorage["mapSearch.order"] = value;
		},
		get disabledSearchEngine () {
			return localStorage["mapSearch.disabledSearchEngine"] || "";
		},
		set disabledSearchEngine (value){
			localStorage["mapSearch.disabledSearchEngine"] = value || "";
		}
	}
}