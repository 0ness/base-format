/*==============================================================================

	サイト内部　機能・演出用
	
	・基本の状態を維持する必要は無く、プロジェクトによってカスタマイズする
	・機能実装→演出実装→最適化処理のフローで構築
	
==============================================================================*/
page.idCheck();



//SCRIPT START
function init(){

	
	/*const 共通定数　このJS内部でグローバルに使う定数
	--------------------------------------------------------------------*/
	//DOMオブジェクト
	var win = window;
	var doc = document;
			
	//ページ情報
	var pages = page;
	
	//文字列
	var s_pageUA = pages.UA();            //ユーザーエージェント保持
	var s_pageVER = pages.VER();          //IEのバージョン保持
	var s_pageID = pages.ID();		      //ページID
	var s_pageClass = pages.Category();   //ページclass
	var s_pageMobile = pages.mobile();    //モバイル判定

	
	/*const 拡張関数　requestAnimFrame()
	--------------------------------------------------------------------*/
    win.requestAnimFrame = (function(){
		return	win.requestAnimFrame ||
				win.webkitRequestAnimFrame ||
				win.mozRequestAnimFrame ||
				win.msRequestAnimFrame ||
				function(callback,element){
					win.setTimeout(callback,1000/60);
				};
	})();

	
	
	/*var 共通変数　このJS内部でグローバルに使う変数
	--------------------------------------------------------------------*/
	//数値 
	var n_iw = win.innerWidth || doc.body.clientWidth;  //ウィンドウ幅
	var n_ih = win.innerHeight || doc.body.clientHeight;//ウィンドウ高さ

	
	//jquery開始
	$(function(){
		
		$.fx.interval = 20;
        
        //jQueryオブジェクト
        var $ancherTag = (s_pageUA === "webkit") ? $("body"):$("html");
        
		
		/*function 共通関数　多用する関数
		--------------------------------------------------------------------*/
        //アンカーリンクの移動
        var ancher = function(_href){
            var speed = 600;
            var href = _href;
            var target = $(href == "#" || href == "" ? 'html' : href);
            var position = target.offset().top-30;// 移動先を数値で取得
            $ancherTag.stop().animate({scrollTop:0}, speed, 'easeInOutQuad');
            return false;
        }
        
        //IE8,7で透過処理を個別に対応
		//引数：処理を行いたい画像（jQueryオブジェクト）
		var alphaCheck = function(obj){			
			if(s_pageVER === "ie8" || s_pageVER === "ie7"){
				var img = obj;
                var imgPass = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + img.attr('src') + '", sizingMethod="scale");';
				img.css('filter',imgPass);
			}
			return false;
		}
        
        //IE8,7で透過処理を入れ子に対応
		//引数：処理を行いたい画像の親要素（jQueryオブジェクト）
		var alphaAllCheck = function(obj){			
			if(s_pageVER === "ie8" || s_pageVER === "ie7"){
                var o = obj;
                o.each(
                    function(){
						var img = $(this);
						if(img.attr('src').indexOf('.png') !== -1) {
                            var cssPass = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + img.attr('src') + '", sizingMethod="scale");';
							img.css('filter',cssPass);
						}
					}
				)
			}
			return false;
		}
		
        //IE8以下　HTML5 placeholder対応
        var placeholder = function(){
            var supportsInputAttribute = function (attr) {
                var input = document.createElement('input');
                return attr in input;
            };
            if (!supportsInputAttribute('placeholder')) {
                
                $('[placeholder]').each(function () {
                    var input = $(this);
                    var placeholderText = input.attr('placeholder');
                    var placeholderColor = 'GrayText';
                    var defaultColor = input.css('color');
                    
                    input.on({
                        "focus":function(){
                            if (input.val() === placeholderText) {
                                input.val('').css('color', defaultColor);
                            }
                        },
                        "blur":function(){
                            if (input.val() === '') {
                                input.val(placeholderText).css('color', placeholderColor);
                            } else if (input.val() === placeholderText) {
                                input.css('color', placeholderColor);
                            }
                        }
                    }).parents('form').submit(function () {
                        if (input.val() === placeholderText) {
                            input.val('');
                        }
                    });
                });
            }
            return false;
        }

        
		/*function UI用関数　UI毎の処理を指定
		--------------------------------------------------------------------*/
		var commonNavigation = function(){
			
			//メインナビ　宣言と同時に実行
			var mainNav = function(){};


			//サブナビ
			var subNav = function(){};//無い場合は削除
			if(doc.getElementById("sub")) subNav();
            
            
			//アンカーリンク
			var pageTop = doc.getElementById("topBack");
			var $ancherBtn = $(pageTop);	//トップに戻るボタン

			//固定リンクボタン
			var FixLinkBtn = function(){
				var $win = $(window);
				var $wrapper = $(doc.getElementById("wrapper"));
				var h = 0;
				var b = 0;
				var cls = "static";
				var old_flg = false;
				var now_flg = false;

				//高さ確認
				var SizeCheck = function(){
					h = $win.height();
					b = ($wrapper.height()-h)-40;
				};
				SizeCheck();
				var num_scroll;
				var timer;

				//FixLinkクラス
				var FixLink = function(){};
				FixLink.prototype = {
					scrollCheck:function(){//スクロール時の位置判定
						num_scroll = $win.scrollTop();

						//位置のフラグ
						if(num_scroll > 500) now_flg = true;
						else now_flg = false;

						//フッターとの位置調整
						cls = (num_scroll >= b) ? "static" : "";
						pageTop.className = cls;
						timer = setTimeout(fa.scrollCheck,80);

						//表示の切り替え
						if(now_flg !== old_flg){
							if(now_flg === true){
								$ancherBtn.fadeTo(200,1,"linear");
								old_flg = true;
							}else{
								$ancherBtn.fadeTo(200,0,"linear");
								old_flg = false;
							}
						}
						return false;
					},
					resize:function(){//リサイズ時の位置調整
						SizeCheck();
						if(s_pageVER !== 2) fa.scrollCheck();
						return false;
					}
				};

				//FixAncherインスタンス
				if(s_pageMobile === false){
					var fa = new FixLink();
					//ページ全体のイベント
					$win.on({"load":fa.resize,"resize":fa.resize});
					timer = setTimeout(fa.scrollCheck,80);
				}

				$ancherBtn.on("click",function(e){
					e.preventDefault();
					$ancherTag.stop().animate({scrollTop:0},600, 'easeInOutQuad');
				});
            };


			//コピーライト年数　自動化///////////////////////////////////////
			var year = function(){
				var d = new Date();
				var now_year = d.getFullYear();
				$(doc.getElementById("nowYear")).text(now_year);
			};
			
			return false;
		}();

        
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
            if(s_pageID === "top") topPage();
            return false;
        }
        
        //モバイル用関数
        var mobileFunc = function(){
            if(s_pageID === "top") topPage();
            return false;
        }
        
        //タブレット用関数
        var tabletFunc = function(){
            return false;
        }
        
        //デバイス分岐
		if( s_pageMobile === true) mobieFunc();
        else screenFunc();        	
	});

	
	return false;
};


//contents スクリプト動作開始
if(window.addEventListener) window.addEventListener("load",init, false);
else window.attachEvent("onload",init);
//SCRIPT END