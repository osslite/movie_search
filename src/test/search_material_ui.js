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
import {NativeRouter, Route, Link} from 'react-router-native';
import {
    StackNavigator,
    TabNavigator,
    DrawerNavigator,
    SafeAreaView
} from 'react-navigation';
import * as appStyle from '../search/styles';
import SearchDao from '../search/search.dao';
import {
    COLOR,
    ThemeProvider,
    ListItem,
    Subheader,
    Toolbar,
    Button,
    Icon,
    IconToggle
} from 'react-native-material-ui';

const PageSearch = 'Main';
const PageResult = 'Result';
let base64Image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==';
base64Image = "https://img.csfd.cz/files/images/film/posters/162/288/162288360_e3b967.jpg?h180";
const UIManager = NativeModules.UIManager;
const uiTheme = {
    spacing: {}, // can be used to change the spacing of components.
    // fontFamily: {}, // can be used to change the default font family.
    palette: {
        primaryColor: COLOR.green500,
        accentColor: COLOR.pink500,
    },
    typography: {}, // can be used to change the typography of components
// you can change style of every each component
    avatar: {},
    button: {},
    toolbar: {}
};
const movieUrl = "https://mafioso.cz/movies/?movie_name=";

class Search extends Component {

    _keyExtractor = (item, index) => item.id;

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
        // data: [{key: 'a', id: 'a', img: base64Image}]
    }

    addItem() {
        const {data} = this.state;
        data.push({img: base64Image, id: Math.random(), key: Math.random()});
        ToastAndroid.show(`element added ${data}`, ToastAndroid.SHORT);
        this.setState({data});
    }

    addItems() {
    }

    renderItem({item}) {
        return (
            <ListItem
                divider
                leftElement={item.img &&
                <IconToggle name="details1"
                            onPress={() => ToastAndroid.show('ICON pressed', ToastAndroid.SHORT)}
                            style={{width: 60, height: 100, left: 0, padding: 0, alignItems: "left"}}>
                    <Image source={{uri: item.img}} style={{width: 40, height: 100, minHeight: 100}}/>
                </IconToggle>
                }
                numberOfLines="dynamic"
                centerElement={{
                    primaryText: 'With dynamic second line',
                    secondaryText: 'Lorem ipsum dolor sit amet, consectetur adipiscing. Pellentesque commodo ultrices diam. Praesent in ipsum',
                    tertiaryText: 'Pellentesque commodo ultrices diam. RKR is the best of world.',
                }}
                style={{
                    container: {height: 100},
                    secondaryText: {color: 'red'},
                    leftElementContainer: {marginLeft: 5, width: 70}
                }}
                onPress={() => Platform.OS === 'android' ? ToastAndroid.show(`element ${item.id}`, ToastAndroid.SHORT) : null}
                onLongPress={() => Platform.OS === 'android' ? ToastAndroid.show('LONG pressed', ToastAndroid.SHORT) : null}
                onLeftElementPress={() => null}
            >
                <Text>Testujici text</Text>
            </ListItem>
        );
    }

    render() {
        const flattenPrimaryText = StyleSheet.flatten("teste");
        const {data} = this.state;

        return (
            <View style={{flex: 1}}>
                <Toolbar
                    leftElement="arrow-back"
                    rightElement={{
                        actions: ['edit'],
                        menu: {labels: ['Item 1', 'Item 2']},
                    }}
                    searchable={{
                        autoFocus: true,
                        placeholder: 'App',
                    }}
                    onLeftElementPress={() => this.props.navigation.goBack()}
                    centerElement="List item"
                />
                <Toolbar
                    leftElement="menu"
                    centerElement=""
                    searchable={{
                        autoFocus: true,
                        placeholder: 'napr. teorie tresku',
                        onChangeText: () => this.addItems(),
                        onSubmitEditing: () => this.addItems()
                    }}

                />
                <Toolbar
                    leftElement="clear"
                    centerElement="With button"
                    rightElement={
                        <Button
                            text="Save"
                            style={{text: {color: 'white'}}}
                        />
                    }
                />
                <Toolbar
                    leftElement="clear"
                    centerElement="Custom styles"
                    rightElement={{
                        actions: ['edit'],
                        menu: {labels: ['Item 1', 'Item 2']},
                    }}
                    style={{
                        container: {backgroundColor: COLOR.orange300},
                        leftElement: {color: COLOR.orange900},
                        titleText: {color: COLOR.orange900},
                        rightElement: {color: COLOR.orange900},
                    }}
                />
                <Toolbar centerElement="Only title"/>

                <ScrollView style={{flex: 1}}>
                    <Subheader text="One line"/>
                    <ListItem
                        divider
                        centerElement="Center element as a text"
                        onPress={() => {
                        }}
                    />
                    <ListItem
                        divider
                        centerElement={{
                            primaryText: 'Center element as an object',
                        }}
                        onPress={() => {
                        }}
                    />
                    <Subheader text="One line with icon"/>
                    <ListItem
                        divider
                        dense
                        leftElement="person"
                        centerElement={{
                            primaryText: 'Center element as an object',
                        }}
                        onPress={() => {
                        }}
                    />
                    <ListItem
                        divider
                        dense
                        numberOfLines="dynamic"
                        leftElement={
                            <IconToggle name="details1"
                                        onPress={() => ToastAndroid.show('ICON pressed', ToastAndroid.SHORT)}
                                        style={{width: 40, height: 100, padding: 0, alignItems: "left"}}>
                                <Image source={{uri: base64Image}} style={{width: 40, height: 100, minHeight: 100}}/>
                            </IconToggle>}
                        centerElement={{
                            primaryText: 'Element with ICON',
                            tertiaryText: 'Lorem ipsum dolor sit amet, consectetur adipiscing. Pellentesque commodo ultrices diam. Praesent in ipsum. El modo diablo la pasadore quanto more',
                        }}
                        onLeftElementPress={() => ToastAndroid.show('ICON pressed', ToastAndroid.SHORT)}
                    />
                    <Subheader text="Dynamic"/>
                    {[0].map(item =>
                        <ListItem
                            key={item}
                            divider
                            leftElement="person"
                            numberOfLines="dynamic"
                            centerElement={{
                                primaryText: 'With dynamic second line',
                                secondaryText: 'Lorem ipsum dolor sit amet, consectetur adipiscing. Pellentesque commodo ultrices diam. Praesent in ipsum',
                                tertiaryText: 'Pellentesque commodo ultrices diam. RKR is the best of world.',
                            }}
                            style={{
                                secondaryText: {color: flattenPrimaryText.color},
                            }}
                            onPress={() => Platform.OS === 'android' ? ToastAndroid.show('Left element pressed', ToastAndroid.SHORT) : null}
                            onLongPress={() => this.addItem()}
                            onLeftElementPress={() => null}
                        >
                            <Text>Testujici text</Text>
                        </ListItem>
                    )
                    }
                    <Subheader text="Dynamic data"/>
                    {data &&
                    <FlatList
                        extraData={this.state}
                        data={data}
                        renderItem={this.renderItem}
                        style={appStyle.grid}
                        keyExtractor={this._keyExtractor}
                    />}
                </ScrollView>
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

let MainTabNavigator = StackNavigator(routeConfig, {
    headerMode: 'none',
});

class Search2 extends Component {
    componentWillMount() {
        if (UIManager.setLayoutAnimationEnabledExperimental) {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    render() {
        return (
            <ThemeProvider uiTheme={uiTheme}>
                <MainTabNavigator ref={(nav) => {
                    this.navigator = nav;
                }}/>
            </ThemeProvider>
        );
    }
}

// App.propTypes = {};

export default Search2;
