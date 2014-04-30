/*==============================================================================

	�R���e���c���ʁ@�y�[�W���I�u�W�F�N�g
	
	�E��{�̏�Ԃ��ێ�����K�v�͖����A�v���W�F�N�g�ɂ���ăJ�X�^�}�C�Y����
	
	�Ehead���œǂݍ��܂��Ďg�p
	�E�߂�l�̊֐��͕��򏈗��Ȃǂɗ��p����
	�ECSS�ǂݍ���
	�Eviewport�Ȃǂ𑀍삷��
	
==============================================================================*/
var PageInfo = function(){
	
	var doc = document;
	
	/*object ���[�U�[���
	--------------------------------------------------------------------*/
	var user = {
		UA:"",				//���[�U�[�G�[�W�F���g
		VER:"not IE",		//�u���E�U�o�[�W���� IE�p
		mobile:false,		//�X�}�[�g�t�H������
		device:"pc",
		check:function(){	//�u���E�U����		
			var _qs = "id=PC";
			var _ua = navigator.userAgent;
			var _wn = window.navigator;
			var _userAgent = _wn.userAgent.toLowerCase();
			var _appVersion = _wn.appVersion.toLowerCase();
			var _ls = location.search;

			//�X�}�[�g�t�H�� UA�m�F
			if(_ua.indexOf('iPhone') !== -1){
				this.mobile = true;
                var height_num = screen.height * window.devicePixelRatio;
                if( height_num === 1136) this.device = "iphone5";
                else this.device = "iphone";
            }else if(_ua.indexOf('Android') !== -1){
				this.device = "Android";
				this.mobile = true;
			}else if(_ua.indexOf('iPad') !== -1){
                var height_num = screen.height * window.devicePixelRatio;
                if( height_num === 2048) this.device = "ipad3";
                else this.device = "ipad";
			}
			
			//�N�G���m�F
			if (_ls.length !== 0) {
				_qs = _ls.substr(1).split("&").toString();	
				if(_qs === "id=PC") this.mobile = false;
				else if(_qs === "id=SP") this.mobile = true;
			}
			
			//�u���E�U�m�F
			if(_userAgent.indexOf("msie") !== -1){
				this.UA = "ie";
				if(_appVersion.indexOf("msie 8.") !== -1) this.VER = 'ie8';
				else if (_appVersion.indexOf("msie 7.") !== -1) this.VER =  'ie7';
				else if (_appVersion.indexOf("msie 6.") !== -1) this.VER = 'ie6';
				else if (_appVersion.indexOf("msie 6.") !== -1) this.VER = "ie9";	//IE9�ȏ�
                else this.VER = "ie10";
            }else if(_userAgent.indexOf('trident/7') != -1){
				this.UA = "ie";
                this.VER = 'ie11';
			}else{
				if(_userAgent.indexOf("firefox") !== -1) this.UA = "firefox";
				else this.UA = "webkit";				
			};
			
			return false;
		}
	};
	user.check();
	
	
	/*object �y�[�W���
	--------------------------------------------------------------------*/
	var content = {
		ID:"",				//�y�[�Wid
		Category:"",		//�y�[�Wclass
		check:function(){ //�y�[�Wid�Eclass�̎擾
			var bodys = doc.getElementsByTagName("body")[0];
			var classStr = user.UA;
            
			this.ID = bodys.getAttribute('id');
			this.Category = bodys.getAttribute("class");
            
			if(classStr !== "ie") doc.getElementById("wrapper").className = classStr;
			return false;
		}
	};
	content.check();


	/*object HEAD�v�f�@���I�L�q
	--------------------------------------------------------------------*/
	var HEAD = {
		pcCSS:function(css){	//PC�p	css�L�q
			if(user.mobile === false){
				var _STR = css;
				var link = doc.createElement('link');
				var head = doc.getElementsByTagName('head');
				link.href = _STR;
				link.type = 'text/css';
				link.rel = 'stylesheet';
				head.item(0).appendChild(link);
			}
			return false;
		},
		mobileCSS:function(css){	//���o�C���pcss�L�q
			if(user.mobile === true){
				var _STR = css;
				var link = doc.createElement('link');
				var head = doc.getElementsByTagName('head');
				link.href = _STR;
				link.type = 'text/css';
				link.rel = 'stylesheet';
				head.item(0).appendChild(link);
			}
			return false;
		},
		responseViewPort:function(){	//viewport�L�q
			var _str = 'width=950px';
			var meta = doc.createElement('meta');
			meta.setAttribute('name','viewport');
			if(user.mobile === true) _str = 'width=device-width';		
			meta.setAttribute('content',_str);
			doc.getElementsByTagName('head')[0].appendChild(meta);
		}
	};
	
	
	/*function �߂�l�֐�
	--------------------------------------------------------------------*/
	return {
		UA:function(){    return user.UA; },//���[�U�[�G�[�W�F���g
		VER:function(){   return user.VER; },//�u���E�U�o�[�W����
		ID:function(){    return content.ID; },//�y�[�Wid
		Category:function(){  return content.Category; },//�y�[�Wclass
		device:function(){    return user.device; },//�X�}�[�g�t�H��OS
		idCheck:function(){   return content.check(); },//�y�[�Wid���擾
		mobile:function(){    return user.mobile; },//���o�C������
		pcCSS:function(css){  return HEAD.pcCSS(css); },//CSS���I�ǂݍ���
		mobileCSS:function(css){  return HEAD.mobileCSS(css); },//CSS���I�ǂݍ���
		viewport:function(){  return HEAD.responseViewPort(); },//viewport���I�ύX
		uaClass:function(){   return content.uaClass();}//UA���N���X���Ƃ���html�ɕt������
	}
};
