const gulp = require('gulp')
const gutil = require('gulp-util')
const webpack = require('webpack')
const webpackConfig = require('./webpack.config')
const webpackStream = require('webpack-stream')
const webpackDevServer = require('webpack-dev-server')

gulp.task('build', () => {
  return webpackStream(webpackConfig, webpack)
    .pipe(gulp.dest('build'))
})

gulp.task('dev-server', () => {
  const compiler = webpack(webpackConfig)

  new webpackDevServer(compiler, {
  }).listen(8080, 'localhost', (err) => {
    if (err) throw new gutil.PluginError('dev-server', err)
    gutil.log('[dev-server]', 'http://localhost:8080/index.html')
  })
})

gulp.task('default', () => {
  gulp.start('dev-server')
})