var gulp = require('gulp'),
    config = require('./config')();

module.exports = exp;
function exp() {
    gulp.task('watch:less', function () {
        gulp.watch(config.watch.less, ['build:less']);
    });

    gulp.task('watch:jsx', function () {
        gulp.watch(config.watch.jsx, ['build:jsx']);
    });

    gulp.task('watch:images', function () {
        gulp.watch(config.watch.images, ['build:images']);
    });
}