/*
 * Arrow Key Navigation - jQuery plugin for arrow navigation
 *
 * Copyright (c) 2013 Simon J. Hogan
 * 
 * Modified: 2013/12/2
 *
 * Version:  0.1
 *
 */

// Keycodes
var VK_ENTER					=  13;
var VK_PAUSE					=  19;
var VK_PAGE_UP					=  33;
var VK_PAGE_DOWN				=  34;
var VK_LEFT						=  37;
var VK_UP						=  38;
var VK_RIGHT					=  39;
var VK_DOWN						=  40;
var VK_0						=  48;
var VK_1						=  49;
var VK_2						=  50;
var VK_3						=  51;
var VK_4						=  52;
var VK_5						=  53;
var VK_6						=  54;
var VK_7						=  55;
var VK_8						=  56;
var VK_9						=  57;
var VK_RED						= 403;
var VK_GREEN					= 404;
var VK_YELLOW					= 405;
var VK_BLUE						= 406;
var VK_REWIND					= 412;
var VK_STOP						= 413;
var VK_PLAY						= 415;
var VK_FAST_FWD					= 417;
var VK_INFO						= 457;
var VK_BACK						= 461;

(function ( $ ) { 
    $.fn.configArrowNavigation = function() {
    	$(this).keydown(function(e) { 
    		if (!lgKb.isShown()) {
    			if ($('#url').is(':focus')) {
    				if (e.keyCode == VK_ENTER) { 
    					$('#url').focus();
    					e.preventDefault();
    					lgKb.focusIn(e);
    				}
    				if (e.keyCode == VK_DOWN) { $('#save').focus(); e.preventDefault(); }
    			}
    			else if ($('#scan').is(':focus')) {
    				if (e.keyCode == VK_RIGHT) { $('#save').focus(); e.preventDefault(); }
    				if (e.keyCode == VK_UP) { $('#url').focus(); lgKb.focusOut(); e.preventDefault(); }
    			}
    			else if ($('#save').is(':focus')) {
    				if (e.keyCode == VK_LEFT) { $('#scan').focus(); e.preventDefault(); }
    				if (e.keyCode == VK_UP) { $('#url').focus(); lgKb.focusOut(); e.preventDefault(); }
    			}
    			else
    			{
    				$('#url').focus();
    			}
    		}
    	});
    }; 
}(jQuery));

(function ( $ ) { 
    $.fn.arrowNavigation = function() { 
        $(this).keydown(function(e) { 
        	// Back
    		if (e.keyCode == VK_BACK) {
    			history.go(-1);
    		}
    		
    		if ($("a:focus").length > 0) { 
	            var x = $("a:focus").data("index").substr(0, $("a:focus").data("index").indexOf("_")); 
	            var y = $("a:focus").data("index").substr($("a:focus").data("index").indexOf("_")+1); 
	                    
	            // Right
                if (e.keyCode == VK_RIGHT) { 
                    $item = $("a[data-index='" + (parseInt(x)+1) + "_" + y + "']").filter(":visible").filter(":first").focus();                           
                    if($item.length == 0) { 
                    	$("a[data-index^='" + (parseInt(x)+1) + "_']:first").focus(); 
                    } 
                    e.preventDefault();                  
                } 
                
                // Left
                if (e.keyCode == VK_LEFT) {       
                    $item = $("a[data-index='" + (parseInt(x)-1) + "_" + y + "']").filter(":visible").filter(":first").focus();               
                    if($item.length == 0) { 
                    	$("a[data-index^='" + (parseInt(x)-1) + "_']").focus(); 
                    }  
                    e.preventDefault();                                          
                } 
                          
                // Down
                if (e.keyCode == VK_DOWN) {       
                    $item = $("a[data-index='" + x + "_" + (parseInt(y)+1) + "']").filter(":visible").filter(":first").focus();           
                    if($item.length == 0) { 
                    	$("a[data-index$='_" + (parseInt(y)+1) + "']").focus(); 
                    }  
                    e.preventDefault();        
                } 
                
                // Up
                if (e.keyCode == VK_UP) {       
                    $item = $("a[data-index='" + x + "_" + (parseInt(y)-1) + "']").filter(":visible").filter(":first").focus();         
                    if($item.length == 0) { 
                    	$("a[data-index$='_" + (parseInt(y)-1) +  "']").focus(); 
                    }  
                    e.preventDefault();            
                } 
                
                $("#message").text($("a:focus").data("index")); 
	        } 
	        else {
	        	$("a:first").focus();
	        }
        }); 
    }; 
}(jQuery));
