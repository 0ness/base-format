
//マルチタスクの登録
//module.exports = function(grunt){
//
//    /*grunt.initConfig({
//        タスク１：{
//            ターゲット1：データ1,
//            ターゲット2：データ2,
//            ターゲット3：データ3,
//            ....,
//        },
//        タスク２:{
//        },
//        ....,
//    })
//    マルチタスクはinitConfigのデータを元に処理を行う
//    registerMultiTask関数と紐付いているため関数と同じ名前を持つ
//    各タスクに2つ以上値がある場合、それぞれに処理が走る*/
//    grunt.initConfig({
//        mygreattask:{
//            target1:"so great",
//            target2:"very great"
//        },
//        mycooltask:{
//            target1:"so cool",
//            target2:"very cool"
//        }
//    });
//
//    /*grunt.registerMultiTask
//    registerTaskと基本的な記述は同じ、this.targetとthis.dataが利用できる*/
//    grunt.registerMultiTask("mygreattask","マルチタスクのテスト_01",function(){
//        grunt.log.writeln("target: "+this.target);
//        grunt.log.writeln("data: "+this.data);
//    });
//
//    grunt.registerMultiTask("mycooltask","マルチタスクのテスト_02",function(){
//
//        /*async()
//        実行した際、そのタスクは非同期であることをgrunt側が判断する
//        完了時に関数を返し、その関数の実行によってタスク完了をgurnt側が判断する
//        引数にfalseを入れるとタスクの失敗を連絡できる*/
//        var done = this.async();
//        var self = this;
//        setTimeout(function(){
//            grunt.log.writeln("target: "+self.target);
//            grunt.log.writeln("data: "+self.data);
//            done();
//        },1000);
//    });
//
//    grunt.registerTask("default",["mygreattask","mycooltask"]);
//
//}


//タスクの外部ファイル化
//module.exports = function(grunt){
//
//    /*grunt.task.loadTasks（ディレクトリ）
//    ディレクトリ内のファイルを読み込む*/
//    grunt.task.loadTasks("mytasks");
//
//    grunt.initConfig({
//        mygreattask:{
//            target1:"so great",
//            target2:"very great"
//        },
//        mycooltask:{
//            target1:"so cool",
//            target2:"very cool"
//        }
//    });
//
//    grunt.registerTask("default",["mygreattask","mycooltask"]);
//
//};


//Gruntプラグインの導入（uglifyの場合）
//module.exports = function(grunt){
//
//    /*grunt.loadNpmTask(インストールするプラグイン名)
//    gruntにプラグインをインストールする*/
//    grunt.loadNpmTasks("grunt-contrib-uglify");
//
//    //uglifyの設定を追加
//    grunt.initConfig({
//        uglify:{
//            /*options
//            プラグインそれぞれのオプション機能*/
//            options:{
//                banner:"/* uglifyプラグインのオプションテスト */"
//            },
//            foo:{
//                src:"common/js/main.js",
//                dest:"common/js/minify/main.min.js"
//            },
//            bar:{
//                src:"common/js/pageInfo.js",
//                dest:"common/js/minify/pageInfo.min.js"
//            }
//        }
//    });
//
//    //処理を実行
//    grunt.registerTask("default",["uglify"]);
//}


//Gruntプラグインの導入（concatの場合）
//module.exports = function(grunt){
//
//    grunt.loadNpmTasks("grunt-contrib-concat");
//
//    grunt.initConfig({
//        //concatの設定を追加
//        concat:{
//            js:{
//                src:[
//                    "common/js/pageInfo.js",
//                    "common/js/jquery/jquery.js",
//                    "common/js/jquery/easing.js"
//                ],
//                dest:"common/js/test.js"
//            }
//        }
//    });
//
//    grunt.registerTask("default",["concat"]);
//}


