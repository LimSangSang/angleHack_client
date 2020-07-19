/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
// import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './src/pages/Home';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DetailItem from './src/pages/DetailItem';
import { colors } from './src/libraries/colors';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();



function homeStack() {
  return <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused
            ? 'home'
            : 'home-outline';
        }
        // else if (route.name === 'Settings') {
        //   iconName = focused ? 'ios-list-box' : 'ios-list';
        // }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: colors.red,
      inactiveTintColor: 'gray',
    }}
  >
    <Tab.Screen name="Home" component={Home} />
  </Tab.Navigator>
}
function App() {
  return (

    <NavigationContainer>
      {/* <Tab.Navigator
        navigationOptions={({ route }) => {
          let { routeName } = navigation.state.routes[navigation.state.index];
          let navigationOptions = {};

          if (route.name !== 'Home') {
            navigationOptions.tabBarVisible = false;
          }

          return navigationOptions;
        }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'home'
                : 'home-outline';
            }
            // else if (route.name === 'Settings') {
            //   iconName = focused ? 'ios-list-box' : 'ios-list';
            // }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: colors.red,
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={homeStack}/>
      </Tab.Navigator> */}
      <Stack.Navigator
        screenOptions={() => ({
          headerShown: false
        })}
      >
        <Stack.Screen name="Home" component={homeStack} />
        <Stack.Screen name="DetailItem" component={DetailItem} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

