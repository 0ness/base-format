/*==============================================================================

	汎用処理ライブラリ

	・基本DOM操作の自動化
	・HTML5対応
	・IE対応

==============================================================================*/

//SCRIPT START
var Library = function(){
	this.init();
}
Library.prototype = {
	
	win:window,
	pages:null,
	pageUA:null,
	pageVER:null,
	isMobile:null, 
	
	/* 初期化 */
	init:function(){
		var _p = new PageInfo(),
			_t = this;
		_t.pages = _p;
		_t.pageUA = _p.UA;
		_t.pageVER = _p.VER;
		_t.isMobile = _p.mobile;
	},

	/**
	 * jQuery アンカーアニメーション（jQueryオブジェクト）
	 * @param {String} URL
	 */
	anchor:function(href,callback){
		$.fx.interval = 20;
		var _$tag = (this.pageUA === "webkit") ? $("body"):$("html"),
			_href = href,
			_target = $(_href === "#" || _href === "" ? 'html' : _href),
			_position = _target.offset().top,
			_func = callback || null;
			
		_$tag.stop().animate({scrollTop:_position}, 600, 'easeInOutQuad',_func);
	},

	/* jQuery トップへ戻るリンク */
	topBackAncher:function(){
		var _$pageTop = $(document.getElementById("pageTop"));
		_$pageTop.on("click",function(e){
			e.preventDefault();
			this.anchor(_$pageTop.attr("href"));
		});
	},

	/* jQuery 固定アンカーリンク*/
	fixedLinkAncher:function(){

		var t = this,
			$win = $(window),
			$wrapper = $(document.getElementById("wrapper")),
			pageTop = document.getElementById("topBack"),
			$ancherBtn = $(pageTop);

		var h = 0,
			b = 0,
			cls = "static",
			old_flg = false,
			now_flg = false,
			num_scroll,
			timer;

		//高さ確認
		var SizeCheck = function(){
			h = $win.height();
			b = ($wrapper.height()-h)-40;
		};
		SizeCheck();
		
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
				if(t.pageVER !== 2) fa.scrollCheck();
				return false;
			}
		};

		//FixAncherインスタンス
		if(t.isMobile === false){
			var fa = new FixLink();
			//ページ全体のイベント
			$win.on({"load":fa.resize,"resize":fa.resize});
			timer = setTimeout(fa.scrollCheck,80);
		}

		$ancherBtn.on("click",function(e){
			e.preventDefault();
			t.ancher($ancherBtn);
		});
	},

	/* method IE8以下 jQuery HTML5_placeholder対応*/
	placeholder:function(){
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
	},
		
	/**
	 * IE8,7で透過処理を個別に対応
	 * @param   {Object}  処理を行いたい画像（jQueryオブジェクト）
	 */
	alphaCheck:function(obj){
		if(this.pageVER !== "ie8" && this.pageVER !== "ie7") return false;
		var _img = obj;
		_img.css('filter','progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + _img.attr('src') + '", sizingMethod="scale");');
	},

	/**
	 * IE8,7で透過処理を入れ子に対応
	 * @param   {Object}  obj 処理を行いたい画像の親要素（jQueryオブジェクト）
	 */
	alphaAllCheck:function(obj){
		if(this.pageVER !== "ie8" && this.pageVER !== "ie7") return false;
		var o = obj;
		o.each(function(){
			var _img = $(this);
			if(_img.attr('src').indexOf('.png') !== -1) {
				_img.css('filter','progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + _img.attr('src') + '", sizingMethod="scale");');
			}
		})
	},

	/**
	 * 自動化 コピーライト年数
	 */
	yearAdjust:function(){
		var _now_year = new Date().getFullYear();
		document.getElementById("nowYear").innerHTML += _now_year;
	},
	
	/* 2次元配列のソート
	 * dimensionArySort(ソート配列:Array、開始番号:uint、昇順か降順化の指定:boolean)
	 * 昇順はtrue,降順はfalse
	 */
	dimensionArySort:function(_ary,_col,_flg){
		var ary = _ary,
			col = _col,
			srt = (_flg === true)? 1 : -1;
		ary.sort(function(a , b){ return((a[col] - b[col]) * srt);});
		return(ary);
	}
};