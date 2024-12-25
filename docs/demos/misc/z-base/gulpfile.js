const gulp = require('gulp');
const sass = require('gulp-sass');
const order = require('gulp-order');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const plumber = require('gulp-plumber');

gulp.task('scss', () =>
    gulp.src('src/**/**.scss')
        .pipe(plumber())
        /*.pipe(order([
            '_variable.scss',
            '_mixin.scss',
            'src/!**!/!**.scss'
        ]))*/
        .pipe(concat('index.css'))
        .pipe(sass())
        .pipe(cleanCSS())
        .pipe(gulp.dest('build'))
);
gulp.task('scss:watch', () => gulp.watch('src/**/**.scss', ['scss']));

gulp.task('html', () => gulp.src('src/index.html').pipe(gulp.dest('build')));
gulp.task('html:watch', () => gulp.watch('src/index.html', ['html']));

if (process.env.NODE_ENV === 'development') {
    gulp.task('default', [
        'scss:watch',
        'html:watch'
    ]);
} else if (process.env.NODE_ENV === 'production') {
    gulp.task('default', [
        // 'clean',
        'html',
        'scss'
    ]);
}

