"use strict";

const gulp = require("gulp");
const plumber = require("gulp-plumber");
// const compass = require("gulp-compass");
const sass = require('gulp-sass');

const SCSS_FILE = "sass/*.scss";
const SASS_DIR = "sass";
const CSS_DIR = "css";

gulp.task("build", function(){
  gulp.src([SCSS_FILE])
    .pipe(plumber({
      errorHandler: function(error) {
        console.log(error.message);
        this.emit("end");
      }
    }))
    // .pipe(compass({
    //   sass: SASS_DIR,
    //   css: CSS_DIR
    // }))
    .pipe(sass({outputStyle: "expanded"}))
    .pipe(gulp.dest(CSS_DIR));
});

gulp.task("watch", function(){
  gulp.watch([SCSS_FILE], ["build"]);
});

gulp.task("default", function(){
  gulp.start("watch");
});