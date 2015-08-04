module.exports = function () {
    var project = require("./project.json");

    var config = {
        webroot: "./" + project.webroot + "/",
        bowerfile: "./bower.json",
        from: {},
        to: {},
        watch: {},
        deps: {},
        concat :{}
    };

    config.from.less = ["app/less/**/*.less", "!app/less/includes/**/*.less"];
    config.to.less = config.webroot + "css";
    config.deps.lessSourceMapRoot = '../less';
    config.watch.less = ["app/less/**/*.less"];

    config.from.css = [config.webroot + "css/**/*.css", "!"+config.webroot + "css/**/*.min.css"];
    config.concat.Css = config.webroot + "css/site.min.css";

    config.from.bowerPath = './bower_components';
    config.to.lib = config.webroot + 'lib/';


    config.from.jsx = "app/jsx/**/*.jsx";
    config.concat.js = 'all.js';
    config.to.js = config.webroot + 'js/';
    config.deps.jsxSourceRoot = '../app/jsx';
    config.watch.jsx = config.from.jsx;

    config.from.js = [config.webroot + 'js/**/*.js', "!" + config.webroot + 'js/**/*.min.js']
    config.concat.minJs = 'all.min.js';


    config.from.images = 'app/images/**/*';
    config.to.images = config.webroot + 'images/';
    config.watch.images = config.from.images;

    return config;
};