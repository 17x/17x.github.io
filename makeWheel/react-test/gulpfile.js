var gulp = require('gulp'),
    jshint = require('gulp-jshint'), //代码验证检查
    uglify = require('gulp-uglify'), //压缩js代码
    cleanCSS = require('gulp-clean-css'), //压缩css代码
    rename = require('gulp-rename'), //文件重命名
    concat = require('gulp-concat'), //合并js文件
    notify = require('gulp-notify'), //更改提醒
    livereload = require('gulp-livereload'), //自动刷新页面
    sourcemaps = require('gulp-sourcemaps'), //用于解决压缩代码后调试困难
    autoprefixer = require('gulp-autoprefixer'), //自动添加css前缀
    imagemin = require('gulp-imagemin'), //图片压缩
    sass = require('gulp-sass'),
    wait = require('gulp-wait');

gulp.task('html', function() {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist/'));
        // .pipe(livereload());
});

gulp.task('html:watch', function() {
    gulp.watch('src/*.html', ['html']);
});

gulp.task('js', function() {
    return gulp.src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(uglify())
        // .pipe(concat('index.min.js'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/js/'));
});

gulp.task('js:watch', function() {
    gulp.watch('src/js/**/*.js', ['js']);
});

gulp.task('css', function() {
    return gulp.src('src/css/**/*.css')
        .pipe(sourcemaps.init())
        .pipe(autoprefixer({ browsers: 'last 2 versions' }))
        .pipe(cleanCSS())
        // .pipe(concat('index.min.css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/css/'));
});

gulp.task('css:watch', function() {
    gulp.watch('src/css/**/*.css', ['css']);
});


gulp.task('sass', function() {
    return gulp.src('src/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer({ browsers: 'last 2 versions' }))
        .pipe(cleanCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('sass:watch', function() {
    gulp.watch('src/sass/**/*.scss', ['sass']);
});


gulp.task('image', function() {
    return gulp.src('src/images/**/')
        .pipe(imagemin({ progressive: true }))
        .pipe(gulp.dest('dist/images'));
});

gulp.task('image:watch', function() {
    gulp.watch('src/images/**/*', ['image']);
});

gulp.task('copy', function() {
    return gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('dist/fonts/'));
});

gulp.task('copy:watch', function() {
    gulp.watch('src/fonts/**/*', ['copy']);
});

gulp.task('reload:watch', function() {
    var options = {
        port: 8080,
        host: '192.168.1.100',
        basePath: 'dist/',
        reloadPage: 'dist/index.html'
    };
    // livereload.listen(options);
    livereload.listen();

    gulp.watch('dist/**', function(e) {
        livereload.changed(e.path);
    });
});

// gulp默认任务所关联的任务
gulp.task('default', [
    'reload:watch',
    'html:watch',
    'js:watch',
    'css:watch',
    'sass:watch',
    'image:watch',
    'copy:watch'
]);
