module("JsURI Test")
test("Google URI Test", function() {
  var uri = new Uri("http://www.google.com.hk/search?sourceid=chrome&ie=UTF-8&q=jsuri");
  equal(uri.host(), "www.google.com.hk", "Google Host" );
  equal(uri.path(), "/search", "Google Path");
  equal(uri.getQueryParamValue("q"), "jsuri", "Param values");
  
  var uri2 = new Uri("https://www.Google.com/?sclient=psy-ab&hl=en&site=&source=hp&q=dfa+&pbx=1&oq=dfa+&aq=f&aqi=g4&aql=&gs_sm=e&gs_upl=3030l3390l0l3693l4l3l0l0l0l0l282l787l2-3l3l0&bav=on.2,or.r_gc.r_pw.r_cp.,cf.osb&fp=a1bc1589ec616832&biw=1280&bih=499");
  equal(uri2.host(), "www.Google.com", "Case Sensetive")
  equal(uri2.path(), "/", "Empty path");
  equal(uri2.getQueryParamValue("q"), "dfa+", "Search Content");
  var uri3 = new Uri("https://www.google.com/webhp?hl=en&sclient=psy-ab&hl=en&site=webhp&source=hp&q=%E5%8D%81%E5%A4%A7&pbx=1&oq=%E5%8D%81%E5%A4%A7&aq=f&aqi=&aql=&gs_sm=e&gs_upl=1085l1749l0l2176l4l4l0l0l0l1l305l1045l2-3.1l4l0&bav=on.2,or.r_gc.r_pw.r_cp.,cf.osb&fp=98207c7f6eeedfa8&biw=630&bih=888");
  equal(uri3.path(), "/webhp", "Webhp Search Path");
  equal(uri3.getQueryParamValue("q"), "%E5%8D%81%E5%A4%A7", "Webhp Search Content");
  
  var uri4 = new Uri("https://www.google.com/search?q=123&sclient=psy-ab&hl=en&source=hp&q=abc&pbx=1&oq=abc&aq=f&aqi=g4&aql=&gs_sm=e&gs_upl=2895l7630l0l7774l10l9l0l0l0l1l306l1813l2-5.2l8l0&bav=on.2,or.r_gc.r_pw.r_cp.,cf.osb&fp=a1bc1589ec616832&biw=1280&bih=909");
  equal(uri4.getQueryParamValues("q")[1], "abc", "Multi Search Content");
  equal(uri4.getQueryParamValues("sclient")[0], "psy-ab", "Single Search Content");
  equal(uri4.getQueryParamValues("sclient_searchplus").length, 0, "Empty Search Content");
});

module("GBK Encode and Decode")
test("GBK Encode and Decode", function(){
	equal($URL.encode("中文"),"%D6%D0%CE%C4", "GBK Encode");
	equal($URL.decode("%D6%D0%CE%C4"),"中文", "GBK Encode");
	equal($URL.encode("加+加"), "%BC%D3%2B%BC%D3", "Ascii Encode");
	equal($URL.decode("%BC%D3%2B%BC%D3"), "加+加", "Ascii Decode");
})