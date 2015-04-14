;(function(window,document){
	

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
	var LIBRARY = function(){},
		METHOD = LIBRARY.prototype;
	
	
	
	
	/*DOM Method
	--------------------------------------------------------------------*/

	/**
	 * ウィンドウの幅を取得
	 * @method getWindowWidth
	 * @returns {Number} ウィンドウ幅
	 */
	METHOD.getWindowWidth = function(){
		var _width = window.innerWidth || document.body.clientWidth;
		return _width;
	};
	

	/**
	 * ウィンドウの高さを取得
	 * @method getWindowHeight
	 * @returns {Number} ウィンドウ高
	 */
	METHOD.getWindowHeight = function(){
		var _height = window.innerHeight || document.body.clientHeight;
		return _height;
	};
	
	
	/**
	 * ウィンドウの高さを取得
	 * @method getScrollTop
	 * @returns {Number} スクロール位置
	 */
	METHOD.getScrollTop = function(){
		var _y = document.body.scrollTop || document.documentElement.scrollTop;
		return _y;
	};

	
	/**
	 * 指定DOMのclassを追加
	 * @method addClass
	 * @param {DOM} DOM要素
	 * @param {String} クラス名
	 */
	METHOD.addClass = function(a_dom,a_cls){
		var _dom = a_dom,
			_cls = a_cls;
		if (_dom.classList) _dom.classList.add(_cls);
		else _dom.className += ' ' + _cls;
	};

	
	/**
	 * 指定DOMのclassを削除
	 * @method reomveClass
	 * @param {DOM} DOM要素
	 * @param {String} クラス名
	 */
	METHOD.reomveClass = function(a_dom,a_cls){
		var _dom = a_dom,
			_cls = a_cls;
		if (_dom.classList) _dom.classList.remove(_cls);
		else _dom.className = _dom.className.replace(new RegExp('(^|\\b)' + _cls.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
	};
	
	
	/**
	 * 指定DOMが任意のclassを持つか判定
	 * @method hasClass
	 * @returns {Boolean} クラスを持っているか正否値
	 */
	METHOD.hasClass = function(a_dom,a_cls){
		var _dom = a_dom,
			_cls = a_cls,
			_flg = false;
		if (_dom.classList) _flg =  _dom.classList.contains(_cls);
		else _flg = new RegExp('(^| )' + _cls + '( |$)', 'gi').test(_dom.className);
		return _flg;
	};

	
	/**
	 * 年数表記を自動で現在の値に書き換える
	 * @method yearAdjust
	 * @param {String} id 年数を囲っているid
	 * @example obj.yearAdust();
	 */
	METHOD.yearAdjust = function(id){
		var _id = id || "nowYear",
			_now_year = new Date().getFullYear();
		document.getElementById(_id).innerHTML += _now_year;
	};

	
	
	
	

	
	window.Library = LIBRARY;
})(window, document);
