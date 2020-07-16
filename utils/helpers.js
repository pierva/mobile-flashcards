/**
 * @name generateUID
 * This function will generate a UUID with the follow structure:
 * 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
 */

export function generateUUID(){
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (dt + Math.random()*16)%16 | 0;
      dt = Math.floor(dt/16);
      return (c=='x' ? r :(r&0x3|0x8)).toString(16);
  });
  return uuid;
}

export function formatDecks(decks) {
  const keys = Object.keys(decks)
  const results = keys.map((deck) => {
    const cards = decks[deck].cards ? decks[deck].cards.length : 0
    return {
      deck: decks[deck].title,
      cards
    }
  })
  return results
}