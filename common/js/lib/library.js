/*==============================================================================

	汎用処理ライブラリ


==============================================================================*/
/**
 * 多用する処理をまとめたクラス  
 * ・単純なアニメーション処理
 * ・HTML5対応処理  
 * ・IE対応
 * @class Library
 * @constructor
 * @example var obj = new Library();
 */
function Library(){
	"use strict";
	this.init();
};
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