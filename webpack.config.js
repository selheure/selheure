var webpack = require('webpack')

module.exports = {
  entry: {
    main:   './src/ui/index.js',
    vendor: ['react', 'react-dom'],
  },
  output: {
    filename: '[name].js',
    path: './www/',
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    })
  ],
  cache: true,
  debug: false,
  devtool: 'cheap-module-source-map',
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'stage-1'],
          env: {
            "development": {
             "presets": ["react-hmre"]
            }
          }
        }
      }
    ]
  }
}
