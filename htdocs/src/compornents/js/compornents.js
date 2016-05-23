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
	var f_pageMobile = pages.mobile;    //モバイル判定

	//文字列
	var s_pageUA = pages.UA;           //ユーザーエージェント保持
	var s_pageVER = pages.VER;         //IEのバージョン保持
	var s_pageID = pages.ID;		      //ページID
	var s_pageClass = pages.class;  //ページclass
	var s_clickEvt = (f_pageMobile === true) ? "touchend" : "click";



	/*var 変数　このJS内部でグローバルに使う変数
	--------------------------------------------------------------------*/
	//数値
	var n_winWidth = win.innerWidth || doc.body.clientWidth;  //ウィンドウ幅
	var n_winHeight = win.innerHeight || doc.body.clientHeight;//ウィンドウ高さ
	

	//jquery開始
	$(function(){

		$.fx.interval = (f_pageMobile === true) ? 18 : 14;
        var $ancherTag = (s_pageUA === "webkit") ? $("body"):$("html");


		/*contents コンテンツ毎の処理
		--------------------------------------------------------------------*/
		
		var compornentNav = function(){
			
			var d_id = doc.getElementById("navCompornents");
			var $_head = $(".headCompornet");
			var n_len = $_head.length;
			var a_head = [];
			var s_navDom = "";
			
			for(var i = 0; i < n_len; i++){
				var head = $_head.eq(i);
				var s_id = "headCompornents-0"+i;
				var s_herf = "#"+s_id;
				var s_text = head.text();
				
				head.attr("id",s_id)
				s_navDom += "<li><a href='../../../compornents/js/" + s_herf + "'>" + s_text + "</a></li>";
			}
			
			d_id.innerHTML = s_navDom;
			
			return false;
		}();
		
		
		
		
		
		
		

	});



	return false;
};


//contents スクリプト動作開始
if(window.addEventListener) window.addEventListener("load",init, false);
else window.attachEvent("onload",init);
