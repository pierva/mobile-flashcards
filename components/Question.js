import React, { Component } from 'react'
import {
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    View, 
    Animated } from 'react-native'
import { white, blue, lightGreen, danger } from '../utils/colors'
import { Logs } from 'expo'

class Question extends Component {

  state = {
    animatedValue: new Animated.Value(0)
  }

  // componentWillMount is deprecated, update using state
  componentWillMount() {
    // const { animatedValue } = this.state
    this.value = 0
    this.animatedValue = new Animated.Value(0)
    this.animatedValue.addListener(( { value }) => {
      this.value = value
    })
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg']
    })
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    })

  }

  flipCard() {
    if (parseInt(JSON.stringify(this.animatedValue)) > 90) {
      // this.setState(() => (
      //   {
      //     animatedValue: new Animated.Value(0)
      //   }
      // ))
      Animated.spring(this.animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: true
      }).start()
    } else {
      // this.setState(() => (
      //   {
      //     animatedValue: new Animated.Value(180)
      //   }
      // ))
      Animated.spring(this.animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10,
        useNativeDriver: true
      }).start()
    }
  }

  render() {
    // const { animatedValue } = this.state
    // const frontInterpolate = animatedValue.interpolate({
    //   inputRange: [0, 180],
    //   outputRange: ['0deg', '180deg']
    // })
    // const backInterpolate = animatedValue.interpolate({
    //   inputRange: [0, 180],
    //   outputRange: ['180deg', '360deg']
    // })

    const { card } = this.props
    const frontAnimatedStyle = {
      transform: [
        { rotateY: this.frontInterpolate}
      ]
    }
    const backAnimatedStyle = {
      transform: [
        { rotateY: this.backInterpolate}
      ]
    }
    return (
      <View style={styles.container}>
        {/* Front of the card */}
        <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
          <Text>
            {card.question}
          </Text>
          <TouchableOpacity style={[styles.button, {backgroundColor: lightGreen}]}>
            <Text style={styles.buttonText}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, {backgroundColor: danger}]}>
            <Text style={styles.buttonText}>Incorrect</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Back of the card */}
        <Animated.View style={[styles.flipCard, styles.flipCardBack, backAnimatedStyle]}>
          <Text>This is the back</Text>
        </Animated.View>

        <TouchableOpacity onPress={() => this.flipCard()}>
          <Text>Flip</Text>
        </TouchableOpacity>
      </View>
    )}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5,
    margin: 5,
    width: 200
  },
  buttonText: {
    width: '100%',
    textAlign: "center",
    color: white
  },
  flipCard: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: white,
    backfaceVisibility: 'hidden'
  },
  flipCardBack: {
    backgroundColor: 'red',
    position: 'absolute',
    top: 0
  }
})

export default Question
