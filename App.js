import React from 'react';
import { StyleSheet, Text, View } from 'react-native'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from './reducers'

const store = createStore(reducers)

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Text>Great this is the main screen</Text>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
