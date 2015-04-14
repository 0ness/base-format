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
	grunt.loadNpmTasks('grunt-sassdoc');

	var BROWSERS = [
					'ie >= 8',
//					'ie_mob >= 10',
//					'ff >= 35',
					'chrome >= 39',
					'safari >= 7',
//					'opera >= 23',
					'ios >= 7'
//					'android >= 2.3'
//					'and_ff >= 20',
//					'and_chr >= 34'
				   ];

	//基本的なタスクセット
    grunt.initConfig({
        concat:{
            baseJS:{
                src:[
                    "src/js/jquery/jquery.js",
                    "src/js/jquery/easing.js",
					"src/js/ie/selectivizr.js"
                ],
                dest:"src/js/base.js"
            },
			moduleJS:{
				src:[
					"src/js/module/jquery.module.js",
					"src/js/module/UserInfo.js",
					"src/js/module/Library.js"
				],
				dest:"common/js/module.js"
			},
			mainJS:{
				src:"src/js/main.js",
				dest:"common/js/main.js"
			}
        },
		uglify:{
			baseJS:{
				src:"src/js/base.js",
				dest:"common/js/minify/base.js"
			},
			moduleJS:{
				src:"common/js/module.js",
				dest:"common/js/minify/module.js"
			},
			mainJS:{
				src:"src/js/main.js",
				dest:"common/js/minify/main.js"
			}
		},
		removelogging:{
			baseJS:{
				src: "common/js/minify/base.js",
				dest:"common/js/minify/base.js"
			},
			moduleJS:{
				src:"common/js/minify/module.js",
				dest:"common/js/minify/module.js"
			},
			mainJS:{
				src: "common/js/minify/main.js",
				dest:"common/js/minify/main.js"
            }
		},
		sass:{
			options:{
				style: 'compact'
			},
			dist:{
				files:{
					'common/css/layout.css': 'src/scss/layout.scss',
					'common/css/contents.css': 'src/scss/contents.scss',
					'common/css/module.css': 'src/scss/module.scss'
				}
			}
		},
		autoprefixer:{
			options:{
				browsers:BROWSERS
			},
			file:{
				expand: true,
				flatten: true,
				src:'common/css/*.css',
				dest:'common/css/'
			}
		},
		styleguide: {
			dist: {
				options: {
					framework: {
						name: 'compornents',
						options:{
							preprocessor:"scss"
						}
					}
				},
				files: {
				  docs: 'src/scss/module.scss'
				}
			}
		},
//		sassdoc:{
//			default:{
//				src:[
//					"common/scss/*.scss",
//					"User/macbookair12/desktop/works/base_format/htdocs/common/scss/partials/*.scss"
//				]
//			}
//		},
		shell:{
			styledocco:{
				command: function () {
					return ' styledocco --o "common/css/compornents" --preprocessor "scss" common/scss/module.scss';
				}
			},
			sassdoc:{
				command: function () {
					return 'sassdoc src/scss -d src/sassdocs -n "Wonderful Sass"';
				}
			}
		},
		yuidoc: {
			dist: {
				'name': 'js-document',
				'description': "テストテストテストテストテストテスト",
				options: {
					//出力パスの指定(今回はGruntfile.jsと同階層に出力するよう指定)
					paths:[
						'src/js/module/',
						'src/js/develop/'
					],
					//YUIDocファイルを出力するディレクトリ名を記述
					outdir: 'src/yuidocs/',
					themedir: "src/yui-themes/custom/"
				}
			}
		},
        watch:{
			options: {
				spawn: false
			},
			JS_base:{
				files:[
					"src/js/ie/*.js",
					"src/js/jquery/*.js"
				],
				tasks:["concat:baseJS","uglify:baseJS","removelogging:baseJS"]
			},
			JS_module:{
				files:"src/js/module/*.js",
				tasks:["concat:moduleJS","uglify:moduleJS","removelogging:moduleJS"]
			},
			JS_main:{
				files:"src/js/main.js",
				tasks:["concat:mainJS","uglify:mainJS","removelogging:mainJS"]
			},
			sass:{
				files:["src/scss/*.scss","src/scss/partials/*.scss"],
				tasks:["sass","autoprefixer:file"]
			},
			yuidoc:{
				files:[
					"src/js/module/*.js",
					"src/js/develop/*.js"
				],
				tasks:["yuidoc"]
			},
			/*styleguide:{
				files:["common/scss/module.scss","common/scss/README.md"],
                tasks:["sass","shell:styledocco"]
			}*/
			sassdoc:{
				files:["src/scss/partials/*.scss"],
				tasks:["shell:sassdoc"]
			}
        }
	});
};

