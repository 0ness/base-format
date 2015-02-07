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

	var PAGE = new PageInfo(),
		LIB = new Library(),
		BPO = new BreakPointOne(768);


	var isMobile = PAGE.isMobile;    //モバイル判定

	var s_pageUA = PAGE.UA,		//ユーザーエージェント保持
		s_pageVER = PAGE.IEver,	//IEのバージョン保持
		s_pageID = PAGE.id,		//ページID
		s_pageClass = PAGE.class,  //ページclass
		s_clickEvt = (isMobile === true) ? "touchend" : "click";



	
	/*var
	--------------------------------------------------------------------*/
	//数値
	var n_winWidth = LIB.windowWidth(),
		n_winHeight = LIB.windowHeight();

	
	

	/*contents コンテンツ毎の処理
	--------------------------------------------------------------------*/	
	BPO.spCallBack = function(){
		console.log("sp");
	};
	BPO.pcCallBack = function(){
		console.log("pc");
	}



	
	
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