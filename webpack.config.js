const {resolve, join} = require('path')
const HtmlWebapckPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

process.env.NODE_ENV = "production"

const CommonCssLoader = [
  MiniCssExtractPlugin.loader,
  {
    loader: 'css-loader',
    options: {
      esModule: false
    }
  },
  {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: [
          'postcss-preset-env'
        ]
      }
    }
  }
]

module.exports = {
  entry: {
    index: './src/ts/index.ts',
  },
  output: {
    filename: 'js/[name].bundle.js',
    path: resolve(__dirname, 'dist'),
    clean: true,
    environment: {
      arrowFunction: false
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns: 'usage',
                    corejs: {
                      version: 3
                    },
                    targets: {
                      chrome: '60',
                      firefox: '60',
                      ie: '9',
                      safari: '10',
                      edge: '17'
                    }
                  }
                ]
              ]
            }
          },
          'ts-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          ...CommonCssLoader,
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebapckPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/main.css'
    })
  ],
  optimization: {
    minimizer: [
      new CssMinimizerPlugin()
    ],
    minimize: true,
    splitChunks: {
      chunks: 'all'
    }
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  target: 'web',
  mode: 'production',
  devServer: {
    static: {
      directory: join(__dirname, 'dist')
    },
    watchFiles: ['./src/index.html'],
    port: 3000,
    hot: true,
    open: true,
    compress: true
  },
  performance: {
    hints:'warning',
    //入口起点的最大体积
    maxEntrypointSize: 50000000,
    //生成文件的最大体积
    maxAssetSize: 30000000,
    //只给出 js 文件的性能提示
    assetFilter: function(assetFilename) {
      return assetFilename.endsWith('.js');
    }
  }
}