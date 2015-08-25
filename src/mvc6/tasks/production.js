var gulp = require('gulp'),
    rimraf = require("rimraf"),
    config = require('./config')(),
    log = require('./log'),
    mainBowerFiles = require('main-bower-files'),
    $ = require('gulp-load-plugins')({
        lazy: true,
        rename: {
            'gulp-less-sourcemap': 'less'
        }
    });

module.exports = exp;
function exp() {
    gulp.task('min:css', ['clean:mincss'], function () {
        log('css: working on ' + config.from.css);
        return gulp.src(config.from.css)
        .pipe($.concat(config.concat.Css))
        .pipe($.cssmin())
        .pipe(gulp.dest("."));
    });

    gulp.task('clean:mincss', function (cb) {
        rimraf(config.concat.Css, cb);
    });

    gulp.task('min:js', ['clean:minjs'], function () {
        return gulp.src(config.from.js)
            .pipe($.concat(config.concat.minJs))
            .pipe($.uglify())
            .pipe(gulp.dest(config.to.js));
    });


    gulp.task('clean:minjs', function (cb) {
        rimraf(config.to.js + config.concat.minJs, cb);
    });



    gulp.task("prod:lib", ["clean:lib"], function () {
        return gulp.src(mainBowerFiles({ env: "production" }), { base: config.from.bowerPath })
                 .pipe(gulp.dest(config.to.lib));
    });
}