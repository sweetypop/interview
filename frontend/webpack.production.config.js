const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { VuetifyLoaderPlugin } = require('vuetify-loader');

const BundleTracker = require('webpack-bundle-tracker')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const webpack = require('webpack');
const path = require('path');


const buildPath = path.resolve(__dirname, "..", "backend", "assets", "bundles");


module.exports = {
  entry: {
    index: path.resolve(__dirname, "src", "index.js")
  },
  output: {
    filename: "index.[contenthash].js",
    path: buildPath,
    publicPath: '/static/bundles/'
  },
  plugins: [
    new BundleTracker({
      path: buildPath,
      filename: 'webpack-build-stats.json',
      relativePath: true,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html")
    }),
    new VueLoaderPlugin(),
    new VuetifyLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env.IS_DEVELOPMENT': false,
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'index.[contenthash].css',
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: 'bundle-size-report.html',
      openAnalyzer: false,
    })
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
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      },
      {
        test: /\.sass$/,
        use: [
          MiniCssExtractPlugin.loader,
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
          MiniCssExtractPlugin.loader,
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
  performance: {
    assetFilter: function (assetFilename) {
      return (
        /* include any .css except one that contains vuetify styles (located in index.[contenthash].css)*/
        /^(?!index)(.*)\.css$/.test(assetFilename)
        /* include any .js */
        || /\.js$/.test(assetFilename)
      );
    },
  },  
  resolve: {
    extensions: ['.js', '.jsx', '.vue'],
    alias: {
     '@': path.resolve( __dirname, 'src')
    }
  },
  optimization: {
    sideEffects: true,
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          format: {
            comments: false
          }
        }
      }),
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
            },
          ],
        }
      }),
    ],
  }
}
