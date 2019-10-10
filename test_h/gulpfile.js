const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglifyes');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const cleanCSS = require('gulp-clean-css');

gulp.task('styles', function () {
	return gulp.src([
		  'src/css/normalize.css'
		, 'src/css/base.css'
		, 'src/css/dropdown.css'
	])
		.pipe(concat('style.css'))
		.pipe(autoprefixer({
			browsers: ['last 6 versions']
		}))
		.pipe(cleanCSS())
		.pipe(gulp.dest('build/css'))
})

gulp.task('scripts', function () {
	return gulp.src([
		  'src/js/select.js'
		, 'src/js/closest_polyfill.js'
	])
		.pipe(babel({
			presets: ['@babel/preset-env']
		}))
		.pipe(uglify({
			mangle: true,
			ecma: 6
		}))
		.pipe(concat('app.js'))
		.pipe(gulp.dest('build/js'))
});


gulp.task('build', gulp.parallel('styles', 'scripts'));
