import {
  ADD_DECK,
  ADD_CARD,
  RECEIVE_DECKS,
  REMOVE_DECK,
  REMOVE_CARD
} from './actionTypes'

export function receiveDecks (decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  }
}

export function addDeck (deck) {
  return {
    type: ADD_DECK,
    deck
  }
}

export function addCard (deck, card) {
  return {
    type: ADD_CARD,
    deck,
    card
  }
}

export function removeDeck (deck) {
  return {
    type: REMOVE_DECK,
    deck
  }
}

export function removeCard (deck, id) {
  return {
    type: REMOVE_CARD,
    deck,
    id
  }
}