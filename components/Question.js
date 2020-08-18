import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Animated
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { white, blue, lightGreen, danger, lightBlue, beige, lightGrey } from '../utils/colors'

export default function Question({ card }) {

  let animatedValue = new Animated.Value(0);
  let val = 0;

  animatedValue.addListener(({ value }) => {
    val = value;
  });

  let frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  })
  let backInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg']
  })

  const flipCard = () => {
    if (val >= 90) {
      Animated.spring(animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: true
      }).start();
    } else {
      Animated.spring(animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10,
        useNativeDriver: true
      }).start();
    }
  }

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }]
  }
  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }]
  }


  return (
    <View style={styles.container}>

      <TouchableOpacity onPress={() => flipCard()}>
        <Ionicons name="ios-undo" size={30} style={styles.flipButton}/>
      </TouchableOpacity>
      {/* Front of the card */}
      <Animated.View style={[styles.flipCard, styles.flipCardFront, frontAnimatedStyle]}>
        <Text>
          {card.question}
        </Text>
      </Animated.View>

      {/* Back of the card */}
      <Animated.View style={[styles.flipCard, styles.flipCardBack, backAnimatedStyle]}>
        <Text>{card.answer}</Text>
      </Animated.View>

      <TouchableOpacity style={[styles.button, { backgroundColor: lightGreen }]}>
        <Text style={styles.buttonText}>Correct</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: danger }]}>
        <Text style={styles.buttonText}>Incorrect</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
    position: "relative"
  },
  flipButton: {
    position: "absolute",
    bottom: -10,
    left: '35%',
    zIndex: 999,
    backgroundColor: danger,
    borderRadius: 20,
    height: 40,
    width: 40,
    textAlign: "center",
    lineHeight: 40
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
    width: '80%',
    height: '70%',
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    zIndex: 1,
    marginBottom: 10
  },
  flipCardFront: {
    backgroundColor: lightGrey,
  },
  flipCardBack: {
    backgroundColor: white,
    position: 'absolute',
  }
})

