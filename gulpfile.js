// gulp.js include
var gulp = require('gulp');

// include pluginns
// var changed = require('gulp-changed');
// var jshint = require('gulp-jshint');
// var concat = require('gulp-concat');
// var rename = require('gulp-rename');
// var clean = require('gulp-clean');
// var minifyhtml = require ('gulp-minify-html');
// var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var gulpIf = require('gulp-if');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');


// browser sync
gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: 'build'
        },
    })
})

// sass to css
gulp.task('sass', function () {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./build/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// uueref
gulp.task('useref', function () {
    return gulp.src('src/*.html')
        .pipe(useref())
        .pipe(gulpIf('.js', uglify()))
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('build'))
})

// compromise picture
gulp.task('images', function () {
    var imgSrc = './src/images/**/*';
    var imgDst = './build/images';

    return gulp.src(imgSrc)
        .piepe(change(imgDst))
        .piepe(imagemin())
        .pipe(gulp.dest(imgDst))
});

// watcher
gulp.task('watch', function () {
    browserSync.init({
        server: {
            baseDir: 'build'
        },
    })
    gulp.watch('src/scss/**/*.scss', gulp.series('sass'));
    gulp.watch('src/*.html').on('change', browserSync.reload);
    gulp.watch('src/js/**/*.js', browserSync.reload);
});
