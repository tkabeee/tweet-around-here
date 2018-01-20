const gulp = require('gulp')
const util = require('gulp-util')
// const rename = require('gulp-rename');
const webserver = require('gulp-webserver')

const webpack = require('webpack')
const webpackConfig = require('./webpack.config')
const webpackStream = require('webpack-stream')
const webpackDevServer = require('webpack-dev-server')

const SCSS_FILES = 'sass/*.scss'
const SASS_DIR = 'sass'
const CSS_DIR = 'css'

gulp.task('default', ['build'], () => {
 gulp.start('webserver');
//  gulp.start('webpack-dev-server')
 gulp.watch(['src/**/*.js'], ['build']);
})

gulp.task('build', () => {
  return webpackStream(webpackConfig, webpack)
    .pipe(gulp.dest('build'))
})

gulp.task("webserver", () => {
  gulp.src('./')
    .pipe(webserver({
      host: 'localhost',
      port: 8080,
      livereload: true
    }))
})

// gulp.task('webpack-dev-server', () => {
//   const compiler = webpack(webpackConfig)
//   compiler.plugin('done', () => {
//   })
//   new webpackDevServer(compiler, {
//   }).listen(8080, 'localhost', (err) => {
//     if (err) throw new util.PluginError('webpack-dev-server', err)
//     util.log('[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/index.html')
//   })
// })