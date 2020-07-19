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
import Category from './src/pages/Category';
import CategoryItems from './src/pages/CategoryItems';
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
        else if (route.name === 'Category') {
          iconName = 'list-outline';
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: colors.red,
      inactiveTintColor: 'gray',
    }}
  >
    <Tab.Screen name='Home' component={Home} />
    <Tab.Screen name='Category' component={Category} />
  </Tab.Navigator>
}
function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator
        screenOptions={() => ({
          headerShown: false
        })}
      >
        <Stack.Screen name='Home' component={homeStack} />
        <Stack.Screen name='DetailItem' component={DetailItem} />
        <Stack.Screen name='Category' component={Category} />
        <Stack.Screen name='CategoryItems' component={CategoryItems} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

