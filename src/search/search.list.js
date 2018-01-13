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
    ActivityIndicator,
    Dimensions,
    Linking,
    Picker,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native';
import {NativeRouter, Route, Link} from 'react-router-native';
import * as appStyle from './styles';
import SearchDao from './search.dao';
import UpnpClient from '../upnp/client';
import {PageSearchDetail} from './search.constants';
import {
    COLOR,
    Dialog,
    ThemeProvider,
    ListItem,
    Subheader,
    Toolbar,
    Button,
    Icon,
    IconToggle,
    ActionButton
} from 'react-native-material-ui';

class SearchList extends Component {

    searchUpnp;
    timerId;

    constructor(props, context) {
        super(props);
        this.state = {
            data: [],
            name: null,
            fetching: false,
            itemsCount: null,
            renderers: [],
            renderer: null
        };
    }

    componentDidMount = () => {
        console.log('mounted MOVIES');
        this.searchUpnp = new UpnpClient(this.updateRenderers);
        this.timerId = setInterval(() => {
            this.searchUpnp.search()
        }, 2000);
    };

    componentWillUnmount = () => {
        console.log('unmounting MOVIES');
        clearInterval(this.timerId);
        this.searchUpnp.stop();
    };

    updateRenderers = (headers, code, rinfo) => {
        // POZOR!!!!!!
        // jakosto asynch metoda je do pole pridan zrejme samsung 1x, ale Toaster zobrazen vicekrat,jelikozje to zkontrolovano drive
        //DORESIT!!!
        // odhlaseni telky + realtime update tech select-boxu => ALIVE status
        const renderers = this.state.renderers.slice();
        const exist = renderers.filter((item) => rinfo.address == item.address);

        // console.log('Got a response to an m-search:\n%d\n%s\n%s', code, JSON.stringify(headers, null, '  '), '----', JSON.stringify(rinfo, null, '  '))
        if (exist.length > 0) {
            return;
        }
        if (!headers.ST.contains('urn:schemas-upnp-org:device:MediaRenderer') && !headers.ST.contains('urn:schemas-upnp-org:service:AVTransport')) {
            return;
        }
        // ToastAndroid.show(`${headers.SERVER}`, ToastAndroid.SHORT);

        const xmlUrl = headers.LOCATION;
        console.log('HTTP fetching', xmlUrl);
        fetch(xmlUrl, {})
            .then(response => !response.ok ? null : response.text())
            .then(responseText => {
                var DOMParser = require('xmldom').DOMParser;
                parser = new DOMParser();
                responseXml = parser.parseFromString(responseText, "text/xml");
                const friendlyName = responseXml.getElementsByTagName("friendlyName")[0].childNodes[0].nodeValue;
                const manufacturer = responseXml.getElementsByTagName("manufacturer")[0].childNodes[0].nodeValue;
                const renderer = {...rinfo, ...headers};
                renderer.friendlyName = friendlyName;
                renderer.manufacturer = manufacturer;
                renderers.push(renderer);
                this.setState({renderers});
            })
            .catch(error => console.log(error));
        // urn:schemas-upnp-org:device:MediaRenderer
        // 12-31 18:09:55.547 19348-19379/? I/ReactNativeJS: 'Got a response to an m-search:\n%d\n%s\n%s', 200, '{\n  "CACHE-CONTROL": "max-age=1800",\n  "DATE": "Sun, 31 Dec 2017 17:09:54 GMT",\n  "EXT": "",\n  "LOCATION": "http://192.168.1.118:9197/dmr",\n  "SERVER": "Samsung-Linux/4.1, UPnP/1.0, Samsung_UPnP_SDK/1.0",\n  "ST": "urn:schemas-upnp-org:device:MediaRenderer:1",\n  "USN": "uuid:af7baa7e-0b30-4418-a24d-be08c90e7081::urn:schemas-upnp-org:device:MediaRenderer:1",\n  "CONTENT-LENGTH": "0",\n  "BOOTID.UPNP.ORG": "32"\n}',
        // '{\n  "address": "192.168.1.118",\n  "port": 51002,\n  "family": "IPv4",\n  "size": 374\n}'
        // 12-31 18:09:56.103 19348-19379/? I/ReactNativeJS: 'Got a response to an m-search:\n%d\n%s\n%s', 200, '{\n  "CACHE-CONTROL": "max-age=1800",\n  "DATE": "Thu, 01 Jan 1970 03:57:53 GMT",\n  "EXT": "",\n  "LOCATION": "http://192.168.1.100:37904/MediaRenderer1.xml",\n  "SERVER": "Linux/2.6.35 UPnP/1.0 DLNADOC/1.50 INTEL_NMPR/2.0 LGE_DLNA_SDK/1.5.0",\n  "ST": "urn:schemas-upnp-org:device:MediaRenderer:1",\n  "USN": "uuid:2393a424-1dd2-11b2-97a3-98b6da162a0a::urn:schemas-upnp-org:device:MediaRenderer:1"\n}',
        // '{\n  "address": "192.168.1.100",\n  "port": 1900,\n  "family": "IPv4",\n  "size": 368\n}'
    };

