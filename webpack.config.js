const path = require('path')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const notifier = require('node-notifier')

module.exports = {
  entry: ['whatwg-fetch', 'regenerator-runtime/runtime', './client/app.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'server/static'),
    publicPath: '/static/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env'],
              plugins: [
                'transform-async-to-generator',
                'transform-regenerator',
                'transform-object-rest-spread'
              ]
            }
          },
          {
            loader: 'eslint-loader',
            options: {
              fix: true,
              cache: true,
              formatter: require('eslint-formatter-pretty'),
              emitError: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin({
      onErrors(severity, errors) {
        if (severity !== 'error') {
          return
        }
        const error = errors[0]

        notifier.notify({
          title: "Webpack error",
          message: severity + ': ' + error.name,
          subtitle: error.file || ''
        })
      }
    })
  ]
}
