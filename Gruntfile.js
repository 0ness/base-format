module.exports = function(grunt){

	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-sass");
	grunt.loadNpmTasks("grunt-autoprefixer");
	grunt.loadNpmTasks("grunt-shell");
	grunt.loadNpmTasks("grunt-remove-logging");
	grunt.loadNpmTasks("grunt-contrib-yuidoc");
	grunt.loadNpmTasks("grunt-sassdoc");

	
	
	
	/* 設定値
	--------------------------------------------------------------------*/
	var BROWSERS = [
					"ie >= 8",
//					"ie_mob >= 10",
					"safari >= 7",
					"ios >= 7"
//					"android >= 2.3"
//					"and_ff >= 20",
//					"and_chr >= 34"
				   ],
		_srcJsDir 	= "htdocs/src/js/",
		_cmnJsDir 	= "htdocs/common/js/",
		_minJsDir 	= "htdocs/common/js/minify/",
		_srcCssDir	= "htdocs/src/scss/",
		_cmnCssDir 	= "htdocs/common/css/";

	
	
	
	/* 関数
	--------------------------------------------------------------------*/
	var jsFilePath = function(_type,_file){
		var _obj = {src	:"",dest:""};
		if(_type === "concat"){
			_obj.src 	= _srcJsDir + _file;
			_obj.dest 	= _cmnJsDir + _file;
		}else if(_type === "uglify"){
			_obj.src 	= _cmnJsDir + _file;
			_obj.dest 	= _minJsDir + _file;
		}else if(_type === "removelogging"){
			_obj.src 	= _minJsDir + _file;
			_obj.dest 	= _minJsDir + _file;
		}
		return _obj;
	},
		
		cssFilePath = function(_fileSet){
			var _obj = {};
			for(var i=0; i<_fileSet.length; i++){
				var _file	= _fileSet[i].substr(0,_fileSet[i].length-4),
					_css 	= _cmnCssDir + _file + "css",
					_src 	= _srcCssDir + _file + "scss";
				_obj[_css] = _src;
			};
			return _obj;
		},
		
		autoprefixerProp = function(_file,_addDir){
			var _dir = _addDir || "",
				_prop = {
					expand	: true,
					flatten	: true,
					src		:_cmnCssDir + _dir + _file,
					dest	:_cmnCssDir + _dir
				};
			console.log(_prop);
			return _prop;
		},
		
		jsWatchTasks = function(_file){
			var _tasks = [
					"concat:"+_file,
					"uglify:"+_file,
					"removelogging:"+_file
				];
			return _tasks;
		},
		
		scssWatchTasks = function(_file){
			var _tasks = [
				"sass:"+_file,
				"autoprefixer:"+_file
			];
			return _tasks;
		};

	
	
	
	/* gruntセット
	--------------------------------------------------------------------*/
    grunt.initConfig({
		
		/*----------- js -----------*/
        concat:{
            baseJS:{
                src	:[
					_srcJsDir + "jquery/jquery.js",
					_srcJsDir + "jquery/easing.js"
//					_srcJsDir + "ie/selectivizr.js"
                ],
				dest:_cmnJsDir + "base.js"
            },
			moduleJS:{
				src	:[
					_srcJsDir + "module/UserInfo.js",
					_srcJsDir + "module/Utility.js"
				],
				dest:_cmnJsDir + "module.js"
			},
			mainJS	:jsFilePath("concat","main.js")
        },
		uglify:{
			baseJS	:jsFilePath("uglify","base.js"),
			moduleJS:jsFilePath("uglify","module.js"),
			mainJS	:jsFilePath("uglify","main.js")
		},
		removelogging:{
			baseJS	:jsFilePath("removelogging","base.js"),
			moduleJS:jsFilePath("removelogging","module.js"),
			mainJS	:jsFilePath("removelogging","main.js")
		},
		
		/*----------- css -----------*/
		sass:{
			options:{
				style: "compact"
			},
			all 	:{ files:cssFilePath(["layout.scss","contents.scss","module.scss"]) },
			layout	:{ files:cssFilePath(["layout.scss"]) },
			module	:{ files:cssFilePath(["module.scss"]) },
			contents:{ files:cssFilePath(["contents.scss"]) },
			top		:{ files:cssFilePath(["contents/top.scss"]) }
		},
		autoprefixer:{
			options:{
				browsers:BROWSERS
			},
			all		:autoprefixerProp("*.css"),
			layout	:autoprefixerProp("layout.css"),
			module	:autoprefixerProp("module.css"),
			contents:autoprefixerProp("contents.css"),
			top		:autoprefixerProp("top.css","contents/")
		},
		
		/*----------- スタイルガイド -----------*/
		styleguide: {
			dist: {
				options: {
					framework: {
						name: "compornents",
						options:{
							preprocessor:"scss"
						}
					}
				},
				files: {
				  docs: _srcCssDir + "module.scss"
				}
			}
		},
//		sassdoc:{
//			default:{
//				src:[
//					_srcCssDir + "*.scss",
//					"User/macbookair12/desktop/works/base_format/htdocs/common/scss/partials/*.scss"
//				]
//			}
//		},
		shell:{
			styledocco:{
				command: function () {
					return " styledocco --o 'htdocs/common/css/compornents' --preprocessor 'scss' src/scss/module.scss";
				}
			},
			sassdoc:{
				command: function () {
					return "sassdoc src/scss -d src/sassdocs -n 'Sass Guide'";
				}
			}
		},
		yuidoc: {
			dist: {
				"name"			: "js-document",
				"description"	: "テストテストテストテストテストテスト",
				options			: {
					//出力パスの指定(今回はGruntfile.jsと同階層に出力するよう指定)
					paths:[
						_srcJsDir + "/module/",
						_srcJsDir + "/develop/"
					],
					//YUIDocファイルを出力するディレクトリ名を記述
					outdir	: "htdocs/src/yuidocs/",
					themedir: "htdocs/src/yui-themes/custom/"
				}
			}
		},
		
		/*----------- watchタスク -----------*/
        watch:{
			options: {
				spawn: false
			},
			
			//JS
			JS_base:{
				files:[
					_srcJsDir + "ie/*.js",
					_srcJsDir + "jquery/*.js"
				],
				tasks:jsWatchTasks("baseJS")
			},
			JS_module:{
				files:_srcJsDir + "module/*.js",
				tasks:jsWatchTasks("moduleJS")
			},
			JS_main:{
				files:_srcJsDir + "main.js",
				tasks:jsWatchTasks("mainJS")
			},
			
			//SASS
			SASS_all:{
				files:[_srcCssDir + "partials/*.scss",_srcCssDir + "partials/fonts/*.scss"],
				tasks:scssWatchTasks("all")
			},
			SASS_layout:{
				files:[_srcCssDir + "layout.scss"],
				tasks:scssWatchTasks("layout")
			},
			SASS_module:{
				files:[_srcCssDir + "module.scss"],
				tasks:scssWatchTasks("module")
			},
			SASS_contents:{
				files:[_srcCssDir + "contents.scss"],
				tasks:scssWatchTasks("contents")
			},
			SASS_top:{
				files:[_srcCssDir + "contents/top.scss"],
				tasks:scssWatchTasks("top")
			},

			//DOCUMENT
			yuidoc:{
				files:[
					_srcJsDir + "module/*.js",
					_srcJsDir + "develop/*.js"
				],
				tasks:["yuidoc"]
			},
			/*styleguide:{
				files:[_srcCssDir + "module.scss",_srcCssDir+"README.md"],
                tasks:["sass","shell:styledocco"]
			}*/
			sassdoc:{
				files:[_srcCssDir + "partials/*.scss"],
				tasks:["shell:sassdoc"]
			}
        }
	});
};

