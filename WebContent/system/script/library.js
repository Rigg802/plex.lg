/*
 * PLEX Library function
 *
 * Copyright (c) 2013 Simon J. Hogan
 * 
 * Modified: 2013/12/2
 *
 * Version:  0.1
 *
 */

function Library()
{

};

/* Configuration & Settings */
Library.prototype.setServerUrl = function(url) {
	localStorage.setItem("serverUrl", url); 
};

Library.prototype.getServerUrl = function() {
	return localStorage.getItem("serverUrl");    
};

Library.prototype.getServerPort = function() {
	return localStorage.getItem("serverUrl").substr(localStorage.getItem("serverUrl").lastIndexOf(":")+1);    
};

Library.prototype.removeServerUrl = function() {
	localStorage.removeItem("serverUrl");    
};

Library.prototype.getLibraryServer = function(callback) {
	$.get(this.getServerUrl(), callback);
};

Library.prototype.showDialog = function(ref) {
	$(ref).fadeIn();
	/*
	if (window.NetCastSystemKeyboardVisible) {
		window.NetCastSystemKeyboardVisible(true);
	}
	*/
};

Library.prototype.hideDialog = function(ref) {
	$(ref).fadeOut();
};

Library.prototype.scanNetwork = function(ip, callback) {
	var url = "";
	
	for (i = 0; i <= 255; i++) {
		url = "http://" + ip.substr(0, ip.lastIndexOf(".")+1) + i.toString() + ":32400";
		$.get(url, callback);	
	}
};

/* Loader functions */
Library.prototype.showLoader = function(message) {
	$("#message").text(message);
	$("#loader").show();
	if (window.NetCastSetPageLoadingIcon) {
		window.NetCastSetPageLoadingIcon('enabled');	
	}
};

Library.prototype.hideLoader = function() {
	$("#loader").hide();
	if (window.NetCastSetPageLoadingIcon) {
		window.NetCastSetPageLoadingIcon('disabled');	
	}
};

/* Filter functions */
Library.prototype.toggleFilter = function() {
	$("#sectionFilter").toggle();
};

Library.prototype.showFilter = function() {
	$("#sectionFilter").show();
};

Library.prototype.hideFilter = function() {
	$("#sectionFilter").hide();
};


/* Media library functions */
Library.prototype.getSections = function(callback) {
	$.get(this.getServerUrl() + "/library/sections", callback);
};

Library.prototype.getSectionOptions = function(id, callback) {
	var url = this.getServerUrl() + "/library/sections/" + id;
	$.get(url, callback);
};

Library.prototype.getAllSectionMediaItems = function(id, callback) {
	var url = this.getServerUrl() + "/library/sections/" + id + "/all";
	$.get(url, callback);
};

Library.prototype.getSectionCategoryItems = function(id, category, callback) {
	var url = this.getServerUrl() + "/library/sections/" + id + "/" + category;
	$.get(url, callback);
};

Library.prototype.getSectionCategoryMediaItems = function(id, category, categoryId, callback) {
	var url = this.getServerUrl() + "/library/sections/" + id + "/" + category + "/" + categoryId;
	if (category == "folder") {
		url = this.getServerUrl() + "/library/sections/" + id + "/" + category + "?parent=" + categoryId;
	} 
	if (category == "unwatched") {
		url = this.getServerUrl() + "/library/metadata/" + categoryId + "/children?unwatched=1";
	} 
	$.get(url, callback);
};

Library.prototype.getMediaItem = function(id, callback) {
	var url = this.getServerUrl() + "/library/metadata/" + id;	
	$.get(url, callback);
};

Library.prototype.getChildrenMediaItems = function(id, callback) {
	var url = this.getServerUrl() + "/library/metadata/" + id + "/children";	
	$.get(url, callback);
};

/* HTML output functions */
Library.prototype.getVideoThumbHtml = function(xml) {

};

Library.prototype.getMusicThumbHtml = function(xml) {

};

Library.prototype.getPhotoThumbHtml = function(xml) {

};

Library.prototype.getFolderThumbHtml = function(xml) {

};

Library.prototype.getCategoryThumbHtml = function(xml) {

};

Library.prototype.getFilterOptionHtml = function(xml) {

};

Library.prototype.getVideoItemHtml = function(xml) {

};

Library.prototype.getMusicItemHtml = function(xml) {

};
