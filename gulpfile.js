var gulp = require('gulp');
var minifyJs = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var minifyCss = require('gulp-clean-css');
var clean = require('gulp-clean');
var replace = require('gulp-replace');
var browserSync = require('browser-sync').create();
var insertLines = require('gulp-insert-lines');
var inject = require('gulp-inject');
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

paths = {
  src: "app/",
  dest: "dist/"
};

// BROWSER-SYNC
function browserSyncInit(done) {
  browserSync.init({
    proxy: "localhost/forecast-2-0/dist/"
  });
  done();
}
gulp.task('browserSync', browserSyncInit);

//CLEAN
gulp.task('clean', function() {
  return gulp.src(paths.dest + '*.*')
  .pipe(clean());
});

//CSS AUTOPREFIXER
gulp.task('autoprefixer', function() {
  return gulp.src(paths.dest + '*.css')
  .pipe(postcss([ autoprefixer() ]))
  .pipe(gulp.dest(paths.dest));
});

// ADD STYLES TAG
gulp.task('add-styles', function() {
  return gulp.src(paths.dest + 'index.html')
  .pipe(insertLines({
    'before': /<\/head>$/,
    'lineBefore': '<link rel="stylesheet" type="text/css" href="styles.min.css" />'
  }))
  .pipe(gulp.dest(paths.dest));
});

//ADD SCRIPT TAG
gulp.task('add-scripts', function() {
  return gulp.src(paths.dest + 'index.html')
  .pipe(insertLines({
    'before': /<\/head>$/,
    'lineBefore': '<script src="scripts.min.js"></script>',
  }))
  .pipe(gulp.dest(paths.dest));
});

gulp.task('dev-add-scripts', function() {
  var target = gulp.src(paths.dest + 'index.html');
  var source = gulp.src([paths.dest + 'js/app.js', paths.dest + 'js/directives/*.js', paths.dest + 'js/controllers/*.js', paths.dest + 'js/services/*.js'], {read: false});
  return target.pipe((inject(source, { relative: true })))
  .pipe(gulp.dest(paths.dest));
});

//BUILD AND COPY TASKS
gulp.task('build-js', function() {
  return gulp.src([paths.src + 'js/app.js', paths.src + 'js/directives/*.js', paths.src + 'js/controllers/*.js', paths.src + 'js/services/*.js'])
  .pipe(concat('scripts.min.js'))
  .pipe(minifyJs())
  .pipe(gulp.dest(paths.dest));
});

gulp.task('dev-build-js', function() {
  return gulp.src([paths.src + 'js/**/*.js'])
  .pipe(gulp.dest(paths.dest + 'js/'));
});

gulp.task('build-css', gulp.series(
  function() {
    return gulp.src(paths.src + '/css/*.css')
    .pipe(replace("url('../img/backgrounds", "url('img/backgrounds"))
    .pipe(concat('styles.min.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest(paths.dest));
    },
  'autoprefixer'));

gulp.task('copy-images', function() {
  return gulp.src(paths.src + 'img/**/*')
  .pipe(gulp.dest(paths.dest + 'img'));
});

gulp.task('build-html', function() {
  return gulp.src(paths.src + 'index.html')
  .pipe(replace('css/styles.css', 'styles.min.css'))
  .pipe(gulp.dest(paths.dest));
});

gulp.task('copy-templates', function() {
  return gulp.src(paths.src + 'templates/*.html')
  .pipe(gulp.dest(paths.dest + 'templates/'));
});

gulp.task('copy-php', function() {
  return gulp.src(paths.src + 'php/*.php')
  .pipe(gulp.dest(paths.dest + 'php/'));
});

gulp.task('build',
gulp.series('clean',
gulp.parallel(
  gulp.series('build-html', 'add-styles', 'add-scripts'),
  'build-js',
  'build-css',
  'copy-images',
  'copy-templates',
  'copy-php')
));

gulp.task('dev-build',
gulp.series('clean',
gulp.parallel(
  gulp.series('build-html', 'add-styles', 'dev-add-scripts'),
  'dev-build-js',
  'build-css',
  'copy-images',
  'copy-templates',
  'copy-php')
));

//WATCH
gulp.task('watch', function() {
  gulp.watch(paths.src + '**/*.css', gulp.series('build-css',
  function(done) {
    browserSync.reload();
    done();
  }));
  gulp.watch(paths.src + '**/*.html', gulp.series('build-html', 'add-styles', 'add-scripts', 'copy-templates',
  function(done) {
    browserSync.reload();
    done();
  }));
  gulp.watch(paths.src + '**/*.js', gulp.series('build-js',
  function(done) {
    browserSync.reload();
    done();
  }));
  gulp.watch(paths.src + 'php/*.php', gulp.series('copy-php',
  function(done) {
    browserSync.reload();
    done();
  }));
});


gulp.task('dev-watch', function() {
  gulp.watch(paths.src + '**/*.css', gulp.series('build-css',
  function(done) {
    browserSync.reload();
    done();
  }));
  gulp.watch(paths.src + '**/*.html', gulp.series('build-html', 'add-styles', 'dev-add-scripts', 'copy-templates',
  function(done) {
    browserSync.reload();
    done();
  }));
  gulp.watch(paths.src + '**/*.js', gulp.series('dev-build-js',
  function(done) {
    browserSync.reload();
    done();
  }));
  gulp.watch(paths.src + 'php/*.php', gulp.series('copy-php',
  function(done) {
    browserSync.reload();
    done();
  }));
});

// DEFAULT
gulp.task('default',
gulp.series('build', gulp.parallel('browserSync', 'watch'))
);

gulp.task('develop',
gulp.series('dev-build', gulp.parallel('browserSync', 'dev-watch'))
);
