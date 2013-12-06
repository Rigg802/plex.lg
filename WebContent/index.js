/**
 * Javascript for index.html
 */

var library = new Library();
$(document).unload(library.showLoader("Loading ..."));
				
$(document).ready(function() {
	var device = document.getElementById("device");
	showTime();
	$("#configuration form").submit(function() {
		event.preventDefault();		
		library.setServerUrl($("#url").val());
		library.hideDialog("#configuration");
		$("#splash").fadeOut(1500, displaySections);		
	});
	
	if (library.getServerUrl() !== null) {
		library.showLoader("Loading ...");
		library.getLibraryServer(function(xml) {
			$("#serverName").text($($(xml).find("MediaContainer")[0]).attr("friendlyName"));
			$("#url").val(library.getServerUrl());
			library.hideLoader();
			$("#splash").hide();
			$("#server a").tooltipster();
			displaySections();
		});
	} else {
		openConfiguration();
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
		event.preventDefault();
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
			var categoryFilter = "all";
			if (library.getFilter($(this).attr("key"))) {
				categoryFilter = library.getFilter($(this).attr("key")); // get the category if there is one
			}
			html = "<a data-index=\"" + index + "_1\" class=\"section\" data-art=\"" + library.getServerUrl() + $(this).attr("art") + "\" href=\"" + $(this).attr("type") + "/index.html?key=" + $(this).attr("key") + "&category=" + categoryFilter + "\">";
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
		$("a").arrowNavigation();
		$("#sections, #sectionsStrip").show();
		$(".section:first").focus();		
	});
}

function openConfiguration()
{
	library.hideLoader(); 
	library.showDialog('#configuration');	
	$("#url").focus();	
	//$(document).off();	
}

function exitApplication()
{
	if (window.NetCastBack) {
		window.NetCastBack();	
	} else {
		window.close();
	}
}

function showTime()
{
	var now=new Date();
	$("#time").text(now.toLocaleTimeString());
	t = setTimeout(showTime,500);
}

function checkTime(i)
{
	if (i<10) {
		i="0" + i;
	}
	return i;
}