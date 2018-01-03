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
// import {Camera} from 'react-native-camera';
import {NativeRouter, Route, Link} from 'react-router-native';
import {
    StackNavigator,
    TabNavigator,
    DrawerNavigator,
    SafeAreaView
} from 'react-navigation';
// import {
//     SearchBar
// } from 'react-native-elements';
import * as appStyle from '../search/styles';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
const PageSearch = 'Main';
const PageResult = 'Result';
const base64Image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==';

class Search extends Component {
    constructor() {
        super();
        // this.setState({nickname: ''});
        // this.setDefaultProps({nickname: ''});
    }

    onActionSelected(position) {
        if (position === 0) { // index of 'Settings'
            // showSettings();
        }
    }

    static async requestCameraPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    'title': 'Cool Photo App Camera Permission',
                    'message': 'Cool Photo App needs access to your camera ' +
                    'so you can take awesome pictures.'
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the camera")
            } else {
                console.log("Camera permission denied")
            }
        } catch (err) {
            console.warn(err)
        }
    }

    progress() {
        return (
            <View style={appStyle.container}>
                <ProgressBarAndroid styleAttr="Inverse"/>
            </View>
        );
    }

    renderToolbar() {
        Alert.alert('Alert Title',
            'My Alert Msg',
            [
                {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false});
        return (
            <ToolbarAndroid
                title="AwesomeApp"
                actions={[{title: 'Settings', show: 'always'}]}
                onActionSelected={this.onActionSelected}/>
        )
    }

    renderGridItem({item}) {
        return (
            <View>
                <ImageBackground source={{uri: 'https://i.chzbgr.com/full/7345954048/h7E2C65F9/'}}
                                 style={{width: '95%', height: 80, marginBottom: 5}}>
                    <Text style={appStyle.instructions}>{item.key}</Text>
                </ImageBackground>
                <ImageBackground source={{uri: base64Image}}
                                 style={{width: '95%', height: 80, marginBottom: 5}}>
                    <Text style={appStyle.instructions}>{item.key}</Text>
                </ImageBackground>
            </View>
        );
    }

    render() {
        let {navigation} = this.props;

        const data = [{key: 'a'}, {key: 'b'}, {key: 'b'}, {key: 'b'}, {key: 'b'}, {key: 'b'}, {key: 'b'}, {key: 'b'}, {key: 'b'}, {key: 'b'}, {key: 'b'}, {key: 'b'}, {key: 'b'}, {key: 'b'}, {key: 'b'}, {key: 'XXXX'}];

        return (
            <ScrollView style={appStyle.scrollView}
                        contentContainerStyle={appStyle.container}>
                <View accessible={true} style={appStyle.row}>
                    <View style={appStyle.col}>
                        <TextInput
                            onChangeText={(nickname) => this.setState({nickname})}
                            onSubmitEditing={this.renderToolbar}
                            autoCapitalize={"words"}
                            autoFocus={true}
                            keyboardType={"default"}
                            placeholder={'Napr. vikingove'}
                            value={this.state ? this.state.nickname : ""}
                            style={appStyle.search}
                            returnKeyType={'search'}
                            selectTextOnFocus={true}
                        />
                    </View>
                </View>
                <View accessible={true} style={appStyle.row}>
                    <View style={appStyle.col}>
                        <Button
                            onPress={() => navigation.navigate(PageResult, {user: 'Lucy'})}
                            title="Vysledek"
                        />
                        <Button
                            onPress={() => this.renderToolbar()}
                            title="Toolbar"
                        />
                        <Button
                            onPress={Search.requestCameraPermission}
                            title="Progress"
                        />
                    </View>
                </View>
                <View accessible={true} style={appStyle.row}>
                    <View style={appStyle.col}>
                        <FlatList
                            data={data}
                            renderItem={this.renderGridItem}
                            style={appStyle.grid}
                        />
                    </View>
                </View>
                <StatusBar barStyle="default"/>
            </ScrollView>
        );
    }
}

class DetailResult extends Component {
    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Vysledky hledani</Text>
                <Button
                    onPress={() => this.props.navigation.goBack()}
                    title="Vysledek"
                />
            </View>
        );
    }
}

const routeConfig = {};
routeConfig[PageSearch] = {
    screen: Search,
    navigationOptions: (props) => {
        return {
            headerTitle: 'Hledani',
            drawerLabel: 'Hledani',
            tabBarLabel: 'Hledani',
        };
    },
};
routeConfig[PageResult] = {
    screen: DetailResult,
    navigationOptions: ({navigation}) => {
        // const user = routeConfig?routeConfig.state.params.user:"";
        return {
            headerTitle: `Detail`,
            drawerLabel: 'Detail',
            tabBarLabel: 'Detail',
        }
    },
};

let BasicApp = StackNavigator(routeConfig);
// BasicApp = DrawerNavigator(routeConfig);
// BasicApp = TabNavigator(routeConfig, {
//         tabBarPosition: 'top',
//         scrollEnabled: true,
//         animationEnabled: true,
//         tabBarOptions: {
//             activeTintColor: '#e91e63',
//         }
//     }
// );

export default BasicApp;
