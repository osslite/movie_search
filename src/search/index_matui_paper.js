// https://github.com/callstack/react-native-paper
// https://callstack.github.io/react-native-paper/fab.html
// https://github.com/oblador/react-native-vector-icons

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
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
    BackAndroid,
    BackHandler
} from 'react-native';
import {NativeRouter, Route, Link} from 'react-router-native';
import {
    StackNavigator,
    TabNavigator,
    DrawerNavigator,
    SafeAreaView
} from 'react-navigation';
import {Icon as IconIon} from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
    Provider as PaperProvider,
    DefaultTheme,
    DarkTheme,
    Button,
    GridView,
    Card,
    Text,
    Paper,
    Headline,
    ProgressBar,
    SearchBar,
    TouchableRipple,
    TouchableIcon,
    Title,
    Paragraph,
    Toolbar,
    Modal,
    Dialog,
    Checkbox,
    DrawerSection,
    DrawerItem,
    Caption,
    Divider,
    FAB,
    RadioButton,
    Switch
} from 'react-native-paper';
import color from 'color';
import uuid from 'uuid';

const UIManager = NativeModules.UIManager;
const theme = {
    ...DefaultTheme,
    // roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        // primary: 'tomato',
        // primaryDark: color('tomato').darken(0.2).rgb().string(),
        // accent: 'yellow',
        // primary: '#3498db',
        // accent: '#f1c40f',
    },
};

class Search extends Component {
    constructor(props, context) {
        super(props);
        this.state = {
            progress: 0.0,
            visible: false,
            firstQuery: null,
            drawerClosed: true,
            items: [{id: uuid.v4()}, {id: uuid.v4()}, {id: uuid.v4()}, {id: uuid.v4()}, {id: uuid.v4()},
                {id: uuid.v4()}, {id: uuid.v4()}, {id: uuid.v4()}, {id: uuid.v4()}, {id: uuid.v4()},
            ],
        };
    }

    componentWillMount() {
        if (UIManager.setLayoutAnimationEnabledExperimental) {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
        BackHandler.addEventListener('hardwareBackPress', this.handlesBackButton);
    }

    componentDidMount() {
        setInterval(() => {
            console.log('progress', this.state.progress);
            this.setState({progress: (this.state.progress + 0.02)})
        }, 1000);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handlesBackButton);
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
        const {items, progress, firstQuery, visible} = this.state;

        return (
            <PaperProvider theme={DarkTheme}>
                <View>
                    <DrawerSection>
                        <DrawerItem
                            label="First Item"
                            active={true}
                            onPress={() => {
                            }}
                        />
                    </DrawerSection>
                    {/*<Modal visible={false}>*/}
                    {/*<Text>Example Modal</Text>*/}
                    {/*</Modal>*/}

                    {/*<Toolbar>*/}
                    {/*<Toolbar.BackAction*/}
                    {/*onPress={()=>{}}*/}
                    {/*/>*/}
                    {/*<Toolbar.Content*/}
                    {/*title="Title"*/}
                    {/*subtitle="Subtitle"*/}
                    {/*/>*/}
                    {/*<Toolbar.Action icon="search" onPress={()=>{}}/>*/}
                    {/*<Toolbar.Action icon="more-vert" onPress={()=>{}}/>*/}
                    {/*</Toolbar>*/}
                    <Divider/>
                    <Caption>Caption</Caption>

                    <SearchBar
                        placeholder="napr. teor tresk"
                        onChangeText={query => {
                            this.setState({firstQuery: query});
                        }}
                        value={firstQuery}
                        onIconPress={() => {
                        }}
                        onSubmitEditing={()=>{console.log('SUBMITING --------------')}}
                    />
                    <ProgressBar progress={progress} color={'red'}/>
                    <Headline>Headline</Headline>

                    <Button raised onPress={() => this.setState({visible: true})}>
                        Zavri
                    </Button>
                    <Checkbox
                        checked={true}
                    />
                    <RadioButton
                        value="firstOption"
                        checked={true}
                    />

                    <FAB
                        small
                        icon="add"
                        onPress={() => {
                        }}
                    />
                    <Switch
                        value={true}
                        onValueChange={() => {
                        }}
                    />

                    <GridView
                        spacing={40}
                        getNumberOfColumns={width => 1}
                        data={items}
                        keyExtractor={item => item.id}
                        renderItem={this._renderItem}
                        onEndReached={() => {
                        }}
                    />
                </View>
            </PaperProvider>
        );
    }

    _renderItem = item => {
        return (
            <TouchableRipple
                onPress={() => {
                }}
                borderless
                rippleColor="rgba(0, 0, 0, .32)"
            >
                <View>
                    <Card>
                        <Title>Card title</Title>
                        <Paragraph>{item.id}</Paragraph>
                    </Card>
                </View>
            </TouchableRipple>
        );
    };
}

// Search.propTypes = {};
const styles = StyleSheet.create({
    paper: {
        // padding: 8,
        // height: 80,
        // width: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Search;
