const gulp       = require('gulp')
const rename     = require('gulp-rename')
const babel      = require('babelify')
const browserify = require('browserify')
const source     = require('vinyl-source-stream')
const sass       = require('gulp-sass')
const watchify   = require('watchify')

let b = browserify({
  entries: ['./src/index.js'],
  cache: {},
  packageCache: {}
})

gulp.task('assets', ()=>{
  gulp
    .src('./assets/*')
    .pipe(gulp.dest('public'))
})

gulp.task('styles', ()=>{
  gulp
    .src('./toots.sass')
    .pipe(sass())
    .pipe(rename('app.css'))
    .pipe(gulp.dest('public'))
  gulp
    .src('./codeColor.sass')
    .pipe(sass())
    .pipe(rename('codeColor.css'))
    .pipe(gulp.dest('public'))
})

function compile(watch) {
  //let bundle = watchify(browserify('./src/index.js'))

  let b = browserify({
    entries: ['./src/index.js'],
    cache: {},
    packageCache: {},
    //plugin: [watchify]
  })

  function rebundle() {
    b
      .transform(babel, {presets: ["es2015"]})
      .bundle()
      .on('error', (err) => {console.log(err); this.emit('end')})
      .pipe(source('index.js'))
      .pipe(rename('app.js'))
      .pipe(gulp.dest('public'))
  }

/*  if(watch){
    b.on('update', ()=>{
      console.log('--> Bundling...')
      rebundle()
    })
  }
*/
  rebundle()
}


gulp.task('build', () => compile() )
//gulp.task('watch', () => compile(true) )



gulp.task('default', ['assets', 'styles', 'build'])