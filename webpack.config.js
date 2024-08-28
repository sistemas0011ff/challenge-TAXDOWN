const path = require('path');
const slsw = require('serverless-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin'); // Asegúrate de haber instalado este plugin

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js'
  },
  plugins: [
    // Este plugin copiará los archivos binarios de Prisma necesarios
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, 'node_modules/.prisma/client'),
          to: path.join(__dirname, '.webpack/service/node_modules/.prisma/client')
        },
        {
          from: path.join(__dirname, 'node_modules/@prisma/client'),
          to: path.join(__dirname, '.webpack/service/node_modules/@prisma/client')
        }
      ]
    })
  ]
};
