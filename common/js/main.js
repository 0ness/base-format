/*==============================================================================

	サイト内部　機能・演出用

	・基本の状態を維持する必要は無く、プロジェクトによってカスタマイズする
	・機能実装→演出実装→最適化処理のフローで構築

==============================================================================*/


//SCRIPT START
function init(){

	
	/*const 定数　このJS内部でグローバルに使う定数
	--------------------------------------------------------------------*/
	//DOMオブジェクト
	var win = window;
	var doc = document;

	//オブジェクト
	var pages = new PageInfo();
	var lib = new Library();

	//正否値
	var f_pageMobile = pages.mobile();    //モバイル判定

	//文字列
	var s_pageUA = pages.UA();           //ユーザーエージェント保持
	var s_pageVER = pages.VER();         //IEのバージョン保持
	var s_pageID = pages.ID();		      //ページID
	var s_pageClass = pages.Category();  //ページclass
	var s_clickEvt = (f_pageMobile === true) ? "touchend" : "click";
	
	
	
	
	/*var 変数　このJS内部でグローバルに使う変数
	--------------------------------------------------------------------*/
	
	//数値
	var n_winWidth = win.innerWidth || doc.body.clientWidth;  //ウィンドウ幅
	var n_winHeight = win.innerHeight || doc.body.clientHeight;//ウィンドウ高さ
	var n_jQueryAnimInterval = (f_pageMobile === true) ? 18 : 14;

	
	//jquery開始
	$(function(){

		$.fx.interval = n_jQueryAnimInterval;
        var $ancherTag = (s_pageUA === "webkit") ? $("body"):$("html");


		/*contents コンテンツ毎の処理
		--------------------------------------------------------------------*/
        //TOPページ
        function topPage(){
			
            return false;
        }


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
		if( f_pageMobile === true) mobileFunc();
        else screenFunc();
		
	});


	
	return false;
};


//contents スクリプト動作開始
if(window.addEventListener) window.addEventListener("load",init, false);
else window.attachEvent("onload",init);
//SCRIPT END
