import React, { Component } from 'react'
import { 
        View, 
        Text, 
        StyleSheet, 
        Platform, 
        TouchableOpacity,
        FlatList} from 'react-native'
import { connect } from 'react-redux'
import { getDecks } from '../utils/api'
import { receiveDecks } from '../actions/index'
import { formatDecks } from '../utils/helpers'
import Deck from './Deck'


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
      <View style={styles.container}> 
        <FlatList 
          data={results} 
          renderItem={({item}) => <Deck item={item} navigation={this.props.navigation} />} 
          keyExtractor={(item) => item.deck}/>
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