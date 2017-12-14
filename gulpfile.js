const gulp = require('gulp')
const gutil = require('gulp-util')
const grename = require('gulp-rename');

const webpack = require('webpack')
const webpackConfig = require('./webpack.config')
const webpackStream = require('webpack-stream')
const webpackDevServer = require('webpack-dev-server')

const SCSS_FILES = 'sass/*.scss'
const SASS_DIR = 'sass'
const CSS_DIR = 'css'

gulp.task('default', ['dev-server'])

gulp.task('build', () => {
  return webpackStream(webpackConfig, webpack)
    .pipe(gulp.dest('build'))
})

gulp.task('deploy', () => {
  gulp.src('./build/bundle.js')
    .pipe(grename('app.min.js'))
    .pipe(gulp.dest('./js'))
})

gulp.task('dev-server', () => {
  const compiler = webpack(webpackConfig)
  compiler.plugin('done', () => {
    gulp.start('deploy')
  })
  new webpackDevServer(compiler, {
  }).listen(8080, 'localhost', (err) => {
    if (err) throw new gutil.PluginError('webpack-dev-server', err)
    gutil.log('[webpack-dev-server]', 'http://localhost:8080/index.html')
  })
})