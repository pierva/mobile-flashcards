import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { white, lightBlue, danger, lightGreen, blue } from '../utils/colors'

import { removeDeck } from '../utils/api'
import { removeDeckAction } from '../actions'


import TextButton from './TextButton'

class DeckDetail extends Component {

  deleteDeck = (deckId) => {
    
    // Update Redux
    this.props.dispatch(removeDeckAction(deckId))

    // Update DB
    removeDeck(deckId)

    // Route back home
    this.props.navigation.goBack()
  }

  render() {
    const { cards, deckId, deckName } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Text style={styles.header}>
            {cards}
            {cards === 1 ? ' Card' : ' Cards'}
          </Text>
        </View>
        <View style={styles.subContainer}>
          <TouchableOpacity 
            style={[styles.button, {backgroundColor: lightGreen}]} 
            onPress={() => this.props.navigation.navigate(
              'AddCard',
              {
                cards,
                deckId,
                deckName
              } 
            )}
            >
            <Text style={styles.buttonText}>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, {backgroundColor: blue}]} 
            onPress={() => this.props.navigation.navigate(
              'QuizView',
              {
                deckId,
                deckName
              } 
            )}
            >
            <Text style={styles.buttonText}>Start Quiz</Text>
          </TouchableOpacity>
          <TextButton style={{color: danger, padding: 10}}
            onPress={() => this.deleteDeck(deckId)}
          >
            Delete Deck {deckName}
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
  const { deckId, deckName } = route.params
  return {
    deckId,
    deck: state.decks[deckId],
    deckName,
    cards: state.decks[deckId].cards.length
  }
}

export default connect(mapStateToProps)(DeckDetail)