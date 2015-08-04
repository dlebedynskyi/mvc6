/// <binding BeforeBuild='clean' AfterBuild='build' Clean='clean' ProjectOpened='watch' />
'use strict';
var gulp = require("gulp"),
  rimraf = require("rimraf"),
  mainBowerFiles = require('main-bower-files'),
  config = require("./gulp.config.js")();

var $ = require('gulp-load-plugins')({
       lazy: true,
       rename: {
           'gulp-less-sourcemap': 'less'
       }
   });

/* PATTERNS */

/*LESS */
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
/* CSS */


/* LIBS */
gulp.task('build:lib', ["clean:lib"], function () {
    var env = $.util.env.env || "development";
    log('build for ' + env);
    return gulp.src(mainBowerFiles({ env: env }), { base: config.from.bowerPath })
               .pipe(gulp.dest(config.to.lib));
});

gulp.task("clean:lib", function (cb) {
    rimraf(config.to.lib, cb);
});

/* JS  */

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

/* images */

gulp.task('build:images', function () {
    return gulp.src(config.from.images)
       .pipe(gulp.dest(config.to.images));
});

gulp.task("clean:images", function (cb) {
    rimraf(config.to.images, cb);
});

/* PRODUCTION */
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

gulp.task('min:js',['clean:minjs'], function () {
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


/* WATCH */
gulp.task('watch:less', function () {
    gulp.watch(config.watch.less, ['build:less']);
});

gulp.task('watch:jsx', function () {
    gulp.watch(config.watch.jsx, ['build:jsx']);
});

gulp.task('watch:images', function () {
    gulp.watch(config.watch.images, ['build:images']);
});

gulp.task('watch', ['watch:less', 'watch:jsx', 'watch:images']);


/* WRAPPERS */ 

gulp.task('prod', ['min:css', 'min:js', 'prod:lib']);
gulp.task('build', ['build:less', 'build:lib', 'build:jsx', "build:images"]);
gulp.task("clean", ["clean:jsx", "clean:minjs", "clean:lib","clean:less", "clean:mincss", "clean:images"]);

/* HELPERS */

function log(msg) {
    if (typeof (msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}