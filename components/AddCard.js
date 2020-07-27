import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux'
import { white, lightBlue, blue, grey } from '../utils/colors'
import { Button, Input } from 'react-native-elements'


class AddCard extends Component {
  render() {
    const {deckId, cards, deckName } = this.props.route.params;
    return (
      <KeyboardAwareScrollView 
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
        <View style={styles.subContainer}>
        <Text style={styles.header}>
          {deckName} / Card #{cards+1}
        </Text>
        </View>
        <View style={styles.subContainer}>
          <Input
            inputStyle={styles.input}
            containerStyle={styles.inputContainer}
            placeholder='Question'
            errorStyle={{ color: 'red' }}
            // errorMessage='Question is required'    
          />

          <Input
            inputStyle={styles.input}
            containerStyle={styles.inputContainer}
            placeholder='Answer'
            errorStyle={{ color: 'red' }}
            // errorMessage='Answer is required'
          />
          <TouchableOpacity 
            style={[styles.button, {backgroundColor: blue}]} 
            onPress={console.log('pressed')}>
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

function mapStateToProps(state, {route}) {
}

function mapDispatchToProps(dispatch, { route, navigation }) {
  //Need to insert remove and goBack methods 
  return {

  }
}

export default connect()(AddCard)