import gulp from "gulp";
import gulpSass from "gulp-sass";
import * as sassPackage from "sass";
import autoprefixerPlugin from "gulp-autoprefixer";
import cleanCSS from "gulp-clean-css";
import rename from "gulp-rename";
import sourcemaps from "gulp-sourcemaps";
import plumber from "gulp-plumber";
import { deleteAsync } from "del";
import browserSyncModule from "browser-sync";

const browserSync = browserSyncModule.create();
const sass = gulpSass(sassPackage);

// Пути
const paths = {
  src: {
    html: "*.html",
    scss: "scss/main.scss",
    js: "js/**/*.js",
    fonts: "fonts/**/*",
  },
  dist: {
    base: "docs",
    html: "docs",
    css: "docs/css",
    js: "docs/js",
    img: "docs/img",
    fonts: "docs/fonts",
  },
};

// Очистка docs

// HTML
export function html() {
  return gulp
    .src(paths.src.html)
    .pipe(gulp.dest(paths.dist.html))
    .pipe(browserSync.stream());
}

// SCSS
export function styles() {
  return gulp
    .src(paths.src.scss)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixerPlugin())
    .pipe(gulp.dest(paths.dist.css))
    .pipe(rename({ suffix: ".min" }))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(paths.dist.css))
    .pipe(browserSync.stream());
}

// JS
export function scripts() {
  return gulp
    .src(paths.src.js)
    .pipe(plumber())
    .pipe(gulp.dest(paths.dist.js))
    .pipe(browserSync.stream());
}

// Fonts
export function fonts() {
  return gulp
    .src(paths.src.fonts)
    .pipe(gulp.dest(paths.dist.fonts))
    .pipe(browserSync.stream());
}

// Server
export function serve(done) {
  browserSync.init({
    server: {
      baseDir: paths.dist.base,
    },
    port: 3000,
    notify: false,
  });

  gulp.watch(paths.src.html, html);
  gulp.watch(paths.src.scss, styles);
  gulp.watch(paths.src.js, scripts);
  gulp.watch(paths.src.fonts, fonts);

  done();
}

// Build
export const build = gulp.series(gulp.parallel(html, styles, scripts, fonts));

export default gulp.series(build, serve);
