'use strict';
const fs = require('fs');
const gulp = require('gulp');
const jade = require('gulp-jade');
const replace = require('gulp-replace');
const concat = require('gulp-concat');
const iife = require('gulp-iife');
const webserver = require('gulp-webserver');

const paths = {
  jade: './templates/*.jade',
  scripts: [
    './src/main.js',
    './src/services/user.resource.js',
    './src/components/user-list.component.js',
    './src/components/user-form.component.js',
    './src/controllers/list-ctrl.js',
    './src/controllers/form-ctrl.js',
    './src/routes.js'
  ]
}

gulp.task('templates', function() {
  return gulp.src(paths.jade)
    .pipe(jade())
    .pipe(replace(/'/g, "\\'"))
    .pipe(gulp.dest('./build'))
});

gulp.task('scripts', ['templates'], function() {
  return gulp.src(paths.scripts)
    .pipe(replace(include.re, include))
    .pipe(concat('bundle.js'))
    .pipe(iife({
      params: ['angular'],
      args: ['window.angular']
    }))
    .pipe(gulp.dest('./assets/js/'))
});

gulp.task('watch', function() {
  gulp.watch(paths.jade, [ 'scripts' ]);
  gulp.watch(paths.scripts, [ 'scripts' ])
});


gulp.task('serve', [ 'watch' ], function() {
  return gulp.src('./')
    .pipe(webserver({
      livereload: false,
      host: '0.0.0.0',
      port: 8080
    }));
});

gulp.task('default', [ 'scripts' ]);


function include(match, file1, file2) {
  return fs.readFileSync(
    file1 || file2,
    { encoding: 'utf-8' }
  );
}
include.re = /#include\s*\((?:\s*(?:'([^']+)')|(?:"([^"]+)")\s*)\)/
