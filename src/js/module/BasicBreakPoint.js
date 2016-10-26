;(function(window, document) {
	"use strict";
	
	
	
	
	/*Constructor
	--------------------------------------------------------------------*/
	/**
	 * PC・SP用にブレークポイントの切り替えを検知し、設定した処理を実行する
	 * ポイント数は１つ限定（それ以上は別クラスを作成して対応する）
	 * ブレークポイント切替時と関数指定時に、そのレイアウトの処理を実行
	 * @class BasicBreakPoint
	 * @constructor
	 * @param {Number}   a_border ブレークポイント幅
	 * @example
	 * var BBP = new BasicBreakPoint(768,1024);  
	 */
	var BasicBreakPoint = function(_breakpoint,_breakpoint_02) {
		
		/**
		 * tabletブレークポイントの境界値
		 * @property {Number} minBreakPoint
		 */
		this.minBreakPoint = _breakpoint;

		/**
		 * pcブレークポイントの境界値
		 * @property {Number} maxBreakPoint
		 */
		this.maxBreakPoint = _breakpoint_02;

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
		 * @property {Boolean} state
		 */
		this.state	= null;

		/**
		 * リサイズ関数をremoveするための関数ラッパー  
		 * @property {Function} resizeEvent
		 */
		this.resizeEvent = null;
		
		this.canFunction = false;
		
		this.init();
	},
		Member = BasicBreakPoint.prototype;
	
	

	
	/*Method
	--------------------------------------------------------------------*/
	/**
	 * 初期化  
	 * コンストラクタ時にリサイズイベントを設定する
	 * @method init
	 */
	Member.init =  function() {
		var _self = this;

		/*eventHandlerを正確に実行するための処理
		resizeEventに処理を格納してからイベントハンドラを実行しないと、
		イベントがremoveされない
		不要な場合はラッパーせずそのままリサイズ時の処理をハンドラーに渡す
		*/
//		this.resizeEvent = this.changeBreakPoint();
		setTimeout(function(){
			_self.checkBreakPoint();
			window.addEventListener("resize",function(){
				_self.changeBreakPoint();
			},false);
		},10);
	};

	/**
	 * リサイズイベントを破棄する
	 * @method delete
	 */
	Member.delete =  function() {
		var _self = this;
		window.removeEventListener("resize",_self.resizeEvent,false);
	};

	/**
	 * リサイズ時に処理を実行する  
	 * @method changeBreakPoint
	 */
	Member.changeBreakPoint =  function() {
		this.checkBreakPoint();
		this.doFunctions();
	};
	
	/**
	 * ブレークポイントの状態を確認する  
	 * ウィンドウ幅とブレークポイント幅を確認し、  
	 * PC・SP・タブレットの切り替わりが判定された場合、設定した関数を実行する
	 * @method checkBreakPoint
	 */
	Member.checkBreakPoint =  function() {
		var _winW 		= window.innerWidth,
			_nowState	= "";

		//ブレークポイントとウィンドウ幅の差異を確認
		if(_winW <= this.minBreakPoint ) _nowState = "sp";
		else if(_winW >= this.maxBreakPoint ) _nowState = "pc";
		else _nowState = "tablet";
		
		//判定後、ブレークポイントが切り替わった時点でコールバック関数処理
		if (_nowState === this.state) return false;
		this.state 		= _nowState;
		this.canFunction= true;
	};
	
	/**
	 * 各デバイス毎の関数を指定
	 * @method addFunctions
	 * @param   {Object} _functions 関数セット
	 */
	Member.addFunctions = function(_functions){
		this.functions[this.funcLengh] = new FuncSet(_functions);
		this.funcLengh++;
	};

	/**
	 * 状態にあわせた関数呼び出し
	 * @method doFunctions
	 */
	Member.doFunctions = function(){
		if(this.canFunction === false) return false;
		var _state = this.state;
		if(_state==="pc") this.doPcFunction();
		else if(_state==="tablet") this.doTabletFunction();
		else this.doSpFunction();
		this.canFunction = false;
	};

	/**
	 * 登録したPC用関数を呼び出す
	 * @method doPcFunction
	 */
	Member.doPcFunction = function(){
		var _func = this.functions;
		for(var i = 0; i<this.funcLengh; i=(i+1)|0) _func[i].pcFunc();
	};

	/**
	 * 登録したタブレット用関数を呼び出す
	 * @method doTabletFunction
	 */
	Member.doTabletFunction = function(){
		var _func = this.functions;
		for(var i = 0; i<this.funcLengh; i=(i+1)|0) _func[i].tabFunc();
	};

	/**
	 * 登録したSP用関数を呼び出す
	 * @method doSpFunction
	 */
	Member.doSpFunction = function(){
		var _func = this.functions;
		for(var i = 0; i<this.funcLengh; i=(i+1)|0) _func[i].spFunc();
	};




	/*Sub Class
	--------------------------------------------------------------------*/
	/**
	 * ブレークポイントの切替時に発火するイベント用サブクラス  
	 * PC用・SP用の関数を所持している
	 * @class FuncSet
	 * @constracutor
	 * @param {Object} _functions 関数を格納したオブジェクト
	 */
	var FuncSet = function(_functions){
		this.pcFunc  = _functions.pc  || function(){};
		this.tabFunc = _functions.tablet || function(){};
		this.spFunc  = _functions.sp  || function(){};
	};
	


	
	
	window.BasicBreakPoint = BasicBreakPoint;
})(window, document);