require('dotenv').config()

const withOffline = require('next-offline')
const webpack = require('webpack')
const Uglify = require('uglifyjs-webpack-plugin')

module.exports = withOffline({
    staticFileGlobs: [
        '**/.next/bundles/pages/*.js',
        '**/.next/chunks/**/*.js',
        '/manifest.json',
        '**/.next/app.js',
        '/'
    ],
    webpack: config => {
        config.plugins = config.plugins.filter(plugin => plugin.constructor.name !== 'UglifyJsPlugin')
        config.plugins.push(new Uglify(), new webpack.EnvironmentPlugin(process.env))

        return config
    }
})
