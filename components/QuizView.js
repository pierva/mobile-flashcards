import React, {Component} from 'react'
import { View, Text, StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import Question from './Question'
import QuizResult from './QuizResult'
import { blue } from '../utils/colors'

class QuizView extends Component {
  state = {
    cardNumber: 0,
    currentCardId: undefined,
    correctAnswers: 0,
    endGame: false,
    totCards: this.props.decks[this.props.route.params.deckId].cards.length
  }

  updateCardNumber  = () => {
    const {totCards, cardNumber } = this.state 
    console.log('UPDATING THE CARD NUMBER');
    if(totCards === cardNumber+1){
      return this.setState(() => {
        return {
          endGame: true
        }
      })
    } 
    this.setState((state) => {
      return {
        cardNumber: state.cardNumber + 1
      }
    })
  }

  /**
   * 
   * @param {boolean} correct 
   */
  submitAnswer = (correct) => {
    if (correct) {
      this.setState((state) => ({
        correctAnswers: state.correctAnswers + 1
      }))
    }
    return this.updateCardNumber()
  }

  render() {
    const {deckName, deckId} = this.props.route.params
    const cards = this.props.decks[deckId].cards
    const { cardNumber, endGame, correctAnswers, totCards } = this.state
    const card = cards[cardNumber]
    if(!card) {
      return (
        <View style={styles.container}>
          <Text style={styles.warningText}>
            No cards available for this deck.
          </Text>
        </View>
      )
    }
    if(endGame) return <QuizResult 
      correctAnswers={correctAnswers}
      totCards={totCards}
      />
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
          <Question card={cards[cardNumber]} submitAnswer={this.submitAnswer}/>
        </View>
      </View>
    )
  }
}

function mapStateToProps({decks}) {
  return {
    decks,
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    justifyContent: 'center'
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
  },
  warningText: {
    textAlign: 'center',
  }
})

export default connect(mapStateToProps)(QuizView)