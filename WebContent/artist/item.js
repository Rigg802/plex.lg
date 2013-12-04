/**
 * Javascript for artist/item.html
 */

var library = new Library();
$(document).unload(library.showLoader("Loading ..."));
				
$(document).ready(function() {
	var device = document.getElementById("device");
	$(".menuBar li a").tooltipster();
	displayShows();
	$(document).arrowNavigation();
});

function displayShows()
{
	library.showLoader("Loading ...");
	
	library.getSectionOptions($.querystring().parentKey, function(xml) {
		$("#applicationBackground").css("background-image", "url(" + library.getServerUrl() + $(xml).find("MediaContainer:first").attr("art") + ")");

		$(xml).find("Directory").each(function(index, item) {
			var y = Math.floor(index/3);							
			var x = index - (y*3);
		
			if (!$(this).attr("search")) {
				html = "<li><a data-index=\"" + (x+2) + "_" + (y+1) + "\" class=\"option\" href=\"index.html?key=" + $.querystring().parentKey + "&category=" + $(this).attr("key") + "\">";
				html += "<div class=\"title\">" + $(this).attr("title") + "</div>";
				html += "</a></li>";
				$("#sectionFilter ul").append(html);
			}
		});
		
		library.getMediaItem($.querystring().key, function(xml) {		
			var $item = $(xml).find("Directory:first,Video:first");
			
			if ($(xml).find("Video:first").attr("grandparentTitle")) {
				title = $(xml).find("Video:first").attr("grandparentTitle") + ": " + $item.attr("title");
			} else if ($item.attr("parentTitle")) {
				title = $item.attr("parentTitle") + ": " + $item.attr("title");
			} else {
				title = $item.attr("title");
			}
			
			$("#title").text(title);
			
			
			$("#applicationBackground").css("background-image", "url(" + library.getServerUrl() + $item.attr("art") + ")");
			
			html = "<table class=\"_details\">";
			html += "<tr>";
			html += "<td class=\"_poster\">";
			html += "<img src=\"" + library.getServerUrl() + "/photo/:/transcode?url=" + encodeURIComponent(library.getServerUrl() + $item.attr("thumb")) + "&width=256&height=420\"/>";
			
			if ($($item).find("Part:first").length > 0) {
				html += "<a class=\"play show\" href=\"" + library.getServerUrl() + $($item).find("Part:first").attr("key") + "\"><i class=\"glyphicon play\">Play</i></a>";
			}
			html += "</td>";
			html += "<td class=\"_info\">";	
			
			if ($(xml).find("Video:first").attr("grandparentTitle")) { 									
				html += "<div class=\"_title\">" + $(xml).find("Video:first").attr("grandparentTitle") + "</div>";
				html += "<div class=\"_subtitle\">" + $item.attr("title") + "</div>";
			} else	if ($item.attr("parentTitle")) { 									
				html += "<div class=\"_title\">" + $item.attr("parentTitle") + "</div>";
				html += "<div class=\"_subtitle\">" + $item.attr("title") + "</div>";
			} else {
				html += "<div class=\"_title\">" + $item.attr("title") + "</div>";
			}
			
			if ($($item).find("Genre:first").attr("tag")) {
				html += "<div class=\"_genre\">" + $($item).find("Genre:first").attr("tag") + "</div>";
			}
			
			if ($item.attr("summary")) { 
				html += "<div class=\"_summary\">" + $item.attr("summary") + "</div>";
			}
			
			
			html += "<div id=\"series\"></div>";
			html += "</td>";
			html += "</tr>";
			html += "</table>";
			
			$("#media").append(html);

			library.getChildrenMediaItems($.querystring().key, function(xml) {
				sectionId = $(xml).find("MediaContainer:first").attr("librarySectionID");
				
				$(xml).find("Directory,Track").each(function(index, item) {
					html = "";
					if ($(this).attr("type") == "album") {
						var y = Math.floor((index-1)/5);							
						var x = (index-1) - (y*5);

						html = "<a data-index=\"" + x + "_" + (y+1) + "\" class=\"itemLink musicLink\" href=\"item.html?key=" + $(this).attr("ratingKey") + "&parentKey=" + sectionId + "\">";
						html += "<div class=\"item\">";
						html += "<div class=\"poster\"><img data-original=\"" + library.getServerUrl() + "/photo/:/transcode?url=" + encodeURIComponent(library.getServerUrl() + $(this).attr("thumb")) + "&width=200&height=200\"></div>";
						html += "<div class=\"title\">" + $(this).attr("year") + ". " + $(this).attr("title") + "</div>";
						html += "</div>";
						html += "</a>";					
					}
					
					if ($(this).attr("type") == "track") {
						html = "<a data-index=\"0_" + (index+1) + "\" class=\"trackLink\" href=\"" + library.getServerUrl() + $(this).find("Part:first").attr("key") + "\">";
						html += "<div class=\"title\">" + (index+1) + ". " + $(this).attr("title") + "</div>";
						html += "</a>";								
					}
					
					$("#series").append(html);
				});
			
				$(".poster img").lazyload({
						placeholder: '../system/images/poster.png', 
						container: $("#media")
				});
				
				library.hideLoader();	
				$(".itemLink:first,.trackLink:first").focus();
			});
		
			library.hideLoader();	
		});	
	});		
}