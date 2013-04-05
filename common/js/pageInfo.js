/*==============================================================================

	コンテンツ共通　ページ情報オブジェクト
	
	・基本の状態を維持する必要は無く、プロジェクトによってカスタマイズする
	
	・head内で読み込ませて使用
	・戻り値の関数は分岐処理などに利用する
	・CSS読み込み
	・viewportなどを操作する
	
==============================================================================*/


function PageContent(){
	
	//ユーザー情報///////////////////////////////////////
	var user = {
		UA:"",				//ユーザーエージェント
		VER:"not IE",		//ブラウザバージョン IE用
		mobile:false,		//スマートフォン判定
		device:"pc",
		check:function(){	//ブラウザ判定		
			var _qs = "id=PC";
			var _ua = navigator.userAgent;
			var _wn = window.navigator;
			var _userAgent = _wn.userAgent.toLowerCase();
			var _appVersion = _wn.appVersion.toLowerCase();

			//スマートフォン UA確認
			if(_ua.indexOf('iPhone') !== -1){
				this.device = "iphone";
				this.mobile = true;
			}else if(_ua.indexOf('Android') !== -1){
				this.device = "Android";
				this.mobile = true;
			}
			
			//クエリ確認
			if (location.search.length !== 0) {
				_qs = location.search.substr(1).split("&");	
				if(_qs == "id=PC"){
					this.mobile = false;
				}else if(_qs == "id=SP"){
					this.mobile = true;
				}
			}
			
			//ブラウザ確認
			if(_userAgent.indexOf("msie") !== -1){
				this.UA = "ie";				
				if (_appVersion.indexOf("msie 8.") !== -1) {
					this.VER = 'ie8';
				} else if (_appVersion.indexOf("msie 7.") !== -1) {
					this.VER =  'ie7';
				} else if (_appVersion.indexOf("msie 6.") !== -1) {
					this.VER = 'ie6';
				}else{
					this.VER = "ie9";	//IE9以上
				};
			}else{
				if(_userAgent.indexOf("firefox") !== -1){
					this.UA = "firefox";
				}else {
					this.UA = "webkit";				
				}
			}
			
			//2/4に削除
			//this.mobile = false;
									
			return false;
		}
	};
	user.check();
	
	
	//ページ情報///////////////////////////////////////
	var content = {
		ID:"",				//ページid
		Category:"",		//ページclass
		check:function(){ //ページid・classの取得
			var bodys = document.getElementsByTagName("body")[0];
			this.ID = bodys.getAttribute('id');
			this.Category = bodys.getAttribute("class");
			return false;
		}
	}


	//HEAD要素　動的記述///////////////////////////////////////
	var HEAD = {
		pcCSS:function(css){	//PC用	css記述
			var _STR = css;
			if(user.mobile !== true){
				var link = document.createElement('link');
				link.href = _STR;
				link.type = 'text/css';
				link.rel = 'stylesheet';
				var head = document.getElementsByTagName('head');
				head.item(0).appendChild(link);
			}
			return false;
		},
		mobileCSS:function(css){	//モバイル用css記述
			var _STR = css;
			if(user.mobile === true){
				var link = document.createElement('link');
				link.href = _STR;
				link.type = 'text/css';
				link.rel = 'stylesheet';
				var head = document.getElementsByTagName('head');
				head.item(0).appendChild(link);
			}
			return false;
		},
		responseViewPort:function(){	//viewport記述
			var _str = 'width=950px';
			var meta = document.createElement('meta');
			meta.setAttribute('name','viewport');
			if(user.mobile === true) _str = 'width=device-width';		
			meta.setAttribute('content',_str);
			document.getElementsByTagName('head')[0].appendChild(meta);
		},
		IE:function(css,js){	//IE分岐コメント記述　テスト中
			if(user.VER === "ie8" || user.VER === "ie7" || user.VER === "ie6"){
				var link = document.createElement('link');
				link.href = css;
				link.type = 'text/css';
				link.rel = 'stylesheet';
				
				var script = document.createElement("script");
				script.src = js;
				script.type = "text/javascript";
				
				var head = document.getElementsByTagName('head');
				head.item(0).appendChild(link);
				head.item(0).appendChild(script);
			}
		}
	}
	

	//明示型 Getterメソッド///////////////////////////////////////
	return {
		UA:function(){		return user.UA; },//ユーザーエージェント
		VER:function(){ 	return user.VER; },//ブラウザバージョン
		ID:function(){		return content.ID; },//ページid
		device:function(){return user.device; },//スマートフォンOS
		idCheck:function(){ 	return content.check(); },//ページid情報取得
		Category:function(){	return content.Category; },//ページclass
		width:function(){		return size.check(); },//ページ幅
		mobile:function(){ 	return user.mobile; },//モバイル判定
		pcCSS:function(css){			return HEAD.pcCSS(css); },//CSS動的読み込み
		mobileCSS:function(css){	return HEAD.mobileCSS(css); },//CSS動的読み込み
		viewport:function(){ return HEAD.responseViewPort(); },//viewport動的変更
		ie:function(css,js){ return HEAD.IE(css,js); }
	}					
}



//インスタンス///////////////////////////////////////	
var page = new PageContent();