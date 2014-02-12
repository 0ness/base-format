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
	
	//文字列
	var strPageUA = pages.UA();           //ユーザーエージェント保持
	var strPageVER = pages.VER();         //IEのバージョン保持
	var strPageID = pages.ID();		      //ページID
	var strPageClass = pages.Category();  //ページclass

	//正否値
	var flgPageMobile = pages.mobile();    //モバイル判定


	/*var 変数　このJS内部でグローバルに使う変数
	--------------------------------------------------------------------*/
	//数値
	var numWinWidth = win.innerWidth || doc.body.clientWidth;  //ウィンドウ幅
	var numWinHeight = win.innerHeight || doc.body.clientHeight;//ウィンドウ高さ


	//jquery開始
	$(function(){

		$.fx.interval = 20;

        //jQueryオブジェクト
        var $ancherTag = (strPageUA === "webkit") ? $("body"):$("html");


		/*contents コンテンツ毎の処理
		--------------------------------------------------------------------*/
        //TOPページ
        function topPage(){

			var test = function(){};

            return false;
        }


		/*contents 関数分岐　ID・Classで処理を変更
		--------------------------------------------------------------------*/
        //PC用関数
        var screenFunc = function(){
            if(strPageID === "top") topPage();
            return false;
        };

        //モバイル用関数
        var mobileFunc = function(){
            if(strPageID === "top") topPage();
            return false;
        };

        //タブレット用関数
        var tabletFunc = function(){
            return false;
        };

        //デバイス分岐
		if( flgPageMobile === true) mobieFunc();
        else screenFunc();
	});
	
	
	
	return false;
};


//contents スクリプト動作開始
if(window.addEventListener) window.addEventListener("load",init, false);
else window.attachEvent("onload",init);
//SCRIPT END