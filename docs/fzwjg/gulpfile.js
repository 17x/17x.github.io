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
    px2rem =require('gulp-px2rem'),
    wait = require('gulp-wait');

gulp.task('html', function() {
    return gulp.src('src/tpls/*.html')
        .pipe(gulp.dest('dist/tpls/'))
        // .pipe(livereload());
});

gulp.task('html:watch', function() {
    gulp.watch('src/tpls/*.html', ['html']);
});

gulp.task('js', function() {
    return gulp.src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat('index.min.js'))
        // .pipe(rename({ suffix: '.min' }))
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
        .pipe(px2rem(px2remOptions,postCssOptions))
        .pipe(concat('index.min.css'))
        // .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/css/'));
});

gulp.task('css:watch', function() {
    gulp.watch('src/css/**/*.css', ['css']);
});


gulp.task('sass', function() {
    var px2remOptions = {
        replace: true
    };     
    var postCssOptions = {
        map: true  
    };
    return gulp.src('src/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(autoprefixer({ browsers: 'last 3 versions' }))
        .pipe(px2rem(px2remOptions,postCssOptions))
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write())
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
    return gulp.src('src/mock/**/*')
        .pipe(gulp.dest('dist/mock**/*'));
});

gulp.task('copy:watch', function() {
    gulp.watch('src/mock/**/*', ['copy']);
});

gulp.task('reload:watch', function() {
    // livereload.listen(options);
    livereload.listen();

    gulp.watch('dist/**', function(e) {
        gulp.src(e.path)
            // .pipe(livereload.changed(e.path));
    });
});

// gulp默认任务所关联的任务
gulp.task('default', [
    // 'reload:watch',
    'js:watch',
    'html:watch',
    'sass:watch'/*,
    'copy:watch'*/
  /*  'css:watch',
    'image:watch'*/,
]);
