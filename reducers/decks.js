import {
  ADD_DECK,
  RECEIVE_DECKS,
  REMOVE_DECK
} from '../actions'

export default function decks (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      }
    case ADD_DECK:
      return {
        ...state,
        ...action.deck
      }
    case REMOVE_DECK:
      const { [action.name]: value, ...newState} = state
      return {
        newState,
        ...action.deck
      }
    default: 
      return state
  }
}