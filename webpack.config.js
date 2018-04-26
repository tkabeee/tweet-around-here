const webpack = require("webpack");
const path = require("path");

module.exports = {
  mode: "development",
  entry: [
    "./src/app.js",
  ],
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, ''),
    port: 8080,
    inline: true,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                // env を指定することで、ES2017 を ES5 に変換
                // {modules: false} にしないと import 文が Babel によって CommonJS に変換され
                // webpack の Tree Shaking 機能が使えない
                ["env", {"modules": false}],
                // React JSX
                "react"
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
  devtool: "inline-source-map",
  // plugins: [
  //   // JS minify
  //   new webpack.optimize.UglifyJsPlugin({
  //     sourceMap: true
  //   })
  // ]
}