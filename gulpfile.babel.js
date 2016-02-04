import gulp from 'gulp';
import browserify from 'browserify';
import fs from 'fs';

gulp.task('default', () => {
  browserify({
    entries: './src/start.js',
    debug: true
  })
  .bundle()
  .pipe(fs.createWriteStream('./dist/start.js'));
});

import source from 'vinyl-source-stream';

gulp.task('vinyl', () => {
  browserify({
    entries: './src/start.js',
    debug: true
  })
  .bundle()
  .pipe(source('start-vinyl.js'))
  .pipe(gulp.dest('./dist'));
});

import uglify from 'gulp-uglify';
import buffer from 'vinyl-buffer';

gulp.task('uglify', () => {
  browserify({
    entries: 'src/utils.js',
    debug: true
  })
  .bundle()
  .pipe(source('utils.min.js'))
  .pipe(buffer())
  .pipe(uglify())
  .pipe(gulp.dest('./dist'));
});

import sourcemaps from 'gulp-sourcemaps';

gulp.task('smaps', () => {
  browserify({
    entries: 'src/start.js',
    debug: true
  })
  .bundle()
  .pipe(source('start.min.js'))
  .pipe(buffer())
  .pipe(uglify())
  .pipe(sourcemaps.init({loadMaps: true}))
  .pipe(sourcemaps.write('./maps'))
  .pipe(gulp.dest('./dist'));
});

import util from 'gulp-util';
import babelify from 'babelify';

gulp.task('jsx', () => {
  browserify({
    entries: 'src/index.jsx',
    extenstions: ['.jsx'],
    debug: true
  })
  .transform(babelify)
  .bundle()
  .on('error', err => {
    util.log("Browserify Error", util.colors.red(err.message))
  })
  .pipe(source('index.js'))
  .pipe(buffer())
  .pipe(sourcemaps.init({loadMaps: true}))
  .pipe(sourcemaps.write('./maps'))
  .pipe(gulp.dest('./dist'));
});

gulp.task('watch', () => {
  gulp.watch('src/*.jsx', ['jsx']);
})
