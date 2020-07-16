import { AsyncStorage } from 'react-native'

const DECKS_STORAGE_KEY = 'FlashCards:decks'

const mockData = {
  React: {
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
  JavaScript: {
    title: 'JavaScript',
    cards: [
      {
        id: "972eb745-a6d5-4683-8e0d-b51d2b80d74b",
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  },
  ReactNative: {
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
 * @param {string} title 
 * 
 * @returns {object}
 */
export async function saveDeckTitle(title) {
  try {
    return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
      [title]: {
        title,
        questions: []
      }
    }))
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
 * @param {string} title 
 * @param {object} card
 * @param {string} card.question
 * @param {string} card.answer 
 * 
 * @returns {object}
 */
export async function addCardToDeck(title, card) {
  try {
    const data = await AsyncStorage.getItem(DECKS_STORAGE_KEY)
    const parsedData = JSON.parse(data)
    parsedData[title].questions.push(card) 
    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(parsedData))
    return parsedData
  } catch (error) {
    console.error(error)
    return {
      error: `Unable to add card to deck: ${title}`,
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
export async function removeDeck(title) {
  try {
    const data = await AsyncStorage.getItem(DECKS_STORAGE_KEY)
    const parsedData = JSON.parse(data)
    parsedData[title] = undefined
    delete data[title]
    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(parsedData))
    return parsedData
  } catch (error) {
    console.error(error)
    return {
      error: `Unable to delete deck: ${title}`,
      details: error
    }
  }
}