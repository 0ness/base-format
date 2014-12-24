/*==============================================================================

	サイト内部　機能・演出用

	・基本の状態を維持する必要は無く、プロジェクトによってカスタマイズする
	・機能実装→演出実装→最適化処理のフローで構築

==============================================================================*/
$(function(){
	"use strict";


	/*const 定数　このJS内部でグローバルに使う定数
	--------------------------------------------------------------------*/
	//DOMオブジェクト
	var win = window,
		doc = document;

	//オブジェクト
	var pages = new PageInfo(),
		lib = new Library();

	//正否値
	var b_pageMobile = pages.mobile;    //モバイル判定

	//文字列
	var s_pageUA = pages.UA,		//ユーザーエージェント保持
		s_pageVER = pages.VER,		//IEのバージョン保持
		s_pageID = pages.ID,		//ページID
		s_pageClass = pages.class,  //ページclass
		s_clickEvt = (b_pageMobile === true) ? "touchend" : "click",
		$ancherTag = (s_pageUA === "webkit") ? $("body"):$("html");

	


	/*var 変数　このJS内部でグローバルに使う変数
	--------------------------------------------------------------------*/
	//数値
	var n_winWidth = win.innerWidth || doc.body.clientWidth,  //ウィンドウ幅
		n_winHeight = win.innerHeight || doc.body.clientHeight,//ウィンドウ高さ
		n_jQueryAnimInterval = (b_pageMobile === true) ? 18 : 14;

	$.fx.interval = n_jQueryAnimInterval;

	
	

	/*contents コンテンツ毎の処理
	--------------------------------------------------------------------*/
	//TOPページ
	function topPage(){

		return false;
	};
	
	
	
	
	/*contents 関数分岐　ID・Classで処理を変更
	--------------------------------------------------------------------*/
	//PC用関数
	var screenFunc = function(){
		if(s_pageID === "top") topPage();
		return false;
	};

	//モバイル用関数
	var mobileFunc = function(){
		if(s_pageID === "top") topPage();
		return false;
	};


	//デバイス分岐
	if( b_pageMobile === true) mobileFunc();
	else screenFunc();

	return false;
});
