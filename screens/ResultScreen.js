import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

const ResultScreen = ({ route, navigation }) => {
  const { score, totalQuestions, maxScore } = route.params;
  const percentage = (score / maxScore) * 100;

  const getMessage = () => {
    if (percentage >= 90) return "Excellent ! Vous êtes un expert !";
    if (percentage >= 70) return "Très bien ! Vous avez une bonne maîtrise !";
    if (percentage >= 50) return "Bien ! Continuez à vous entraîner !";
    return "Ne vous découragez pas, continuez à apprendre !";
  };

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Quiz Terminé !</Text>
        
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>{score}</Text>
          <Text style={styles.maxScoreText}>/ {maxScore}</Text>
        </View>

        <View style={styles.percentageContainer}>
          <Text style={styles.percentageText}>{percentage.toFixed(1)}%</Text>
        </View>

        <Text style={styles.message}>{getMessage()}</Text>

        <TouchableOpacity
          style={styles.restartButton}
          onPress={() => navigation.navigate('Start')}
        >
          <Text style={styles.restartButtonText}>Recommencer</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 40,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#fff',
  },
  maxScoreText: {
    fontSize: 24,
    color: '#fff',
    opacity: 0.8,
    marginLeft: 5,
  },
  percentageContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 30,
  },
  percentageText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  message: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  restartButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 30,
    elevation: 5,
  },
  restartButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4c669f',
  },
});

export default ResultScreen; 