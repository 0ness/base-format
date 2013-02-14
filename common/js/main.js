/*==============================================================================

	サイト内部　機能・演出用
	
	・基本の状態を維持する必要は無く、プロジェクトによってカスタマイズする
	・機能実装→演出実装→最適化処理のフローで構築
	
==============================================================================*/




$(function(){
	
	
	//SCRIPT START////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function init(){
		

		//=============================================================
		//	共通変数　このJS内部でグローバルに使う変数をまとめる
		//=============================================================		

		
			


		//=============================================================
		//	ページ情報
		//	IDやCLASSでの関数振り分けやブラウザ対応に使用する
		//=============================================================		
		var PageContent = function(){


			//ユーザー情報///////////////////////////////////////
			var user = {
				UA:"",					//ユーザーエージェント
				VER:"not IE",			//ブラウザバージョン 基本IEのみに使用
				check:function(){		//ブラウザ判定
					var wn = window.navigator;
					var userAgent = wn.userAgent.toLowerCase();
					var appVersion = wn.appVersion.toLowerCase();
					if (userAgent.indexOf("msie") != -1) {						
						this.UA = "ie";
						if (appVersion.indexOf("msie 8.") != -1) {
							this.VER = 'ie8';
						} else if (appVersion.indexOf("msie 7.") != -1) {
							this.VER =  'ie7';
						} else if (appVersion.indexOf("msie 6.") != -1) {
							this.VER = 'ie6';
						}
					}else if(userAgent.indexOf("firefox") != -1){
						this.UA = "firefox";
						alert(0);
					}else {
						this.UA = "webkit";				
					}
					return false;
				}
			}
			user.check();	

			
			//ページ情報///////////////////////////////////////
			var content = {
				ID:"",
				Category:"",
				check:function(){ //ページid・classの取得
					var bodys = $("body");
					this.ID = bodys.attr("id");
					this.Category = bodys.attr("class");
					return false;
				}
			}
			content.check();//ページ内容チェック


			//暗黙型 Getterメソッド///////////////////////////////////////
			return {
				UA:function(){	//ユーザーエージェント
					return user.UA;
				},
				VER:function(){ //IEブラウザバージョン
					return user.VER;
				},
				ID:function(){	//ページid
					return content.ID;
				},
				Category:function(){	//ページclass
					return content.Category;
				},
				Status:function(){
					console.log("UA："+user.UA+"　VER："+user.VER+"　ID："+content.ID+"　Category："+content.Category);
					return false;
				}
			}					
		}
	
		var page = new PageContent();	
		page.Status();
		
		

		
		
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
					over:function(obj){//ロールオーバー
						return false;
					},
					out:function(obj){//ロールアウト
						return false;
					},
					ancher:function(){//アンカーリンク
						var speed = 800;
						var href= "#header";
						var target = $(href == "#" || href == "" ? 'html' : href);
						var position = target.offset().top;// 移動先を数値で取得
						var tag = "body";
						
						//Firefox対応
						if (navigator.userAgent.indexOf("Firefox") > 1){
							tag = "html";
						}
						//IE対応
						if(strUA.indexOf("msie") != -1){
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
		var alphaCheck = function(){
			
			//ブロックごとアルファ値適応
			var pointCheck = function(obj){
				var o = obj,img;
				o.each(
					function(){
						img = $(this);
						if(img.attr('src').indexOf('.png') != -1) {
							img.css({'filter': 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + img.attr('src') + '", sizingMethod="scale");'});
						}
					}
				)
				return false;
			}
			
			//pointCheck($(document.getElementById("wrapper")));
			return false;
		}
		
		
		
				
		
		
		
	}
	//SCRIPT END////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	
	
	
	$(window).ready(init);
})