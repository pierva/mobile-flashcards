import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { white, grey, lightBlue } from '../utils/colors'

export default function Deck ({item, navigation}) {
    return (
      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate(
        'DeckDetail',
        { deckId: item.id, deckName: item.deck, cards: item.cards}
      )}>
        <Text style={styles.primaryText}>{item.deck}</Text>
        <Text style={styles.secondaryText}>{item.cards} 
          {item.cards === 1 ? ' CARD' : ' CARDS'}
        </Text>
      </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  item: {
    padding: 30,
    borderRadius: Platform.OS === 'ios' ? 10 : 2,
    backgroundColor: white,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
  },
  primaryText: {
    textTransform: 'capitalize',
    color: grey,
    fontSize: 20
  },
  secondaryText: {
    fontStyle: 'italic',
    color: lightBlue
  }
})