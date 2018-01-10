import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    Button,
    View,
    TextInput,
    ListView,
    ScrollView,
    FlatList,
    Image,
    StatusBar,
    ToolbarAndroid,
    Alert,
    ProgressBarAndroid,
    ImageBackground,
    TouchableNativeFeedback,
    PermissionsAndroid
} from 'react-native';
import {NativeRouter, Route, Link} from 'react-router-native'
import {
    StackNavigator,
    TabNavigator,
    DrawerNavigator,
    SafeAreaView
} from 'react-navigation';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

module.exports = StyleSheet.create({
    scrollView: {
        flex: 1,
        height: '100%'
    },
    container: {
        flex: 1,
        alignItems: 'stretch',
        /*alignItems: 'center',*/
        backgroundColor: '#F5FCFF',
        padding: 20,
        marginTop: Platform.OS === 'android' ? 56 : 0,
        justifyContent: 'center',
    },
    row: {
        flexDirection: 'row',
    },
    col: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        marginLeft: 7, marginRight: 7,
    },
    welcome: {
        width: '100%',
        alignItems: 'center',
        margin: 10,
    },
    search: {
        width: '95%',
        height: 50,
        alignItems: 'center',
        margin: 10,
        backgroundColor: 'black',
    },
    instructions: {
        width: '100%',
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    grid: {
        flex: 1,
        width: '100%',
        marginBottom: 5,
    },
    progressBar: {
        top: -6
    },
    upnpDevices: {
        top: -12
    }
});
