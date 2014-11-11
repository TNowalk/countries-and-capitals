// gulp
var gulp = require('gulp');
var connect = require('gulp-connect');

// plugins
var $ = require('gulp-load-plugins')(
  {
    camelize: true, // if true, transforms hyphenated plugins names to camel case
  }
); 

// port index.html and index.min.html cause why not
gulp.task('copy-index', function() {
  gulp.src('./app/index.html')
    .pipe(gulp.dest('dist/'))
    .pipe($.rename({ suffix: '.min'}))
    .pipe($.minifyHtml())
    .pipe(gulp.dest('dist/'))
    .pipe($.notify({ message: 'copy-index task complete' }));
});

// lint and build partials.js and partials.min.js with sourcemaps
// haven't tested this in full workflow yet
gulp.task('views', function() {
  gulp.src(['./app/**/*.html', '!./app/index.html'])
    .pipe($.ngHtml2js({
      moduleName: 'myApp',
      prefix: ''
    }))
    .pipe($.jshint.reporter('default'))
    .pipe($.jshint.reporter('fail'))
    .pipe($.sourcemaps.init())
    .pipe($.concat('partials.js'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('dist/scripts/'));

  gulp.src(['./app/**/*.html', '!./app/index.html'])
    .pipe($.minifyHtml())
    .pipe($.ngHtml2js({
      moduleName: 'myApp',
      prefix: ''
    }))
    .pipe($.sourcemaps.init())
    .pipe($.uglify())
    .pipe($.concat('partials.min.js'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('dist/scripts/'));  
});

// lint and build app.js and app.min.js with sourcemaps
gulp.task('scripts', function() {
  return gulp.src(['app/**/*.js', '!app/bower_components/**'])
    .pipe($.jshint())
    .pipe($.jshint.reporter('default'))
    .pipe($.jshint.reporter('fail'))
    .pipe($.sourcemaps.init())
    .pipe($.concat('app.js'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('dist/scripts'))
    .pipe($.rename({ suffix: '.min' }))
    .pipe($.uglify())
    .pipe($.sourcemaps.write()) // don't know if this fucks up the minification
    .pipe(gulp.dest('dist/scripts'))
    .pipe($.notify({ message: 'scripts task complete' }));
});

// lint and build styles.css and styles.min.css with sourcemaps
gulp.task('styles', function() {
  var opts = {comments:true,spare:true}; 

  return gulp.src(['app/**/*.css', '!app/bower_components/**'])
    .pipe($.sourcemaps.init())
    .pipe($.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe($.csslint())
    .pipe($.csslint.reporter())
    .pipe($.concat('styles.css'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('dist/styles'))
    .pipe($.rename({ suffix: '.min' }))
    .pipe($.minifyCss(opts))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('dist/styles'))
    .pipe($.notify({ message: 'styles task complete' }));
});

gulp.task('vendor-styles', function() {
  var opts = {comments:true,spare:true}; 

  gulp.src(['app/bower_components/**/*.css'])
    .pipe($.sourcemaps.init())
    .pipe($.concat('vendor.css'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('dist/styles'));

  gulp.src(['app/bower_components/**/*.min.css'])
    .pipe($.sourcemaps.init())
    .pipe($.concat('vendor.min.css'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('dist/styles'));
});

gulp.task('vendor-scripts', function() {

  gulp.src(['app/bower_components/**/*.js', '!app/bower_components/**/*.min.js'])
    .pipe($.sourcemaps.init())
    .pipe($.concat('vendor.js'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('dist/scripts'));

  gulp.src(['app/bower_components/**/*.min.js'])
    .pipe($.sourcemaps.init())
    .pipe($.concat('vendor.min.js'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('dist/scripts'));
});

// Watch
gulp.task('watch', function() {
 
  // Watch .css files
  gulp.watch(['app/**/*.css', '!app/bower_components/**'], ['styles']);
 
  // Watch .js files
  gulp.watch(['app/**/*.js', '!app/bower_components/**'], ['scripts']);
 
  // Watch index.html
  gulp.watch('app/index.html', ['copy-index']);

  // Watch .html files
  gulp.watch(['app/**/*.html', '!app/bower_components/**', '!app/index.html'], ['views']);

  // Watch vendor .css files
  gulp.watch('app/bower_components/**/*.css', ['vendor-styles']);
 
  // Watch vendor .js files
  gulp.watch('app/bower_components/**/*.js', ['vendor-scripts']);
 
  // Create LiveReload server
  $.livereload.listen();
 
  // Watch any files in dist/, reload on change
  gulp.watch(['dist/**']).on('change', $.livereload.changed);
 
});

// clean up dist
gulp.task('clean', function() {
  gulp.src('./dist/*')
    .pipe($.clean({force: true}));
});

// connect to server with dist as root
gulp.task('connect', function () {
  connect.server({
    root: 'dist/',
    port: 9999
  });
});

// default task
gulp.task('default', 
  ['clean', 'copy-index', 'views', 'scripts', 'styles', 'vendor-scripts', 'vendor-styles', 'connect', 'watch']
);

// build task
gulp.task('build',
  ['clean', 'copy-index', 'views', 'scripts', 'styles', 'vendor-scripts', 'vendor-styles', 'connect', 'watch']
);