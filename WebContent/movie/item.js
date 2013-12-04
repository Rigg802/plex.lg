/**
 * Javascript for movie/item.html
 */

var library = new Library();
$(document).unload(library.showLoader("Loading ..."));
				
$(document).ready(function() {
	var device = document.getElementById("device");
	$(".menuBar li a").tooltipster();
	displayMovies();
	$(document).arrowNavigation();
});

function displayMovies()
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
			var $item = $(xml).find("Video:first");
			$("#title").text($item.attr("title"));
			$("#applicationBackground").css("background-image", "url(" + library.getServerUrl() + $item.attr("art") + ")");
			
			html = "<table class=\"_details\">";
			html += "<tr>";
			html += "<td class=\"_poster\">";
			html += "<img src=\"" + library.getServerUrl() + "/photo/:/transcode?url=" + encodeURIComponent(library.getServerUrl() + $item.attr("thumb")) + "&width=256&height=420\"/>";
			html += "<a data-index=\"0_1\" class=\"playItem movie\" href=\"" + library.getServerUrl() + $($item).find("Part:first").attr("key") + "\"><i class=\"glyphicon play\"></i>Play</a>";
			html += "</td>";
			html += "<td class=\"_info\">";	
			
			if ($item.attr("title")) {									
				html += "<div class=\"_title\">" + $item.attr("title") + "</div>";
			}
			
			if ($item.attr("tagline")) {
				html += "<div class=\"_tag\">" + $item.attr("tagline") + "</div>";
			}
			
			if ($($item).find("Genre:first").attr("tag")) {
				html += "<div class=\"_genre\">" + $($item).find("Genre:first").attr("tag") + "&nbsp;&nbsp;&nbsp;(" + $item.attr("year") + ")</div>";
			}
			
			if ($item.attr("summary")) {
				html += "<div class=\"_summary\">" + $item.attr("summary") + "</div>";
			}
			
			if ($item.attr("summary")) {
				html += "<div class=\"_rating\"><img src=\"" + library.getServerUrl() + "/photo/:/transcode?url=" + encodeURIComponent(library.getServerUrl() + "/system/bundle/media/flags/contentRating/" + $item.attr("contentRating") + "?t=1234") + "&width=70&height=25" + "\"/></div>";
			}
			
			if ($($item).find("Director:first").attr("tag") > 0) {
				html += "<div class=\"_director\"><span class=\"_label\">Director</span>" + $($item).find("Director:first").attr("tag") + "</div>";
			}
			
			if ($($item).find("Role").length > 0) {					
				var attrs = $.map($($item).find("Role"), function(element) {
					return $(element).attr('tag');
				});								
				html += "<div class=\"_cast\"><span class=\"_label\">Cast</span>" + attrs.join(", ") + "</div>";
			}
			
			if ($item.attr("studio")) {
				html += "<div class=\"_studio\"><img src=\"" + library.getServerUrl() + "/photo/:/transcode?url=" + encodeURIComponent(library.getServerUrl() + "/system/bundle/media/flags/studio/" + $item.attr("studio") + "?t=1234") + "&width=200&height=40" + "\"/></div>";
			}			
			html += "</td>";
			html += "</tr>";
			html += "</table>";
			
			$("#media").append(html);
		
			library.hideLoader();	
			$("a.playItem:first").focus();
		});	
	});		
}