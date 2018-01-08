import {AppRegistry} from 'react-native';
import BasicApp from './src/test';
// import Search from './src/search/index_matui_paper';
import Search from './src/search/';

global.Buffer = global.Buffer || require('buffer').Buffer;

AppRegistry.registerComponent('MovieSearch', () => Search);
