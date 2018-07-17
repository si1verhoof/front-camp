var gulp = require('gulp');
var clean = require('gulp-clean');
var pug = require('gulp-pug');
let cleanCSS = require('gulp-clean-css');
var sass = require('gulp-sass');

gulp.task('clean', function (cb) {
  return gulp.src('build/', { allowEmpty: true, read: false })
      .pipe(clean())
});
 
gulp.task('sass', function () {
  return gulp.src('sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('build/css'));
});

gulp.task('html', function(){
  return gulp.src('pug/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('build/'))
});
 
gulp.task('minify-css', () => {
  return gulp.src('css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('build/css'));
});

gulp.task('build', gulp.series('clean', gulp.parallel('html', 'minify-css', 'sass')));