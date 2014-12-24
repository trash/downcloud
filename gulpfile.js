var gulp = require('gulp'),
	gutil = require('gulp-util'),
	sass = require('gulp-ruby-sass'),
	uglify = require('gulp-uglify'),
	jshint = require('gulp-jshint'),
	watch = require('gulp-watch'),
	concat = require('gulp-concat'),
	notify = require('gulp-notify'),
	browserify = require('browserify'),
	source = require('vinyl-source-stream'),
	// madge = require('madge'),
	colors = require('colors');

 // require sass
var sass = require('gulp-ruby-sass');

gulp.task('sass', function () {
	gulp.src('app/styles/**/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('./.tmp/styles'));
});

 // uglify task
gulp.task('js', function() {
	// main app js file
	gulp.src([
		'app/scripts/app.js',
		'app/scripts/**/*.js'
	])
		// .pipe(uglify())
		.pipe(concat("main.js"))
		.pipe(gulp.dest('.tmp/scripts/'));

	// create 1 vendor.js file from all vendor plugin code
	// gulp.src('./assets/js/vendor/**/*.js')
	// 	.pipe(uglify())
	// 	.pipe(concat("vendor.js"))
	// 	.pipe(gulp.dest('./assets/js'))
	// 	.pipe( notify({ message: "Javascript is now ugly!"}) );
});

gulp.task('watch', function() {
	// watch scss files
	gulp.watch('app/styles/**/*.scss', function() {
		gulp.run('sass');
	});

	gulp.watch('app/scripts/**/*.js', ['browserify', 'jshint']);
});
 
gulp.task('browserify', function() {
	return browserify('./app/scripts/app.js')
		.bundle()
		//Pass desired output filename to vinyl-source-stream
		.pipe(source('bundle.js'))
		// Start piping stream to tasks!
		.pipe(gulp.dest('./app/build/scripts/'));
});

gulp.task('jshint', function () {
	gulp.src(['app/scripts/**/*.js'])
		.pipe(jshint('.jshintrc'))
		.pipe(jshint.reporter('jshint-stylish'));
});
// gulp.task('circular-dependencies-check', function () {
// 	var circular = madge('app/scripts/').circular().getArray();
// 	if (circular.length) {
// 		console.log('Oh no we got circular dependencies!'.red);
// 		console.log(colors.blue(circular));
// 	}
// });

gulp.task('default', ['sass', 'browserify', 'watch']);