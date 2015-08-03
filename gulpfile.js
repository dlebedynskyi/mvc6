/// <binding Clean='clean' />
'use strict';
var gulp = require("gulp"),
  gutil = require("gulp-util"),
  rimraf = require("rimraf"),
  concat = require("gulp-concat"),
  cssmin = require("gulp-cssmin"),
  less = require("gulp-less-sourcemap"),
  uglify = require("gulp-uglify"),
  project = require("./project.json"),
  changed = require('gulp-changed'),
  notify = require('gulp-notify'),
  plumber = require('gulp-plumber'),
  mainBowerFiles = require('main-bower-files');

var paths = {
    webroot: "./" + project.webroot + "/",
    bowerfile: "./bower.json",
    
};

paths.webrootLib = paths.webroot + 'lib/';
paths.js = paths.webroot + "js/**/*.js";
paths.minJs = paths.webroot + "js/**/*.min.js";
paths.less = paths.webroot + "less/**/*.less";
paths.lessDest = paths.webroot + "css";
paths.css = paths.webroot + "css/**/*.css";
paths.minCss = paths.webroot + "css/**/*.min.css";
paths.concatJsDest = paths.webroot + "js/site.min.js";
paths.concatCssDest = paths.webroot + "css/site.min.css";

gulp.task("clean:js", function(cb) {
  rimraf(paths.concatJsDest, cb);
});

gulp.task("clean:css", function(cb) {
  rimraf(paths.concatCssDest, cb);
});

gulp.task("clean:lib", function (cb) {
    rimraf(paths.webrootLib, cb);
});

gulp.task("clean", ["clean:js", "clean:css", "clean:lib"]);


gulp.task('build:less', function () {
    return gulp.src([paths.less, '!' + paths.less + '/includes'])
        .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
        .pipe(changed(paths.lessDest, { extension: '.css' }))
        .pipe(less({
            sourceMap: {
                sourceMapRootpath: '../less' 
            }
        }))
        .pipe(gulp.dest(paths.lessDest));
});

gulp.task('build:lib',["clean:lib"], function () {
    var env = gutil.env.env || "development";
    log('build for ' + env);
    return gulp.src(mainBowerFiles({ env: env}), { base: './bower_components' })
               .pipe(gulp.dest(paths.webrootLib));
});

gulp.task('build', ["build:less", "build:lib"]);


gulp.task("prod:lib", ["clean:lib"], function () {
    return gulp.src(mainBowerFiles({ env: "production"}), { base: './bower_components' })
             .pipe(gulp.dest(paths.webrootLib));
});


gulp.task("min:js", function() {
  gulp.src([paths.js, "!" + paths.minJs], {
      base: "."
    })
    .pipe(concat(paths.concatJsDest))
    .pipe(uglify())
    .pipe(gulp.dest("."));
});

gulp.task("min:css", function() {
  gulp.src([paths.css, "!" + paths.minCss])
    .pipe(concat(paths.concatCssDest))
    .pipe(cssmin())
    .pipe(gulp.dest("."));
});

gulp.task('watch:less', function () {
    return gulp.watch([paths.less], ['build:less', 'min:css']);
});

gulp.task("min", ["min:js", "min:css"]);


function log(msg) {
    if (typeof (msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                gutil.log(gutil.colors.blue(msg[item]));
            }
        }
    } else {
        gutil.log(gutil.colors.blue(msg));
    }
}