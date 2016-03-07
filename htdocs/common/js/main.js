;(function(window, document) {
	"use strict";

	
	
	
	/*Constructor
	--------------------------------------------------------------------*/
	/**
	 * @class INDEX
     * @constructor
     */
	var Index = function(){},
		Member = Index.prototype;
	
	
	
	
	/*Private Static Property
	--------------------------------------------------------------------*/
	//instance
	var INF0	= new UserInfo();
	
	
	
	
	/*Public Static Property
	--------------------------------------------------------------------*/
	Member.page 		= document.getElementById("contents");
	Member.pageSty 		= Member.page.style;
	
	
	
	
	/*Init
	--------------------------------------------------------------------*/
	Member.init = function() {
		var _id = INF0.id;
		
		$(document.getElementById("page-top-btn")).on("click",function(){
			$("body,html").animate({scrollTop:0},1000,"easeInOutExpo");
		});
		
		if(_id === "top") this.topPageContents();
	};
	
	
	
	
	/*Public Static Method
	--------------------------------------------------------------------*/
	Member.topPageContents = function(){
		var _$gridBlc = $(this.page).find(".js-grid");
		for(var i=0; i<_$gridBlc.length; i++) this.adjustGridHeight(_$gridBlc.eq(i));
	};
	
	/**
	 * グリッドの高さを調整
	 */
	Member.adjustGridHeight = function(_$elm){
		var _$grids 	= _$elm.children(),
			_maxHeight 	= 0;
			
		for(var i=0; i<_$grids.length; i++){
			var _height = _$grids.eq(i).height();
			if(_maxHeight < _height) _maxHeight = _height;
		};
		_$grids.height(_maxHeight);
	};
	
	



	window.Index = Index;
})(window, document);


var INDEX = new Index();
window.addEventListener('load', function(){INDEX.init();});
