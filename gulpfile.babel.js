import gulp from 'gulp';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import sourcemaps from 'gulp-sourcemaps';
import util from 'gulp-util';
import babelify from 'babelify';
import hmr from 'browserify-hmr';
import watchify from 'watchify';

gulp.task('hmr', () => {
  const b = browserify({
    entries: 'src/index.jsx',
    extenstions: ['.jsx'],
    plugin: [hmr, watchify],
    debug: true,
    cache: {},
    packageCache: {}
  })
  .transform(babelify);

  b.on('update', bundle)
  bundle();

  function bundle() {
    b.bundle()
    .on('error', err => {
      util.log("Browserify Error", util.colors.red(err.message))
    })
    .pipe(source('index.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./dist'));
  }

});
