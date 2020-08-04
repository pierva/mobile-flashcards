import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Input } from 'react-native-elements'
import { saveDeck } from '../utils/api' 
import { addDeck } from '../actions'

import { white, lightBlue, blue, grey } from '../utils/colors'
import { connect } from 'react-redux'


class AddDeck extends Component {
  state = {
    deckTitle: undefined
  }

  onChange = (deckTitle) => {
    this.setState(() => ({
      deckTitle
    }))
  }

  onSubmit = async () => {
    const { deckTitle } = this.state
    
    // Update DB and get ID
    const id = await saveDeck(deckTitle)

    // Update Redux
    this.props.dispatch(addDeck({
      id,
      title: deckTitle
    }))

    // Route to home
    this.props.navigation.goBack()
  }

  render() {
    return (
      <KeyboardAwareScrollView 
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
        <View style={styles.subContainer}>
          <Text style={styles.header}>
            Add Deck
          </Text>
        </View>
        <View style={styles.subContainer}>
          <Input
            inputStyle={styles.input}
            containerStyle={styles.inputContainer}
            placeholder='Deck Name'
            errorStyle={{ color: 'red' }}
            onChangeText={text => this.onChange(text)}    
          />
          <TouchableOpacity 
            style={[styles.button, {backgroundColor: blue}]} 
            onPress={() => this.onSubmit()}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: white,
    justifyContent: "center",
    height: '100%'
  },
  header: {
    fontSize: 24,
    color: lightBlue,
    marginTop: 30
  },
  subContainer: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center'
    
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5,
    margin: 5,
    width: 200
  },
  buttonText: {
    width: '100%',
    textAlign: "center",
    color: white
  },
  inputContainer: {
    marginBottom: 20
  },
  input: {
    color: grey,
    marginHorizontal: 5,
  } 
})

export default connect()(AddDeck)
