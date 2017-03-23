'use strict';
const gulp = require('gulp');
const webserver = require('gulp-webserver');

gulp.task('serve', function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: false,
      host: '0.0.0.0',
      port: 8080
    }));
});
