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
	var Library = function(){},
		Method = Library.prototype;
	
	
	
	
	/*DOM Method
	--------------------------------------------------------------------*/

	/**
	 * 閲覧環境：IE8以下判定
	 * @method checkIE8
	 * @return {Boolean} ブラウザの判定
	 */
	Method.isIE8 = function(){
		var _flg = false;
		if(typeof window.addEventListener == "undefined" && typeof document.querySelectorAll == "undefined") _flg = false;
		else if(this.isIE8Under() === true) _flg = true;
		return _flg;
	};

	
	/**
	 * 閲覧環境：IE9判定
	 * @method isIE9
	 * @return {Boolean} ブラウザの判定
	 */
	Method.isIE9 = function(){
		var _self= this,
			_flg = false,
			_und = "undefined";
		if(_self.isIE8Under() === true) _flg = false;
		else if(_self.isIE9Under() === true) _flg = true;
		return _flg;
	};
	

	/**
	 * 閲覧環境：IE8以下判定
	 * @method isIE8Under
	 * @return {Boolean} ブラウザの判定
	 */
	Method.isIE8Under = function(){
		var _flg = false,
			_und = "undefined";
		if(typeof window.addEventListener == _und && typeof document.getElementsByClassName == _und) _flg = true;
		return _flg;
	};

	
	/**
	 * 閲覧環境：IE9以下判定
	 * @method isIE9Under
	 * @return {Boolean} ブラウザの判定
	 */
	Method.isIE9Under = function(){
		var _flg = false;
		if(document.uniqueID && typeof window.matchMedia == "undefined") _flg = true;
		return _flg;
	};

	
	/**
	 * ウィンドウの幅を取得
	 * @method getWindowWidth
	 * @returns {Number} ウィンドウ幅
	 */
	Method.getWindowWidth = function(){
		var _width = window.innerWidth || document.body.clientWidth;
		return _width;
	};
	

	/**
	 * ウィンドウの高さを取得
	 * @method getWindowHeight
	 * @returns {Number} ウィンドウ高
	 */
	Method.getWindowHeight = function(){
		var _height = window.innerHeight || document.body.clientHeight;
		return _height;
	};
	
	
	/**
	 * ウィンドウの高さを取得
	 * @method getScrollTop
	 * @returns {Number} スクロール位置
	 */
	Method.getScrollTop = function(){
		var _y = document.body.scrollTop || document.documentElement.scrollTop;
		return _y;
	};

	
	/**
	 * 指定DOMのclassを追加
	 * @method addClass
	 * @param {DOM} DOM要素
	 * @param {String} クラス名
	 */
	Method.addClass = function(a_dom,a_cls){
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
	Method.removeClass = function(a_dom,a_cls){
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
	Method.hasClass = function(a_dom,a_cls){
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
	Method.yearAdjust = function(id){
		var _id = id || "nowYear",
			_now_year = new Date().getFullYear();
		document.getElementById(_id).innerHTML += _now_year;
	};

	
	
	
	

	
	window.Library = Library;
})(window, document);
