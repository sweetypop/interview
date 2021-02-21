const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { VuetifyLoaderPlugin } = require('vuetify-loader');

const webpack = require('webpack');
const path = require('path');


module.exports = {
  entry: {
    index: path.resolve(__dirname, "src", "index.js")
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html")
    }),
    new VueLoaderPlugin(),
    new VuetifyLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env.IS_DEVELOPMENT': true
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg|eot|woff|ttf|svg|woff2)$/,
        use: [{loader: 'file-loader'}]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader"
        ]
      },
      {
        test: /\.sass$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
              sassOptions: {
                indentedSyntax: true
              }
            },
          },
        ]
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
              additionalData: '@import "assets/index";',
              sassOptions: {
                includePaths:[
                  path.resolve(__dirname, 'src'),
                ]
              }
            },
          },
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.vue'],
    alias: {
     '@': path.resolve( __dirname, 'src')
    }
  },
  devServer: {
    watchOptions: {
      ignored: [
        path.resolve(__dirname, 'node_modules')
      ]
    },
    hot: true,
    inline: true,
    https: false,
    disableHostCheck: true,
    historyApiFallback: true,
  }
};
