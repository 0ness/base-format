/*==============================================================================

	サイト内部　機能・演出用
	
	・基本の状態を維持する必要は無く、プロジェクトによってカスタマイズする
	・機能実装→演出実装→最適化処理のフローで構築
	
==============================================================================*/




//ページ情報取得　必須///////////////////////////////////////
page.idCheck();




//SCRIPT START////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(function(){
	
	
	function init(){
		

		//=============================================================
		//	共通変数　このJS内部でグローバルに使う変数をまとめる
		//=============================================================		

		

		
		
		//=============================================================
		//	共通要素
		//=============================================================
		function commonNavigation(){
			
			
			//メインナビ　宣言と同時に実行///////////////////////////////////////
			var mainNav = function(){
								
				var parent = $(document.getElementById("gnav"));			//ナビゲーション
				var ancherLink = $(document.getElementById("top_back"));	//トップに戻るボタン
				
				//Gnavオブジェクト
				function Gnav(){}
				
				Gnav.prototype = {
					over:function(obj){//ロールオーバー用　引数にオブジェクト
						//処理
						return false;
					},
					out:function(obj){//ロールアウト　引数にオブジェクト
						//処理
						return false;
					},
					ancher:function(){//アンカーリンク
						var speed = 800;
						var href= "#header";
						var target = $(href == "#" || href == "" ? 'html' : href);
						var position = target.offset().top;// 移動先を数値で取得
						var tag = "body";
						
						//Firefox・IE対応
						if (page.UA() === "firefox"){
							tag = "html";
						}else if(page.UA() === "ie"){
							tag = "html";
						}
						
						$(tag).animate({scrollTop:position}, speed, 'easeInOutExpo');
						return false;
					}
				}
				
				//Gnavインスタンス
				var g = new Gnav();
				
				//アンカーリンク指定
				ancherLink.on("click",g.ancher);
				
				return false;
			}();


			//サブナビ///////////////////////////////////////
			//無い場合は削除
			var subNav = function(){
				var parent = $(document.getElementById("sub"));
				return false;
			}
					
			if($(document.getElementById("sub"))[0]){
				subNav();
			}
			
			return false;
		}
		commonNavigation();
		

		
		
		//=============================================================
		//	IE透過処理　使用時にバグを伴うリスクがあるので、慎重に使う
		//=============================================================

		//	引数：処理を行いたい画像
		//	個別の対応にs使う
		//	IE8.7のみ適用
		function alphaCheck(obj){			
			if(page.VER() === "ie8" || page.VER() === "ie7"){
				var img = obj;
				img.css({'filter': 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + img.attr('src') + '", sizingMethod="scale");'});
			}
			return false;
		}

		//	引数：処理を行いたい画像の親要素
		//	ページ全体の画像を処理したいい時使う
		//	IE8.7のみ適用
		function alphaAllCheck(obj){			
			if(page.VER() === "ie8" || page.VER() === "ie7"){
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
//SCRIPT END////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
