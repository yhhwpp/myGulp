var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean'),
    imagemin = require('gulp-imagemin'),
    browserSync = require('browser-sync').create(),
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector'),
    reload = browserSync.reload,
    minifyCSS = require('gulp-minify-css'),
    htmlminify = require('gulp-html-minify'),
    copy = require("gulp-copy");

//压缩js
gulp.task('minifyjs', function (cb) {
    return gulp.src('js/*.js')
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('dist/js'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('dist/rev/js'));
});

//压缩css
gulp.task('minifyCSS', function (cb) {
    return gulp.src('css/*.css')
        .pipe(minifyCSS())
        .pipe(rev())
        .pipe(gulp.dest('dist/css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('dist/rev/css'));
});

// clean
gulp.task('clean', function () {
    return gulp.src(['build', 'dist'])
        .pipe(clean())
});

gulp.task('rev-html', ['minifyjs', 'minifyCSS'], function () {
    return gulp.src(['dist/rev/**/*.json', './index.html'])
        .pipe(revCollector({
            replaceReved: true
        }))
        // .pipe(htmlminify())
        .pipe(gulp.dest('build/'))
});
//合并 
gulp.task('concat', ['minifyjs', 'minifyCSS'], function () {
    gulp.src('dist/js/*.js')
        .pipe(concat('main.min.js'))
        .pipe(gulp.dest('build/js'));
    gulp.src('dist/css/*.css')
        .pipe(concat('main.min.css'))
        .pipe(gulp.dest('build/css'));
});

//压缩图片
gulp.task('imagemin', function () {
    return gulp.src('images/*')
        .pipe(imagemin([], {}))
        .pipe(gulp.dest('build/images'));
});

gulp.task('browsersync', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('watch', function () {
    gulp.watch(['css/*.css', 'js/*.js']).on('change', reload);
});

//默认任务
gulp.task('default', ['browsersync', 'watch']);

//项目完成提交任务
gulp.task('build', ['concat']);