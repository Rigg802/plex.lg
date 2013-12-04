/**
 * Javascript for artist/index.html
 */

var library = new Library();
$(document).unload(library.showLoader("Loading ..."));
				
$(document).ready(function() {
	var device = document.getElementById("device");
	$(".menuBar li a").tooltipster();
	displayArtists();
	$(document).arrowNavigation();			
});

function displayArtists()
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
				$(xml).find("Directory, Track").each(function(index, item) {	
					var key2 = ($.querystring().category == "folder") ? $(this).attr("key").substr($(this).attr("key").indexOf("=")+1) : $(this).attr("key");
					
					if ($(this).attr("type") == "album") {
						var y = Math.floor(index/7);							
						var x = index - (y*7);

						html = "<a data-index=\"" +  x + "_" + (y+1) + "\" class=\"itemLink musicLink\" href=\"item.html?key=" + $(this).attr("ratingKey") + "&parentKey=" + $.querystring().key + "\">";
						html += "<div class=\"item\">";
						html += "<div class=\"poster\"><img data-original=\"" + library.getServerUrl() + "/photo/:/transcode?url=" + encodeURIComponent(library.getServerUrl() + $(this).attr("thumb")) + "&width=128&height=200\"></div>";
						html += "<div class=\"title\">" + $(this).attr("title") + "</div>";
						html += "</div>";
						html += "</a>";
					} else if ($(this).attr("type") == "track") {
						html = "<a data-index=\"0_" + (index+1) + "\" class=\"trackLink\" href=\"" + library.getServerUrl() + $(this).find("Part:first").attr("key") + "\">";
						if ($(this).attr("title").length > 0) {
							html += "<div class=\"title\">" + $(this).attr("title") + "</div>";
						} else {
							html += "<div class=\"title\">Unknown</div>";
						}
						html += "</a>";								
					} else {
						var y = Math.floor(index/3);							
						var x = index - (y*3);

						html = "<a data-index=\"" + x + "_" + (y+1) + "\" class=\"category\" href=\"index.html?key=" + $.querystring().key + "&category=" + $.querystring().category + "&key2=" + key2 + "\">";
						if ($(this).attr("title").length > 0) {
							html += "<div class=\"title\">11 " + $(this).attr("title") + "</div>";
						} else {
							html += "<div class=\"title\">Unknown</div>";
						}
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
				$(xml).find("Directory").each(function(index, item) {
					var key2 = ($.querystring().category == "folder") ? $(this).attr("key").substr($(this).attr("key").indexOf("=")+1) : $(this).attr("key");
					
					if ($(this).attr("type") == "album") {
						var y = Math.floor(index/7);							
						var x = index - (y*7);

						html = "<a data-index=\"" + x + "_" + (y+1) + "\" class=\"itemLink musicLink\" href=\"item.html?key=" + $(this).attr("ratingKey") + "&parentKey=" + $.querystring().key + "\">";
						html += "<div class=\"item\">";
						html += "<div class=\"poster\"><img data-original=\"" + library.getServerUrl() + "/photo/:/transcode?url=" + encodeURIComponent(library.getServerUrl() + $(this).attr("thumb")) + "&width=128&height=200\"></div>";
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
						html += "</a>";								
					}
					
					$("#media").append(html);
				});
			
				$(".poster img").lazyload({
						placeholder: '../system/images/album.png', 
						container: $("#media")
				});
				
				library.hideLoader();	
				$(".itemLink:first,.category:first").focus();
			});	
			
		} else {
			library.getAllSectionMediaItems($.querystring().key, function(xml) {	
				$("#title").text($(xml).find("MediaContainer:first").attr("title2"));
				$(xml).find("Directory").each(function(index, item) {
					var y = Math.floor(index/7);							
					var x = index - (y*7);

					html = "<a data-index=\"" + x + "_" + (y+1) + "\" class=\"itemLink musicLink\" href=\"item.html?key=" + $(this).attr("ratingKey") + "&parentKey=" + $.querystring().key + "\">";
					html += "<div class=\"item\">";
					html += "<div class=\"poster\"><img data-original=\"" + library.getServerUrl() + "/photo/:/transcode?url=" + encodeURIComponent(library.getServerUrl() + $(this).attr("thumb")) + "&width=128&height=200\"></div>";
					html += "<div class=\"title\">" + $(this).attr("title") + "</div>";
					html += "</div>";
					html += "</a>";
					$("#media").append(html);
				});
			
				$(".poster img").lazyload({
						placeholder: '../system/images/album.png', 
						container: $("#media")
				});
				
				library.hideLoader();	
				$(".itemLink:first").focus();
			});	
		}				
	});		
}