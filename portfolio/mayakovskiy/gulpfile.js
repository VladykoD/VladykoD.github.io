const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');


gulp.task('scss', function () {
	return gulp.src('scss/**/*.scss')
		.pipe(sass({
			outputStyle: 'compressed',
			sourceMap: false
		}).on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(gulp.dest('css'))
});
gulp.task('watch', function() {
	gulp.watch('scss/**/*.scss', gulp.series('scss'));
});
