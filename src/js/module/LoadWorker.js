/* ワーカー　インスタンス作成
 * ファイルを指定しワーカースレッドを作成
*/
//var worker = new Worker("src/js/lib/test.js");
//worker.postMessage();/* ワーカー作成したら、postMessage()メソッドを呼び出してワーカー開始*/
//worker.addEventListener("message",function(e){/*message受信*/
//	console.log("test:",e.data);
//},false);
//worker.postMessage("hello world?");/*message発信*/



/*Constructor
--------------------------------------------------------------------*/
/**
 * 画像ロード用WebWorker
 * @param   {Object}  a_opt プロパティ設定用オブジェクト
 * @returns {Boolean} WebWorke未実装の場合は分岐
 */
var LoadWorker = function(a_opt){
	var _self 	= this,
		_opt	= a_opt,
		_path	= "http://" + window.location.host + window.location.pathname;
	
	//プロパティ設定
	_self.workerURL = _opt.workerURL;
	_self.imgURLSet	= _opt.imgURLSet;
	_self.htmlURL 	= _path.slice(0,_path.lastIndexOf("/")+1);
	_self.completeCallback = _opt.completeCallback || _self.completeCallback; 
	for(var _key in _self.imgURLSet) _self.loadStateAry[_key] = false;

	
	//Workerオブジェクトの有無を確認
	//有る場合はインスンタンス作成
	if(!window.Worker) return false;
	
	_self.hasWorker = true;
	_self.worker = new Worker(_self.workerURL);
	_self.worker.addEventListener("message",function(e){
		_self.requestComplete(e);
	},false);
},
	_LoadWorker = LoadWorker.prototype;




/*Property
--------------------------------------------------------------------*/
_LoadWorker.worker			= null;

//URL情報
_LoadWorker.workerURL		= null;
_LoadWorker.htmlURL			= null;
_LoadWorker.imgURLSet		= null;

//ロード状況
_LoadWorker.loadCount		= 0;
_LoadWorker.loadStateAry 	= {};
_LoadWorker.completeCount	= 0;

//各ロード時にデータを格納する配列
_LoadWorker.dataAry			= null;
_LoadWorker.dataLen			= null;

//待機用データセット配列
_LoadWorker.waitDataAry		= [];
_LoadWorker.waitDataLen		= 0;

//状態
_LoadWorker.hasWorker 		= false;
_LoadWorker.isLoading		= false;

//コールバック関数
_LoadWorker.completeCallback = function(){};




/*Method
--------------------------------------------------------------------*/
/**
 * 画像読み込み
 * 処理が重なった場合、ロード中のセット以外は待機用配列に格納される
 * @param   {String}  a_name 画像URLセットのラベル
 * @return {Boolean} 引数のラベルと画像セットのラベルが合わない場合は終了
 */
_LoadWorker.load	= function(a_name){
	var _self = this,
		_name = a_name;

	if(_self.isLoading === false){
		if(_self.loadStateAry[_name] === true) return false;
		_self.loadStateAry[_name] = true;
		_self.dataRequest(_name);
	}else {
		//待機用配列に格納
		_self.waitDataAry.push(_name);
		_self.waitDataLen++;
	}
};

/**
 * 待機中の画像セットの呼出
 */
_LoadWorker.waitLoad = function(){
	var _self = this;
	_self.load(_self.waitDataAry[0]);
	_self.waitDataAry.shift();
	_self.waitDataLen--;
	_self.completeCount = 0;
};

/**
 * ロードする画像セットを追加する
 */
_LoadWorker.pushImgSet = function(a_obj){
	var _self = this,
		_obj = a_obj;

	for(var _key in _obj) {
		_self.imgURLSet[_key] 	= _obj[_key];
		_self.loadStateAry[_key]= false;
	}
};

/**
 * ロード対象の画像セットを子Workerに通知して読み込み
 * WebWorker未対応の場合は、通常の読み込みに分岐
 * @param {String} a_name 対象セットのラベル
 */
_LoadWorker.dataRequest	= function(a_name){
	var _self 	= this,
		_htmlurl= _self.htmlURL,
		_imgSet	= _self.imgURLSet[a_name],
		_len 	=_imgSet.length;

	_self.isLoading = true;
	
	_self.dataAry 	= _imgSet;
	_self.loadCount	= 0;
	_self.dataLen 	= _len;

	for(var i=0; i<_len; i++){
		var _imgurl = _htmlurl + _imgSet[i];
		_self.dataAry[i] = _imgurl;
	}
	
	if(_self.hasWorker === true) _self.worker.postMessage(_imgSet);
	else _self.imgRequest_notWorker();
	
};

/**
 * WebWorker無し　画像単体を読み込み
 * @returns {Boolean} セット内の画像数の分、ロードを回したら終了
 */
_LoadWorker.imgRequest_notWorker	= function(){
	var _self	= this,
		_url	= _self.dataAry[_self.loadCount],
		_image	= new Image();

	if(_self.loadCount === _self.dataLen) return false;
	_self.loadCount += 1;
	_image.addEventListener("load",function(){
		_self.completeCallback(_url);
	},false);
	_image.src = _url;

	setTimeout(function(){_self.imgRequest_notWorker();},200);
};

/**
 * 画像読み込み後のコールバック（各画像毎）
 * インスタンス側から処理を実装
 */
_LoadWorker.requestComplete	  = function(a_data){
	var _self = this,
		_img = _self.dataAry[a_data.data];
	_self.completeCallback(_img);
	_self.completeCount++;
	
	if(_self.dataLen !== _self.completeCount) return false;
	_self.isLoading = false;
	if(_self.waitDataLen > 0) _self.waitLoad();
};