//Gruntプラグインの導入（watchの場合）
//module.exports = function(grunt){
//
//    grunt.loadNpmTasks("grunt-contrib-uglify");
//    grunt.loadNpmTasks("grunt-contrib-watch");
//
//    grunt.initConfig({
//        uglify:{
//            test:{
//                src:"common/js/main.js",
//                dest:"common/js/minify/main.min.js"
//            }
//        },
//        watch:{
//            js:{
//                files:"<%= uglify.test.src %>",
//                tasks:["uglify"]
//            }
//        }
//    });
//
//    grunt.registerTask("default",["uglify"]);
//
//}


//Gruntプラグインの導入（watchの場合）
module.exports = function(grunt){

	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-sass");
	grunt.loadNpmTasks("grunt-autoprefixer");
	grunt.loadNpmTasks("grunt-shell");
	grunt.loadNpmTasks("grunt-remove-logging");
	grunt.loadNpmTasks("grunt-newer");
	grunt.loadNpmTasks("grunt-contrib-yuidoc");
	grunt.loadNpmTasks('grunt-sassdoc');
	//	grunt.loadNpmTasks("grunt-play");
	//	grunt.loadNpmTasks("grunt-utf8tosjis" );

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
                    "common/js/lib/pageInfo.js",
                    "common/js/jquery/jquery.js",
                    "common/js/jquery/easing.js",
                    "common/js/jquery/module.js",
                    "common/js/lib/library.js",
					"common/js/ie/selectivizr.js"
                ],
                dest:"common/js/base.js"
            }
        },
		removelogging:{
			baseJS:{
				src: "common/js/base.js",
				dest:"common/js/minify/base.js"
			},
            mainJS:{
                src: "common/js/main.js",
                dest:"common/js/minify/main.js"
            }
		},
        uglify:{
			baseJS:{
                src:"common/js/base.js",
                dest:"common/js/minify/base.js"
            },
            mainJS:{
                src:"common/js/main.js",
                dest:"common/js/minify/main.js"
            }
        },
		clean:{
            js:"<%= concat.baseJS.dest %>"
        },
		sass:{
			options:{
				style: 'compact'
			},
			dist:{
				files:{
					'common/css/layout.css': 'common/scss/layout.scss',
					'common/css/contents.css': 'common/scss/contents.scss',
					'common/css/module.css': 'common/scss/module.scss'
				}
			}
		},
		autoprefixer:{
			options:{
				browsers:BROWSERS
//				cascade:true
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
				  docs: 'common/scss/module.scss'
				}
			}
		},
		sassdoc:{
			default:{
				src:[
					"common/scss/*.scss",
					"User/macbookair12/desktop/works/base_format/htdocs/common/scss/partials/*.scss"
				]
			}
		},
		shell:{
			styledocco:{
				command: function () {
					return ' styledocco --o "common/css/compornents" --preprocessor "scss" common/scss/module.scss';
				}
			},
			sassdoc:{
				command: function () {
					return 'sassdoc common/scss -d sassdocs -n "Wonderful Sass"';
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
						'common/js/lib/',
						'common/js/develop/'
					],
					//YUIDocファイルを出力するディレクトリ名を記述
					outdir: 'yuidocs/',
					themedir: "themes/custom/"
				}
			}
		},
        watch:{
            js:{
                files:[
                    "common/js/*.js",
                    "common/js/lib/*.js",
                    "common/js/jquery/*.js",
                    "common/js/ie/*.js"
                ],
                tasks:["concat","removelogging","uglify"/*,"clean",*//*"utf8tosjis"*/]
            },
			sass:{
				files:["common/scss/*.scss","common/scss/partials/*.scss"],
				tasks:["sass"]
			},
			css:{
				options: {
					spawn: false
				},
				files:"<%= autoprefixer.file.src %>",
                tasks:["autoprefixer"]
			},
			yuidoc:{
				files:[
					"common/js/lib/*.js",
					"common/js/develop/*.js"
				],
				tasks:["yuidoc"]
			},
			/*styleguide:{
				files:["common/scss/module.scss","common/scss/README.md"],
                tasks:["newer:sass","shell:styledocco"]
			}*/
			sassdoc:{
				files:["common/scss/partials/*.scss"],
				tasks:["shell:sassdoc"]
			}
        }
	});

//    grunt.registerTask("default",["shell:sassdoc"]);


};

