'use strict';
var gulp = require('gulp'),
    rimraf = require("rimraf"),
    config = require('./config')(),
    $ = require('gulp-load-plugins')({
        lazy: true,
        rename: {
            'gulp-less-sourcemap': 'less'
        }
    });

module.exports = exp;

function exp() {
    gulp.task('build:images', function () {
        return gulp.src(config.from.images)
           .pipe(gulp.dest(config.to.images));
    });

    gulp.task("clean:images", function (cb) {
        rimraf(config.to.images, cb);
    });
}