;(function(window, document) {
	"use strict";




	/*Constructor
   --------------------------------------------------------------------*/
	/**
     * @class INDEX
     * @constructor
     * Instagramをシンプルに読み込むのを目的にしている
     * サクセス・エラーの処理を変更できるようにする
     */
	var InstaViewr = function(_param) {
		var _param = _param || {};
				
		//Public Property
		this.data			= [];
		this.viewCount 		= _param.viewCount || this.defaultViewCount;
		this.viewElm		= _param.viewElm || this.defaultViewElm;
		this.$viewElm		= $(this.viewElm);
		this.tags			= _param.tags || [];
		this.onLoadedDisplay= _param.onLoadedDisplay || true;
		
		//Private Property
		this.accessToken	= _param.accessToken;
		this.userId			= _param.userId || "self";
		this.accessUrl		= "https://api.instagram.com/v1/users/"+ this.userId +"/media/recent?count="+this.viewCount;
		
		//Public Property
		this.errorFunc 		= _param.error || this.defaultErrorFunc;	//エラー処理：パラメータでオーバーライド可能
		this.successFunc	= _param.success || this.defaultSuccessFunc;//サクセス処理：パラメータでオーバーライド可能
		
		
		if(!_param.optionallyLoad) this.load();
	},
		Member = InstaViewr.prototype;
	
	
	
	
	/*Private Static Propery
	--------------------------------------------------------------------*/
	Member.defaultViewCount	= 20;
	Member.defaultViewElm	= document.getElementById("instaViewContainer");
	Member.defaultListId	= "instaPhotoList";
	
	
	
	
	/*Private Static Method
	--------------------------------------------------------------------*/
	/**
	 * エラー時の処理
	 */
	Member.defaultErrorFunc = function(){
		this.$viewElm.html('<p class="txt01">情報の取得に失敗しました。リロードするか時間を開けてアクセスして下さい。</p>');
	};

	/**
	 * aJaxサクセス時の処理
	 * @param {object} _photoData jsonデータ
	 */
	Member.defaultSuccessFunc = function(){
		this.addImages();
	};

	
	
	
	/*Public Method
	--------------------------------------------------------------------*/
	/**
	 * ローディング用関数
	 */
	Member.load = function(){
		var _self = this;
		$.ajax({
			url: _self.accessUrl,
			data: {
				access_token: _self.accessToken,
				count: _self.viewCount
			},
			cache	: false,
			dataType: "jsonp",
			error	: _self.errorFunc,
			success	: function(_data){
				_self.data = _data.data;
				if(_self.onLoadedDisplay) _self.successFunc();
			}
		});
	};
	
	/**
	 * 画像をデータから生成して配置
	 */
	Member.addImages = function(){
		this.viewElm.innerHTML = '<ul id="'+this.defaultListId+'">';
		var _photoData 	= this.data,
			_list 		= document.getElementById(this.defaultListId),
			_htmlStr	= "";

		for (var i = 0; i < _photoData.length; i++) {
			var _data 		= _photoData[i],
				_imgStr		= "<img src='"+ _data.images.standard_resolution.url +"' width='640' height='640' alt='"+ _data.caption.text +"'>",
				_linkStr 	= "<a href='"+ _data.link +"' target='_blank'>"+ _imgStr +"</a>",
				_listStr 	= "<li>"+ _linkStr +"</li>";

			if(this.judgeHushTag(_data.tags) === false) continue;
			_htmlStr += _listStr;
		};
		_list.innerHTML = _htmlStr;
	};
	
	/**
	 * ハッシュタグ指定の有無を判定し、該当したらしたtrueを返す
	 * @param   {Array}   _data 画像に付属しているハッシュタグ
	 *　@returns {boolean} 該当かどうかの正否値
	 */
	Member.judgeHushTag = function(_data){
		if(this.tags.length === 0 || this.tags === []) return true;
		
		var _tags = this.tags,
			_data = _data;
		
		for(var i=0; i<_tags.length; i++){
			for(var n=0; n<_data.length; n++) if(_tags[i] === _data[n]) return true;
		};
		return false;
	};

	
	
	
	window.InstaViewr = InstaViewr;
})(window, document);




//test
var instaViewr = new InstaViewr({
	//required property
	accessToken	:'4831897.1d9d751.662aec7267ae4d9c9d6a37413c5d7297',
	
	//option property
	userId		:"4831897",
	viewCount	:8,
	tags		:[]
	
	//override function
//	success:function(data){
//		console.log(data);
//	}
});





