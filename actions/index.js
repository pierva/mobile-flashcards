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

export function addCard (card) {
  return {
    type: ADD_CARD,
    card
  }
}

export function removeDeck (title) {
  return {
    type: REMOVE_DECK,
    title
  }
}

export function removeCard (id) {
  return {
    type: REMOVE_CARD,
    id
  }
}