// https://reactnavigation.org/docs/navigators/

import React, {Component} from 'react';
import {
    StackNavigator,
    TabNavigator,
    DrawerNavigator,
    SafeAreaView
} from 'react-navigation';
import SearchDetail from './search.detail';
import SearchList from './search.list';
import {PageSearch, PageSearchDetail} from './search.constants';

const mapNavigationStateParamsToProps = (SomeComponent) => {
    return class extends SomeComponent {
        // everything else, call as SomeComponent
        render() {
            const {navigation} = this.props;
            console.log("navigation=",navigation);
            const {state: {params}} = navigation;
            return <SomeComponent {...this.props} {...params} />
        }
    }
};

const routeConfig = {};
routeConfig[PageSearch] = {
    screen: SearchList,
    navigationOptions: (props) => ({
        headerTitle: 'Hledani',
        drawerLabel: 'Hledani',
        tabBarLabel: 'Hledani'
    })
};
routeConfig[PageSearchDetail] = {
    screen: SearchDetail,
    navigationOptions: (props) => ({
        headerTitle: 'Popis',
        drawerLabel: 'Popis',
        tabBarLabel: 'Popis'
    })
};

const SearchNavigator = StackNavigator(routeConfig, {
    headerMode: 'none',
});

export default SearchNavigator;
