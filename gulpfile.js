import gulp from "gulp";
import dartSass from "sass";
import gulpSass from "gulp-sass";
import browserSync from "browser-sync";
import babel from "gulp-babel";
import terser from "gulp-terser";

const sass = gulpSass(dartSass);

export function html() {
  return gulp
    .src("./*.html")
    .pipe(gulp.dest("./dist"))
    .pipe(browserSync.stream());
}

export function styles() {
  return gulp
    .src("scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
}

export function scripts() {
  return gulp
    .src("js/**/*.js")
    .pipe(babel({ presets: ["@babel/preset-env"] }))
    .pipe(terser())
    .pipe(gulp.dest("dist/js"))
    .pipe(browserSync.stream());
}

export function serve() {
  browserSync.init({ server: "./" });
  gulp.watch("./*.html", html);
  gulp.watch("scss/**/*.scss", styles);
  gulp.watch("js/**/*.js", scripts);
  gulp.watch("dist/*.html").on("change", browserSync.reload);
}

export default gulp.series(html, styles, scripts, serve);
