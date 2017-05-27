var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean'),
    imagemin = require('gulp-imagemin');
    rename = require("gulp-rename"),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    minifyCSS = require('gulp-minify-css'),
    copy = require("gulp-copy");
    
//压缩js
gulp.task('minifyjs', function (cb) {
   return gulp.src('js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

//压缩css
gulp.task('minifyCSS', function (cb) {
    return gulp.src('css/*.css')
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist/css'))
});

// clean
gulp.task('clean', function () {
    return gulp.src('build')
        .pipe(clean())
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

//重命名project.md 文件
gulp.task('rename', function () {
    return gulp.src("./Project.md")
        .pipe(rename("README.md"))
        .pipe(gulp.dest("./build"));
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
    gulp.watch('css/*.css').on('change', reload);
});

//默认任务
gulp.task('default', ['browsersync', 'watch']);

//项目完成提交任务
gulp.task('build', ['concat']);