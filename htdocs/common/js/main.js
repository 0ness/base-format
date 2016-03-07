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
	var INF0	= new UserInfo(),
		LIB		= new Library(),
		STATE	= {
			isIE8		:false,
			isIE9		:false,
			isIE89		:false
		};
	
	
	
	
	/*Public Static Property
	--------------------------------------------------------------------*/
	Member.importState	= {
		isIE8	:false,
		isIE9	:false,
		isIE89	:false
	};
	Member.page 		= document.getElementById("contents");
	Member.pageSty 		= Member.page.style;
	
	
	
	
	/*Init
	--------------------------------------------------------------------*/
	Member.init = function() {
		var _self = this;
		_self.stateCheck();
	};
	
	
	
	
	/*Public Static Method
	--------------------------------------------------------------------*/
	Member.stateCheck = function(){
		var _state	= STATE,
			_ua		= INF0.UA,
			_iever	= INF0.IEver;

		//IEチェック
		if(_ua !== "ie") return false;		
		if(_iever === "ie8") _state.isIE8 = true,_state.isIE89 = true;
		else if(_iever === "ie9") _state.isIE9 = true,_state.isIE89 = true;

		//各クラス代入用ステータスオブジェクト
		this.importState = {
			isIE8	:_state.isIE8,
			isIE9	:_state.isIE9,
			isIE89	:_state.isIE89
		};		
	};
	
	
	



	window.Index = Index;
})(window, document);


var INDEX = new Index();
if (window.addEventListener) window.addEventListener('load', function(){INDEX.init();});
else window.attachEvent('onload', function() {INDEX.init();});