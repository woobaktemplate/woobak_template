var debug = process.env.NODE_ENV !== "production";
var path = require('path');


module.exports = {
  entry: {
    admin: __dirname + '/static/js/data-manipulation/admin.js'
  },

  // devtool: "#eval-source-map",

  output: {
    path: __dirname + '/static/bundles',
    filename: '[name].js'
  },

  devServer: {
    inline: true,
    port: 7777,
    contentBase: __dirname + '/dist/',
    historyApiFallback: true
  },

  module: {
    loaders: [
      {
        test:/\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
        query: {
          cacheDirectory: true,
          presets: ["es2015", "stage-0"],
          plugins: ["transform-class-properties"]
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(png|jpg)$/,
        exclude: /(node_modules)/,
        loader : 'file-loader'
      }
    ]
  },

  plugins: debug ? [] : [
    // new webpack.optimize.OccurrenceOrderPlugin()
    // new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: true }),
    ]

};
