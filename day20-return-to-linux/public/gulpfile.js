var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglifyjs'),
    rename = require('gulp-rename'),
    cssnano = require('gulp-cssnano'),
    del = require('del');


gulp.task('sass', function() {
    return gulp.src('sass/**/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer(['last 15 version', '>1%', 'ie 8', 'ie 7'], {
            cascade: true
        }))
        .pipe(gulp.dest('css'));
});

gulp.task('scripts', function() {
    return gulp.src([
      'libs/jquery/dist/jquery.min.js',
      'libs/bootstrap/dist/js/bootstrap.min.js',
    ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('js'));
});

gulp.task('css-libs',['sass'], function(){
    return gulp.src('css/libs.css')
          .pipe(cssnano())
          .pipe(rename({suffix:'.min'}))
          .pipe(gulp.dest('css'));
});

gulp.task('watch', ['css-libs', 'scripts'], function() {
    gulp.watch('sass/**/*.sass', ['sass']);
});
