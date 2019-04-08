// variable section
const {
  dest,
  series,
  src,
  watch
} = require('gulp')
const autoprefixer = require('gulp-autoprefixer')
const browsersync = require("browser-sync").create()
const concat = require('gulp-concat')
const del = require("del")
const nunjucksRender = require("gulp-nunjucks-render")
const sass = require('gulp-sass')
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

const js = {
  in: source + "scripts/**/*.js",
  out: dist + "js/",
  watch: source + "scripts/**/*"
};

const nunjuck = {
  in: source + "pages/**/*.html",
  out: dist,
  path: source + "templates",
  watch: [source + "pages/**/*.html", source + "templates"]
};

const syncOpts = {
  server: {
    baseDir: dist,
    index: "index.html"
  },
  open: true,
  notify: true
}

// task section
// ------------------------------
// clean task
function clean(cb) {
  del([dist + "*"])
  cb()
}
// ------------------------------

// ------------------------------
// style task
function style(cb) {
  src(css.in)
    .pipe(sourcemaps.init())
    .pipe(sass(css.sassOpts))
    .pipe(autoprefixer(css.autoprefixerOpts))
    .pipe(concat("app.css"))
    .pipe(sourcemaps.write('.'))
    .pipe(dest(css.out))
  watch(css.watch, series(style, browsersync.reload))
  cb()
}
// ------------------------------

// ------------------------------
// script task
function script(cb) {
  src(js.in)
    .pipe(sourcemaps.init())
    .pipe(concat("app.js"))
    .pipe(sourcemaps.write("."))
    .pipe(dest(js.out))
  watch(js.watch, series(script, browsersync.reload))
  cb()
}
// ------------------------------


// ------------------------------
// html task
function html(cb) {
  src(nunjuck.in)
    .pipe(nunjucksRender({
      path: nunjuck.path
    })
    )
    .pipe(dest(nunjuck.out))
  watch(nunjuck.watch, series(html, browsersync.reload))
  cb()
}
// ------------------------------

// ------------------------------
// browser sync task
function bSync(cb) {
  browsersync.init(syncOpts)
  cb()
}
// ------------------------------

exports.default = series(clean, style, script, html, bSync)