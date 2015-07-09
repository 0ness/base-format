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

	var BROWSERS = [
					"ie >= 8",
//					"ie_mob >= 10",
//					"ff >= 35",
					"chrome >= 39",
					"safari >= 7",
//					"opera >= 23",
					"ios >= 7"
//					"android >= 2.3"
//					"and_ff >= 20",
//					"and_chr >= 34"
				   ];

	//基本的なタスクセット
    grunt.initConfig({
        concat:{
            baseJS:{
                src	:[
                    "htdocs/src/js/jquery/jquery.js",
                    "htdocs/src/js/jquery/easing.js",
					"htdocs/src/js/ie/selectivizr.js"
                ],
                dest:"htdocs/src/js/base.js"
            },
			moduleJS:{
				src	:[
					"htdocs/src/js/module/jquery.module.js",
					"htdocs/src/js/module/UserInfo.js",
					"htdocs/src/js/module/Library.js"
				],
				dest:"htdocs/common/js/module.js"
			},
			mainJS:{
				src	:"htdocs/src/js/main.js",
				dest:"htdocs/common/js/main.js"
			}
        },
		uglify:{
			baseJS:{
				src	:"htdocs/src/js/base.js",
				dest:"htdocs/common/js/minify/base.js"
			},
			moduleJS:{
				src	:"htdocs/common/js/module.js",
				dest:"htdocs/common/js/minify/module.js"
			},
			mainJS:{
				src	:"htdocs/src/js/main.js",
				dest:"htdocs/common/js/minify/main.js"
			}
		},
		removelogging:{
			baseJS:{
				src	:"htdocs/common/js/minify/base.js",
				dest:"htdocs/common/js/minify/base.js"
			},
			moduleJS:{
				src	:"htdocs/common/js/minify/module.js",
				dest:"htdocs/common/js/minify/module.js"
			},
			mainJS:{
				src	:"htdocs/common/js/minify/main.js",
				dest:"htdocs/common/js/minify/main.js"
            }
		},
		sass:{
			options:{
				style: "compact"
			},
			all:{
				files:{
					"htdocs/common/css/layout.css"	: "htdocs/src/scss/layout.scss",
					"htdocs/common/css/contents.css": "htdocs/src/scss/contents.scss",
					"htdocs/common/css/module.css"	: "htdocs/src/scss/module.scss"
				}
			},
			layout:{
				files:{"htdocs/common/css/layout.css": "htdocs/src/scss/layout.scss"}
			},
			contents:{
				files:{"htdocs/common/css/contents.css": "htdocs/src/scss/contents.scss"}
			},
			module:{
				files:{"htdocs/common/css/module.css": "htdocs/src/scss/module.scss"}
			}
		},
		autoprefixer:{
			options:{
				browsers:BROWSERS
			},
			all:{
				expand	: true,
				flatten	: true,
				src		:"htdocs/common/css/*.css",
				dest	:"htdocs/common/css/"
			},
			layout:{
				expand	: true,
				flatten	: true,
				src		:"htdocs/common/css/layout.css",
				dest	:"htdocs/common/css/"
			},
			contents:{
				expand	: true,
				flatten	: true,
				src		:"htdocs/common/css/contents.css",
				dest	:"htdocs/common/css/"
			},
			module:{
				expand	: true,
				flatten	: true,
				src		:"htdocs/common/css/module.css",
				dest	:"htdocs/common/css/"
			}
		},
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
				  docs: "htdocs/src/scss/module.scss"
				}
			}
		},
//		sassdoc:{
//			default:{
//				src:[
//					"htdocs/common/scss/*.scss",
//					"User/macbookair12/desktop/works/base_format/htdocs/common/scss/partials/*.scss"
//				]
//			}
//		},
		shell:{
			styledocco:{
				command: function () {
					return " styledocco --o 'htdocs/common/css/compornents' --preprocessor 'scss' common/scss/module.scss";
				}
			},
			sassdoc:{
				command: function () {
					return "sassdoc src/scss -d src/sassdocs -n 'Wonderful Sass'";
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
						"htdocs/src/js/module/",
						"htdocs/src/js/develop/"
					],
					//YUIDocファイルを出力するディレクトリ名を記述
					outdir	: "htdocs/src/yuidocs/",
					themedir: "htdocs/src/yui-themes/custom/"
				}
			}
		},
        watch:{
			options: {
				spawn: false
			},
			
			//JS
			JS_base:{
				files:[
					"htdocs/src/js/ie/*.js",
					"htdocs/src/js/jquery/*.js"
				],
				tasks:["concat:baseJS","uglify:baseJS","removelogging:baseJS"]
			},
			JS_module:{
				files:"htdocs/src/js/module/*.js",
				tasks:["concat:moduleJS","uglify:moduleJS","removelogging:moduleJS"]
			},
			JS_main:{
				files:"htdocs/src/js/main.js",
				tasks:["concat:mainJS","uglify:mainJS","removelogging:mainJS"]
			},
			
			//SASS
			SASS_all:{
				files:["htdocs/src/scss/partials/*.scss"],
				tasks:["sass:all","autoprefixer:all"]
			},
			SASS_layout:{
				files:["htdocs/src/scss/layout.scss"],
				tasks:["sass:layout","autoprefixer:layout"]
			},
			SASS_contents:{
				files:["htdocs/src/scss/contents.scss"],
				tasks:["sass:contents","autoprefixer:contents"]
			},
			SASS_module:{
				files:["htdocs/src/scss/module.scss"],
				tasks:["sass:module","autoprefixer:module"]
			},

			//DOCUMENT
			yuidoc:{
				files:[
					"htdocs/src/js/module/*.js",
					"htdocs/src/js/develop/*.js"
				],
				tasks:["yuidoc"]
			},
			/*styleguide:{
				files:["htdocs/common/scss/module.scss","htdocs/common/scss/README.md"],
                tasks:["sass","shell:styledocco"]
			}*/
			sassdoc:{
				files:["htdocs/src/scss/partials/*.scss"],
				tasks:["shell:sassdoc"]
			}
        }
	});
};

