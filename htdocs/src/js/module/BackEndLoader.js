/*Constructor
--------------------------------------------------------------------*/
var BackEndLoader = function(){
	var _self = this;
	
	//親Workerインスタンスからmessageされたらイベント発火 
	self.addEventListener("message",function(e){
		_self.getData(e.data);
	},false);
},
	_BackEndLoader = BackEndLoader.prototype;




/*Property
--------------------------------------------------------------------*/
_BackEndLoader.xhr			= null;
_BackEndLoader.data			= null;
_BackEndLoader.dataLen		= null;
_BackEndLoader.loadCounter	=0;




/*Method
--------------------------------------------------------------------*/
/**
 * 親Wokerから画像配列データ取得
 * @param {Array} a_data 画像URLセット
 */
_BackEndLoader.getData = function(a_data){
	var _self = this,
		_data = a_data;

	_self.loadCounter 	= 0;
	_self.data 			= _data;
	_self.dataLen 		= _data.length;
	_self.imgRequest();
};

/**
 * 画像データ　リクエスト処理
 */
_BackEndLoader.imgRequest = function(){
	var _self = this,
		_data = _self.data,
		_len = _self.dataLen;

	for(var i = 0; i<_len; i++){
		(function () {
			var _url = _self.data[i],
				_xhr = new XMLHttpRequest();

			//load完了の通知
			_xhr.addEventListener("load", function(){
				postMessage(i);
			}, false);
			
			_xhr.open("GET",_url,false)
			_xhr.send(null);
		}(i));
	};
}

var BEL = new BackEndLoader();