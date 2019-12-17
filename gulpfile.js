const gulp = require('gulp');
const sass = require('gulp-sass');
const watchSass = require('gulp-watch-sass');

gulp.task('default', function() {
    return watchSass('src/assets/scss/themes/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('src/assets/themes/'));
});
