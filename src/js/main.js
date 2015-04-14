;(function(window, document) {
	"use strict";


	
	
	/*Property
	--------------------------------------------------------------------*/
	var w = window,
		d = document;

	var INF0 = new UserInfo(),
		LIB = new Library();
	
	var n_winWidth = LIB.windowWidth(),
		n_winHeight = LIB.windowHeight();

	
	
	
	/*Constructor
	--------------------------------------------------------------------*/
	/**
	 * @class INDEX
     * @constructor
     */
	var INDEX = function(){},
		METHOD = INDEX.prototype;



	
	/*Init Method
	--------------------------------------------------------------------*/
	METHOD.INIT = function INIT() {
		var _self = this;
	};

	
	
	
	/*Page Method
	--------------------------------------------------------------------*/

	
	
	
	
	



	window.INDEX = INDEX;
})(window, document);


var Index = new INDEX();
if (window.addEventListener) window.addEventListener('load', function(){Index.INIT();});
else window.attachEvent('onload', function() {Index.INIT();});