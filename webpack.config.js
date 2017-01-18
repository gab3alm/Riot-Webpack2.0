const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const webpack = require('webpack');
const parts = require('./webpack.parts');

const PATHS = {
  app: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build')
};

const common = merge({
  entry:{
    app:PATHS.app
  },
  output:{
    path: PATHS.build,
    filename: 'bundle.js'
  },
  resolve:{
    modules: [
    "node_modules",
    path.resolve(__dirname, "src"), 
    path.resolve(__dirname, "src/components"), 
    path.resolve(__dirname, "src/sass") 
    ],
    moduleExtensions:[".js",".tag",".json",".scss",".css"]
  }
});

module.exports = function(env){

  // PRODUCTION BUILD
  if(env == 'production'){
    return merge(
      common,
      parts.extractCSS(),
      parts.extractSASS(),
      parts.loadTAG(),
      parts.exposeJQUERY(),
      parts.babel()
      );
  }

  // DEVELOPMENT 
  return merge(common, {
    //disable performance hints during development
    performance:{hints:false},
    plugins:[new webpack.NamedModulesPlugin()]
  },
  parts.loadCSS(),
  parts.loadSASS(),
  parts.loadTAG(),
  parts.exposeJQUERY(),
  parts.devServer({
    //customize host/port here if needed
    host: process.env.HOST,
    port: process.env.PORT
  })
  );
};