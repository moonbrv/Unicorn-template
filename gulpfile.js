'use strict'

var gulp = require("gulp");
var postcss = require("gulp-postcss");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var sass = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");
var cssnano = require("cssnano");
var autoprefixer = require("autoprefixer");
var rename = require("gulp-rename");
var bs = require("browser-sync").create();
var gutil = require('gulp-util');
var imagemin = require('gulp-imagemin');
var mqpacker = require('css-mqpacker');
var cssdeclsort = require('css-declaration-sorter');

/* --- plugins setup --- */
var reload = bs.reload;

var paths = {
	style_src: "./assets/scss/**/*.scss",
	style_dest: "./public/css/",
	vendor_css: "./vendors/css/*.css",
	vendor_js: "./vendors/js/*.js",
	js_src: "./assets/js/**/*.js",
	js_dest: "./public/js/",
	html_src: "./assets/*.html",
	html_dest: "./public/",
	img_src: "./assets/img/*",
	img_dest: "./public/img/"
}

var sassOptions = {
	errLogToConsole: true,
	outputStyle: 'expanded'
};

/* --- html --- */
gulp.task('html', function(){
	return gulp.src(paths.html_src)
	.pipe(gulp.dest(paths.html_dest));
});

/* --- vendors css --- */
gulp.task('vendor-css', function(){
	return gulp.src(paths.vendor_css)
	.pipe(concat('vendors.css'))
	.pipe(postcss([
		autoprefixer(),
		cssnano()
		]))
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest(paths.style_dest));
});

/* --- vendors js --- */
gulp.task('vendor-js', function(){
	return gulp.src(paths.vendor_js)
	.pipe(concat('vendors.js'))
	.pipe(uglify().on('error', gutil.log))
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest(paths.js_dest));
});

/* --- sass --- */
gulp.task('sass', function(){
	return gulp.src(paths.style_src)
	.pipe(sourcemaps.init())
	.pipe(sass(sassOptions).on('error', sass.logError))
	.pipe(concat('main.css'))
	.pipe(postcss([
		autoprefixer(),
		mqpacker({
			sort: true
		}),
		cssdeclsort({
			order: 'smacss'
		}),
		cssnano()
		]))
	.pipe(rename({suffix: '.min'}))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest(paths.style_dest));
});

/* --- javascripts --- */
gulp.task('js', function(){
	return gulp.src(paths.js_src)
	.pipe(sourcemaps.init())
	.pipe(concat('main.js'))
	.pipe(uglify().on('error', gutil.log))
	.pipe(rename({suffix: '.min'}))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest(paths.js_dest));
});

/* --- images --- */
gulp.task('image', function () {
	return gulp.src(paths.img_src)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.img_dest));
});

/* --- static server --- */
gulp.task('serve', ['html', 'image','vendor-css', 'vendor-js', 'sass', 'js'], function() {
	bs.init([paths.style_dest, paths.js_dest, paths.html_dest, paths.img_dest],{
		server: "./public/"
	}); 
});

/* --- default task --- */
gulp.task('default', ['serve'], function() {
	gulp.watch(paths.style_src, ['sass']);
	gulp.watch(paths.js_src, ['js']);
	gulp.watch(paths.html_src, ['html']);
	gulp.watch(paths.img_src, ['image']);
});
