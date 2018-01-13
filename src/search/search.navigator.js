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
            console.log('navigace render:',this.props);
            return <SomeComponent {...this.props} {...this.props.screenProps}/>
        }
    }
};

const routeConfig = {};
routeConfig[PageSearch] = {
    screen: mapNavigationStateParamsToProps(SearchList),
    navigationOptions: (props) => ({
        headerTitle: 'Hledani',
        drawerLabel: 'Hledani',
        tabBarLabel: 'Hledani'
    })
};
routeConfig[PageSearchDetail] = {
    screen: mapNavigationStateParamsToProps(SearchDetail),
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