    fetchItems() {
        const {name} = this.state;

        console.log("evt", name);
        if (!name) {
            ToastAndroid.show("chybi zadani", ToastAndroid.SHORT);
            return;
        }
        // ToastAndroid.show(`vyhledam '${name}'`, ToastAndroid.SHORT);

        const searchDao = new SearchDao();

        //PREDELAT na PROMISE
        searchDao.fetchItems(name, movies => {
            console.log("fetched", movies.data.length);

            this.setState({fetching: false, itemsCount: movies.data.length});
            ToastAndroid.show(`nalezeno ${movies.data.length}`, ToastAndroid.SHORT);

            const data = [];
            movies.data.forEach(item => {
                data.push({
                    ...item,
                    id: Math.random(),
                    key: Math.random()
                });
            });
            this.setState({data});
        }, (error) => {
            console.log("error", error);
            this.setState({fetching: false});
            ToastAndroid.show(`chyba: ${error}`, ToastAndroid.SHORT);
        });
    }

    fetchItemsAsync = () => {
        setTimeout(() => {
            this.fetchItems();
        }, 200);
        this.setState({fetching: true});
    };

    clearItems() {
        this.setState({
            data: [],
            name: null,
            fetching: false,
            itemsCount: null
        });
        return true;
    }

    render() {
        const {fetching, data, itemsCount, renderers} = this.state;
        const {onMenu} = this.props;
        // Linking.openURL('https://www.linkedin.com/in/pablodarde');

        return (
            <View style={{flex: 1}}>
                <Toolbar
                    leftElement="menu"
                    onLeftElementPress={onMenu}
                    centerElement=""
                    searchable={{
                        autoFocus: true,
                        placeholder: 'napr. teor tres',
                        onChangeText: (name) => this.setState({name}),
                        onSubmitEditing: (evt) => {
                            this.fetchItemsAsync(evt);
                        },
                        onSearchClosed: () => this.clearItems()
                    }}
                />
                <View style={appStyle.progressBar}>
                    <ProgressBarAndroid styleAttr="Horizontal" progress={1} animating={fetching}/>
                </View>

                <Picker
                    enabled={renderers.length > 0}
                    prompt='Televize'
                    mode="dropdown"
                    style={appStyle.upnpDevices}
                    selectedValue={this.state.renderer}
                    onValueChange={(itemValue, itemIndex) => this.setState({renderer: itemValue})}>
                    {
                        renderers.map(item => <Picker.Item label={item.friendlyName} key={item.friendlyName}
                                                           value={item.friendlyName + '(' + item.manufacturer + '):' + item.address}/>)
                    }
                </Picker>

                {data &&
                <FlatList
                    extraData={this.state}
                    data={data}
                    renderItem={(obj) => this.renderItem(obj)}
                    style={appStyle.grid}
                    keyExtractor={(item, index) => item.id}
                ></FlatList>}
            </View>
        );
    }

    renderItem({item}) {
        const {navigation} = this.props;
        const {renderers} = this.state;

        return (
            <ListItem
                divider
                numberOfLines="dynamic"
                style={{
                    container: {height: 100},
                    contentViewContainer: {},
                    leftElementContainer: {
                        marginLeft: 5,
                        padding: 0,
                        width: 70,
                        height: 100
                    },
                    centerElementContainer: {},
                    rightElementContainer: {
                        height: 100,
                        justifyContent: 'center',
                        alignContent: 'center',
                        flexDirection: 'column'
                    },
                    rightElement: {}
                }}
                leftElement={(
                    (item.image &&
                        <IconToggle name="details"
                                    style={{border: 1}}
                        >
                            <Image source={{uri: item.image}} style={{width: 40, height: 100, minHeight: 100}}/>
                        </IconToggle>
                    )
                    ||
                    <IconToggle name="backup"
                                style={{width: 60, height: 120, left: 0, padding: 0, alignItems: "left"}}
                    />
                )}
                centerElement={{
                    primaryText: item.name,
                    secondaryText: item.size + ' ' + item.sizeUnit + 'B',
                    tertiaryText: item.fileName,
                }}
                rightElement={renderers.length > 0 ? 'play-circle-outline' : {}}

                onLeftElementPress={() => {
                    console.log('onLeftElementPress() ' + PageSearchDetail);
                    // navigation.navigate(PageSearchDetail, {item})
                }}
                onPress={() => {
                    console.log('onPress() ' + PageSearchDetail);
                    navigation.navigate(PageSearchDetail, {item});
                }}
                onRightElementPress={() => {
                    console.log('onRightElementPress() ' + PageSearchDetail);
                }}
            />
        );
    }
}

export default SearchList;
