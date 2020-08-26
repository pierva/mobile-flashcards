import React, {Component} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { connect } from 'react-redux'
import Question from './Question'
import QuizResult from './QuizResult'
import { blue, white, grey } from '../utils/colors'
import { Ionicons } from '@expo/vector-icons'

class QuizView extends Component {
  state = {
    cardNumber: 0,
    correctAnswers: 0,
    endGame: false,
    totCards: this.props.decks[this.props.route.params.deckId].cards.length
  }

  updateCardNumber  = () => {
    const {totCards, cardNumber } = this.state 
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

  backToHome = () => {
    return this.props.navigation.popToTop('Home')
  }

  restartGame = () => {
    this.setState(() => ({
      cardNumber: 0,
      endGame: false,
      correctAnswers: 0
    }))
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
    if(endGame) return (
    <View style={{flex: 1}}>
      <QuizResult 
      correctAnswers={correctAnswers}
      totCards={totCards}
      />
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => this.backToHome()} style={styles.navBarText}>
          <Ionicons name='ios-home' size={30} 
            color={Platform.OS === 'ios' ? white : grey} />
          <Text style={styles.navBarText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.restartGame()} style={styles.navBarText}>
          <Ionicons name='ios-play' size={30} 
            color={Platform.OS === 'ios' ? white : grey} />
            <Text style={styles.navBarText}>Start Over</Text>
        </TouchableOpacity>
      </View>
    </View>
)
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
  },
  navBar: {
    height: 80,
    backgroundColor: Platform.OS === 'ios' ? grey : white,
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 6,
    shadowOpacity: 1,
    fontSize: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navBarText: {
    color: Platform.OS === 'ios' ? white : grey,
    textAlign: 'center',
    alignItems: 'center',
    fontSize: 10
  }
})

export default connect(mapStateToProps)(QuizView)