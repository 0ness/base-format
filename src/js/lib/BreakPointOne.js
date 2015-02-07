/**
 * ブレークポイントの切り替えを検知する  
 * 対応数できるポイント数は１つ  
 * それ以上は別クラスを作成して対応する
 * @class BreakPointOne
 * @constructor
 * @param {Number}   a_border ブレークポイント幅
 * @param {Function} a_pcFunc PC側に切り替わった際の関数
 * @param {Function} a_spFunc SP側に切り替わった際の関数
 * @example
 * var BPO = new BreakPointOne(768,pcFunc,spFunc);  
 * function pcFunc(){ pcレイアウト切替時の処理 };  
 * function spFunc(){ spレイアウト切替時の処理 };
 */
function BreakPointOne(a_border, a_pcFunc, a_spFunc) {
    "use strict";
    var _self = this;
    _self.border = a_border;
    _self.pcCallBack = a_pcFunc || null;
    _self.spCallBack = a_spFunc || null;	
	_self.init();
};
BreakPointOne.prototype = {
	/**
	 * ブレークポイントの境界値
	 * @property {Number} border
     */
	border: null,
	/**
	 * PC側に切り替わった際事項されるコールバック関数
	 * @property  {Function} pcCallBack
     */
	pcCallBack: null,
	/**
	 * SP側に切り替わった際事項されるコールバック関数
	 * @property  {Function} spCallBack
     */
    spCallBack: null,
	/**
	 * 現在のページの状態がPCかSPかを判断する為の正否値  
	 * true:SP　false:PC
	 * @property {Boolean} isSP
     */
	isSP: false,
	timer:null,
	fps:100,
	resizeEvent:null,

    /**
     * 初期化  
     * コンストラクタ時にリサイズイベントを設定する
     * @method init
     */
    init: function() {
        var _self = this,
            _win = window,
			_fps = 100;
		
		console.log("risize event added");

		/*eventHandlerを正確に実行するための処理
		resizeEventに処理を格納してからイベントハンドラを実行しないと、
		イベントがremoveされない*/
		_self.resizeEvent = function(){ _self.breakPointCheck();};

        //リサイズイベント処理 addEventListenerの有無でIE8と分岐
        if (_win.addEventListener) {
			_win.addEventListener("resize",_self.resizeEvent,false);
        } else {
            _win.attachEvent('on' + "resize",_self.resizeEvent);
        }
    },
	
    /**
     * リサイズイベントを破棄する
     * @method reset
     */
    reset: function() {
        var _self = this,
            _win = window;
		
		console.log("risize event removed");
		
        if (_win.removeEventListener)
			_win.removeEventListener("resize",_self.resizeEvent,false);
        else
			_win.detachEvent('on' + "resize", _self.resizeEvent);
    },
	
    /**
     * リサイズ時にブレークポイントの状態を確認する  
     * ウィンドウ幅とブレークポイント幅を確認し、  
     * PC・SPの切り替わりが判定された場合、設定した関数を実行する
     * @method breakPointCheck
     */
    breakPointCheck: function() {
        var _self = this,
            _winW = window.innerWidth || document.body.clientWidth,
            _breakpoint = _self.border,
            _isSP = _self.isSP,
            _isSP_now = false;

        //ブレークポイントとウィンドウ幅の差異を確認
        if (_breakpoint < _winW) _isSP_now = false;
        else _isSP_now = true;

        //判定後、ブレークポイントが切り替わった時点でコールバック関数処理
        if (_isSP === _isSP_now) return false;
        if (_isSP_now === true) _self.spCallBack();
        else _self.pcCallBack();
        _self.isSP = _isSP_now;
    }
};