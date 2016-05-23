;(function (window,document) {
	"use strict";

	
	
	
	/**
	 * アニメーション・演算処理支援クラス  
	 * ・インタラクティブコンテンツ開発用の色生成、座標取得、絶対値の算出などを行う  
	 * ・インスタンスは即時関数内のローカル変数に格納して使用する  
	 * ・動的な演出に必要な処理は、プライオリティが低くても追加していく
	 * @class Planet
	 * @constructor
	 * @example var obj = new Planet():
	 */	
	var Planet = function(){},
		Method = Planet.prototype;
	
	
	
	
	/* Method
	--------------------------------------------------------------------*/
	/**
	 * 色生成：hex値を与えてrgbのオブジェクトを返す
	 * @param   {String} _hex webでの色番号
	 * @returns {Object} rgbオブジェクト
	 */
	Method.convertHexToRgb = function (_hex) {
		// source: http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
		// Expand shorthand form (e.g."03F") to full form (e.g."0033FF")
		var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
		_hex = _hex.replace(shorthandRegex, function (m, r, g, b) {
			return r + r + g + g + b + b;
		});
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(_hex);
		return {
			red: parseInt(result[1], 16),
			green: parseInt(result[2], 16),
			blue: parseInt(result[3], 16)
		};
	};

	/**
	 * 色生成：rgb値を与えてHEX値を返す
	 * @param   {Object} rgb rgb情報のオブジェクト
	 * @returns {String} HEX値
	 */
	Method.convertRgbToHex = function (rgb) {
		// source: http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
		return "#" + ((1 << 24) + (rgb.red << 16) + (rgb.green << 8) + rgb.blue).toString(16).slice(1);
	};

	/**
	* 色生成：シード値を与えてRGB値を返す
	* @method getRndRgb
	* @param{Number} 256色
	* @param{Number} 固定シード値
	* @return{String} 色番号
	*/
	Method.getRndRgb = function(_rnd,_plus){
		var rnd = _rnd || 255,
			plus = _plus || 0,
			r = ((Math.random()*rnd)>>0) + plus,
			g = ((Math.random()*rnd)>>0) + plus,
			b = ((Math.random()*rnd)>>0) + plus,
			rgb = "rgb("+r+", "+g+", "+b+")";
		return rgb;
	};
	
	/**
	* 色生成：シード値を与えてRGB値を返す
	* @method getRndRgb_02
	* @param{Number} 赤
	* @param{Number} 青
	* @param{Number} 緑
	* @param{Number} 固定シード値
	* @return{String} 色番号
	*/
	Method.getRndRgb_02 = function(_r,_g,_b,_plus){
		var plus = _plus || 0,
			r = ((Math.random()*_r)>>0) + plus,
			g = ((Math.random()*_g)>>0) + plus,
			b = ((Math.random()*_b)>>0) + plus,
			rgb = "rgb("+r+", "+g+", "+b+")";
		return rgb;
	};
	
	/**
	* 色生成：シード値を与えてRGBA値を返す
	* @method getRndRGBA
	* @param{Number} 256色
	* @param{Number} 透明度
	* @param{Number} 固定シード値
	* @return{String} 色番号
	*/
	Method.getRndRgba = function(_rnd,_alpha,_plus){
		var rnd = _rnd || 255,
			plus = _plus || 0,
			r = ((Math.random()*rnd)>>0) + plus,
			g = ((Math.random()*rnd)>>0) + plus,
			b = ((Math.random()*rnd)>>0) + plus,
			a = _alpha || 1,
			rgba = "rgba("+r+", "+g+", "+b+","+a+")";
		return rgba;
	};
	
	/**
	* 色生成：シード値を与えてランダムなHEX値を返す
	* @method getRndHEX
	* @param{Number} 256色
	* @return{String} 色番号
	*/
	Method.getRndHEX = function(_rnd){
		var cseed = ( Math.random()*_rnd ) >> 0;
		// 色の計算R ≒ 256 * n / 3, G ≒ 256 * n / 7, B ≒ 256 * n / 5
		var cnum = ( cseed++ * 0x552433 ) % 0x1000000;
		var hex = "000000" + cnum.toString(16);
		return "#" + hex.substr( hex.length - 6, 6 );
	};
	
	/**
	* 演算：差の絶対値を計算する
	* @method abs
	* @param{Number} 絶対値にしたい数値
	* @return{Number} 絶対値
	*/
	Method.abs = function(_baseNum){
		var _absNum = _baseNum;
		_absNum = _absNum>0?_absNum:-_absNum;
		return _absNum;
	};
	
	/**
	* 座標取得：ポイント01とポイント02の２点間の距離算出する
	* @method getPointDistance
	* @param{Object} ポイント01
	* @param{Object} ポイント02
	* @return{Number} 距離
	*/
	Method.getPointDistance = function(_p1,_p2){
		var p1 = _p1,
			p2 = _p2,
			a = 0,
			b = 0,
			d = 0;
		a = p1.x - p2.x;
		b = p1.y - p2.y;
		d = Math.sqrt(Math.pow(a,2) + Math.pow(b,2));
		return d;
	};
	
	
	
	var instance = new Planet();
	window.Planet = instance;
}(window,document));
