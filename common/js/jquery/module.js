;(function($){
	
	//jquery extend function
	$.fn.opacity		=	function(a_alp){return this.css('opacity',a_alp);};
	$.fn.clickableOn	=	function(){
		var _self = this;
		var _clickable	=	function(a_obj){
			var _obj = a_obj,
				_link = _obj.find("a");
			
			if(_link.length === 0) return false;
			
			var _href = _link.attr("href"),
				_target = _link.attr("target");

			_obj.on("click",function(){
				if(_target === "_blank") window.open().location = _href;
				else window.location();
			}).css("cursor","pointer");
		};
		
		return (function () {
			var _len = _self.length;
			for(var i=0; i<_len; i++) _clickable(_self.eq(i));
			return _self;
		}());
	};
	$.fn.clickableOff	=	function(){
		var _self = this;
		var _clickable	=	function(a_obj){
			var _obj = a_obj;
			if(_obj.find("a").length === 0) return false;
			_obj.off("click").css("cursor","default");
		};

		return (function () {
			var _len = _self.length;
			for(var i=0; i<_len; i++) _clickable(_self.eq(i));
			return _self;
		}());
	};

	
	//jquery extend propertys
	var cssSupport = function(PROPERTY){ return typeof $('<div>').css(PROPERTY)==="string";},
		breakPointEvent = function(){
			
		}

	$.extend({
		cssSupport  :	function(a_str){return cssSupport(a_str)}
	});
	
	
})(jQuery);