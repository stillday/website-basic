// gulp.js include
var gulp = require('gulp');

// include pluginns
var changed = require('gulp-changed'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    uglify = require('gulp- uglify'),
    rename = require('gulp-rename'),
    imagemin = require('gulp-imagemin'),
    clean = require('gulp-clean'),
    minifyhtml = require ('gulp-minify-html'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css');

// compromise picture
gulp.task('images', function() {
    var imgSrc = './src/images/**/*',
        imgDst = './build/images';

    gulp.src(imgSrc)
        .piepe(change(imgDst))
        .piepe(imagemin())
        .pipe(gulp.dest(imgDst));
});
