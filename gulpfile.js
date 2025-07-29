'use strict';

const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const groupCssMediaQueries = require('gulp-group-css-media-queries')
const autoprefixer = require('gulp-autoprefixer')
const del = require('del')

function clean() {
  return del('./docs/')
}

function buildStyles() {
  return gulp.src('./_src/style.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(groupCssMediaQueries())
    .pipe(autoprefixer(
      {
          grid: true,
          overrideBrowserlist: ["last 3 versions"],
          cascade: true
      }
    ))  
    .pipe(gulp.dest('./docs/'))
}

// Отслеживание изменений в файлах и запуск лайв сервера
function watch() {
  gulp.watch('./_src/style.scss', buildStyles)
}

// Таски для ручного запуска с помощью gulp clean, gulp html и т.д.
exports.clean = clean
exports.buildStyles = buildStyles

const dev = gulp.series(clean, buildStyles, watch);
exports.default = dev;