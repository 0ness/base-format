'use strict';

var gulp        = require('gulp');
var $           = require('gulp-load-plugins')();
var del         = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var concat      = require('gulp-concat');
var reload      = browserSync.reload;
var cachedFlg   = true;

var src  = './src';                  // ソースファイル
var dest = './deploy'; // 出力先

// 
// config
// 
// - `config.path`     : ファイルパスを設定
// - `config.browsers` : gulp-autoprefixer の設定
// 
var config = {
  'path': {
    'sass'   : '/sass',           // SCSS
    'scss'   : '/scss',           // SCSS
    'css'    : '/common/css',     // CSS
    'js'     : '/common/js',      // JS 
    'js_dev' : '/js',      // JS 
    'jsLibs' : '/common/js/libs', // JS ライブラリ
    'pug'    : '/pug'            // pug
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
  runSequence('default', ['css:watch', 'js:watch', 'html:watch']);
});


// 
// serve
// 
// ブラウザ同期の設定
// 
gulp.task('serve', function() {
  browserSync({
    server : {
		baseDir: ['deploy']
    },
    startPath : '/',
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
      precision : 3,
      style     : 'expanded',
      sourcemap : false
    })
    .on('error', $.rubySass.logError)
    .pipe($.autoprefixer({
      browsers: config.browsers
    }))
    .pipe($.rename(function(path) {
      // ディレクトリ名の置換 
      path.dirname = path.dirname.replace('scss', 'css');
    }))
    .pipe(gulp.dest(dest + config.path.css));
});

// 
// css:sass
//
// SCSSファイルを CSSファイルにコンパイル
// 
//gulp.task('css:sass', function() {
//	return $.rubySass(src + config.path.sass + '/**/*.scss', {
//		precision : 3,
//		style     : 'expanded',
//		sourcemap : false
//	})
//		.on('error', $.rubySass.logError)
//		.pipe($.autoprefixer({
//		browsers: config.browsers
//	}))
//		.pipe($.rename(function(path) {
//		// ディレクトリ名の置換 
//		path.dirname = path.dirname.replace('sass', 'css');
//	}))
//		.pipe(gulp.dest(dest + config.path.css));
//});


// 
// js
// 
// - `js`       - JavaScript 関連のタスク
// - `js:watch` - JavaScript 関連のタスクを監視
// 
gulp.task('js', ['js:hint']);
gulp.task('js:watch', ['serve'], function() {
 // gulp.watch([src + config.path.js + '/**/*.js'], ['js', reload]);
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
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe(gulp.dest(dest + config.path.js));
});


// 
// js:hint
// 
// JavaScript の構文チェック（JSHint）
// 
gulp.task('moduleJs', function() {
  return gulp.src([
	  src + config.path.js_dev + "module/UserInfo.js",
	  src + config.path.js_dev + "module/Utility.js"
  ])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist/'));
});


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
    .pipe($.plumber({errorHandler: $.notify.onError("<%= error.message %>")}))
    .pipe($.pug({
      pretty  : true,
      basedir : src + config.path.pug
    }))
    // 空要素の '/' の前に空白を追加
    .pipe($.replace('/>', ' />'))
    .pipe(gulp.dest(dest));
});