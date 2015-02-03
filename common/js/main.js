/*==============================================================================

	サイト内部　機能・演出用

	・基本の状態を維持する必要は無く、プロジェクトによってカスタマイズする
	・機能実装→演出実装→最適化処理のフローで構築

==============================================================================*/
(function () {
	"use strict";


	/*const
	--------------------------------------------------------------------*/
	var win = window,
		doc = document;

	var pages = new PageInfo(),
		lib = new Library();

	var isMobile = pages.isMobile;    //モバイル判定

	var s_pageUA = pages.UA,		//ユーザーエージェント保持
		s_pageVER = pages.IEver,	//IEのバージョン保持
		s_pageID = pages.id,		//ページID
		s_pageClass = pages.class,  //ページclass
		s_clickEvt = (isMobile === true) ? "touchend" : "click";

	var $_ancher = (s_pageUA === "webkit") ? $("body"):$("html");



	/*var
	--------------------------------------------------------------------*/
	//数値
	var n_winWidth = win.innerWidth || doc.body.clientWidth,
		n_winHeight = win.innerHeight || doc.body.clientHeight,
		n_jQueryAnimInterval = (isMobile === true) ? 18 : 14;

	$.fx.interval = n_jQueryAnimInterval;

	
	

	/*contents コンテンツ毎の処理
	--------------------------------------------------------------------*/
	
	
	
	
	/*contents 関数分岐　ID・Classで処理を変更
	--------------------------------------------------------------------*/
	//PC用関数
	var screenFunc = function(){
		return false;
	};

	//モバイル用関数
	var mobileFunc = function(){
		return false;
	};


	//デバイス分岐
	if( isMobile === true) mobileFunc();
	else screenFunc();
	

	
	return false;
}());