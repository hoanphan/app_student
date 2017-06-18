/**
 * Created by HOANDHTB on 6/16/2017.
 */
import React, {Component} from 'react';
import {StackNavigator} from 'react-navigation'
import {View, Text, TouchableOpacity} from 'react-native';
import Home from './components/Home';
import Update from './components/Update';
import Create from './components/Create';
import Scores from './components/Scores';
import {connect} from 'react-redux';
import {fetchData} from './common/action'
class App extends Component {

    // render()
    // {
    //     return (
    //         this.getNavigation()
    //     )
    // }

    render() {
        return (
            this.getNavigation()
        );
    }

    getNavigation() {
        const MainScreenNavigator = StackNavigator({

                Home: {
                    screen: Home,
                },
                Update: {
                    screen: Update
                },
                Create: {
                    screen: Create
                },
                Scores: {
                    screen: Scores
                },
            },
        );

        return (
            <MainScreenNavigator/>)
    }
}

function mapStateToProps(state) {

    return {
        app: state.appReducer,
    };
}
export default connect(mapStateToProps, {fetchData})(App);


