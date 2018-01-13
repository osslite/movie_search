import {AppRegistry} from 'react-native';
import BasicApp from './src/test';
// import App from './src/search/index_matui_paper';
// import Search from './src/search/';
import App from "./src/";

global.Buffer = global.Buffer || require('buffer').Buffer;

AppRegistry.registerComponent('MovieSearch', () => App);
