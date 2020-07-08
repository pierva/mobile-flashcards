const logger = (store) => (next) => (action) => {
  console.group(action.type)
    console.log('<-----GROUP START----->')
    console.log('The action: ', action)
    const returnValue = next(action)
    console.log('The new state: ', store.getState())
    console.log('<-----GROUP END----->');
  console.groupEnd()
  return returnValue
}

export default logger