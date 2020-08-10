import {
  ADD_DECK,
  RECEIVE_DECKS,
  REMOVE_DECK,
  ADD_CARD,
  REMOVE_CARD
} from '../actions/actionTypes'

export default function decks (state = {}, action) {  
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state.decks,
        ...action.decks
      }
    case ADD_DECK:
      return {
        ...state,
        [action.deck.id]: {
          ...action.deck,
          cards: []
        }
      }
    case REMOVE_DECK:
      const newState = state
      delete newState[action.deckId]
      return {
        ...newState
      }
    case ADD_CARD:
      return {
        ...state,
        [action.deckId]: {
          ...state[action.deckId],
         cards: [...state[action.deckId].cards, action.card]
        }
      }
    case REMOVE_CARD:
      return {
        ...state,
        [action.deckId]: {
          ...[action.deckId],
          cards: state.decks[action.deckId].cards.filter(card => card.id !== action.id)
        }
      }
    default: 
      return state
  }
}