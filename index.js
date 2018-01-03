import {AppRegistry, DrawerLayoutAndroid} from 'react-native';
import BasicApp from './src/test';
import Search from './src/search';
import {Component} from "react";
import {
    Provider as PaperProvider,
    DefaultTheme
} from 'react-native-paper';
import SearchNavigator from './src/search/search.navigator';

global.Buffer = global.Buffer || require('buffer').Buffer;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: true,
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
            drawerOpen: isOpen
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
                        <SearchNavigator ref={nav => this._navigator = nav}/>
                    </DrawerLayoutAndroid>
                </ThemeProvider>
            </PaperProvider>
        );
    }
}

// Search.propTypes = {};

export default Search;

AppRegistry.registerComponent('MovieSearch', () => Search);
