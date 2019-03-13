// gulp.js include
var gulp = require('gulp');

// include pluginns
// var changed = require('gulp-changed');
// var jshint = require('gulp-jshint');
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
var concat = require('gulp-concat');


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
        .pipe(concat('main.css'))
        .pipe(gulp.dest('./build/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// gulp task js
gulp.task('js', function () {
    return gulp.src('src/js/**/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('build/js'))
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
    return gulp.src('src/images/**/*.+(png|jpg|gif|svg)')
        .piepe(imagemin())
        .pipe(gulp.dest('build/images'))
});

// font copy
gulp.task('font', function () {
    return gulp.src('src/font/**/*')
        .pipe(gulp.dist('build/font'))
});

// watcher
gulp.task('watch', function () {
    browserSync.init({
        server: {
            baseDir: 'build'
        },
    })
    gulp.watch('src/scss/**/*.scss', gulp.series('sass', 'useref'));
    gulp.watch('src/js/**/*.js', gulp.series('js', 'useref'));
    gulp.watch('src/images/**/*.+(png|jpg|gif|svg)', gulp.series('images', 'useref'));
    gulp.watch('src/font/**/*', gulp.series('font'));
    gulp.watch('src/*.html', gulp.series('useref'));
    gulp.watch('src/*.html').on('change', browserSync.reload);
    gulp.watch('src/js/**/*.js', browserSync.reload);
    gulp.watch('src/scss/**/*.scss', browserSync.reload);
});
