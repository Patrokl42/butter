const gulp          = require('gulp'),
	sass          = require('gulp-sass'),
	browserSync   = require('browser-sync'),
	concat        = require('gulp-concat'),
	uglify        = require('gulp-uglify-es').default,
	cleancss      = require('gulp-clean-css'),
	rename        = require('gulp-rename'),
	autoprefixer  = require('gulp-autoprefixer'),
	notify        = require('gulp-notify'),
	imageResize   = require('gulp-image-resize'),
	imagemin      = require('gulp-imagemin'),
	mozjpeg       = require('imagemin-mozjpeg'),
	newer         = require('gulp-newer'),
	del           = require('del'),
	pug			  = require('gulp-pug');

// Local Server
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'dest'
		},
		notify: true,
		// online: false, // Work Offline Without Internet Connection
		// tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
	})
});

// Sass|Scss Styles
gulp.task('styles', function() {
	return gulp.src('app/sass/**/*.scss')
	.pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
	.pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(autoprefixer(['last 15 versions']))
	// .pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
	.pipe(gulp.dest('dest/css'))
	.pipe(browserSync.stream())
});

gulp.task('views', function buildHTML() {
	return gulp.src([
	  'app/pug/*.pug'
  ])
	.pipe(pug({
		pretty:true
	}))
	.pipe(gulp.dest('dest'))
	.pipe(browserSync.stream())
});

gulp.task('pages', function buildHTML() {
	return gulp.src([
			'app/pug/pages/*.pug'
		])
		.pipe(pug({
			pretty:true
		}))
		.pipe(gulp.dest('dest'))
		.pipe(browserSync.stream())
});

// JS
gulp.task('scripts', function() {
	return gulp.src([
	  'app/js/jQuery.js',
	  'app/js/anchor.js',
	  'app/js/swiperjs.js',
	  'app/js/jquery.mask.min.js',
	  'app/js/common.js' // Always at the end
	])
	.pipe(concat('scripts.min.js'))
	// .pipe(uglify()) // Mifify js (opt.)
	.pipe(gulp.dest('dest/js'))
	.pipe(browserSync.reload({ stream: true }))
});

// HTML Live Reload
gulp.task('code', function() {
	return gulp.src([
	  'dest/*.html',
	  'dest/pages/*.html'
  ])
	.pipe(browserSync.reload({ stream: true }))
});

// Deploy
gulp.task('deploy', function() {
	return gulp.src(['./app/js/*.js','./app/css/*.css','./app/*.html'],{base: './app'})
	.pipe(gulp.dest('./dest/'));
});

gulp.task('fonts', function() {
	return gulp.src('app/fonts/**/*.*')
	.pipe(gulp.dest('dest/fonts/'))
});

// Images @x1 & @x2 + Compression | Required imagemagick (sudo apt update; sudo apt install imagemagick)
gulp.task('img1x', function() {
	return gulp.src('app/img/_src/**/*.*')
	.pipe(newer('app/img/@1x'))
	.pipe(imageResize({ width: '50%', imageMagick: true }))
	.pipe(imagemin([
		imagemin.jpegtran({ progressive: true }),
		mozjpeg({ quality: 90 })
	]))
	.pipe(gulp.dest('dest/img/@1x'))
});

gulp.task('img2x', function() {
	return gulp.src('app/img/*.*')
	.pipe(imagemin([
		imagemin.jpegtran({ progressive: true }),
		mozjpeg({ quality: 90 })
	]))
	.pipe(gulp.dest('dest/img/'))
});

gulp.task('img', gulp.series('img1x', 'img2x'));

// Clean @*x IMG's
gulp.task('cleanimg', function() {
	return del(['app/img/@*'], { force:true })
});

gulp.task('watch', function() {
	gulp.watch('app/pug/**/*.pug', gulp.parallel('views'));
	gulp.watch('app/pug/**/*.pug', gulp.parallel('pages'));
	gulp.watch('app/sass/**/*.scss', gulp.parallel('styles'));
	gulp.watch(['libs/**/*.js', 'app/js/common.js'], gulp.parallel('scripts'));
	gulp.watch('app/*.html', gulp.parallel('code'));
	gulp.watch('app/img/_src/**/*', gulp.parallel('img'));
});

gulp.task('default', gulp.parallel('views','pages','img', 'styles', 'scripts','fonts', 'browser-sync', 'watch'));
