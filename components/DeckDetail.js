import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { white, lightBlue, danger, lightGreen, blue } from '../utils/colors'

import TextButton from './TextButton'

class DeckDetail extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
        <Text style={styles.header}>
          {this.props.cards}
          {this.props.cards === 1 ? ' Card' : ' Cards'}
        </Text>
        </View>
        <View style={styles.subContainer}>
          <TouchableOpacity 
            style={[styles.button, {backgroundColor: lightGreen}]} 
            onPress={console.log('pressed')}>
            <Text style={styles.buttonText}>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, {backgroundColor: blue}]} 
            onPress={console.log('pressed')}>
            <Text style={styles.buttonText}>Start Quiz</Text>
          </TouchableOpacity>
          <TextButton style={{color: danger, padding: 5}}>
            Delete DeckDetail
          </TextButton>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
    alignItems: 'center',
    justifyContent: "space-around"
  },
  header: {
    fontSize: 24,
    color: lightBlue,
    marginTop: 30
  },
  subContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
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
  }
})

function mapStateToProps(state, {route}) {
  const { deckId, deckName, cards } = route.params
  return {
    deckId,
    deck: state.decks[deckId],
    deckName,
    cards
  }
}

function mapDispatchToProps(dispatch, { route, navigation }) {
  //Need to insert remove and goBack methods 
  return {

  }
}

export default connect(mapStateToProps)(DeckDetail)