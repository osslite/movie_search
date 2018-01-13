// https://reactnavigation.org/docs/navigators/

import {
    StackNavigator,
    TabNavigator,
    DrawerNavigator,
    SafeAreaView
} from 'react-navigation';
import SearchDetail from './search.detail';
import SearchList from './search.list';
import {PageSearch, PageSearchDetail} from './search.constants';
import {BackHandler} from "react-native";

const mapNavigationStateParamsToProps = (SomeComponent, msg) => {
    return class extends SomeComponent {
        componentDidMount = () => {
            BackHandler.addEventListener(BackHandler.DEVICE_BACK_EVENT, this.handlesBackButton);
        };

        componentWillUnmount = () => {
            BackHandler.removeEventListener(BackHandler.DEVICE_BACK_EVENT, this.handlesBackButton);
        };

        handlesBackButton = () => {
            console.log('backhandler uvnitr INVOKED', this.props.navigation, this.state && this.state.routes);
            this.props.navigation.goBack();
            if (msg === PageSearch) {
                return false;
            }
            return true;
        };

        // everything else, call as SomeComponent
        render() {
            console.log('navigace render:', msg, this.props);
            return <SomeComponent {...this.props} {...this.props.screenProps}/>
        }
    }
};

const routeConfig = {};
routeConfig[PageSearch] = {
    screen: mapNavigationStateParamsToProps(SearchList, PageSearch),
    navigationOptions: (props) => ({
        headerTitle: 'Hledani',
        drawerLabel: 'Hledani',
        tabBarLabel: 'Hledani'
    })
};
routeConfig[PageSearchDetail] = {
    screen: mapNavigationStateParamsToProps(SearchDetail, PageSearchDetail),
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
