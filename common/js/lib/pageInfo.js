/**
 * OS・UA・ページの情報を取得・操作する  
 * ・コンストラクタで情報を取得し、インスタンスの変数から参照する  
 * ・OS・UA・デバイス判定  
 * ・css読み込み・viewport表示変更
 * @class PageInfo
 * @constructor
 * @example var obj = new PageInfo();  
 * if(obj.isMobile === true) return false;
 */
function PageInfo(){
	var _t = this;
	_t.osCheck();
	_t.uaCheck();
	_t.deviceCheck();
};
PageInfo.prototype = {
	
	/**
	 * 閲覧環境：OS
	 * @property {String} OS
	*/
	OS:"",
	/**
	 * 閲覧環境：ユーザーエージェント
	 * @property {String} UA
	*/
	UA:"",
	/**
	 * 閲覧環境：ieのバージョン
	 * @property {String} IEver
	*/
	IEver:"not IE",
	/**
	 * 閲覧環境：モバイル判定
	 * 判定の範囲は随時更新する
	 * @property {Boolean} isMobile
	*/
	isMobile:false,
	/**
	 * 閲覧環境：デバイスの種類
	 * @property {String} device
	*/
	device:"pc",
	/**
	 * ページ情報：閲覧しているページのbody要素のid  
	 * サイト毎で起点となる要素は変更する
	 * @property {String} id
	*/
	id:"",
	/**
	 * ページ情報：閲覧しているページのbody要素のclass  
	 * サイト毎で起点となる要素は変更する
	 * @property {String} class
	*/
	class:"",
	/**
	 * ページ情報：URLのクエリ情報  
	 * @property {String} urlQuery
	*/
	urlQuery:"",

	
	/**
	 * IDの取得（IEの場合はwrapperにIE追加）
	 * @method getID
	 */
	getID:function(){
		var _t = this,
			_bodys = document.getElementsByTagName("body")[0],
			_classStr = this.UA;

		_t.id = _bodys.getAttribute('id');
		_t.class = _bodys.getAttribute("class");
	},
	
	/** 
	 * OSチェック
	 * @method osCheck
	 */
	osCheck:function(){
		if (navigator.platform.indexOf("Win") != -1) this.OS = "windows";
		else this.OS = "mac";
	},

	/**
	 * UserAgentチェック
	 * @method uaCheck
	 */
	uaCheck:function(){
		var _t = this,
			_d = document,
			_UA = "",
			_UAver = "",
			_wn = window.navigator,
			_wnUA = _wn.userAgent.toLowerCase(),
			_wnVer = _wn.appVersion.toLowerCase();

		//ブラウザ確認
		if(_wnUA.indexOf("msie") !== -1){
			_UA = "ie";
			if(_wnVer.indexOf("msie 8.") !== -1) _UAver = 'ie8';
			else if (_wnVer.indexOf("msie 9.") !== -1) _UAver = "ie9";
			else if (_wnVer.indexOf("msie 7.") !== -1) _UAver = 'ie7';
			else if (_wnVer.indexOf("msie 6.") !== -1) _UAver = 'ie6';
			else _UAver = "ie10";
		}else if(_wnUA.indexOf('trident/7') !== -1){
			_UA = "ie";
			_UAver = 'ie11';
		}else{
			if(_wnUA.indexOf("firefox") !== -1) _UA = "firefox";
			else _UA = "webkit";
		};

		if(_UAver === "ie8" || _UAver === "ie9") _d.getElementById("wrapper").className = _UAver;
		//互換モード対応
		if(_d.documentMode === 8) _d.getElementById("wrapper").className = "ie8";

		//値をプロパティに帰属させる
		_t.UA = _UA;
		_t.IEver = _UAver;
	},

	/**
	 * PC・モバイル　デバイス・UAチェック
	 * @method deviceCheck
	 */
	deviceCheck:function(){
		var _t = this,
			_device = "pc",
			_deviceUA = navigator.userAgent,
			_isMobile = false;

		if((_deviceUA.indexOf('Android') > 0 && _deviceUA.indexOf('Mobile') == -1) || _deviceUA.indexOf('A1_07') > 0 || _deviceUA.indexOf('SC-01C') > 0 || _deviceUA.indexOf('iPad') > 0){
			_isMobile = true;
			_device = "tablet";
		}else if ((_deviceUA.indexOf('iPhone') > 0 && _deviceUA.indexOf('iPad') == -1) || _deviceUA.indexOf('iPod') > 0 || (_deviceUA.indexOf('Android') > 0 && _deviceUA.indexOf('Mobile') > 0)){
			_isMobile = true;
			_device = "sp";
		};

		_t.device = _device;
		_t.isMobile = _isMobile;
	},

	/**
	 * クエリチェック
	 * @method ulrQueryCheck
	 */
	ulrQueryCheck:function(){
		var _queryLen = location.search;
		if (_queryLen.length === 0) return false;
		this.urlQuery = _queryLen.substr(1).split("&").toString();
	},

	/**
	 * PC用css記述
	 * @method setPcCSS
	 * @param   {String} _path cssファイルのパス
	 */
	setPcCSS:function(_path){
		if(this.isMobile === true) return false;
		var _doc = document,
			_link = _doc.createElement('link');
		_link.href = _path;
		_link.type = 'text/css';
		_link.rel = 'stylesheet';
		_doc.getElementsByTagName('head').item(0).appendChild(_link);
	},

	/**
	 * モバイル用css記述
	 * @method setMobileCSS
	 * @param   {String}  _path cssファイルのパス
	 */
	setMobileCSS:function(_path){
		if(this.isMobile === false) return false;
		var _doc = document,
			_link = _doc.createElement('link');
		_link.href = _path;
		_link.type = 'text/css';
		_link.rel = 'stylesheet';
		_doc.getElementsByTagName('head').item(0).appendChild(_link);
	},

	/**
	 * viewport記述
	 * @method setViewPort
	 * @param {Number} _width ビューポートの指定値
	 */
	setViewPort:function(_width){
		var _doc = document,
			_property = (this.isMobile === true) ? 'width=device-width' : 'width=' + _width + 'px',
			_meta = _doc.createElement('meta');
		_meta.setAttribute('name','viewport');
		_meta.setAttribute('content',_property);
		_doc.getElementsByTagName('head')[0].appendChild(_meta); 
	}
}
