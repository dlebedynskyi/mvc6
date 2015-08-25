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
    gulp.task('build:jsx', function () {
        return gulp.src(config.from.jsx)
                .pipe($.sourcemaps.init())
                .pipe($.babel())
                .pipe($.concat(config.concat.js))
                .pipe($.sourcemaps.write('.', { sourceRoot: config.deps.jsxSourceRoot }))
                .pipe(gulp.dest(config.to.js));

    });

    gulp.task('clean:jsx', function (cb) {
        rimraf(config.to.js + config.concat.js, function () {
            rimraf(config.to.js + config.concat.js + ".map", cb);
        });
    });
}


