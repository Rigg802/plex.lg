/**
 * Javascript for index.html
 */

var library = new Library();
$(document).unload(library.showLoader("Loading ..."));
				
$(document).ready(function() {
	var device = document.getElementById("device");
			
	if (library.getServerUrl() !== null) {
		library.showLoader("Loading ...");
		library.getLibraryServer(function(xml) {
			$("#server").html($($(xml).find("MediaContainer")[0]).attr("friendlyName") + "<a data-index=\"0_-1\" title=\"Settings\" href=\"javascript:library.showDialog('#configuration');\"><i class=\"glyphicon cogwheels\"></i></a>");
			$("#url").val(library.getServerUrl());
			library.hideLoader();
			$("#splash").hide();
			$("#server a").tooltipster();
			displaySections();
		});
	} else {
		library.showDialog("#configuration");
		$("#url").focus();
	}
	
	$("#scan").click(function(event) {
		event.preventDefault();
		library.showLoader("Scanning ...");
		library.scanNetwork(device.net_ipAddress, function(url) {
			$("#url").val(this.url);
			library.hideLoader();
		});
	});
	
	$("#save").click(function(event) {
		library.setServerUrl($("#url").val());
		library.hideDialog("#configuration");
		$("#splash").fadeOut(1500, displaySections);
	});	
});

function displaySections()
{
	library.showLoader("Loading ...");
	$("#sections").html("");
	library.getSections(function(xml) {
		$(xml).find("Directory").each(function(index, item) {
			html = "<a data-index=\"" + index + "_0\" class=\"section\" data-art=\"" + library.getServerUrl() + $(this).attr("art") + "\" href=\"" + $(this).attr("type") + "/index.html?key=" + $(this).attr("key") + "\">";
			html += "<div class=\"item\">";
			html += "<img class=\"poster\" src=\"" + library.getServerUrl()+ $(this).attr("thumb") + "\">";
			html += "<div class=\"title\">" + $(this).attr("title") + "</div>";
			html += "</div>";
			html += "</a>";
			
			$("#sections").append(html);
		});
		
		$(".section").hover(function() {
			$(this).focus();
		});
		
		$(".section").focus(function() {
			$("#applicationBackground").css("background-image", "url(" + $(this).attr("data-art") + ")");
		});	
			
		library.hideLoader();	
		$(document).arrowNavigation();
		$("#sections, #sectionsStrip").show();
		$(".section:first").focus();		
	});
}