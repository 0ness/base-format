/**
 * @class PageInfo
 * OS・ブラウザ・ページの情報を取得する
 * 基本的には他クラスファイル又はグローバルな処理の際に使用
 */
function PageInfo(){
	var _t = this;
	_t.osCheck();
	_t.uaCheck();
	_t.deviceCheck();
};
PageInfo.prototype = {
	OS:"",
	UA:"",
	ID:"",
	Class:"",
	VER:"not IE",	//ブラウザバージョン IE用
	mobile:false,	//スマートフォン判定
	device:"pc",

	/**
	 * IDの取得（IEの場合はwrapperにIE追加）
	 */
	getID:function(){
		var _t = this,
			_bodys = document.getElementsByTagName("body")[0],
			_classStr = this.UA;

		_t.ID = _bodys.getAttribute('id');
		_t.Class = _bodys.getAttribute("class");
	},

	/**
	 * OSチェック
	 */
	osCheck:function(){
		if (navigator.platform.indexOf("Win") != -1) this.OS = "windows";
		else this.OS = "mac";
	},

	/**
	 * UserAgentチェック
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
		_t.VER = _UAver;
	},

	/**
	 * PC・モバイル　デバイス・UAチェック
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
		_t.mobile = _isMobile;
	},

	/**
	 * クエリチェック
	 */
	ulrQueryCheck:function(){
		var _queryStr = "id=PC",
			_queryLen = location.search;

		if (_queryLen.length === 0) return false;
		_queryStr = _queryLen.substr(1).split("&").toString();
		if(_queryStr === "id=PC") this.mobile = false;
		else if(_queryStr === "id=SP") this.mobile = true;
	},

	/**
	 * PC用css記述
	 * @param   {String} _path cssファイルのパス
	 */
	setPcCSS:function(_path){
		if(this.mobile === true) return false;
		var _doc = document,
			_link = _doc.createElement('link');
		_link.href = _path;
		_link.type = 'text/css';
		_link.rel = 'stylesheet';
		_doc.getElementsByTagName('head').item(0).appendChild(_link);
	},

	/**
	 * モバイル用css記述
	 * @param   {String}  _path cssファイルのパス
	 */
	setMobileCSS:function(_path){
		if(this.mobile === false) return false;
		var _doc = document,
			_link = _doc.createElement('link');
		_link.href = _path;
		_link.type = 'text/css';
		_link.rel = 'stylesheet';
		_doc.getElementsByTagName('head').item(0).appendChild(link);
	},

	/**
	 * viewport記述
	 * @param {Number} _width ビューポートの指定値
	 */
	setViewPort:function(_width){
		var _doc = document,
			_property = (this.mobile === true) ? 'width=device-width' : 'width=' + _width + 'px',
			_meta = _doc.createElement('meta');
		_meta.setAttribute('name','viewport');
		_meta.setAttribute('content',_property);
		_doc.getElementsByTagName('head')[0].appendChild(_meta); 
	}
}
