const {
    src,
    dest,
    parallel,
    series,
    watch
} = require('gulp');

// Load plugins

const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const concat = require('gulp-concat');
const clean = require('gulp-clean');
const imagemin = require('gulp-imagemin');
const changed = require('gulp-changed');
const browsersync = require('browser-sync').create();

// Clean dist

function clear() {
    return src('./dist/*', {
            read: false
        })
        .pipe(clean());
}

// JS функція

function js() {
    const source = './app/js/*.js';

    return src(source)
        .pipe(changed(source))
        .pipe(concat('bundle.js'))
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(dest('./dist/js/'))
        .pipe(browsersync.stream());
}

// CSS функція

function css() {
    const source = './app/sass/main.sass';

    return src(source)
        .pipe(changed(source))
        .pipe(sass())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(cssnano())
        .pipe(dest('./dist/css/'))
        .pipe(browsersync.stream());
}

// Оптимізація img
function img() {
    return src('./app/img/*')
        .pipe(imagemin())
        .pipe(dest('./dist/img'));
}
// Тестова функція для html
function html() {
    return src('./app/*.html')
        .pipe(dest('./dist/html'));
}

// Перегляд зміни файлів

function watchFiles() {
    watch('./app/scss/*', css);
    watch('./app/js/*', js);
    watch('./app/img/*', img);
    watch('./app/*.html', html);
}

// BrowserSync

function browserSync() {
    browsersync.init({
        server: {
            baseDir: './'
        },
        port: 3000
    });
}

// Cтворення тасків

exports.watch = parallel(watchFiles, browserSync);
exports.default = series(parallel(js, css, img));
exports.clean = parallel(clear);
