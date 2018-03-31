require('dotenv').config()

const webpack = require('webpack')
const Uglify = require('uglifyjs-webpack-plugin')

module.exports = {
    webpack: config => {
        config.plugins = config.plugins.filter(plugin => plugin.constructor.name !== 'UglifyJsPlugin')
        config.plugins.push(new Uglify(), new webpack.EnvironmentPlugin(process.env))
        config.module.rules.push(
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    }
                ]
            }
        )

        return config
    }
}
