/**
 * Javascript for movie/index.html
 */

var library = new Library();
$(document).unload(library.showLoader("Loading ..."));
				
$(document).ready(function() {
	var device = document.getElementById("device");
	$(".menuBar li a").tooltipster();
	displayMovies();
	$(document).arrowNavigation();
	if ($.querystring().category) {
		library.setFilter($.querystring().key, $.querystring().category); // save the category if there is one
	}
});

function displayMovies()
{
	library.showLoader("Loading ...");
	
	library.getSectionOptions($.querystring().key, function(xml) {
		$("#applicationBackground").css("background-image", "url(" + library.getServerUrl() + $(xml).find("MediaContainer:first").attr("art") + ")");

		$(xml).find("Directory").each(function(index, item) {
			var y = Math.floor(index/3);							
			var x = index - (y*3);

			if (!$(this).attr("search")) {
				html = "<li><a data-index=\"" + (x+2) + "_" + (y+1) + "\" class=\"option\" href=\"index.html?key=" + $.querystring().key + "&category=" + $(this).attr("key") + "\">";
				html += "<div class=\"title\">" + $(this).attr("title") + "</div>";
				html += "</a></li>";
				$("#sectionFilter ul").append(html);
			}
		});
	
		if ($.querystring().key2) {
			library.getSectionCategoryMediaItems($.querystring().key, $.querystring().category, $.querystring().key2, function(xml) {	
				$("#title").text($(xml).find("MediaContainer:first").attr("title1") + ": " + $(xml).find("MediaContainer:first").attr("title2"));
				$(xml).find("Video,Directory").each(function(index, item) {	
					var className = "itemLink";
					var y = Math.floor(index/7);							
					var x = index - (y*7);
				
					if ($(this).context.nodeName.toLowerCase() == "video") {					
						html = "<a data-index=\"" + x + "_" + (y+1) + "\" class=\"" + className + "\" data-art=\"" + library.getServerUrl() + $(this).attr("art") + "\" href=\"item.html?key=" + $(this).attr("ratingKey") + "&parentKey=" + $.querystring().key + "\">";
						html += "<div class=\"item\">";
						html += "<div class=\"poster\"><img data-original=\"" + library.getServerUrl() + "/photo/:/transcode?url=" + encodeURIComponent("http://localhost:" + library.getServerPort() + $(this).attr("thumb")) + "&width=128&height=200\"></div>";
						html += "<div class=\"title\">" + $(this).attr("title") + "</div>";
						html += "</div>";
						html += "</a>";
					} else {
						html = "<a data-index=\"" + x + "_" + (y+1) + "\" class=\"itemLink\" href=\"index.html?key="  +$.querystring().key + "&category=folder&key2=" + $(this).attr("key").substr($(this).attr("key").indexOf("=")+1) + "\">";
						html += "<div class=\"item\">";
						html += "<div class=\"poster\"><img data-original=\"../system/images/folder.png\"></div>";
						html += "<div class=\"title\">" + $(this).attr("title") + "</div>";
						html += "</div>";
						html += "</a>";
					}
					
					$("#media").append(html);
				});
			

				$(".poster img").lazyload({
				     container: $("#media")
				});
				
				library.hideLoader();	
				$(".itemLink:first").focus();
			});				
	
		} else if ($.querystring().category && ($.querystring().category != "all")) {			
			library.getSectionCategoryItems($.querystring().key, $.querystring().category, function(xml) {	
				$("#title").text($(xml).find("MediaContainer:first").attr("title1") + ": " + $(xml).find("MediaContainer:first").attr("title2"));						
				$(xml).find("Directory,Video").each(function(index, item) {
					var key2 = ($.querystring().category == "folder") ? $(this).attr("key").substr($(this).attr("key").indexOf("=")+1) : $(this).attr("key");


					if ($(this).context.nodeName.toLowerCase() == "video") {
						var y = Math.floor(index/7);							
						var x = index - (y*7);
						html = "<a data-index=\"" + x + "_" + (y+1) + "\" class=\"itemLink\" data-art=\"" + library.getServerUrl() + $(this).attr("art") + "\" href=\"item.html?key=" + $(this).attr("ratingKey") + "&parentKey=" + $.querystring().key + "\">";
						html += "<div class=\"item\">";
						html += "<div class=\"poster\"><img data-original=\"" + library.getServerUrl() + "/photo/:/transcode?url=" + encodeURIComponent("http://localhost:" + library.getServerPort() + $(this).attr("thumb")) + "&width=128&height=200\"></div>";
						html += "<div class=\"title\">" + $(this).attr("title") + "</div>";
						html += "</div>";
						html += "</a>";							
					} else {
						var y = Math.floor(index/3);							
						var x = index - (y*3);
						html = "<a data-index=\"" + x + "_" + (y+1) + "\" class=\"category\" href=\"index.html?key=" + $.querystring().key + "&category=" + $.querystring().category + "&key2=" + key2 + "\">";
						if ($(this).attr("title").length > 0) {
							html += "<div class=\"title\">" + $(this).attr("title") + "</div>";
						} else {
							html += "<div class=\"title\">Unknown</div>";
						}
					}
					$("#media").append(html);
				});
			
				$(".poster img").lazyload({
						placeholder: '../system/images/poster.png', 
						container: $("#media")
				});						
				library.hideLoader();	
				$(".category:first").focus();
			});	
			
		} else {
			library.getAllSectionMediaItems($.querystring().key, function(xml) {	
				$("#title").text($(xml).find("MediaContainer:first").attr("title2"));
				$(xml).find("Video").each(function(index, item) {
					var className = "itemLink";

					var y = Math.floor(index/7);							
					var x = index - (y*7);
					
					html = "<a data-index=\"" + x + "_" + (y+1) + "\" class=\"" + className + "\" href=\"item.html?key=" + $(this).attr("ratingKey") + "&parentKey=" + $.querystring().key + "\">";
					html += "<div class=\"item\">";
					html += "<div class=\"poster\"><img data-original=\"" + library.getServerUrl() + "/photo/:/transcode?url=" + encodeURIComponent("http://localhost:" + library.getServerPort() + $(this).attr("thumb")) + "&width=128&height=200\"></div>";
					html += "<div class=\"title\">" + $(this).attr("title") + "</div>";
					html += "</div>";
					html += "</a>";
					$("#media").append(html);
				});
			
				$(".poster img").lazyload({
						placeholder: '../system/images/poster.png', 
						container: $("#media")
				});
				
				library.hideLoader();	
				$(".itemLink:first").focus();	
			});	
		}				
	});		
}