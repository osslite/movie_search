import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    // Text,
    Button,
    View,
    ListView,
    ScrollView,
    Image,
    ToastAndroid
} from 'react-native';
import {NativeRouter, Route, Link} from 'react-router-native'
import {
    StackNavigator,
    TabNavigator,
    DrawerNavigator
} from 'react-navigation';
import {
    Content,
    Text,
    List,
    ListItem,
    Icon,
    Container,
    Left,
    Right,
    Badge,
    Thumbnail,
    Header,
    Footer
} from "native-base";
import * as appStyle from '../search/styles';

const datas = [
    {
        name: "Lorem ipsum dolor sit amet, consectetur adipiscing. Pellentesque commodo ultrices diam. Praesent in ipsum. El modo diablo la pasadore quanto more",
        route: "Anatomy",
        icon: "phone-portrait",
        bg: "#C5F442"
    }, {
        name: "Lorem ipsum dolor sit amet, consectetur adipiscing. Pellentesque commodo ultrices diam. Praesent in ipsum. El modo diablo la pasadore quanto more",
        route: "Actionsheet",
        icon: "easel",
        bg: "#C5F442"
    },
    {
        name: "Lorem ipsum dolor sit amet, consectetur adipiscing. Pellentesque commodo ultrices diam. Praesent in ipsum. El modo diablo la pasadore quanto more",
        route: "NHThumbnail",
        icon: "image",
        bg: "#cc0000",
        types: "2"
    },
    {
        name: "Lorem ipsum dolor sit amet, consectetur adipiscing. Pellentesque commodo ultrices diam. Praesent in ipsum. El modo diablo la pasadore quanto more",
        route: "Toast",
        icon: "albums",
        bg: "#C5F442"
    }
];
datas.push(datas[3]);
datas.push(datas[3]);

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {data: datas};
    }

    render() {
        const {data} = this.state;
        return (
            <Container>
                <Header/>

                <Content
                    bounces={false}
                    style={{flex: 1, backgroundColor: "#fff", top: -1}}
                >
                    <List
                        dataArray={data}
                        renderRow={data =>
                            <ListItem
                                button
                                noBorder
                                onPress={() => {
                                    datas.push(datas[3]);
                                    this.setState({data: datas});
                                    ToastAndroid.show(`ICON ${data.name}`, ToastAndroid.SHORT)
                                }}
                            >
                                <Left>
                                    <Thumbnail square large
                                               source={{uri: 'https://i.chzbgr.com/full/7345954048/h7E2C65F9'}}/>

                                    <Text style={appStyle.text}>
                                        {data.name}
                                    </Text>
                                </Left>
                                {data.types &&
                                <Right style={{flex: 1}}>
                                    <Text
                                        style={appStyle.badgeText}
                                    >1</Text>

                                </Right>}
                            </ListItem>}
                    />
                </Content>
            </Container>
        );
    }
}

let BasicApp2 = () => (
    <Search/>
);

export default BasicApp2;
