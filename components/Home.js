import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { getDecks } from '../utils/api'
import { receiveDecks } from '../actions/index'
import { formatDecks } from '../utils/helpers'


class Home extends Component {
  state = {
    ready: false
  }

  componentDidMount() {
    const { dispatch } = this.props   
    
    getDecks(true)
      .then((decks) => dispatch(receiveDecks(decks))) 
      .then(() => this.setState(() => ({
        ready: true
      })))
  }

  render() {
    const { decks } = this.props
    const results = formatDecks(decks.decks)
    return (
      <View>
        <Text>This is the home page</Text>
        <Text>{JSON.stringify(results)}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  }
})

function mapStateToProps(decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(Home)