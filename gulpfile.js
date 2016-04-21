const gulp = require('gulp');
const shell = require('gulp-shell');
const serve = require('gulp-serve');
const babel = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const runSequence = require('run-sequence');

// build source
gulp.task('build', () => {
    return browserify({entries: './src/app.js', extensions: ['.js', '.es6'], debug: true})
        .transform(babel)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('dist'));
});

// tests
gulp.task('exec-tests', shell.task([
    'npm test'
], {ignoreErrors: true}));

// serve
gulp.task('serve', serve('.'));

// watchers
gulp.task('autotest', ['exec-tests'], function () {
    gulp.watch(['src/**/*.js', 'test/**/*.js'], ['exec-tests']);
});

gulp.task('watch', ['build'], () => {
    gulp.watch('src/**/*.js', ['build']);
});

gulp.task('dev', () => {
    runSequence('build', ['serve', 'watch']);
});

gulp.task('default', ['dev']);
