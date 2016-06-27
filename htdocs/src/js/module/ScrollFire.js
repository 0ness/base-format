(function () {
	"use strict";
	

	
	
	/*Constructor
	--------------------------------------------------------------------*/
	/**
	 * スクロール値を取得しイベントを発火させる
	 * @class ScrollFire
	 * @constructor
	 */
	var ScrollFire 	= function(){
		window.addEventListener("scroll",this.checkEvents.bind(this),false);
	},
		Member 		= ScrollFire.prototype;
	
	
	
	
	/*Private Static Property
	--------------------------------------------------------------------*/
	/**
	* 現在のスクロール値
	* @property {Number} scrNum 
	*/
	var scrollY = 0;
	
	/**
	* イベント格納用配列  
	* ScrollFireDomから引き渡される関数を格納する
	* @property {Array} events 
	*/
	var events 	= [];

	
	
	
	/*Public Static Method
	--------------------------------------------------------------------*/
	/**
	 * イベントをインスタンスにセットする
	 * @method setEvent
	 * @param {String}   strID   ID名
	 * @param {Function} varFunc 変数定義されたイベント内容
	 */
	Member.setEvent = function(_domId,_func,_repeat){
		var _dom = new ScrollFireDom(_domId,_func,_repeat);
		events.push(_dom);
		return this;
	};

	/**
	* ScrollFireDomオブジェクトの回転処理  
	* スクロール値と各オブジェクトのイベント開始値を照合し、切り替え用の関数を実行
	* @method checkEvents
	*/
	Member.checkEvents = function(){
		this.checkScroll();

		//ary内のTriggerDomオブジェクトの状態確認
		for(var i=0; i<events.length; i=(i+1)|0) events[i].fire();
	};

	/**
	 * スクロール値の取得
	 * @method checkScroll
	 * @returns {Number} スクロール値
	 */
	Member.checkScroll = function(){
		scrollY = document.body.scrollTop || document.documentElement.scrollTop;
	};

	/**
	 * イベントを解除する
	 * @param {String} id 解除するイベントのid
	 */
	Member.eventRelease = function(_id){
		for(var i=0; i<events.length; i=(i+1)|0){
			if(_id === events[i].id) events[i].isFired = true;
		}
	};

	
	
	
	
	
	
	/*SubClass
	--------------------------------------------------------------------*/
	/**
	 * y軸のスクロールに対して、イベントを展開する
	 * @class ScrollFireDom
	 * @constructor
	 * @param {String}   strID   要素のID
	 * @param {Function} varFunc 発火時の処理
	 */
	var ScrollFireDom = function(_id,_func,_repeat){
		this.y 			= document.getElementById(_id).offsetTop;
		this.callback 	= _func;
		this.isFired	= false;
		this.isRepeat	= _repeat || false;
		this.threshold 	= 300;
	},
		ScrollFireDomMember = ScrollFireDom.prototype;
	
	/**
	 * y座標とスクロール値を比較してイベント発火
	 * @param   {Number}  y スクロール値
	 */
	ScrollFireDomMember.fire = function(){
		if(this.isFired === true) return false;

		//差の絶対値で距離が近い場合にイベント発火
		var _abs = this.y - scrollY;
		_abs = _abs>0?_abs:-_abs;

		if(_abs > this.threshold) return false;
		if(this.isRepeat === false) this.isFired = true;
		this.callback();
	};

	
	
	
	window.ScrollFire = ScrollFire;
})(window, document);