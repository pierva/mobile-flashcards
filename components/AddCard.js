import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux'
import { white, lightBlue, blue, grey } from '../utils/colors'
import { Input } from 'react-native-elements'
import { addCardToDeck } from '../utils/api' 
import { addCard } from '../actions'


class AddCard extends Component {
  state = {
    question: undefined,
    answer: undefined
  }

  /**
   * 
   * @param {string} key either 'question' or 'answer'
   * @param {string} value 
   */
  onChange = (key, value) => {
    this.setState(() => ({
      [key]: value
    }))
  }

  onSubmit = (deckId) => {
    const card = this.state
    
    // Update Redux
    this.props.dispatch(addCard(deckId, card))
    
    // Route to home
    this.props.navigation.goBack()

    // Update DB
    addCardToDeck(deckId, card)
  }

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
            onChangeText={text => this.onChange('question', text)}    
          />

          <Input
            inputStyle={styles.input}
            containerStyle={styles.inputContainer}
            placeholder='Answer'
            errorStyle={{ color: 'red' }}
            onChangeText={text => this.onChange('answer', text)}
          />
          <TouchableOpacity 
            style={[styles.button, {backgroundColor: blue}]} 
            onPress={() => this.onSubmit(deckId)}>
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