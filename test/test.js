module("JsURI Test")
test("Google URI Test", function() {
  var uri = new Uri("http://www.google.com.hk/search?sourceid=chrome&ie=UTF-8&q=jsuri");
  equal("www.google.com.hk", uri.host(), "Google Host" );
  equal("/search", uri.path(), "Google Path");
  equal("jsuri", uri.getQueryParamValue("q"), "Param values");
  
  var uri2 = new Uri("https://www.Google.com/#sclient=psy-ab&hl=en&site=&source=hp&q=dfa+&pbx=1&oq=dfa+&aq=f&aqi=g4&aql=&gs_sm=e&gs_upl=3030l3390l0l3693l4l3l0l0l0l0l282l787l2-3l3l0&bav=on.2,or.r_gc.r_pw.r_cp.,cf.osb&fp=a1bc1589ec616832&biw=1280&bih=499");
  equal("www.Google.com", uri2.host(), "Case Sensetive")
  equal("/", uri2.path(), "Empty path");
});
