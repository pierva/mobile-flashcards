import React from 'react';
import { View, StatusBar } from 'react-native'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from './reducers'
import middleware from './middleware'
import Constants from 'expo-constants'

import { grey } from './utils/colors'

import Home from './components/Home'

const store = createStore(reducers, middleware)

function CustomStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <CustomStatusBar backgroundColor={grey} barStyle='light-content' /> 
      <Home />
    </Provider>
  );
}
