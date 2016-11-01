'use strict';

var gulp 		= require('gulp'),
    $ 			= require('gulp-load-plugins')(), //gulpプラグインをロードし一括管理
    del 		= require('del'), //ファイル削除用インスタンス
    runSequence = require('run-sequence'), //並行処理をする
    browserSync = require('browser-sync'), //ライブリロード
    browserify 	= require('browserify'),
    source 		= require('vinyl-source-stream'),
    buffer 		= require('vinyl-buffer'),
    watchify 	= $.watchify,
    reload 		= browserSync.reload,
    watching 	= false

var src = './src', // ソースファイル
    dest = './htdocs'; // 出力先


// 
// config
// 
// - `config.path`     : ファイルパスを設定
// - `config.browsers` : gulp-autoprefixer の設定
// 
var config = {
    'path': {
		'sass': '/sass', // SCSS
        'scss': '/scss', // SCSS
        'css': '/common/css', // CSS
        'js': '/common/js', // JS 
        'jsMin': '/common/js/minify', // JS 
        'js_dev': '/js', // JS 
        'jsLibs': '/common/js/libs', // JS ライブラリ
        'pug': '/pug' // pug
    },
    'browsers': [
        'last 2 versions',
        'ie 11',
        'safari 8',
        'iOS 9',
        'Android 4'
    ]
};


// 
// default
// 
// デフォルトタスク
// 
gulp.task('default', function() {
    runSequence(['css', 'js', 'html']);
});


// 
// watch
// 
// ファイル監視タスク  
// 
gulp.task('watch', function() {
    runSequence('default', ['css:watch', 'js:watch', 'html:watch', 'watchify']);
});


// 
// watchify
// 
// browserifyファイル監視タスク  
// 
gulp.task('enable-watch-mode', function() {
    watching = true
})
gulp.task('watchify', ['enable-watch-mode', 'js:mainJs'])


// 
// serve
// 
// ブラウザ同期の設定
// 
gulp.task('serve', function() {
    browserSync({
        server: {
            baseDir: ['htdocs']
        },
        startPath: '/',
    });
});


// 
// css
// 
// - `css`       - スタイルシート関連のタスク
// - `css:watch` - スタイルシート関連のタスクを監視
// 
gulp.task('css', function(cb) {
    runSequence('css:scss', cb);
});
gulp.task('css:watch', ['serve'], function() {
    gulp.watch([
        src + config.path.scss + '/**/*.scss'
    ], ['css', reload]);
});


// 
// css:scss
//
// SCSSファイルを CSSファイルにコンパイル
// 
gulp.task('css:scss', function() {
    return $.rubySass(src + config.path.scss + '/**/*.scss', {
        precision: 3,
        style: 'compact',
        sourcemap: false
    })
        .pipe($.cached('scripts'))
        .on('error', $.rubySass.logError)
        .pipe($.autoprefixer({
            browsers: config.browsers
        }))
        .pipe($.rename(function(path) {
            path.dirname = path.dirname.replace('scss', 'css');
        }))
        .pipe(gulp.dest(dest + config.path.css));
});


// 
// js
// 
// - `js`       - JavaScript 関連のタスク
// - `js:watch` - JavaScript 関連のタスクを監視
// 
gulp.task('js', ['js:hint', 'js:moduleJs']);
gulp.task('js:watch', ['serve'], function() {
    gulp.watch([src + config.path.js_dev + '/**/*.js'], ['js', reload]);
});


// 
// js:hint
// 
// JavaScript の構文チェック（JSHint）
// 
gulp.task('js:hint', function() {
    return gulp.src([
        src + config.path.js + '/**/*.js',
        '!' + src + config.path.jsLibs + '/**/*.js'
    ])
        .pipe($.plumber({
            errorHandler: $.notify.onError("<%= error.message %>")
        }))
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe(gulp.dest(dest + config.path.js));
});


// 
// js:moduleJs
// 
// モジュールjs
// 
gulp.task('js:moduleJs', function() {
    return gulp.src([
        src + config.path.js_dev + "/module/UserInfo.js"
    ])
        .pipe($.plumber({
            errorHandler: $.notify.onError("<%= error.message %>")
        }))
        .pipe($.concat('module.js'))
        .pipe(gulp.dest(dest + config.path.js))
        .pipe(buffer())
        .pipe($.uglify())
        .pipe(gulp.dest(dest + config.path.jsMin));
});


// 
// js:mainJs
// 
// メインjs
// 
gulp.task('js:mainJs', watchify(function(watchify) {
    var _name = 'main.js';
    return gulp.src([src + config.path.js_dev + '/' + _name])
		.pipe($.plumber({
		errorHandler: $.notify.onError("<%= error.message %>")
	}))
        .pipe(watchify({
            watch: watching
        }))
        .pipe(gulp.dest(dest + config.path.js))
        .pipe(buffer())
        .pipe($.uglify())
        .pipe(gulp.dest(dest + config.path.jsMin));
}));


// 
// html
// 
// - `html`       - HTML 関連のタスク
// - `html:watch` - HTML 関連のタスクを監視
// 
gulp.task('html', function(cb) {
    runSequence('html:pug', cb);
});
gulp.task('html:watch', ['serve'], function() {
    gulp.watch([
        src + config.path.pug + '/**/*.pug'
    ], ['html', reload]);
});


// 
// html:pug
// 
// pug をコンパイル
// 
gulp.task('html:pug', function() {
    return gulp.src([
        src + config.path.pug + '/**/*.pug',
        '!' + src + config.path.pug + '/**/_*.pug'
    ])
        .pipe($.plumber({
            errorHandler: $.notify.onError("<%= error.message %>")
        }))
        .pipe($.pug({
            pretty: true,
            basedir: src + config.path.pug
        }))
	// 空要素の '/' の前に空白を追加
    .pipe($.replace('/>', ' />'))
        .pipe(gulp.dest(dest));
});