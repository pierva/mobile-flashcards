import React, {Component} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux'
import Question from './Question'

class QuizView extends Component {
  state = {
    cardNumber: 0,
    currentCardId: undefined
  }

  updateCardNumber  = () => {
    const currentNumber = this.state.cardNumber
    this.setState(() => {
      return {
        cardNumber: currentNumber++
      }
    })
  }

  render() {
    const {deckName, deckId} = this.props.route.params
    const cards = this.props.decks[deckId].cards
    const { cardNumber } = this.state
    const card = cards[cardNumber]
    if(!card) {
      return (
        <Text>
          No cards available for this deck.
        </Text>
      )
    }
    return (
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <Text>
            Card {cardNumber+1} of {cards.length}
          </Text>
          <Text>
            {deckName}
          </Text>
        </View>
        <Question card={cards[cardNumber]}/>
      </View>
    )
  }
}

function mapStateToProps({decks}) {
  return {
    decks
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5
  }
})

export default connect(mapStateToProps)(QuizView)