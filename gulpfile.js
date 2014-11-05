//inside of gulpfile.js
var gulp = require('gulp');
var $ = require('gulp-load-plugins')(
  {
    camelize: true
  });

gulp.task('minify-views', function() {
  var opts = {comments: true, empty: true, spare: true};

  gulp.src('./app/tempates/*.html')
    .pipe($.minifyHtml(opts))
    .pipe(gulp.dest('dist/tempates/'));
});

function jshint(src){
  gulp.src(src)
    .pipe($.jshint())
    .pipe($.jshint.reporter('default'));
}

gulp.task('jshint-source', function() {
  jshint(['./app/js/*.js', './app/js/**/*.js']);
});

gulp.task('jshint-dist', function(){
  jshint('./dist/js/*.js');
});

gulp.task('minify-css-js', function(){
  var opts = {comments: true, empty: true, spare: true};

  gulp.src('./app/*.html')
    .pipe($.usemin({
      css: [$.minifyCss(), 'concat'],
      html: [$.minifyHtml(opts)],
      js: [$.uglify()]
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('watch', function() {
  gulp.watch(['app/*.html', 
              'app/tempalates/*.html',
              'app/css/*.css', 
              'app/js/*.js',
              'app/js/**/*.js'], ['jshint-source', 'minify-views', 'minify-css-js', 'jshint-dist']);
});

// Default Task
gulp.task('default', ['watch']);