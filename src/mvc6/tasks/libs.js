'use strict';
var gulp = require('gulp'),
    rimraf = require("rimraf"),
    log = require('./log'),
    config = require('./config')(),
    util = require('gulp-util'),
    mainBowerFiles = require('main-bower-files');   

module.exports = exp;

function exp() {
    gulp.task('build:lib', ["clean:lib"], function () {
        var env = util.env.env || "development";
        log('build for ' + env);
        return gulp.src(mainBowerFiles({ env: env }), { base: config.from.bowerPath })
                   .pipe(gulp.dest(config.to.lib));
    });

    gulp.task("clean:lib", function (cb) {
        rimraf(config.to.lib, cb);
    });
}