import 'materialize-css/dist/css/materialize.min.css';
import 'expose-loader?$!expose-loader?jQuery!jquery';
import 'materialize-css/dist/js/materialize.min.js';

import riot from 'riot';
import 'riot-hot-reload'

import 'welcome.tag';
riot.mount('welcome');

// MHR interface
if(module.hot){
  //capture hot update
  module.hot.accept('welcome.tag', ()=>{
    // reload the element
    riot.reload('welcome');
  });
}