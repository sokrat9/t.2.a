/*jshint unused:true */
'use strict';

var pkg = require('./package.json');

var exec = require('child_process').exec;

var $ = require('gulp-load-plugins')({config: pkg});
var gulp = require('gulp');
var mergeStream = require('merge-stream');
var rimraf = require('rimraf');
var stylish = require('jshint-stylish');
var toCamelCase = require('to-camel-case');

var bower = require('./bower.json');
var funName = toCamelCase(pkg.name);
var banner = require('tiny-npm-license')(pkg);

gulp.task('lint', function() {
  return mergeStream(
    gulp.src(['{,src/}*.js'])
      .pipe($.jshint())
      .pipe($.jshint.reporter(stylish))
      .pipe($.jscs(pkg.jscsConfig)),
    gulp.src('*.json')
      .pipe($.jsonlint())
      .pipe($.jsonlint.reporter())
      .pipe($.jsonlint.reporter('fail'))
  );
});

gulp.task('clean', rimraf.bind(null, 'dist'));

gulp.task('build', ['lint', 'clean'], function() {
  return mergeStream(
    gulp.src('src/*.js')
      .pipe($.header(banner + '!function() {\n'))
      .pipe($.footer('\nwindow.' + funName + ' = ' + funName + ';\n}();\n'))
      .pipe($.rename(bower.main)),
    gulp.src('src/*.js')
      .pipe($.header(banner))
      .pipe($.footer('module.exports = ' + funName + ';\n'))
      .pipe($.rename(pkg.main))
  )
    .pipe(gulp.dest(''));
});

gulp.task('test', ['build'], function(cb) {
  exec('node test.js', function(err, stdout, stderr) {
    process.stdout.write(stdout);
    process.stderr.write(stderr);
    cb(err);
  });
});

gulp.task('watch', function() {
  gulp.watch('{,src/}*.js', ['test']);
  gulp.watch('*.json,.jshintrc', ['lint']);
});

gulp.task('default', ['test', 'watch']);
