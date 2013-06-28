/*==============================================================================

	サイト内部　機能・演出用
	
	・基本の状態を維持する必要は無く、プロジェクトによってカスタマイズする
	・機能実装→演出実装→最適化処理のフローで構築
	
==============================================================================*/





page.idCheck();//ページ情報取得　必須
page.uaClass();//htmlにclassを追加



//SCRIPT START
$(function(){
	
	
	function init(){
		

		//=============================================================
		//	共通変数　このJS内部でグローバルに使う変数をまとめる
		//=============================================================
		//共通オブジェクト
		var doc = document;
		var $main = $(doc.getElementById("main"));
		
		//ページ情報
		var s_pageUA = page.UA();					//ユーザーエージェント保持
		var s_pageVER = page.VER();				//IEのバージョン保持
		var s_pageID = page.ID();					//ページID
		var s_pageClass = page.Category(); 		//ページclass
		var s_pageMobile = page.mobile();		//モバイル判定
	

		
		
		//=============================================================
		//	共通要素
		//=============================================================
		function commonNavigation(){			
			
			//メインナビ　宣言と同時に実行///////////////////////////////////////
			var mainNav = function(){
								
				var $gnav = $(doc.getElementById("gnav"));//ナビゲーション			
				
				function Gnav(){}//Gnavオブジェクト
				Gnav.prototype = {
					
					//ロールオーバー用　引数にオブジェクト
					over:function(obj){},
					
					//ロールアウト　引数にオブジェクト
					out:function(obj){}
				}				
				var g = new Gnav();
				
			}();


			//サブナビ///////////////////////////////////////
			var subNav = function(){};//無い場合は削除
			if($(doc.getElementById("sub"))[0]) subNav();


			//アンカーリンク///////////////////////////////////////
			var $ancher = $(doc.getElementById("top_back"));	//トップに戻るボタン
			var AncherLink = function(e){ //トップに戻る処理
				e.preventDefault();
				var speed = 600;
				var href= "#header";
				var target = $(href == "#" || href == "" ? 'html' : href);
				var position = target.offset().top;// 移動先を数値で取得
				var tag = "body";
				
				//Firefox・IE対応
				if(s_pageUA === "firefox" || s_pageUA === "ie") tag = "html";
				$(tag).animate({scrollTop:position}, speed, 'easeInOutExpo');
			};
			
			//アンカーリンク指定
			$ancher.on("click",AncherLink);


			//コピーライト年数　自動化///////////////////////////////////////
			var year = function(){
				var d = new Date();
				var now_year = d.getFullYear();
				$(doc.getElementById("nowYear")).text(now_year);
			};
			
			return false;
		}
		commonNavigation();
		

		
		
		//=============================================================
		//	IE透過処理　使用時にバグを伴うリスクがあるので、慎重に使う
		//=============================================================

		//	引数：処理を行いたい画像 //	個別の対応にs使う //	IE8.7のみ適用
		function alphaCheck(obj){			
			if(s_pageVER === "ie8" || s_pageVER === "ie7"){
				var img = obj;
				img.css({'filter': 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + img.attr('src') + '", sizingMethod="scale");'});
			}
			return false;
		}

		//	引数：処理を行いたい画像の親要素 //	ページ全体の画像を処理したいい時使う //	IE8.7のみ適用
		function alphaAllCheck(obj){			
			if(s_pageVER === "ie8" || s_pageVER === "ie7"){
				var o = obj;
				o.each(
					function(){
						img = $(this);
						if(img.attr('src').indexOf('.png') !== -1) {
							img.css({'filter': 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + img.attr('src') + '", sizingMethod="scale");'});
						}
					}
				)
			}
			return false;
		}
		
		
	}
	
	
	$(window).on("load",init);
	
})
//SCRIPT END