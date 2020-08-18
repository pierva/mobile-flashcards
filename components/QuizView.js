import React, {Component} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux'
import Question from './Question'
import { blue } from '../utils/colors'

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
      <View style={styles.container}>
        <View style={styles.topRow}>
          <Text style={styles.topRowText}>
            Card {cardNumber+1} of {cards.length}
          </Text>
          <Text style={styles.topRowText}>
            {deckName}
          </Text>
        </View>
        <View style={{flex: 1}}>
          <Question card={cards[cardNumber]}/>
        </View>
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
    height: '100%'
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 5,
    height: 35
  },
  topRowText: {
    fontSize: 20,
    color: blue
  }
})

export default connect(mapStateToProps)(QuizView)