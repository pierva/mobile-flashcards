import { AsyncStorage } from 'react-native'

const DECKS_STORAGE_KEY = 'FlashCards:decks'

const mockData = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}

/**
 * Return all the decks in the database
 * @returns {object}
 */
export async function getDecks () {
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
export function saveDeckTitle(title) {
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
export function removeDeck(title) {
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