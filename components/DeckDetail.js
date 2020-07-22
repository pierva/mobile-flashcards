import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'

class DeckDetail extends Component {
  render() {
    return (
      <View>
        <Text>This is the deck detail</Text>
        <Text>{this.props.cards}</Text>
      </View>
    )
  }
}

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