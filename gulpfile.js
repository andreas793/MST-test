const { src, dest, watch, parallel, series } = require("gulp");

const scss = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const browserSync = require("browser-sync").create();
const autoprefixer = require("gulp-autoprefixer");
const clean = require("gulp-clean");
const avif = require("gulp-avif");
const webp = require("gulp-webp");
const imagemin = require("gulp-imagemin");
const cached = require("gulp-cached");
const pug = require("gulp-pug");


function html(){
    return src(['app/pug/*.pug'])
        .pipe(pug({
            pretty: true
        }))
        .pipe(dest("app"))
        .pipe(browserSync.stream())
}

function images(){
    return src(['app/images/*.{png,jpg}'])
        .pipe(avif({quality : 50}))
        .pipe(src('app/images/*.*'))
        .pipe(webp())
        .pipe(src('app/images/*.*'))
        .pipe(imagemin())
        .pipe(dest('app/images'))
}


function styles(){
    return src('app/scss/style.scss')
        .pipe(autoprefixer({overrideBrowserslist: ['last 10 version']}))
        .pipe(concat('style.min.css'))
        .pipe(scss({outputStyle: 'compressed'}))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream())
}

function scripts(){
    return src(["app/js/main.js"])
        .pipe(concat("main.min.js"))
        .pipe(uglify())
        .pipe(dest("app/js"))
        .pipe(browserSync.stream())
}

function watching(){
    browserSync.init({
        server: {baseDir: "app/"},
    });
    watch(["app/scss/**/*.scss"], styles)
    watch(["app/js/main.js"], scripts)
    watch(["app/pug/**/*.pug"], html)
}


function cleanDist(){
    return src('dist')
        .pipe(clean())
}

function building(){
    return src([
        'app/css/style.min.css',
        'app/js/main.min.js',
        'app/*.html',
        'app/fonts/**/*',
        'app/images/**/*',
    ], {base: 'app'})
        .pipe(dest("dist"))
}

exports.html = html;
exports.styles = styles;
exports.scripts = scripts;
exports.watching = watching;
exports.images = images;

exports.build = series(cleanDist, building);
exports.default = parallel(html, styles, scripts, watching);