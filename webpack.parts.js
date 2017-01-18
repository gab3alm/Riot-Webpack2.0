const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack-plugin');

exports.devServer = function(options) {
  return {
    devServer: {
// Watch options are used for windows/vagrant setups
watchOptions: {
// delay the rebuild after the first change
// aggregateTimeout: 300,
// poll using interval
// poll: 1000
},
// enable history API fallback so HTML5 Routing history still works.
historyApiFallback: true,

// doesn't set HotModuleReplacement Plugin!
hot: true,

// don't refresh if hot loading fails. 
// refresh behavior can be set with - inline:true
hotOnly: true,

// Display errors only - reduce output amount
stats: 'errors-only',

// parse host and port from env to allow customization
//
// If using vagrant or cloud9, set 
// host: options.host || '0.0.0.0'
// 
// 0.0.0.0 is available to all network devices
// unlike default localhost 
host: options.host, //defaults to localhost 
port: options.port //default 8080
},
plugins: [
//enable multipass compilation for enhanced performance 
// in larger projects. Good Default
new webpack.HotModuleReplacementPlugin({
// disabled since it won't work with html-webpack-template yet
// multiStep:true
}),
// ignore node_modules so CPU usage with poll watching is not that high
new webpack.WatchIgnorePlugin([path.join(__dirname, 'node_modules')]),
]
};
};


exports.loadSASS = function(paths){
  return{
    module:{
      rules:[
      {
        test:/\.scss$/,
        include:paths,
        use:['style-loader','css-loader','sass-loader']
      }
      ]
    }
  };
};


exports.loadCSS = function(paths){
  return{
    module:{
      rules:[
      {
        test:/\.css$/,
        include:paths,
        use:['style-loader', 'css-loader']
      }
      ]
    }
  };
};


exports.loadSTUFF = function(paths){
  return{
    module: {
      rules: [
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, use:"url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: "file-loader" },
      ]
    }
  };
};


exports.exposeJQUERY = function(paths){
  return{
    module:{
      rules:[
      { 
        test: require.resolve('jquery'), 
        loader: 'expose-loader?jQuery!expose-loader?$' 
      }
      ]
    } 
  };
};


exports.purifyCSS = function(paths){
  paths = Array.isArray(paths) ? paths : [paths];  
  return{
    plugins:[
    // the paths are absolute, so purify needs some configuration
    new PurifyCSSPlugin({
      basePath:'/',
      paths: paths.map(path => `${path}/*`),
      resolveExtensions:['.html']
    })
    ]
  };
};


exports.extractCSS = function(paths){
  return{
    module:{
      rules:[
      //extract css during build
      {
        test:/\.css$/,
        include: paths,
        loader:ExtractTextPlugin.extract({
          fallbackLoader:'style-loader',
          loader:'css-loader'
        })
      }
      ]
    },
    plugins: [
    new ExtractTextPlugin('[name].css')
    ]
  };
};




exports.extractSASS = function(paths){
  return{
    module:{
      rules:[
      //extract css during build
      {
        test:/\.scss$/,
        include: paths,
        loader:ExtractTextPlugin.extract({
          fallbackLoader:'style-loader',
          loader:'css-loader!sass-loader'
        })
      }
      ]
    },
    plugins: [
    new ExtractTextPlugin('[name].css')
    ]
  };
};


exports.loadTAG = function(){
  return{
    module:{
      rules:[
      {
        test:/\.tag$/,
        use:['tag-loader'],
        exclude:/node_modules/
      }
      ]
    }
  };
};


exports.babel = function(){
  return{
    module:{
      rules:[

      {
        test: /\.js$/,
        loader:'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        },
      }

      ]
    }
  };
};