const webpack = require('webpack')

module.exports = {
  // entry point
  entry: [
    // 'babel-polyfill',
    './src/app.js',
  ],
  output: {
    // dest dir
    path: `${__dirname}/build`,
    // dest file
    filename: 'bundle.js'
  },
  // http://localhost:8080/
  devServer: {
    contentBase: 'build',
    port: 8080
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                // env を指定することで、ES2017 を ES5 に変換
                // {modules: false} にしないと import 文が Babel によって CommonJS に変換され
                // webpack の Tree Shaking 機能が使えない
                ['env', {'modules': false}],
                // React JSX
                'react'
              ]
            }
          }
        ],
        // node_modules は除外
        exclude: /node_modules/,
      }
    ]
  },
  resolve: {
    extensions: [".js"]
  },
  // ソースマップを有効
  devtool: 'source-map',
  plugins: [
    // JS minify
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true
    })
  ]
}