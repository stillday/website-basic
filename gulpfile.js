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
const imagemin = require('gulp-imagemin')
const minify = require('gulp-minify')

const dist = "dist/"
const source = "src/"

const css = {
  in: [
    source + "assets/sass/*.scss",
    source + "../node_modules/lightgallery/src/sass/lightgallery.scss",
    source + "../node_modules/animate.css/animate.css",
  ],
  out: dist + "assets/css/",
  sassOpts: {
    outputStyle: "compressed",
    errLogToConsole: true
  },
  autoprefixerOpts: {
    browsers: ['last 2 versions', '> 2%']
  },
  watch: source + "assets/sass/**/*"
}

const jsplugin = {
  in: [
    source + "../node_modules/jquery/dist/jquery.js",
    // lightgallery
    source + "../node_modules/lightgallery/dist/js/lightgallery.js",
    source + "../node_modules/lg-autoplay/src/lg-autoplay.js",
    source + "../node_modules/lg-fullscreen/src/lg-fullscreen.js",
    source + "../node_modules/lg-hash/src/lg-hash.js",
    source + "../node_modules/lg-pager/src/lg-pager.js",
    source + "../node_modules/lg-share/src/lg-share.js",
    source + "../node_modules/lg-thumbnail/src/lg-thumbnail.js",
    source + "../node_modules/lg-video/src/lg-video.js",
    source + "../node_modules/lg-zoom/src/lg-zoom.js",
    // image lazyloading
    source + "../node_modules/vanilla-lazyload/dist/lazyload.js",
  ],
  out: dist + "js/",
}

const js = {
  in: [
    source + "scripts/**/*.js",
  ],
  out: dist + "js/",
  watch: source + "scripts/**/*"
};

const img = {
  in: source + "assets/img/**/*.+(png|jpg|gif|svg)",
  out: dist + "assets/img/",
  watch: source + "assets/img/**/*.+(png|jpg|gif|svg)"
};

const font = {
  in: [
    source + "assets/icon-font/fonts/*",
    source + "assets/fonts/*",
  ],
  out: dist + "assets/fonts/",
  watch: source + "assets/icon-font/fonts/*"
}

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
    .pipe(concat("application.css"))
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
    .pipe(minify())
    .pipe(dest(js.out))
  watch(js.watch, series(script, browsersync.reload))
  cb()
}
// ------------------------------

// ------------------------------
// plugin task
function srcplugin(cb) {
  src(jsplugin.in)
    .pipe(sourcemaps.init())
    .pipe(concat("plugin.js"))
    // .pipe(sourcemaps.write("."))
    .pipe(minify())
    .pipe(dest(jsplugin.out))
  // watch(jsplugin.watch, series(srcplugin, browsersync.reload))
  cb()
}
// ------------------------------

// ------------------------------
// image task
function image(cb) {
  src(img.in)
    .pipe(imagemin())
    .pipe(dest(img.out))
  watch(img.watch, series(image, browsersync.reload))
  cb()
}
// ------------------------------

// ------------------------------
// image task
function iconfont(cb) {
  src(font.in)
    .pipe(dest(font.out))
  watch(font.watch, series(iconfont, browsersync.reload))
  cb()
}

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

exports.default = series(clean, style, script, srcplugin, image, iconfont, html, bSync)