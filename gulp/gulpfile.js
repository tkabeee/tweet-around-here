"use strict";

var gulp = require("gulp");
var webserver = require('gulp-webserver');
var plumber = require("gulp-plumber");
var compass = require("gulp-compass");
var autoprefixer = require("gulp-autoprefixer");

var duration = require('gulp-duration');
var util = require('gulp-util');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var glob = require('glob');

var SCSS_FILE = "sass/*.scss";
var SASS_DIR = "../sass"
var CSS_DIR = "../css"
var TEMP_DIR = "../temp"

gulp.task("compass", function(){
  gulp.src([SCSS_FILE])
    .pipe(plumber({
      errorHandler: function(error) {
        console.log(error.message);
        this.emit('end');
      }
    }))
    .pipe(compass({
      sass: SASS_DIR,
      css: CSS_DIR
    }))
    .pipe(gulp.dest(TEMP_DIR))
    ;
});

var PATH_REACT = {
  out: "build.js",
  dest_build: "../js",
  entry_point: glob.sync('./src/**/*.js')
};

var PROPS_REACT = {
  entries: PATH_REACT.entry_point,
  transform: [reactify],
  debug: false,
  cache: {},
  packageCache: {},
  fullPaths: false,
};

gulp.task("browserify", function() {
  var b = browserify(PROPS_REACT);
  jsCompiile(b);
});

gulp.task("watchify", function() {
  var b = watchify(browserify(PROPS_REACT));
  b.on("update", function() {
    jsCompiile(b);
  });
  jsCompiile(b);
});

function jsCompiile(b) {
  return b.bundle()
    .on("error", function(err){
      console.log(util.colors.red("Oops! you have ERROR! \n" + err.message));
      this.emit('end');
    })
    .pipe(source(PATH_REACT.out))
    .pipe(duration('compiled "' + PATH_REACT.out + '"'))
    .pipe(gulp.dest(PATH_REACT.dest_build))
    ;
}

gulp.task("watch", function(){
  gulp.watch(["../" + SCSS_FILE], ["compass"]);
});

gulp.task("webserver", function(){
  gulp.src('../../tweet-around-here')
    .pipe(webserver({
      livereload: true
    }))
    ;
});

gulp.task("default", function(){
  gulp.start('webserver');
  gulp.start('watch');
  gulp.start('watchify');
});