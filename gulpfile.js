const gulp = require('gulp');

const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');

const concat = require('gulp-concat');


gulp.task('styles', function () {
	return gulp.src([
		  './css/normalize.css'
		, './css/base.css'
		, './css/site.css'
	])
		.pipe(concat('style.css'))
		.pipe(autoprefixer())
		.pipe(cleanCSS())
		.pipe(gulp.dest('./css'))
})

gulp.task('watch', function() {
	gulp.watch('*/*.css', gulp.series('styles'));
});
gulp.task('build', gulp.parallel('styles'));
