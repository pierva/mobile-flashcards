import React from 'react'
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Animated
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { white, blue, lightGreen, danger, lightGrey } from '../utils/colors'

export default function Question({ card, submitAnswer }) {

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
      <TouchableOpacity onPress={() => flipCard()} style={styles.flipButton}>
        <Ionicons name="ios-undo" size={30} style={styles.flipButtonIcon}/>
      </TouchableOpacity>
      
      {/* Front of the card */}
      <Animated.View style={[styles.flipCard, styles.flipCardFront, frontAnimatedStyle]}>
        <Text style={[{color: white}, styles.cardHeader]}>
          ¿¿Question??
        </Text>
        <Text style={styles.cardText}>
          {card.question}?
        </Text>
      </Animated.View>

      {/* Back of the card */}
      <Animated.View style={[styles.flipCard, styles.flipCardBack, backAnimatedStyle]}>
      <Text style={[{color: lightGrey}, styles.cardHeader]}>
          Answer
        </Text>
        <Text style={styles.cardText}>{card.answer}</Text>
      </Animated.View>

      <TouchableOpacity 
        style={[styles.button, { backgroundColor: lightGreen }]}
        onPress={() => submitAnswer(true)}
        >
        <Text style={styles.buttonText}>Correct</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.button, { backgroundColor: danger }]}
        onPress={() => submitAnswer(false)}
        >
        <Text style={styles.buttonText}>Incorrect</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 30,
    position: "relative"
  },
  flipButton: {
    backgroundColor: blue,
    borderRadius: 20,
    width: 40,
    height: 40,
    position: "absolute",
    top: -20,
    right: 15,
    zIndex: 1,
    height: 40,
    width: 40,
    textAlign: "center",
    lineHeight: 40
  },
  flipButtonIcon: {
    color: white,
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
    zIndex: -1,
    marginBottom: 10,
    position: 'relative'
  },
  flipCardFront: {
    backgroundColor: lightGrey,
  },
  flipCardBack: {
    backgroundColor: white,
    position: 'absolute',
  },
  cardText: {
    color: blue,
    fontSize: 22,
    alignSelf: 'center',
    flex: 1,
    marginTop: -30
  },
  cardHeader: {
    flex: 1,
    fontSize: 30,
  },
  cardAnswer: {
    color: blue,
    fontSize: 20
  }

})

