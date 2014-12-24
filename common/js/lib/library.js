/*==============================================================================

	汎用処理ライブラリ

	・基本DOM操作の自動化
	・HTML5対応
	・IE対応

==============================================================================*/


//SCRIPT START
var Library = function(){
	
	this.pages = new PageInfo();		
	this.pageUA = this.pages.UA;			
	this.pageVER = this.pages.VER;				
	this.hasMobile = this.pages.mobile;
	
	/* method テーブルソート機能（テーブル01_id、行番号、ソートタイプ:str,num）
	--------------------------------------------------------------------*/
	/*var table_sort = {
		exec: function(tid,idx,type){
			var table = document.getElementById(tid);
			var tbody = table.getElementsByTagName('tbody')[0];
			var rows  = tbody.getElementsByTagName('tr');
			var sbody = document.createElement('tbody');

			//save array
			var srows = new Array();
			for(var i=0;i<rows.length;i++){
				srows.push({
					row: rows[i],
					cel: rows[i].getElementsByTagName('td')[idx].innerHTML,
					idx: i
				});
			}

			//sort array
			srows.sort(function(a,b){
				if(type == 'str')
					return a.cel < b.cel ? 1 : -1;
				else
					return b.cel - a.cel;
			});
			if(this.flag == 1) srows.reverse();

			//replace
			for(var i=0;i<srows.length;i++){
				sbody.appendChild(srows[i].row)
			}
			table.replaceChild(sbody,tbody);
			this.replaceText(table,idx);

			//set flag
			this.flag = this.flag > 0 ? 0 : 1;
		},

		replaceText: function(table,idx){
			var thead = table.getElementsByTagName('a');

			//preset header-text
			if(!this.exp){
				this.text = new Array();
				for(var i=0;i<thead.length;i++){
					this.text.push(thead[i].firstChild.nodeValue);
				}
				this.exp = 1;
			}

			//set&remove suffix
			for(var i=0;i<thead.length;i++){
				if(i == idx){
					thead[i].firstChild.nodeValue = this.flag == 0
					? this.text[i] + this.suffix[0]
					: this.text[i] + this.suffix[1];
				}
				else {
					thead[i].firstChild.nodeValue = this.text[i];
				}
			}
		},

		suffix: ['▽','△'],
		flag: 0
	}
*/



	/* method テーブルソート機能　2つのテーブル同期（テーブル01_id、テーブル02_id、行番号、ソートタイプ:str,num）
	--------------------------------------------------------------------*/
	/*var table_sort_02 = {
		exec: function(tid_01,tid_02,idx,type){

			var table = document.getElementById(tid_01);
			var f_table = document.getElementById(tid_02);

			var tbody = table.getElementsByTagName('tbody')[0];
			var rows  = tbody.getElementsByTagName('tr');
			var sbody = document.createElement('tbody');

			var f_tbody = f_table.getElementsByTagName('tbody')[0];
			var f_rows  = f_tbody.getElementsByTagName('tr');
			var f_sbody = document.createElement('tbody');

			//save array
			var srows = new Array();
			var f_srows = new Array();

			for(var i=0;i<rows.length;i++){
				srows.push({
					row: rows[i],
					cel: rows[i].getElementsByTagName('td')[idx].innerHTML,
					idx: i
				});
				f_srows.push({
					row: f_rows[i],
					//cel: f_rows[i].getElementsByTagName('td')[0].innerHTML,
					idx: i
				});
			}

			//sort array
			srows.sort(function(a,b){
				if(type === 'str')
					return a.cel < b.cel ? 1 : -1;
				else
					var obj = b.cel - a.cel;
				return obj;
			});


			if(this.flag == 1){
				srows.reverse();
			}

			//replace
			for(var i=0;i<srows.length;i++){
				sbody.appendChild(srows[i].row)
				var num = srows[i].idx;
				f_sbody.appendChild(f_srows[num].row);
			}

			table.replaceChild(sbody,tbody);
			f_table.replaceChild(f_sbody,f_tbody);

			//set flag
			this.flag = this.flag > 0 ? 0 : 1;
		},

		replaceText: function(table,idx){
			var thead = table.getElementsByTagName('a');

			//preset header-text
			if(!this.exp){
				this.text = new Array();
				for(var i=0;i<thead.length;i++){
					this.text.push(thead[i].firstChild.nodeValue);
				}
				this.exp = 1;
			}

			//set&remove suffix
			for(var i=0;i<thead.length;i++){
				if(i == idx){
					thead[i].firstChild.nodeValue = this.flag == 0
					? this.text[i] + this.suffix[0]
					: this.text[i] + this.suffix[1];
				}
				else {
					thead[i].firstChild.nodeValue = this.text[i];
				}
			}
		},

		suffix: ['▽','△'],
		flag: 0
	}
*/
}
Library.prototype = $.extend({
	
	/*const 定数　このJS内部でグローバルに使う定数*/
	win:window,
	pages:null,
	pageUA:null,
	pageVER:null,
	hasMobile:null, 

	/* method jQuery アンカーアニメーション（jQueryオブジェクト）*/
	ancher:function(_href){
		$.fx.interval = 20;
		var $ancherTag = (this.pageUA === "webkit") ? $("body"):$("html"),
			href = _href,
			target = $(href === "#" || href === "" ? 'html' : href),
			position = target.offset().top;// 移動先を数値で取得
		
		$ancherTag.stop().animate({scrollTop:position}, 600, 'easeInOutQuad');
	},

	/* method jQuery トップへ戻るリンク*/
	topBackAncher:function(){
		var $topBack = $(document.getElementById("topBack"));
		$topBack.on("click",function(e){
			e.preventDefault();
			this.ancher($topBack);
		});
		return false;
	},

	/* method jQuery 固定アンカーリンク*/
	fixedLinkAncher:function(){

		var t = this,
			$win = $(window),
			$wrapper = $(document.getElementById("wrapper")),
			pageTop = document.getElementById("topBack"),
			$ancherBtn = $(pageTop);

		var h = 0,
			b = 0,
			cls = "static",
			old_flg = false,
			now_flg = false,
			num_scroll,
			timer;

		//高さ確認
		var SizeCheck = function(){
			h = $win.height();
			b = ($wrapper.height()-h)-40;
		};
		SizeCheck();
		
		//FixLinkクラス
		var FixLink = function(){};
		FixLink.prototype = {
			scrollCheck:function(){//スクロール時の位置判定
				num_scroll = $win.scrollTop();

				//位置のフラグ
				if(num_scroll > 500) now_flg = true;
				else now_flg = false;

				//フッターとの位置調整
				cls = (num_scroll >= b) ? "static" : "";
				pageTop.className = cls;
				timer = setTimeout(fa.scrollCheck,80);

				//表示の切り替え
				if(now_flg !== old_flg){
					if(now_flg === true){
						$ancherBtn.fadeTo(200,1,"linear");
						old_flg = true;
					}else{
						$ancherBtn.fadeTo(200,0,"linear");
						old_flg = false;
					}
				}
				return false;
			},
			resize:function(){//リサイズ時の位置調整
				SizeCheck();
				if(t.pageVER !== 2) fa.scrollCheck();
				return false;
			}
		};

		//FixAncherインスタンス
		if(t.hasMobile === false){
			var fa = new FixLink();
			//ページ全体のイベント
			$win.on({"load":fa.resize,"resize":fa.resize});
			timer = setTimeout(fa.scrollCheck,80);
		}

		$ancherBtn.on("click",function(e){
			e.preventDefault();
			t.ancher($ancherBtn);
		});
	},

	/* method IE8以下 jQuery HTML5_placeholder対応*/
	placeholder:function(){
		var supportsInputAttribute = function (attr) {
			var input = document.createElement('input');
			return attr in input;
		};
		if (!supportsInputAttribute('placeholder')) {

			$('[placeholder]').each(function () {
				var input = $(this);
				var placeholderText = input.attr('placeholder');
				var placeholderColor = 'GrayText';
				var defaultColor = input.css('color');

				input.on({
					"focus":function(){
						if (input.val() === placeholderText) {
							input.val('').css('color', defaultColor);
						}
					},
					"blur":function(){
						if (input.val() === '') {
							input.val(placeholderText).css('color', placeholderColor);
						} else if (input.val() === placeholderText) {
							input.css('color', placeholderColor);
						}
					}
				}).parents('form').submit(function () {
					if (input.val() === placeholderText) {
						input.val('');
					}
				});
			});
		}
		return false;
	},
	
	/* method IE8,7で透過処理を個別に対応
	 * 引数：処理を行いたい画像（jQueryオブジェクト）
	*/
	alphaCheck:function(obj){
		if(this.pageVER !== "ie8" && this.pageVER !== "ie7") return false;
		var img = obj;
		var imgPass = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + img.attr('src') + '", sizingMethod="scale");';
		img.css('filter',imgPass);
		return false;
	},

	/* method IE8,7で透過処理を入れ子に対応
	 * 引数：処理を行いたい画像の親要素（jQueryオブジェクト）
	*/
	alphaAllCheck:function(obj){
		if(this.pageVER !== "ie8" && this.pageVER !== "ie7") return false;
		var o = obj;
		o.each(
			function(){
				var img = $(this);
				if(img.attr('src').indexOf('.png') !== -1) {
					var imgPass = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + img.attr('src') + '", sizingMethod="scale");';
					img.css('filter',imgPass);
				}
			}
		)
		return false;
	},

	/* method 自動化 コピーライト年数*/
	yearAdjust:function(){
		var d = new Date();
		var now_year = d.getFullYear();
		document.getElementById("nowYear").innerHTML = ""+now_year;
		return false;
	},
	
	/* method ２次元配列のソート
	 * dimensionArySort(ソート配列:Array、開始番号:uint、昇順か降順化の指定:boolean)
	 * 昇順はtrue,降順はfalse
	 */
	dimensionArySort:function(_ary,_col,_flg){
		var ary = _ary;
		var col = _col;
		var srt = (_flg === true)? 1 : -1;
		ary.sort(function(a , b){ return((a[col] - b[col]) * srt);});
		return(ary);
	}

});