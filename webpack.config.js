var path = require('path');
var webpack = require('webpack');

var isProduction = 'production' == process.env.NODE_ENV

var config = module.exports = {
    // the base path which will be used to resolve entry points
    context: __dirname,
    // the main entry point for our application's frontend JS
    entry: {
        application: "./app/assets/javascripts/application.js",
    },
    externals: {
        "jquery": "jQuery",
        "$": "jQuery"
    },
    // devtool: (isProduction ? "hidden" : "#inline-source-map"),
};

config.output = {
    // this is our app/assets/javascripts directory, which is part of the Sprockets pipeline
    path: path.join(__dirname, 'app', 'assets', 'javascripts'),
    // the filename of the compiled bundle, e.g. app/assets/javascripts/bundle.js
    filename: '[name].bundle.js',
    // if the webpack code-splitting feature is enabled, this is the path it'll use to download bundles
    publicPath: '/assets',
    devtoolModuleFilenameTemplate: '[resourcePath]',
    devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]',
};

config.resolve = {
    extensions: ['', '.js', '.jsx', '.coffee', '.cjsx'],
    modulesDirectories: [ 'node_modules', 'bower_components' ],
    alias: {
        cldr: 'cldrjs'
    }
};

config.plugins = [
    new webpack.ResolverPlugin([
        new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('.bower.json', ['main'])
    ]),
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        "window.jQuery": "jquery"
    }),
    new webpack.DefinePlugin({
        'process.env': {'NODE_ENV': JSON.stringify(process.env.NODE_ENV)}
    })
];

config.module = {
    loaders: [
        { loader: "babel-loader", test: [/\.js$/, /\.jsx$/], exclude: [new RegExp("node_modules"), new RegExp("bower_components")], query: {stage: 0} },
        { loader: 'coffee-loader', test: /\.coffee$/,  },
        { loader: "transform?coffee-reactify", test: /\.cjsx$/ },
    ],
};
