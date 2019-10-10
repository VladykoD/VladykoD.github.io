const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglifyes');
const concat = require('gulp-concat');
const uglifyes = require('uglify-es');
const composer = require('gulp-uglify/composer');

gulp.task('scss', function () {
	return gulp.src('src/scss/**/*.scss')
		.pipe(sass({
			outputStyle: 'compressed',
			sourceMap: false
		}).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 7 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('css'))
});


gulp.task('scripts', function() {
	return gulp.src([
		'./src/js/GraphicsCommon.js',
		'./src/js/ImageLoading.js',
		'./src/js/warrior.js',
		'./src/js/world.js',
		'./src/js/input.js',
		'./src/js/main.js',
	])
		.pipe(uglify({
			mangle: false,
			ecma: 6
		}))
		.pipe(concat('app.js'))
		.pipe(gulp.dest('./js'))
});

gulp.task('watch', function() {
	gulp.watch('src/scss/**/*.scss', gulp.series('scss'));
	gulp.watch('src/js/*.js', gulp.series('scripts'));
});



gulp.task('build', gulp.parallel('scss', 'scripts'));
