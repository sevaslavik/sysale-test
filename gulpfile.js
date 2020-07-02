'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps')
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const fileinclude = require('gulp-file-include');
const del = require("del");
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const rename = require("gulp-rename");
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const webpHTML = require('gulp-webp-html');
const webpcss = require("gulp-webpcss");
const svgSprite = require('gulp-svg-sprite');

sass.compiler = require('node-sass');

gulp.task('html', function() {
    return gulp.src("./src/**/index.html")
    .pipe(fileinclude())
    // .pipe(webpHTML())
    .pipe(gulp.dest("./build/"))
    .pipe(browserSync.stream())
});
 
gulp.task('sass', function () {
    return gulp.src('./src/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(gcmq())
    // .pipe(webpcss({}))
    .pipe(autoprefixer({
            overrideBrowserslist: 'last 5 version',
            cascade: true
        }))
//    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./build/css'))
    .pipe(cleanCSS())
    .pipe(rename({
        extname: ".min.css"
    }))
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.stream());
}); 

gulp.task('js', function() {
    return gulp.src("./src/**/script.js")
    .pipe(fileinclude())
    .pipe(gulp.dest("./build/"))
    .pipe(uglify())
    .pipe(rename({
        extname: ".min.js"
    }))
    .pipe(gulp.dest('./build/'))
    .pipe(browserSync.stream())
});

// gulp.task("webpFormat", function() {
//     return gulp.src("./src/assets/**")
//     .pipe(webp({
//         quality: 70
//     }))
//     .pipe(imagemin({
//         interlaced: true,
//         progressive: true,
//         optimizationLevel: 5,
//         svgoPlugins: [
//         {
//             removeViewBox: true
//         }
//     ]
//     }))
//     .pipe(gulp.dest("./build/assets/"))
//     .pipe(browserSync.stream())
// })

gulp.task('img', function() {
    return gulp.src("./src/img/**")
    .pipe(imagemin({
        interlaced: true,
        progressive: true,
        optimizationLevel: 5,
        svgoPlugins: [
        {
            removeViewBox: true
        }
    ]
    }))
    .pipe(gulp.dest("./build/img/"))
    .pipe(browserSync.stream())
});

gulp.task('sync-browser', function() {
    browserSync.init({
        server: {
            baseDir: "./build/"
        }
    })
});

// gulp.task('svgsprite', function() {
//     gulp.src("./src/assets/**/*.svg")
//     .pipe(svgSprite({
//         mode: {
//             sprite: "../icons/icons.svg",
//             example: true
//         }
//     }))
//     .pipe(gulp.dest("./build/assets/sprites/**"))   
// });

gulp.task("watch", function() {
    gulp.watch('./src/sass/**/*.scss', gulp.series('sass'));
    gulp.watch('./src/**/*.html', gulp.series('html'));
    gulp.watch('./src/**/*.js', gulp.series('js'));
    gulp.watch("./src/img/**", gulp.series('img'));
    // gulp.watch("./src/img/**", gulp.series("webpFormat"));
});

gulp.task('default', gulp.parallel('sync-browser',"watch", "img", "sass", "html" , "js"));