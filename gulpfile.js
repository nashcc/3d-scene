var gulp = require('gulp'),
  connect = require('gulp-connect'),
  open = require('gulp-open');

var paths = {
  html: ['index.html'],
  scripts: ['js/**/*.js']
};

gulp.task('connect', function() {
  connect.server({
    root: __dirname,
    livereload: true
  });
});

gulp.task('html', function () {
  gulp.src(paths.html)
    .pipe(connect.reload());
});

gulp.task('scripts', function () {
  gulp.src(paths.scripts)
    .pipe(connect.reload());
});

gulp.task('open', ['connect'], function(){
  gulp.src('./index.html')
  .pipe(open('', {
    url: 'http://localhost:8080'
  }));
});

gulp.task('watch', function () {
  gulp.watch(paths.html, ['html']);
  gulp.watch(paths.scripts, ['scripts']);
});

gulp.task('serve', ['connect', 'open', 'watch']);
