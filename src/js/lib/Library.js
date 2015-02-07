/**
 * 多用する処理をまとめたクラス  
 * ・単純なアニメーション処理  
 * ・HTML5対応処理  
 * ・IE対応
 * @class Library
 * @constructor
 * @example var obj = new Library();  
 * obj.anchor("#header"); //アンカーリンク処理
 */
function Library(){
	"use strict";
	this.init();
};
Library.prototype = {
	
	pageUA:null,
	pageVER:null,
	isMobile:null, 
	
	/**
	 * 初期化　コンストラクタ内で実行
	 * @method init
	 */
	init:function(){
		var _p = new PageInfo(),
			_t = this;
		
		_t.pageUA = _p.UA;
		_t.pageVER = _p.IEver;
		_t.isMobile = _p.isMobile;
	},

	/**
	 * ウィンドウの幅を取得
	 * @method windowWidth
	 * @returns {Number} ウィンドウ幅
	 */
	windowWidth:function(){
		var _w = window,
			_d = document,
			_width = _w.innerWidth || _d.body.clientWidth;
		return _width;
	},

	/**
	 * ウィンドウの高さを取得
 	 * @method windowHeight
	 * @returns {Number} ウィンドウ高
	 */
	windowHeight:function(){
		var _w = window,
			_d = document,
			_height = _w.innerHeight || _d.body.clientHeight;
		return _height;
	},

	/**
	 * jQuery アンカーアニメーション
	 * @method anchor
	 * @param {String} URL
	 * @param {function} コールバック関数
	 */
	anchor:function(a_href,a_callback,a_spd,a_ease){
		$.fx.interval = 20;
		var _$tag = (this.pageUA === "webkit") ? $("body"):$("html"),
			_href = a_href,
			_target = _href === "#" || _href === "" ? 'html' : _href,
			_position = $(_target).offset().top,
			_func = a_callback || null,
			_spd = a_spd || 600,
			_ease = a_ease || "easeInOutQuad";
			
		_$tag.stop().animate({scrollTop:_position},_spd,_ease,_func);
	},
	
	/**
	 * jQuery アコーディオン
	 * @method accordion
	 * @param {Object} a_$head アコーディオンの見出し部分のjQueryオブジェクト
	 * @param {Object} a_$body アコーディオンのボディ部分のjQueryオブジェクト
	 * @param {Object} a_param 内部設定のパラメーター{ spd:速度,ease:イージング,callback：　コールバック関数}
	 * @example obj.accordion($(".js-acd-head"),$(".js-acd-body"),{spd:600,ease:"easeOutBack"});
	 */
	accordion:function(a_$head,a_$body,a_param){
	
		var _$head = a_$head,
			_$body = a_$body,
			_$parent = _$head.parent(),
			_bodyH = _$body.height(),
			
			_clsName = "js-acd-open",
			_param = a_param || {},
			_spd = _param.spd || 500,
			_ease = _param.ease || "easeOutExpo",
			_callback = _param.callback || function(){};
		
		//アニメーション
		var open = function(){
			_$body.stop().slideDown(_spd,_ease,_callback);
			_$parent.addClass(_clsName);
		};
		var close = function(){
			_$body.stop().slideUp(_spd,_ease,_callback);
			_$parent.removeClass(_clsName);
		};
		var judge = function(){
			if(_$parent.hasClass(_clsName) === true) close();
			else open();
		};
		
		//初期化
		_$body.hide().css("overflow","hidden");
		_$head.css("cursor","pointer").on("click",judge);
	},

	/**
	 * IE8以下 jQuery HTML5_placeholder対応
	 * @method placeholder
	 */
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
	},
		
	/**
	 * IE8,7で透過処理を個別に対応
	 * @method alphaCheck
	 * @param {Object} obj 処理を行いたいjQueryオブジェクト
	 */
	alphaCheck:function(obj){
		var _iever = this.pageVER;
		if(_iever !== "ie8" && _iever !== "ie7") return false;
		
		var _img = obj;
		_img.css('filter','progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + _img.attr('src') + '", sizingMethod="scale");');
	},

	/**
	 * IE8,7で透過処理を入れ子に対応
	 * @method alphaAllCheck
	 * @param {Object}  obj 処理を行いたい画像の親jQueryオブジェクト
	 */
	alphaAllCheck:function(obj){
		var _iever = this.pageVER;
		if(_iever !== "ie8" && _iever !== "ie7") return false;
		
		var _o = obj,
			_img;
		
		_o.each(function(){
			_img = $(this);
			if(_img.attr('src').indexOf('.png') !== -1) {
				_img.css('filter','progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + _img.attr('src') + '", sizingMethod="scale");');
			}
		})
	},

	/**
	 * 年数表記を自動で現在の値に書き換える
	 * @method yearAdjust
	 * @param {String} id 年数を囲っているid
	 * @example obj.yearAdust();
	 */
	yearAdjust:function(id){
		var _id = id || "nowYear",
			_now_year = new Date().getFullYear();
		document.getElementById(_id).innerHTML += _now_year;
	}	
};