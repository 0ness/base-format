(function(window,document) {
	"use strict";
	

	/*Constructor
	--------------------------------------------------------------------*/
	/**
	 * @class INDEX
	 * @constructor
	*/
	var Index = function(){
		this.init();
	},
		Member = Index.prototype;




	/*Private Static Property
	--------------------------------------------------------------------*/
	var INF0			= new UserInfo(),
		contentsElm 	= document.getElementById("contents");




	/*Public Static Method
	--------------------------------------------------------------------*/
	Member.init = function() {
		var _id = INF0.id;

		this.commonFunction();
		if(_id === "top") this.topPageFunction();
	};

	/**
	* ページ共通処理
	*/
	Member.commonFunction = function(){
		console.log("common3");
	};

	/**
	* トップページ処理
	*/
	Member.topPageFunction = function(){
		console.log("top");
	};





	window.Index = Index;

	
})(window,document);


window.addEventListener('DOMContentLoaded', function(){ var INDEX = new Index(); });