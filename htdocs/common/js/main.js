(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function(window,document) {
	"use strict";
	

	/*Constructor
	--------------------------------------------------------------------*/
	/**
	 * @class INDEX
	 * @constructor
	*/
	var Index = function(){
		this.init();
	},
		Member = Index.prototype;




	/*Private Static Property
	--------------------------------------------------------------------*/
	var INF0			= new UserInfo(),
		contentsElm 	= document.getElementById("contents");




	/*Public Static Method
	--------------------------------------------------------------------*/
	Member.init = function() {
		var _id = INF0.id;

		this.commonFunction();
		if(_id === "top") this.topPageFunction();
	};

	/**
	* ページ共通処理
	*/
	Member.commonFunction = function(){
		console.log("common3");
	};

	/**
	* トップページ処理
	*/
	Member.topPageFunction = function(){
		console.log("top");
	};





	window.Index = Index;

	
})(window,document);


window.addEventListener('DOMContentLoaded', function(){ var INDEX = new Index(); });
},{}]},{},[1]);
