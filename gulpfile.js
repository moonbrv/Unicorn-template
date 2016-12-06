'use strict'
var path =require('path');
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
var imagemin = require('gulp-image');
var mqpacker = require('css-mqpacker');
const purify = require('gulp-purifycss');
const watchify = require('watchify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

/* --- plugins setup --- */
var reload = bs.reload;

var paths = {
	style_src: "./assets/scss/**/*.scss",
	style_dest: "./public/css/",
	vendor_css: "./vendors/css/*.css",
	vendor_js: "./vendors/js/*.js",
	js_src: "./assets/js/index.js",
	js_dest: "./public/js/",
	html_src: "./assets/*.html",
	html_dest: "./public/",
	img_src: "./assets/img/*",
	img_dest: "./public/img/",
	fonts_src: 'node_modules/font-awesome/fonts/*',
	fonts_dest: "./public/fonts/"
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

/* --- Fonts --- */
gulp.task('fonts', function(){
	return gulp.src(paths.fonts_src)
	.pipe(gulp.dest(paths.fonts_dest));
});

/* --- sass --- */
gulp.task('sass', function(){
	return gulp.src(paths.style_src)
	.pipe(sourcemaps.init())
	.pipe(sass(sassOptions).on('error', sass.logError))
	.pipe(purify([
		path.join(__dirname, 'assets', '*.html'),
		'node_modules/bootstrap-sass/assets/javascripts/bootstrap.js',
		'node_modules/slick-carousel/slick/slick.js',
		'assets/js/*.js'
		], {info: true}))
	.pipe(concat('main.css'))
	.pipe(postcss([
		autoprefixer(),
		mqpacker({
			sort: true
		}),
		cssnano()
		]))
	.pipe(rename({suffix: '.min'}))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest(paths.style_dest));
});

/* --- javascripts --- */
/*gulp.task('js', function(){
	return gulp.src(paths.js_src)
	.pipe(sourcemaps.init())
	.pipe(concat('main.js'))
	.pipe(uglify().on('error', gutil.log))
	.pipe(rename({suffix: '.min'}))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest(paths.js_dest));
});*/

const customOpts = {
	entries: [paths.js_src],
	debug: true
};

const brwOptions = Object.assign({}, watchify.args, customOpts);
const b = watchify(browserify(brwOptions));

function bundle() {
	return b.transform('babelify', {presets: ['latest']})
		.bundle()
		.on('error', gutil.log.bind(gutil, 'Browserify Error'))
		.pipe(source('bundle.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(uglify())
		.pipe(sourcemaps.write('../maps'))
		.pipe(gulp.dest(paths.js_dest));
}

gulp.task('javascript', bundle); // so you can run `gulp js` to build the file
b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal

gulp.task('javascript-watch', ['javascript'], function (done) {
	bs.reload();
	done();
});

/* --- images --- */
gulp.task('image', function () {
	return gulp.src(paths.img_src)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.img_dest));
});

/* --- static server --- */
gulp.task('serve', ['html', 'fonts', 'image', 'sass', 'javascript-watch'], function() {
	bs.init([paths.style_dest, paths.js_dest, paths.html_dest, paths.img_dest],{
		server: "./public/"
	});
});

/* --- default task --- */
gulp.task('default', ['serve'], function() {
	gulp.watch(paths.style_src, ['sass']);
//	gulp.watch(paths.js_src, ['js']);
	gulp.watch(paths.html_src, ['html']);
	gulp.watch(paths.img_src, ['image']);
});
