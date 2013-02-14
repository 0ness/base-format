//サイト内部　機能・演出用

$(function(){
	
	//SCRIPT START////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function init(){		


		//PageContentは各ページごとにプロトタイプ継承するためのベースオブジェクト
		//見やすさのために変数には全てver演算子をつける
		//行間は2の倍数を目安


		//=============================================================
		//	ページプロトタイプ
		//=============================================================		
		var PageContent = function(){


			//ユーザー情報///////////////////////////////////////
			var user = {
				UA:"",				//ユーザーエージェント
				VER:"not IE",		//ブラウザバージョン IE用
				check:function(){	//ブラウザ判定
					var wn = window.navigator;
					var userAgent = wn.userAgent.toLowerCase().indexOf("msie");
					var appVersion = wn.appVersion.toLowerCase();
					
					if (userAgent != -1) {						
						this.UA = "ie";
						if (appVersion.indexOf("msie 8.") != -1) {
							this.VER = 'ie8';
						} else if (appVersion.indexOf("msie 7.") != -1) {
							this.VER =  'ie7';
						} else if (appVersion.indexOf("msie 6.") != -1) {
							this.VER = 'ie6';
						}
					}else if(wn.userAgent.toLowerCase().indexOf("firefox") != -1){
						this.UA = "firefox";
					}else {
						this.UA = "webkit";				
					}
					return false;
				}()		
			}		

			
			//ページ情報///////////////////////////////////////
			var content = {
				Id:"",				//ページid
				Category:"",		//ページclass
				check:function(){ //ページid・classの取得
					var bodys = $("body");
					this.ID = bodys.attr("id");
					this.Category = bodys.attr("class");
					return false;
				}
			}
			content.check();//ページ内容チェック


			//メソッド///////////////////////////////////////
			var fade = function(node){
				var level = 1;				//変化スピード
				var step = function(){	//変化メソッド
					var hex = level.toString(16);
					node.style.backgroundColor = "#FFFF"+hex+hex;
					if(level < 15){
						level += 1;
						setTimeout(step,100);
					}
				};
				setTimeout(step,100);
			}		


			//暗黙型 Getterメソッド///////////////////////////////////////
			return {
				UA:function(){	//ユーザーエージェント
					return user.UA;
				},
				VER:function(){ //ブラウザバージョン
					return user.VER;
				},
				ID:function(){	//ページid
					return content.ID;
				},
				Category:function(){	//ページclass
					return content.Category;
				}
			}					
		}

		
		//=============================================================
		//	メソッド
		//=============================================================		
		var page = new PageContent();	
		
		alert(page.VER());
		alert(page.ID());
		
		
	}
	//SCRIPT END////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	
	
	
	$(window).ready(init);
})