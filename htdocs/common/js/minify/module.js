!function(a,b){"use strict";var c=function(){var a=b.getElementsByTagName("body")[0];this.OS="",this.UA="",this.IEver="not IE",this.hasFlashPlayer=!1,this.isMobile=!1,this.device="pc",this.id=a.getAttribute("id"),this.className=a.className,this.hasQuery=!1,this.urlQuery="",this.checkUA(),this.checkDevice()},d=c.prototype;d.checkOS=function(){-1!=navigator.platform.indexOf("Win")?this.OS="windows":this.OS="mac"},d.checkUA=function(){var c=this,d=b,e="",f="",g=a.navigator,h=g.userAgent.toLowerCase(),i=g.appVersion.toLowerCase();-1!==h.indexOf("msie")?(e="ie",f=-1!==i.indexOf("msie 8.")?"ie8":-1!==i.indexOf("msie 9.")?"ie9":"ie10"):-1!==h.indexOf("trident/7")?(e="ie",f="ie11"):e=-1!==h.indexOf("firefox")?"firefox":"webkit","ie8"!==f&&"ie9"!==f||(b.getElementsByTagName("html")[0].className=f),8===d.documentMode&&(f="ie8",b.getElementsByTagName("html")[0].className="ie8"),c.UA=e,c.IEver=f},d.getIsIe8=function(){var c=!1;return"undefined"==typeof a.addEventListener&&"undefined"==typeof b.querySelectorAll?c=!1:this.getIsIe8Under()===!0&&(c=!0),c},d.getIsIe9=function(){var a=this,b=!1;return a.getIsIe8Under()===!0?b=!1:a.getIsIe9Under()===!0&&(b=!0),b},d.getIsIe8Under=function(){var c=!1,d="undefined";return typeof a.addEventListener==d&&typeof b.getElementsByClassName==d&&(c=!0),c},d.getIsIe9Under=function(){var c=!1;return b.uniqueID&&"undefined"==typeof a.matchMedia&&(c=!0),c},d.checkDevice=function(){var a=this,b="pc",c=navigator.userAgent,d=!1;c.indexOf("Android")>0&&-1==c.indexOf("Mobile")||c.indexOf("A1_07")>0||c.indexOf("SC-01C")>0||c.indexOf("iPad")>0?(d=!0,b="tablet"):(c.indexOf("iPhone")>0&&-1==c.indexOf("iPad")||c.indexOf("iPod")>0||c.indexOf("Android")>0&&c.indexOf("Mobile")>0)&&(d=!0,b="sp"),a.device=b,a.isMobile=d},d.checkFlash=function(){var a=function(){if(navigator.plugins["Shockwave Flash"])return!0;try{return new ActiveXObject("ShockwaveFlash.ShockwaveFlash"),!0}catch(a){return!1}}();this.hasFlashPlayer=!(!a||$.device("android"))},d.checkURLQuery=function(){var a=this,b=location.search;return 0===b.length?!1:(a.hasQuery=!0,void(a.urlQuery=b.substr(1).split("&").toString()))},a.UserInfo=c}(window,document),function(a,b){"use strict";var c=function(){},d=c.prototype;d.getWindowWidth=function(){var c=a.innerWidth||b.body.clientWidth;return c},d.getWindowHeight=function(){var c=a.innerHeight||b.body.clientHeight;return c},d.getScrollTop=function(){var a=b.body.scrollTop||b.documentElement.scrollTop;return a},d.getDomPoint=function(b){var c=b.getBoundingClientRect(),d=c.left+a.pageXOffset|0,e=c.top+a.pageYOffset|0;return{top:e,left:d}},d.getDomLeft=function(b){var c=b.getBoundingClientRect(),d=c.left+a.pageXOffset|0;return d},d.getDomTop=function(b){var c=b.getBoundingClientRect(),d=c.top+a.pageYOffset|0;return d},d.getMousePoint=function(a){var c={x:0,y:0},d=b.body,e=event;return a?(c.x=a.pageX,c.y=a.pageY):(c.x=e.x+d.scrollLeft,c.y=e.y+d.scrollTop),c},d.writeYearTxt=function(a){var c=a||"nowYear",d=(new Date).getFullYear();b.getElementById(c).innerHTML+=d};var e=new c;a.Utility=e}(window,document);