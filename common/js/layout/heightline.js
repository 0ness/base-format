/*--------------------------------------------------------------------------*
 *  
 *  heightLine JavaScript Library beta4
 *  
 *  MIT-style license. 
 *  
 *  2007 Kazuma Nishihata 
 *  http://www.webcreativepark.net
 *  
 *--------------------------------------------------------------------------*/
 
 function heightLine(){var n=window,p=function(){this.className="heightLine";this.parentClassName="heightLineParent";reg=RegExp(this.className+"-([a-zA-Z0-9-_]+)","i");objCN=[];for(var k=document.getElementsByTagName?document.getElementsByTagName("*"):document.all,n=k.length,l=0;l<n;l++)for(var d=k[l].className.split(/\s+/),p=d.length,m=0;m<p;m++)if(d[m]==this.className){objCN["main CN"]||(objCN["main CN"]=[]);objCN["main CN"].push(k[l]);break}else if(d[m]==this.parentClassName){objCN["parent CN"]|| (objCN["parent CN"]=[]);objCN["parent CN"].push(k[l]);break}else if(d[m].match(reg)){d=d[m].match(reg);objCN[d]||(objCN[d]=[]);objCN[d].push(k[l]);break}var h=document.createElement("div"),k=document.createTextNode("S");h.appendChild(k);h.style.visibility="hidden";h.style.position="absolute";h.style.top="0";document.body.appendChild(h);var q=h.offsetHeight;changeBoxSize=function(){for(var f in objCN)if(objCN.hasOwnProperty(f))if("parent CN"==f)for(var d=objCN[f].length,c=0;c<d;c++){for(var j=0,g= objCN[f][c].childNodes,a=g.length,e=0;e<a;e++)g[e]&&1==g[e].nodeType&&(g[e].style.height="auto",j=j>g[e].offsetHeight?j:g[e].offsetHeight);for(var h=g.length,e=0;e<h;e++)if(g[e].style){var a=g[e].currentStyle||document.defaultView.getComputedStyle(g[e],""),b=j;a.paddingTop&&(b-=a.paddingTop.replace("px",""));a.paddingBottom&&(b-=a.paddingBottom.replace("px",""));a.borderTopWidth&&"medium"!=a.borderTopWidth&&(b-=a.borderTopWidth.replace("px",""));a.borderBottomWidth&&"medium"!=a.borderBottomWidth&& (b-=a.borderBottomWidth.replace("px",""));g[e].style.height=b+"px"}}else{j=0;d=objCN[f].length;for(c=0;c<d;c++)objCN[f][c].style.height="auto",j=j>objCN[f][c].offsetHeight?j:objCN[f][c].offsetHeight;d=objCN[f].length;for(c=0;c<d;c++)objCN[f][c].style&&(a=objCN[f][c].currentStyle||document.defaultView.getComputedStyle(objCN[f][c],""),b=j,a.paddingTop&&(b-=a.paddingTop.replace("px","")),a.paddingBottom&&(b-=a.paddingBottom.replace("px","")),a.borderTopWidth&&"medium"!=a.borderTopWidth&&(b-=a.borderTopWidth.replace("px", "")),a.borderBottomWidth&&"medium"!=a.borderBottomWidth&&(b-=a.borderBottomWidth.replace("px","")),objCN[f][c].style.height=b+"px")}};checkBoxSize=function(){q!=h.offsetHeight&&(changeBoxSize(),q=h.offsetHeight)};changeBoxSize();setInterval(checkBoxSize,1E3);window.onresize=changeBoxSize};try{n.addEventListener("load",p,!1)}catch(r){n.attachEvent("onload",p)}};
 
