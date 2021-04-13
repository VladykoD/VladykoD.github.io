const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sourcemap = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const server = require('browser-sync').create();
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const svgstore = require('gulp-svgstore');
const del = require('del');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');
const pug = require('gulp-pug');
const cached = require('gulp-cached');

const pugToHtml = () => {
  return gulp.src('source/pug/index.pug')
      .pipe(plumber())
      .pipe(pug({ pretty: true }))
      .pipe(cached('pug'))
      .pipe(gulp.dest('.'));
};

const css = () => {
  return gulp.src('source/sass/style.scss')
      .pipe(plumber())
      .pipe(sourcemap.init())
      .pipe(sass())
      .pipe(postcss([autoprefixer({
        grid: true,
      })]))
      .pipe(gulp.dest('./css'))
      .pipe(csso())
      .pipe(rename('style.min.css'))
      .pipe(sourcemap.write('.'))
      .pipe(gulp.dest('./css'))
      .pipe(server.stream());
};

const js = () => {
  return gulp.src(['source/js/main.js'])
      .pipe(webpackStream(webpackConfig))
      .pipe(gulp.dest('./js'))
};

const syncserver = () => {
  server.init({
    server: './',
    notify: false,
    open: true,
    cors: true,
    ui: false,
  });

  gulp.watch('source/pug/*.pug', gulp.series(pugToHtml, refresh));
  gulp.watch('source/sass/**/*.{scss,sass}', gulp.series(css));
  gulp.watch('source/js/*.{js,json}', gulp.series(js, refresh));
};

const refresh = (done) => {
  server.reload();
  done();
};

const copy = () => {
  return gulp.src([
    'source/fav/**',
    'source/img/*.{png,jpg,svg}'
  ], {
    base: 'source',
  })
  .pipe(gulp.dest('.'));
};

const createWebp = () => {
    return gulp.src('source/img/*.{png,jpg}')
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest('./img'));
};

const clean = () => {
  return del('build');
};

const build = gulp.series(copy, createWebp, css, js, pugToHtml);

const start = gulp.series(build, syncserver);

// Optional tasks
//---------------------------------
// Вызывайте через 'npm run taskName'


const optimizeImg = () => {
  return gulp.src('./img/*.{png,jpg}')
      .pipe(imagemin([
        imagemin.optipng({optimizationLevel: 3}),
        imagemin.mozjpeg({quality: 75, progressive: true}),
      ]))
      .pipe(gulp.dest('./img'));
};

exports.build = build;
exports.start = start;
exports.webp = createWebp;
exports.imagemin = optimizeImg;
