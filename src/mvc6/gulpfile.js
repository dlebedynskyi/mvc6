/// <binding BeforeBuild='clean' AfterBuild='build' Clean='clean' ProjectOpened='watch' />
'use strict';
var gulp = require("gulp");

/* PATTERNS */

/*LESS *//* CSS */
require('./tasks/css')();

/* LIBS */
require('./tasks/libs')();
/* JS  */

require('./tasks/js')();

/* images */
require('./tasks/images')();

/* PRODUCTION */

require('./tasks/production')();

/* WATCH */
require('./tasks/watch')();
gulp.task('watch', ['watch:less', 'watch:jsx', 'watch:images']);


/* WRAPPERS */ 

gulp.task('prod', ['min:css', 'min:js', 'prod:lib']);
gulp.task('build', ['build:less', 'build:lib', 'build:jsx', "build:images"]);
gulp.task("clean", ["clean:jsx", "clean:minjs", "clean:lib","clean:less", "clean:mincss", "clean:images"]);
