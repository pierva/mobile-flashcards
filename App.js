import 'react-native-gesture-handler';
import React from 'react';
import { View, StatusBar } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from './reducers'
import middleware from './middleware'
import Constants from 'expo-constants'
import { Ionicons } from '@expo/vector-icons'
import { grey, blue, white, lightBlue } from './utils/colors'

import Home from './components/Home'
import AddDeck from './components/AddDeck'

const store = createStore(reducers, middleware)

function CustomStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

const tabBarOptions = {
  activeTintColor: Platform.OS === 'ios' ? blue : white,
  inactiveTingColor: lightBlue,
  style: {
    height: 80,
    backgroundColor: Platform.OS === 'ios' ? white : blue,
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 6,
    shadowOpacity: 1
  }
}

const stackNavOptions = {
  headerTintColor: white,
  headerStyle: {
    backgroundColor: blue,
  }
} 

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        itabBarIcon: ({ focused, color }) => {
          if (route.name === 'Home') {
            return <Ionicons name='ios-home-outline' size={30} color={color} />
          } else if (route.name === 'Add Deck') {
            return <Ionicons name='ios-add' size={30} color={color} />
          }
        }
      })}
      tabBarOptions={tabBarOptions}
    >
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false}} />
      <Tab.Screen name="Add Deck" component={AddDeck} options={{ headerShown: false}} />
    </Tab.Navigator>
    
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <CustomStatusBar backgroundColor={grey} barStyle='light-content' /> 
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Tabs} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}
