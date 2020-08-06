import {
  ADD_DECK,
  RECEIVE_DECKS,
  REMOVE_DECK
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
          ...action.deck
        }
      }
    case REMOVE_DECK:
      const newState = state
      delete newState[action.deckId]
      return {
        ...newState
      }
    default: 
      return state
  }
}