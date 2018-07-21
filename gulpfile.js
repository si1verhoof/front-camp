var gulp = require('gulp');
var clean = require('gulp-clean');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');


gulp.task('clean', function (cb) {
  return gulp.src('build/', { allowEmpty: true, read: false })
      .pipe(clean())
});
 
gulp.task('sass', function () {
  return gulp.src('scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(csso())
        .pipe(gulp.dest('build/css/minStyle.css'))
    .pipe(gulp.dest('build/css'));
});

gulp.task('html', function(){
  return gulp.src('pug/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('build/'))
});

gulp.task('transJs', function(){
  return gulp.src('js/*.js')
    .pipe(gulp.dest('build/js'))
});

gulp.task('transImg', function(){
  return gulp.src('images/*.png')
    .pipe(gulp.dest('build/images'))
});

gulp.task('build', gulp.series('clean', gulp.parallel('html', 'sass', 'transJs', 'transImg')));