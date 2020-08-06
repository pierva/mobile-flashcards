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

/**
 * 
 * @param {object} deck
 * @param {string} deck.id 
 * @param {string} deck.title 
 */
export function addDeck (deck) {
  return {
    type: ADD_DECK,
    deck
  }
}

/**
 * 
 * @param {string} deckId 
 * @param {object} card
 * @param {string} card.question 
 * @param {string} card.answer 
 */
export function addCard (deckId, card) {
  return {
    type: ADD_CARD,
    deckId,
    card
  }
}

export function removeDeckAction (deckId) {
  return {
    type: REMOVE_DECK,
    deckId
  }
}

/**
 * 
 * @param {string} deckId 
 * @param {string} id card id
 */
export function removeCard (deckId, id) {
  return {
    type: REMOVE_CARD,
    deckId,
    id
  }
}