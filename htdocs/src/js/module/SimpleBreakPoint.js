;(function(window, document) {
	"use strict";
	
	
	

	/*Sub Class
	--------------------------------------------------------------------*/
	/**
	 * ブレークポイントの切替時に発火するイベント用サブクラス  
	 * PC用・SP用の関数を所持している
	 * @class FuncSet
	 * @constracutor
	 * @param {Function} a_pcfunc PCレイアウト切替時に実行する関数
	 * @param {Function} a_spfunc SPレイアウト切替時に実行する関数
	 */
	var FuncSet = function(a_pcfunc,a_spfunc){
		this.pcFunc = a_pcfunc;
		this.spFunc = a_spfunc;
	};
	
	
	
	
	/*Constructor
	--------------------------------------------------------------------*/
	/**
	 * PC・SP用にブレークポイントの切り替えを検知し、設定した処理を実行する
	 * ポイント数は１つ限定（それ以上は別クラスを作成して対応する）
	 * ブレークポイント切替時と関数指定時に、そのレイアウトの処理を実行
	 * @class SimpleBreakPoint
	 * @constructor
	 * @param {Number}   a_border ブレークポイント幅
	 * @example
	 * var SBP = new SimpleBreakPoint(768);  
	 * function pcFunc(){ pcレイアウト切替時の処理 };  
	 * function spFunc(){ spレイアウト切替時の処理 };
	 * SBP.addFuncSet(pcFunc,spFunc);
	 */
	var SimpleBreakPoint = function(_border) {

		/**
		 * ブレークポイントの境界値
		 * @property {Number} border
		 */
		this.border = _border;

		/**
		 * ブレークポイント切替時の関数用オブジェクトを格納する
		 * @property  {Array} functions
		 */
		this.functions 	= [];

		/**
		 * 関数の総数
		 * @property  {Number} funcLengh
		 */
		this.funcLengh	= 0;

		/**
		 * 現在のページの状態がPCかSPかを判断する為の正否値  
		 * @property {Boolean} isSP
		 */
		this.isSP	= null;

		/**
		 * 閲覧中のブラウザがIE8かを判断する為の正否値  
		 * @property {Boolean} isIE8
		 */
		this.isIE8	= null;

		/**
		 * リサイズ関数をremoveするための関数ラッパー  
		 * @property {Function} resizeEvent
		 */
		this.resizeEvent = null;
		
		this.init();
	},
		Member = SimpleBreakPoint.prototype;
	
	

	
	/*Method
	--------------------------------------------------------------------*/
	/**
	 * 初期化  
	 * コンストラクタ時にリサイズイベントを設定する
	 * @method init
	 */
	Member.init =  function() {
		var _self = this,
			_win = window;
		
		//IE分岐処理
		_self.isIE8 = _self.isIE8Under();
		if(_self.isIE8 === true) return false;

		/*eventHandlerを正確に実行するための処理
		resizeEventに処理を格納してからイベントハンドラを実行しないと、
		イベントがremoveされない
		不要な場合はラッパーせずそのままリサイズ時の処理をハンドラーに渡す
		*/

		//リサイズイベント処理 addEventListenerの有無でIE8と分岐
		if (_win.addEventListener) {
			_win.addEventListener("resize",function(){ _self.breakPointCheck(); },false);
		} else {
			_win.attachEvent('on' + "resize",function(){ _self.breakPointCheck(); });
		}
		
		setTimeout(function(){_self.breakPointCheck();},10);
	};

	/**
	 * リサイズイベントを破棄する
	 * @method delete
	 */
	Member.delete =  function() {
		var _self = this,
			_win = window;

		if (_win.removeEventListener)
			_win.removeEventListener("resize",_self.resizeEvent,false);
		else
			_win.detachEvent('on' + "resize", _self.resizeEvent);
	};

	/**
	 * リサイズ時にブレークポイントの状態を確認する  
	 * ウィンドウ幅とブレークポイント幅を確認し、  
	 * PC・SPの切り替わりが判定された場合、設定した関数を実行する
	 * @method breakPointCheck
	 */
	Member.breakPointCheck =  function() {
		var _winW 		= window.innerWidth || document.documentElement.clientWidth,
			_breakpoint = this.border,
			_isSP 		= this.isSP,
			_isSP_now 	= false;

		//ブレークポイントとウィンドウ幅の差異を確認
		if (_breakpoint < _winW) _isSP_now = false;
		else _isSP_now = true;


		//判定後、ブレークポイントが切り替わった時点でコールバック関数処理
		if (_isSP === _isSP_now) return false;

		if (_isSP_now === true) this.spFuncOperation();
		else this.pcFuncOperation();

		this.isSP = _isSP_now;
		
//		alert(this.isSP + " breakpoint:" + _breakpoint + " winW:" + window.innerWidth || document.documentElement.clientWidth);

	};

	/**
	 * 各デバイス毎の関数を指定
	 * @method addFuncSet
	 * @param   {Function} a_pc PC用関数
	 * @param   {Function} a_sp SP用関数
	 */
	Member.addFuncSet = function(a_pc,a_sp){
		var _self = this,
			_event = new FuncSet(a_pc,a_sp);

//		alert("addFuncSet");

		if(_self.isSP === true) a_sp();
		else a_pc();
		
		//IE8はPC用関数を返す SPではSP用関数を返す
		if(_self.isIE8 === true) return false;
		
		_self.functions[_self.funcLengh] = _event;
		_self.funcLengh++;
	};

	/**
	 * 登録したPC用関数を呼び出す
	 * @method pcFuncOperation
	 */
	Member.pcFuncOperation = function(){
		var _self = this,
			_func = _self.functions,
			_len = _self.funcLengh;
		for(var i = 0; i<_len; i++) _func[i].pcFunc();
	};

	/**
	 * 登録したSP用関数を呼び出す
	 * @method spFuncOperation
	 */
	Member.spFuncOperation = function(){
		var _self = this,
			_func = _self.functions,
			_len = _self.funcLengh;
		for(var i = 0; i<_len; i++) _func[i].spFunc();
	};

	/**
	 * 閲覧環境：IE8以下判定
	 * @method isIE8Under
	 * @return {Boolean} ブラウザの判定
	 */
	Member.isIE8Under = function(){
		var _flg = false,
			_und = "undefined";
		if(typeof window.addEventListener == _und && typeof document.getElementsByClassName == _und) _flg = true;
		return _flg;
	};


	
	
	window.SimpleBreakPoint = SimpleBreakPoint;
})(window, document);