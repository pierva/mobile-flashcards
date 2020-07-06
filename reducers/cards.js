import {
  ADD_CARD,
  REMOVE_CARD
} from '../actions'

export default function cards (state = {}, action) {
  switch (action.type) {
    case ADD_CARD:
      return {
        ...state,
        [action.deck]: {
          ...[action.deck],
          cards: state[action.deck].cards.push(action.card)
        }
      }
    case REMOVE_CARD:
      return {
        ...state,
        [action.deck]: {
          ...[action.deck],
          cards: state[action.deck].cards.filter(card => card.id !== action.id)
        }
      }
    default:
      return state
  }
}