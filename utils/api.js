import { AsyncStorage } from 'react-native'
import { generateUUID } from './helpers'

const DECKS_STORAGE_KEY = 'FlashCards:decks'

const mockData = {
  '734444a6-5318-4d4b-a6c5-21895ce94ab5': {
    id: '734444a6-5318-4d4b-a6c5-21895ce94ab5',
    title: 'React',
    cards: [
      {
        id: "44ff728e-3f74-4bff-84f7-2ffeb56e3ef6",
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        id: "8d5971a8-4b20-419d-b5a4-53022f7d8962",
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  '0d64dca6-de52-498c-b36f-4df631928d9c': {
    id: '0d64dca6-de52-498c-b36f-4df631928d9c',
    title: 'JavaScript',
    cards: [
      {
        id: "972eb745-a6d5-4683-8e0d-b51d2b80d74b",
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  },
  '76e802ce-204e-4149-83ed-44e77be94307': {
    id: '76e802ce-204e-4149-83ed-44e77be94307',
    title: 'React Native',
  }
}

/**
 * Return all the decks in the database
 * @param {boolean} mock Pass true to retrieve mock data
 * @returns {object}
 */
export async function getDecks (mock) {
  if (mock) return mockData
  try {
    const results =  await AsyncStorage.getItem(DECKS_STORAGE_KEY)
    return JSON.parse(results)
  } catch (error) {
    console.error(error);
    return {
      error: 'Unable to process your request',
      details: error
    }
  }
}

/**
 * @param {string} id 
 * @returns {object}
 */
export async function getDeck(id) {
  try {
    const decks = await AsyncStorage.getItem(DECKS_STORAGE_KEY)
    return decks[id]
  } catch (error) {
    console.error(error)
    return {
      error: `Unable to get deck with id ${id}`,
      details: error
    }
  }
}

/**
 * 
 * @param {string} deckName 
 * @returns {object}
 */
export async function saveDeck(title) {
  try {
    const id = generateUUID()
    await AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
      [id]: {
        id,
        title,
        cards: []
      }
    }))
    return id
  } catch (error) {
    console.error(error)
    return {
      error: `Unable to save deck with title: ${title}`,
      details: error
    }
  }
}

/**
 * 
 * @param {string} deckId 
 * @param {object} card
 * @param {string} card.question
 * @param {string} card.answer 
 * 
 * @returns {object}
 */
export async function addCardToDeck(deckId, card) {
  try {
    const data = await AsyncStorage.getItem(DECKS_STORAGE_KEY)
    const parsedData = JSON.parse(data)
    parsedData[deckId].cards.push(card) 
    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(parsedData))
    return parsedData
  } catch (error) {
    console.error(error)
    return {
      error: `Unable to add card to deck: ${parsedData[deckId].title}`,
      details: error
    }
  }
}

/**
 * 
 * @param {string} title 
 * 
 * @returns {object}
 */
export async function removeDeck(deckId) {
  try {
    const data = await AsyncStorage.getItem(DECKS_STORAGE_KEY)
    const parsedData = JSON.parse(data)
    parsedData[deckId] = undefined
    delete data[deckId]
    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(parsedData))
    return parsedData
  } catch (error) {
    console.error(error)
    return {
      error: `Unable to delete deck.`,
      details: error
    }
  }
}