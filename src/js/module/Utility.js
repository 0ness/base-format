"use strict";


/**
 * 多用する単純な処理をまとめたクラス
 * ・dom情報取得
 * ・サイズ取得
 * ・座標取得
 * ・IE判定
 * @class Utility
 * @constructor
 */
var Utility = function(){},
	Method = Utility.prototype;




/* Method
--------------------------------------------------------------------*/
/**
 * ウィンドウの幅を取得
 * @method getWindowWidth
 * @returns {Number} ウィンドウ幅
 */
Method.getWindowWidth = function(){
	var _width = window.innerWidth || document.body.clientWidth;
	return _width;
};

/**
 * ウィンドウの高さを取得
 * @method getWindowHeight
 * @returns {Number} ウィンドウ高
 */
Method.getWindowHeight = function(){
	var _height = window.innerHeight || document.body.clientHeight;
	return _height;
};

/**
 * ウィンドウの高さを取得
 * @method getScrollTop
 * @returns {Number} スクロール位置
 */
Method.getScrollTop = function(){
	var _y = document.body.scrollTop || document.documentElement.scrollTop;
	return _y;
};

/**
 * domの座標
 * @param   {object} _elm 座標を取得したいdom要素
 *　@returns {object} 座標情報のオブジェクト
 */
Method.getDomPoint = function(_elm){
	var _rect 	= _elm.getBoundingClientRect(),
		_left 	= (_rect.left + window.pageXOffset)|0,
		_top	= (_rect.top + window.pageYOffset)|0;
	return {top:_top,left:_left};
};

/**
 * domのx座標
 * @param   {object} _elm 座標を取得したいdom要素
 *　@returns {object} 座標情報のオブジェクト
 */
Method.getDomLeft = function(_elm){
	var _rect 	= _elm.getBoundingClientRect(),
		_left 	= (_rect.left + window.pageXOffset)|0;
	return _left;
};

/**
 * domのy座標
 * @param   {object} _elm 座標を取得したいdom要素
 *　@returns {object} 座標情報のオブジェクト
 */
Method.getDomTop = function(_elm){
	var _rect 	= _elm.getBoundingClientRect(),
		_top	= (_rect.top + window.pageYOffset)|0;
	return _top;
};

/**
* 座標取得：マウスポインタ座標取得
* @method getMousePoint
* @param{Event} ターゲットイベント
* @return{Object} オブジェクト
*/
Method.getMousePoint = function(e){
	var point = {x:0,y:0},
		doc = document.body, 
		ev = event;
	if(e){
		point.x = e.pageX;
		point.y = e.pageY;
	}else{
		point.x = ev.x + doc.scrollLeft;
		point.y = ev.y + doc.scrollTop;
	}
	return point;
};

/**
 * 年数表記を自動で現在の値に書き換える
 * @method writeYearString
 * @param {String} id 年数を囲っているid
 * @example obj.writeYearString();
 */
Method.writeYearTxt = function(id){
	var _id = id || "nowYear",
		_now_year = new Date().getFullYear();
	document.getElementById(_id).innerHTML += _now_year;
};




module.exports = Utility;




