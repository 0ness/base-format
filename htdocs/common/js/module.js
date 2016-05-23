;(function(window,document){
	"use strict";

	
	
	
	/**
	 * OS・UA・ページの情報を取得・操作する
	 * ・コンストラクタで情報を取得し、インスタンスの変数から参照する
	 * ・OS・UA・デバイス判定
	 * ・css読み込み・viewport表示変更
	 * 
	 * @class UserInfo
	 * @constructor
	 * 
	 * @example var obj = new UserInfo();
	 * if(obj.isMobile === true) return false;
	 */
	var UserInfo = function() {
		var _bodys = document.getElementsByTagName("body")[0];
		
		/**
		 * 閲覧環境：OS
		 * @property {String} OS
		 */
		this.OS = "";

		/**
		 * 閲覧環境：ユーザーエージェント
		 * @property {String} UA
		 */
		this.UA = "";

		/**
		 * 閲覧環境：ieのバージョン
		 * @property {String} IEver
		 */
		this.IEver = "not IE";

		/**
		 * 閲覧環境：Flashプレーヤー判定
		 * Flashプレーヤーの有無を確認
		 * @property {Boolean} isFlash
		 */
		this.hasFlashPlayer = false;

		/**
		 * 閲覧環境：モバイル判定
		 * 判定の範囲は随時更新する
		 * @property {Boolean} isMobile
		 */
		this.isMobile = false;

		/**
		 * 閲覧環境：デバイスの種類
		 * @property {String} device
		 */
		this.device = "pc";

		/**
		 * ページ情報：閲覧しているページのbody要素のid
		 * サイト毎で起点となる要素は変更する
		 * @property {String} id
		 */
		this.id = _bodys.getAttribute('id');

		/**
		 * ページ情報：閲覧しているページのbody要素のclass
		 * サイト毎で起点となる要素は変更する
		 * @property {String} className
		 */
		this.className = _bodys.className;

		/**
		 * ページ情報：URL内のクエリの有無
		 * @property {Boolean} hasQuery
		 */
		this.hasQuery = false;

		/**
		 * ページ情報：URL内のクエリの内容
		 * @property {String} urlQuery
		 */
		this.urlQuery = "";
		
		
		//コンストラクタ実行時の処理
		this.checkUA();
		this.checkDevice();
	},
		Member = UserInfo.prototype;
	

	
	
	/*Public Method
	--------------------------------------------------------------------*/	
	/** 
	 * OSチェック
	 * @method checkOS
	 */
	Member.checkOS = function() {
		if (navigator.platform.indexOf("Win") != -1) this.OS = "windows";
		else this.OS = "mac";
	};

	/**
	 * UserAgentチェック
	 * @method checkUA
	 */
	Member.checkUA = function() {
		var _self = this,
			_d = document,
			_UA = "",
			_UAver = "",
			_wn = window.navigator,
			_wnUA = _wn.userAgent.toLowerCase(),
			_wnVer = _wn.appVersion.toLowerCase();

		//ブラウザ確認
		if (_wnUA.indexOf("msie") !== -1) {
			_UA = "ie";
			if (_wnVer.indexOf("msie 8.") !== -1) _UAver = 'ie8';
			else if (_wnVer.indexOf("msie 9.") !== -1) _UAver = "ie9";
			else _UAver = "ie10";
		} else if (_wnUA.indexOf('trident/7') !== -1) {
			_UA = "ie";
			_UAver = 'ie11';
		} else {
			if (_wnUA.indexOf("firefox") !== -1) _UA = "firefox";
			else _UA = "webkit";
		};

		if (_UAver === "ie8" || _UAver === "ie9") document.getElementsByTagName("html")[0].className = _UAver;

		//互換モード対応
		if (_d.documentMode === 8){
			_UAver = "ie8";
			document.getElementsByTagName("html")[0].className = "ie8";	
		}

		//値をプロパティに帰属させる
		_self.UA = _UA;
		_self.IEver = _UAver;
	};
	
	/**
	 * 閲覧環境：IE8以下判定
	 * @method getIsIe8
	 * @return {Boolean} ブラウザの判定
	 */
	Member.getIsIe8 = function(){
		var _flg = false;
		if(typeof window.addEventListener == "undefined" && typeof document.querySelectorAll == "undefined") _flg = false;
		else if(this.getIsIe8Under() === true) _flg = true;
		return _flg;
	};

	/**
	 * 閲覧環境：IE9判定
	 * @method getIsIe9
	 * @return {Boolean} ブラウザの判定
	 */
	Member.getIsIe9 = function(){
		var _self= this,
			_flg = false,
			_und = "undefined";
		if(_self.getIsIe8Under() === true) _flg = false;
		else if(_self.getIsIe9Under() === true) _flg = true;
		return _flg;
	};

	/**
	 * 閲覧環境：IE8以下判定
	 * @method getIsIe8Under
	 * @return {Boolean} ブラウザの判定
	 */
	Member.getIsIe8Under = function(){
		var _flg = false,
			_und = "undefined";
		if(typeof window.addEventListener == _und && typeof document.getElementsByClassName == _und) _flg = true;
		return _flg;
	};

	/**
	 * 閲覧環境：IE9以下判定
	 * @method getIsIe9Under
	 * @return {Boolean} ブラウザの判定
	 */
	Member.getIsIe9Under = function(){
		var _flg = false;
		if(document.uniqueID && typeof window.matchMedia == "undefined") _flg = true;
		return _flg;
	};

	/**
	 * PC・モバイル　デバイスチェック
	 * @method checkDevice
	 */
	Member.checkDevice = function() {
		var _self = this,
			_device = "pc",
			_deviceUA = navigator.userAgent,
			_isMobile = false;

		if ((_deviceUA.indexOf('Android') > 0 && _deviceUA.indexOf('Mobile') == -1) || _deviceUA.indexOf('A1_07') > 0 || _deviceUA.indexOf('SC-01C') > 0 || _deviceUA.indexOf('iPad') > 0) {
			_isMobile = true;
			_device = "tablet";
		} else if ((_deviceUA.indexOf('iPhone') > 0 && _deviceUA.indexOf('iPad') == -1) || _deviceUA.indexOf('iPod') > 0 || (_deviceUA.indexOf('Android') > 0 && _deviceUA.indexOf('Mobile') > 0)) {
			_isMobile = true;
			_device = "sp";
		};

		_self.device = _device;
		_self.isMobile = _isMobile;
	};

	/**
	 * Flashプレーヤーの有無をチェック
	 * @method checkFlash
	 */
	Member.checkFlash = function() {
		var _isFlashInstalled = function() {
			if (navigator.plugins["Shockwave Flash"]) {
				return true;
			}
			try {
				new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
				return true;
			} catch (e) {
				return false;
			}
		}();
		this.hasFlashPlayer =  _isFlashInstalled && !$.device("android") ? true : false;
	};

	/**
	 * URLのクエリチェック
	 * @method checkURLQuery
	 */
	Member.checkURLQuery = function() {
		var _self = this,
			_queryTxt = location.search;
		if (_queryTxt.length === 0) return false;
		_self.hasQuery = true;
		_self.urlQuery = _queryTxt.substr(1).split("&").toString();
	};


	

	window.UserInfo = UserInfo;
})(window, document);

