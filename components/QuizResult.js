import React from 'react'
import {Text, StyleSheet, View } from 'react-native'
import { white, grey, lightBlue, blue, lightGreen, danger } from '../utils/colors'

export default function QuizResult ({correctAnswers, totCards}) {
  const score = Math.round(correctAnswers/totCards*100)
    return (
      <View style={styles.container}>
        <Text 
          style={[styles.header]}>
            Quiz Completed! 🎉
        </Text>
        <View style={styles.score}>
          <Text style={[styles.scoreText, {color: score < 50 ? danger : lightGreen}]}>
            {score}%
          </Text>
          <Text style={styles.primaryText}>
          {correctAnswers} out of {totCards} 
        </Text>
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  header: {
    padding: 30,
    color: grey,
    fontSize: 20,
    textAlign: "center",
    position: "absolute",
    top: 20,
    width: "100%"
  },
  primaryText: {
    color: grey,
    fontSize: 20,
    textAlign: "center"
  },

  score: {
    color: blue,
    textAlign: 'center',
    alignSelf: "center",
    justifyContent: 'center',
    margin: 20,
    shadowColor: lightBlue,
    padding: 30,
    backgroundColor: white,
    borderRadius: 100,
    width: 200,
    height: 200,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
  },

  scoreText: {
    fontSize: 35,
    textAlign: "center",
  }
})