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
	 * @method checkIE8
	 */
	Member.checkIE8 = function(){
		var _flg = false;
		if(typeof window.addEventListener == "undefined" && typeof document.querySelectorAll == "undefined") _flg = false;
		else if(this.checkIE8Under() === true) _flg = true;
		return _flg;
	};

	/**
	 * 閲覧環境：IE9判定
	 * @method checkIE9
	 */
	Member.checkIE9 = function(){
		var _self= this,
			_flg = false,
			_und = "undefined";
		if(_self.checkIE8Under() === true) _flg = false;
		else if(_self.checkIE9Under() === true) _flg = true;
		return _flg;
	};

	/**
	 * 閲覧環境：IE8以下判定
	 * @method checkIE8Under
	 */
	Member.checkIE8Under = function(){
		var _flg = false,
			_und = "undefined";
		if(typeof window.addEventListener == _und && typeof document.getElementsByClassName == _und) _flg = true;
		return _flg;
	};

	/**
	 * 閲覧環境：IE9以下判定
	 * @method checkIE9Under
	 */
	Member.checkIE9Under = function(){
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
