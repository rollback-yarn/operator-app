import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import CreelSidesList from '../screens/CreelSidesList';
import FindCreels from '../screens/FindCreels';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const CreelSideListStack = createStackNavigator(
  {
    CreelSidesList: CreelSidesList,
  },
  config
);

CreelSideListStack.navigationOptions = {
  tabBarLabel: 'List',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-list${focused ? '' : ''}`
          : 'md-list'
      }
    />
  ),
};

CreelSideListStack.path = '';

const FindCreelsStack = createStackNavigator(
  {
    FindCreels: FindCreels,
  },
  config
);

FindCreelsStack.navigationOptions = {
  tabBarLabel: 'Find',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-radio' : 'md-radio'} />
  ),
};

FindCreelsStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  CreelSideListStack,
  FindCreelsStack,
  SettingsStack,
});

tabNavigator.path = '';

export default tabNavigator;
