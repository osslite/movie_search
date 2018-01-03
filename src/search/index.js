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
    NativeModules,
    DrawerLayoutAndroid,
    BackAndroid
} from 'react-native';
import {NativeRouter, Route, Link} from 'react-router-native';
import {
    StackNavigator,
    TabNavigator,
    DrawerNavigator,
    SafeAreaView
} from 'react-navigation';
import SearchNavigator from './search.navigator';
import {
    COLOR,
    ThemeProvider,
    ListItem,
    Subheader,
    Toolbar,
    Button,
    Icon,
    IconToggle,
    Drawer,
    Avatar
} from 'react-native-material-ui';
import {Icon as IconIon} from 'react-native-vector-icons/Ionicons';
import {Provider as PaperProvider} from 'react-native-paper';

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

class MyDrawer extends Component {
    render() {
        return (
            <Drawer>
                <Drawer.Header>
                    <Drawer.Header.Account
                        avatar={<Avatar text="A"/>}
                        accounts={[
                            {avatar: <Avatar key="1" text="B"/>},
                            {avatar: <Avatar key="2" text="C"/>},
                        ]}
                        footer={{
                            dense: true,
                            centerElement: {
                                primaryText: 'Reservio',
                                secondaryText: 'business@email.com',
                            },
                            rightElement: 'arrow-drop-down',
                        }}
                    />
                </Drawer.Header>
                <Drawer.Section
                    divider
                    items={[
                        {icon: 'bookmark-border', value: 'Notifications'},
                        {icon: 'today', value: 'Calendar', active: true},
                        {icon: 'people', value: 'Clients'},
                    ]}
                />
                <Drawer.Section
                    title="Personal"
                    items={[
                        {icon: 'info', value: 'Info'},
                        {icon: 'settings', value: 'Settings'},
                    ]}
                />
            </Drawer>
        );
    }
}

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerClosed: true,
        };
    }

    componentWillMount() {
        if (UIManager.setLayoutAnimationEnabledExperimental) {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
        BackAndroid.addEventListener('hardwareBackPress', this.handlesBackButton);
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress', this.handlesBackButton);
    }

    setDrawerState = (isOpen) => {
        this.setState({
            drawerClosed: !isOpen
        });
    };

    showDrawer = (show) => {
        if (show) {
            this.DRAWER.openDrawer();
        } else {
            this.DRAWER.closeDrawer();
        }
    };

    handlesBackButton() {
        if (this._navigator && this._navigator.getCurrentRoutes().length > 1) {
            try {
                this._navigator.pop();
                const _routes = this.state.routes.slice();
                _routes.pop();
                this.setState({
                    routes: _routes
                });
            } catch (e) {
            }
            return true;
        }
        return false;
    }

    render() {
        return (
            <PaperProvider>

                <ThemeProvider uiTheme={uiTheme}>
                    <DrawerLayoutAndroid
                        drawerWidth={300}
                        ref={(drawerElement) => {
                            this.DRAWER = drawerElement;
                        }}
                        drawerPosition={DrawerLayoutAndroid.positions.left}
                        onDrawerOpen={() => this.setDrawerState(true)}
                        onDrawerClose={() => this.setDrawerState(false)}
                        renderNavigationView={() => <MyDrawer/>}
                    >
                        <SearchNavigator ref={nav => this.navigator = nav}/>
                    </DrawerLayoutAndroid>
                </ThemeProvider>
            </PaperProvider>
        );
    }
}

// Search.propTypes = {};

export default Search;
