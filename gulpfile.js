var gulp = require('gulp');
var minifyJs = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var minifyCss = require('gulp-clean-css');
var clean = require('gulp-clean');
var replace = require('gulp-replace');
var browserSync = require('browser-sync').create();
var deleteLines = require('gulp-delete-lines');
var insertLines = require('gulp-insert-lines');

paths = {
  src: "app/",
  dist: "dist/"
};

gulp.task('watch', function() {
  gulp.watch(paths.src + 'css/*.css', function(done) {
    browserSync.reload();
    done();
  });
  gulp.watch(paths.src + '*.html', function(done) {
    browserSync.reload();
    done();
  });
  gulp.watch(paths.src + '**/*.js', function(done) {
    browserSync.reload();
    done();
  });
});

// BROWSER-SYNC
function browserSyncInit(done) {
  browserSync.init({
    server: {
      baseDir: paths.src
    }
  });
  done();
}
gulp.task('browserSync', browserSyncInit);


// DEFAULT
gulp.task('default',
  gulp.parallel('browserSync', 'watch')
);


//CLEAN
gulp.task('clean', function() {
  return gulp.src(paths.dist + '*.*')
    .pipe(clean());
});

gulp.task('replace-script-tags', function() {
  return gulp.src(paths.dist + 'index.html')
  .pipe(deleteLines({
    'filters': [
    /<script\s+type=["']text\/javascript["']\s+src=/i,
    ]
    }))
  .pipe(deleteLines({
    'filters': [
    /<script\s+src=["']bower_components["']\s+src=/i
    ]
    }))
  .pipe(deleteLines({
    'filters': [
    /<script\s+src=["']\s+src=/i
    ]
  }))
  .pipe(replace('bower_components', '../app/bower_components'))
  .pipe(insertLines({
    'before': /<\/head>$/,
    'lineBefore': '<link rel="stylesheet" type="text/css" href="styles.min.css" />'
  }))
  .pipe(insertLines({
    'before': /<\/head>$/,
    'lineBefore': '<script src="scripts.min.js"></script>',
  }))
  .pipe(gulp.dest(paths.dist));

});

gulp.task('build-js', function() {
  return gulp.src([paths.src + 'js/app.js', paths.src + 'services/*.js', paths.src + 'controllers/*.js', paths.src + 'directives/*.js'])
  .pipe(concat('scripts.min.js'))
  // .pipe(minifyJs())
  .pipe(gulp.dest(paths.dist));
});

gulp.task('build-css', function() {
  return gulp.src(paths.src + '/css/*.css')
  .pipe(replace("url('../img/backgrounds", "url('img/backgrounds"))
  .pipe(concat('styles.min.css'))
  .pipe(minifyCss())
  .pipe(gulp.dest(paths.dist));
});

gulp.task('copy-images', function() {
  return gulp.src(paths.src + 'img/**/*')
  .pipe(gulp.dest(paths.dist + 'img'));
});

gulp.task('build-html', function() {
  return gulp.src(paths.src + 'index.html')
  .pipe(replace('css/styles.css', 'styles.min.css'))
  .pipe(gulp.dest(paths.dist));
});

gulp.task('copy-templates', function() {
  return gulp.src(paths.src + 'templates/*.html')
  .pipe(gulp.dest(paths.dist + 'templates/'));
});

gulp.task('copy-php', function() {
  return gulp.src(paths.src + 'php/*.php')
  .pipe(gulp.dest(paths.dist + 'php/'));
});

gulp.task('build',
  gulp.series('clean',
    gulp.parallel(
      gulp.series('build-html', 'replace-script-tags'),
      'build-js',
      'build-css',
      'copy-images',
      'copy-templates',
      'copy-php')
  ));
