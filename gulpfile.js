var gulp         = require('gulp');

var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minify       = require('gulp-minify-css');
var uglify       = require('gulp-uglify');
var concat       = require('gulp-concat');
var uncss        = require('gulp-uncss');
var imagemin     = require('gulp-imagemin');

var source       = './assets/';
var dest         = './dist/';

gulp.task('default', ['css', 'js']);

gulp.task('watch', function () {
  gulp.watch(source + 'scss/**/*.scss', ['css']);
  gulp.watch(source + 'js/**/*.js',     ['js']);
});

gulp.task('css', function() {
  return gulp.src(source + 'scss/*.scss')
    .pipe(sass())
    .pipe(autoprefixer({
        browsers: ['> 1%', 'last 2 versions']
    }))
    .pipe(uncss({
      html: ['./**/*.html']
    }))
    .pipe(minify())
    .pipe(concat('global.min.css'))
    .pipe(gulp.dest(dest + '/css/'));
});

gulp.task('js', function() {
  return gulp.src(source + 'js/*.js')
    .pipe(uglify())
    .pipe(concat('global.min.js'))
    .pipe(gulp.dest(dest + '/js/'));
});

// gulp.task('img', function () {
//   return gulp.src(source + 'img/*.{png,jpg,jpeg,gif,svg}')
//     .pipe(imagemin())
//     .pipe(gulp.dest(dest + 'img/'));
// });