;(function(window,document){
	"use strict";

	
	
	
	/**
	 * 多用する単純な処理をまとめたクラス
	 * ・dom情報取得
	 * ・サイズ取得
	 * ・座標取得
	 * ・IE判定
	 * @class Utility
	 * @constructor
	 */
	var Utility = function(){},
		Method = Utility.prototype;
	
	
	
	
	/* Method
	--------------------------------------------------------------------*/
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
	 * domの座標
	 * @param   {object} _elm 座標を取得したいdom要素
	 *　@returns {object} 座標情報のオブジェクト
	 */
	Method.getDomPoint = function(_elm){
		var _rect 	= _elm.getBoundingClientRect(),
			_left 	= (_rect.left + window.pageXOffset)|0,
			_top	= (_rect.top + window.pageYOffset)|0;
		return {top:_top,left:_left};
	};
	
	/**
	 * domのx座標
	 * @param   {object} _elm 座標を取得したいdom要素
	 *　@returns {object} 座標情報のオブジェクト
	 */
	Method.getDomLeft = function(_elm){
		var _rect 	= _elm.getBoundingClientRect(),
			_left 	= (_rect.left + window.pageXOffset)|0;
		return _left;
	};

	/**
	 * domのy座標
	 * @param   {object} _elm 座標を取得したいdom要素
	 *　@returns {object} 座標情報のオブジェクト
	 */
	Method.getDomTop = function(_elm){
		var _rect 	= _elm.getBoundingClientRect(),
			_top	= (_rect.top + window.pageYOffset)|0;
		return _top;
	};

	/**
	* 座標取得：マウスポインタ座標取得
	* @method getMousePoint
	* @param{Event} ターゲットイベント
	* @return{Object} オブジェクト
	*/
	Method.getMousePoint = function(e){
		var point = {x:0,y:0},
			doc = document.body, 
			ev = event;
		if(e){
			point.x = e.pageX;
			point.y = e.pageY;
		}else{
			point.x = ev.x + doc.scrollLeft;
			point.y = ev.y + doc.scrollTop;
		}
		return point;
	};

	/**
	 * 年数表記を自動で現在の値に書き換える
	 * @method writeYearString
	 * @param {String} id 年数を囲っているid
	 * @example obj.writeYearString();
	 */
	Method.writeYearTxt = function(id){
		var _id = id || "nowYear",
			_now_year = new Date().getFullYear();
		document.getElementById(_id).innerHTML += _now_year;
	};

	
	
	
	var instance = new Utility();
	window.Utility = instance;
})(window, document);

