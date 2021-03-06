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
import DeckDetail from './components/DeckDetail'
import AddCard from './components/AddCard'
import QuizView from './components/QuizView'

import { setLocalNotification } from './utils/helpers'

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
  activeTintColor: Platform.OS === 'ios' ? white : grey,
  inactiveTingColor: lightBlue,
  style: {
    height: 80,
    backgroundColor: Platform.OS === 'ios' ? grey : white,
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
        tabBarIcon: ({ focused, color }) => {
          if (route.name === 'Home') {
            return <Ionicons name='ios-home' size={30} color={color} />
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

export default class App extends React.Component {

  componentDidMount() {
    setLocalNotification()
  }

  render() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <CustomStatusBar backgroundColor={grey} barStyle='light-content' /> 
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Tabs} 
          />
          <Stack.Screen name="DeckDetail" component={DeckDetail}
            options={({ route }) => ({
              title: '',
              ...stackNavOptions
            })
          } />
          <Stack.Screen name="AddCard" component={AddCard}
            options={() => ({
              title: 'Add Card',
              ...stackNavOptions
            })
          } />
          <Stack.Screen name="QuizView" component={QuizView}
            options={() => ({
              title: 'Quiz',
              ...stackNavOptions
            })
          } />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  )}
}
