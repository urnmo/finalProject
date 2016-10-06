'use strict'

let gulp = require('gulp');
let sass = require('gulp-sass');
let htmlhint = require('gulp-htmlhint');
let commentless = require('gulp-strip-css-comments');

gulp.task('default', ['html', 'css', 'js']);

gulp.task('html',function(){
    return gulp.src('index.html')
    .pipe(htmlhint())
    .pipe(htmlhint.reporter())
    .pipe(gulp.dest('public/'))
});

gulp.task('css',function(){
    return gulp.src('style.scss')
        .pipe(sass())
        .pipe(commentless())
        .pipe(gulp.dest('public/'));
});

gulp.task('js',function(){
    return gulp.src('app.js')
    .pipe(gulp.dest('public/'))
});

gulp.task('watch', function (){
    gulp.watch('index.html', ['html']);
    gulp.watch('style.scss', ['css']);
    gulp.watch('app.js', ['js']);
})