/*
function heightLine(){
	
	function heightLine(){	
	
		this.className="heightLine";
		this.parentClassName="heightLineParent"
		reg = new RegExp(this.className+"-([a-zA-Z0-9-_]+)", "i");
		objCN =new Array();
		var objAll = document.getElementsByTagName ? document.getElementsByTagName("*") : document.all;
		var len = objAll.length;
		for(var i = 0; i < len; i++) {
			var eltClass = objAll[i].className.split(/\s+/);
			var elt_len = eltClass.length;
			for(var j = 0; j < elt_len; j++) {
				if(eltClass[j] == this.className) {
					if(!objCN["main CN"]) objCN["main CN"] = new Array();
					objCN["main CN"].push(objAll[i]);
					break;
				}else if(eltClass[j] == this.parentClassName){
					if(!objCN["parent CN"]) objCN["parent CN"] = new Array();
					objCN["parent CN"].push(objAll[i]);
					break;
				}else if(eltClass[j].match(reg)){
					var OCN = eltClass[j].match(reg)
					if(!objCN[OCN]) objCN[OCN]=new Array();
					objCN[OCN].push(objAll[i]);
					break;
				}
			}
		}
		
		//check font size
		var e = document.createElement("div");
		var s = document.createTextNode("S");
		e.appendChild(s);
		e.style.visibility="hidden"
		e.style.position="absolute"
		e.style.top="0"
		document.body.appendChild(e);
		var defHeight = e.offsetHeight;
		
		changeBoxSize = function(){
			for(var key in objCN){
				if (objCN.hasOwnProperty(key)) {
					//parent type
					if(key == "parent CN"){
						var len = objCN[key].length;
						for(var i=0 ; i<len; i++){
							var max_height=0;
							var CCN = objCN[key][i].childNodes;
							var CCN_len = CCN.length;
							for(var j=0 ; j<CCN_len; j++){
								if(CCN[j] && CCN[j].nodeType == 1){
									CCN[j].style.height="auto";
									max_height = max_height>CCN[j].offsetHeight?max_height:CCN[j].offsetHeight;
								}
							}
							
							var CCN_len02 = CCN.length;
							for(var j=0 ; j<CCN_len02; j++){
								if(CCN[j].style){
									var stylea = CCN[j].currentStyle || document.defaultView.getComputedStyle(CCN[j], '');
									var newheight = max_height;
									if(stylea.paddingTop)newheight -= stylea.paddingTop.replace("px","");
									if(stylea.paddingBottom)newheight -= stylea.paddingBottom.replace("px","");
									if(stylea.borderTopWidth && stylea.borderTopWidth != "medium")newheight-= stylea.borderTopWidth.replace("px","");
									if(stylea.borderBottomWidth && stylea.borderBottomWidth != "medium")newheight-= stylea.borderBottomWidth.replace("px","");
									CCN[j].style.height =newheight+"px";
								}
							}
						}
					}else{
						var max_height=0;
						var obj_len = objCN[key].length;
						for(var i=0 ; i<obj_len; i++){
							objCN[key][i].style.height="auto";
							max_height = max_height>objCN[key][i].offsetHeight?max_height:objCN[key][i].offsetHeight;
						}
						var obj_len02 = objCN[key].length;
						for(var i=0 ; i<obj_len02; i++){
							if(objCN[key][i].style){
								var stylea = objCN[key][i].currentStyle || document.defaultView.getComputedStyle(objCN[key][i], '');
									var newheight = max_height;
									if(stylea.paddingTop)newheight-= stylea.paddingTop.replace("px","");
									if(stylea.paddingBottom)newheight-= stylea.paddingBottom.replace("px","");
									if(stylea.borderTopWidth && stylea.borderTopWidth != "medium")newheight-= stylea.borderTopWidth.replace("px","")
									if(stylea.borderBottomWidth && stylea.borderBottomWidth != "medium")newheight-= stylea.borderBottomWidth.replace("px","");
									objCN[key][i].style.height =newheight+"px";
							}
						}
					}
				}
			}
		}
		
		checkBoxSize = function(){
			if(defHeight != e.offsetHeight){
				changeBoxSize();
				defHeight= e.offsetHeight;
			}
		}
		changeBoxSize();
		setInterval(checkBoxSize,1000)
		window.onresize=changeBoxSize;
	}
	
	function addEvent(elm,listener,fn){
		try{
			elm.addEventListener(listener,fn,false);
		}catch(e){
			elm.attachEvent("on"+listener,fn);
		}
	}
	addEvent(window,"load",heightLine);
}
*/