// https://github.com/xotahal/react-native-material-ui

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    // Button,
    View,
    TextInput,
    ListView,
    ScrollView,
    FlatList,
    Image,
    StatusBar,
    ToolbarAndroid,
    ToastAndroid,
    Alert,
    ProgressBarAndroid,
    ImageBackground,
    TouchableNativeFeedback,
    PermissionsAndroid,
    NativeModules
} from 'react-native';
import {
    COLOR,
    ThemeProvider,
    ListItem,
    Subheader,
    Toolbar,
    Button,
    Icon,
    IconToggle,
    Divider
} from 'react-native-material-ui';
import * as appStyle from './styles';

class SearchDetail extends Component {
    render() {
        const {navigation} = this.props;
        const {item} = navigation.state.params;

        const notUSed = (<Button
            raised primary
            onPress={() => navigation.goBack()}
            text="Zpet"
        />);

        return (
            <View style={{flex: 1}}>
                <StatusBar
                    backgroundColor="blue"
                    barStyle="light-content"
                />

                <Toolbar
                    leftElement="arrow-back"
                    centerElement="Detail"
                    onLeftElementPress={() => navigation.goBack()}/>

                <ScrollView style={{flex: 1}}>
                    <Image source={{uri: item.image}} style={{width: 100, height: 120}}/>
                    <Text>{item.fileName}</Text>
                    <Divider/>
                    <Text>{item.name}</Text>
                    <Divider/>
                    <Text>{item.size}{item.sizeUnit}</Text>
                    <Divider/>
                    <Text>{item.description}</Text>
                    <Divider/>
                </ScrollView>
            </View>
        );
    }
}

export default SearchDetail;
