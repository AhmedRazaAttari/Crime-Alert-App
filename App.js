import React from 'react';
import { StyleSheet, Text, View, YellowBox } from 'react-native';
import _ from 'lodash';

import * as TaskManager from 'expo-task-manager';
import Navigate from './src/navigations'
import { Login } from './src/screens';
import { CrimeInfoScreen } from './src/screens'
import { createStackNavigator } from 'react-navigation-stack';

import {
  createAppContainer,
} from 'react-navigation';

YellowBox.ignoreWarnings(['Setting a timer']);
YellowBox.ignoreWarnings(['Require cycle:']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

const MainStackNavigator = createStackNavigator(
  {
    Login,
    // HomePage: Home,
    CrimeInfo: CrimeInfoScreen,
    Drawer: { 
      screen : Navigate,
      navigationOptions : {
        header : null
      }
    },
  },{
    
  }
)

const NavigationApp = createAppContainer(MainStackNavigator);

export default NavigationApp

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


