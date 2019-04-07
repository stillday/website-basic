// variable section
const { dest, series, src, watch } = require('gulp')
const del = require("del")
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const sourcemaps = require('gulp-sourcemaps')

const dist = "dist/"
const source = "src/"

const css = {
  in: source + "sass/*.scss",
  out: dist + "css/",
  sassOpts: {
    outputStyle: "compressed",
    errLogToConsole: true
  },
  autoprefixerOpts: {
    browsers: ['last 2 versions', '> 2%']
  },
  watch: source + "sass/**/*"
}

// task section

function clean(cb) {
  del([dist + "*"])
  cb()
}

function style(cb) {
  src(css.in)
    .pipe(sourcemaps.init())
    .pipe(sass(css.sassOpts))
    .pipe(autoprefixer(css.autoprefixerOpts))
    .pipe(sourcemaps.write('.'))
    .pipe(dest(css.out))
  watch(css.watch, style)
  cb()
}

exports.default = series(clean, style)