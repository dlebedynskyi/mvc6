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
    gulp.task('build:less', function () {
        return gulp.src(config.from.less)
            .pipe($.plumber({ errorHandler: $.notify.onError("Error: <%= error.message %>") }))
            .pipe($.changed(config.to.less, { extension: '.css' }))
            .pipe($.less({
                sourceMap: {
                    sourceMapRootpath: config.deps.lessSourceMapRoot
                }
            }))
            .pipe(gulp.dest(config.to.less))
            .pipe($.notify("Less:files build : <%= file.relative %>!"));
    });

    gulp.task('clean:less', function (cb) {
        //add clean for less generated files if required
        cb();
    });
}


