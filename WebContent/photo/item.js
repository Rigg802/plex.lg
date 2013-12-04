/**
 * Javascript for photo/item.html
 */

var library = new Library();
$(document).unload(library.showLoader("Loading ..."));
				
$(document).ready(function() {
	var device = document.getElementById("device");
	$(document).arrowNavigation();	
	
	library.showLoader("Loading ...");
	library.getMediaItem($.querystring().key, function(xml) {
		$("#application").append("<img src=\"" + library.getServerUrl() + "/photo/:/transcode?url=" + encodeURIComponent("http://localhost:" + library.getServerPort() + $(xml).find("Part:first").attr("key")) + "&width=1260&height=700\"/>");
		library.hideLoader();
	});
});