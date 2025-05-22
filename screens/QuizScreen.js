import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Card, ProgressBar, useTheme } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

// Questions du quiz
const questions = [
  {
    question: "Qu'est-ce qu'un système embarqué ?",
    options: [
      "Un ordinateur dédié à une tâche spécifique",
      "Un système d'exploitation mobile",
      "Un logiciel de programmation",
      "Un réseau de communication"
    ],
    correctOption: 0,
    points: 5
  },
  {
    question: "Quel est le langage le plus couramment utilisé pour la programmation des systèmes embarqués ?",
    options: [
      "Python",
      "C/C++",
      "Java",
      "JavaScript"
    ],
    correctOption: 1,
    points: 5
  },
  {
    question: "Qu'est-ce que le RTOS ?",
    options: [
      "Un système de fichiers",
      "Un système d'exploitation temps réel",
      "Un protocole de communication",
      "Un type de mémoire"
    ],
    correctOption: 1,
    points: 5
  },
  {
    question: "Quelle est la principale caractéristique d'un microcontrôleur ?",
    options: [
      "Sa grande capacité de stockage",
      "Son processeur puissant",
      "L'intégration de tous les composants sur une seule puce",
      "Sa connectivité réseau"
    ],
    correctOption: 2,
    points: 5
  },
  {
    question: "Qu'est-ce que l'ADC dans un système embarqué ?",
    options: [
      "Un type de mémoire",
      "Un convertisseur analogique-numérique",
      "Un protocole de communication",
      "Un système d'exploitation"
    ],
    correctOption: 1,
    points: 5
  },
  {
    question: "Quel est le rôle d'un watchdog timer ?",
    options: [
      "Mesurer la température",
      "Surveiller la consommation d'énergie",
      "Redémarrer le système en cas de blocage",
      "Gérer la mémoire"
    ],
    correctOption: 2,
    points: 5
  },
  {
    question: "Qu'est-ce que l'IoT ?",
    options: [
      "Internet of Things (Internet des Objets)",
      "Input/Output Technology",
      "Integrated Operating Technology",
      "Internet Operating Tools"
    ],
    correctOption: 0,
    points: 5
  },
  {
    question: "Quelle est la différence entre RAM et ROM ?",
    options: [
      "La RAM est plus rapide que la ROM",
      "La RAM est volatile, la ROM est non-volatile",
      "La ROM est plus chère que la RAM",
      "La RAM est plus grande que la ROM"
    ],
    correctOption: 1,
    points: 5
  },
  {
    question: "Qu'est-ce que le DMA ?",
    options: [
      "Direct Memory Access",
      "Digital Memory Array",
      "Dynamic Memory Allocation",
      "Direct Module Access"
    ],
    correctOption: 0,
    points: 5
  },
  {
    question: "Quel est l'avantage d'un système embarqué temps réel ?",
    options: [
      "Sa grande capacité de calcul",
      "Sa réponse garantie dans un temps déterminé",
      "Sa faible consommation",
      "Sa connectivité"
    ],
    correctOption: 1,
    points: 5
  },
  {
    question: "Qu'est-ce que l'UART ?",
    options: [
      "Un type de mémoire",
      "Un protocole de communication série",
      "Un système d'exploitation",
      "Un type de processeur"
    ],
    correctOption: 1,
    points: 5
  },
  {
    question: "Quelle est la fonction d'un bootloader ?",
    options: [
      "Gérer la mémoire",
      "Charger le système d'exploitation",
      "Contrôler les périphériques",
      "Gérer le réseau"
    ],
    correctOption: 1,
    points: 5
  },
  {
    question: "Qu'est-ce que le PWM ?",
    options: [
      "Power Management System",
      "Pulse Width Modulation",
      "Programmable Watchdog Module",
      "Processor Working Mode"
    ],
    correctOption: 1,
    points: 5
  },
  {
    question: "Quel est le rôle d'un interrupteur dans un système embarqué ?",
    options: [
      "Gérer la mémoire",
      "Interrompre le programme pour traiter un événement",
      "Contrôler l'alimentation",
      "Gérer le réseau"
    ],
    correctOption: 1,
    points: 5
  },
  {
    question: "Qu'est-ce que le CAN bus ?",
    options: [
      "Un type de mémoire",
      "Un protocole de communication pour véhicules",
      "Un système d'exploitation",
      "Un type de processeur"
    ],
    correctOption: 1,
    points: 5
  },
  {
    question: "Quelle est la différence entre un microprocesseur et un microcontrôleur ?",
    options: [
      "Le microprocesseur est plus rapide",
      "Le microcontrôleur intègre plus de périphériques",
      "Le microprocesseur consomme moins",
      "Le microcontrôleur est plus cher"
    ],
    correctOption: 1,
    points: 5
  },
  {
    question: "Qu'est-ce que le JTAG ?",
    options: [
      "Un protocole de débogage",
      "Un type de mémoire",
      "Un système d'exploitation",
      "Un type de processeur"
    ],
    correctOption: 0,
    points: 5
  },
  {
    question: "Quelle est la fonction d'un oscillateur dans un système embarqué ?",
    options: [
      "Gérer la mémoire",
      "Fournir le signal d'horloge",
      "Contrôler l'alimentation",
      "Gérer le réseau"
    ],
    correctOption: 1,
    points: 5
  },
  {
    question: "Qu'est-ce que le SPI ?",
    options: [
      "Serial Peripheral Interface",
      "System Power Interface",
      "Serial Protocol Interface",
      "System Peripheral Interface"
    ],
    correctOption: 0,
    points: 5
  },
  {
    question: "Quelle est l'importance de la consommation d'énergie dans un système embarqué ?",
    options: [
      "Elle n'a pas d'importance",
      "Elle est cruciale pour l'autonomie",
      "Elle affecte uniquement les performances",
      "Elle est importante uniquement en mode veille"
    ],
    correctOption: 1,
    points: 5
  }
];

const QuizScreen = ({ navigation }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const theme = useTheme();

  const handleAnswer = (selectedIndex) => {
    setSelectedAnswer(selectedIndex);
    if (selectedIndex === questions[currentQuestion].correctOption) {
      setScore(score + questions[currentQuestion].points);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
      navigation.navigate('Result', {
        score: score,
        totalQuestions: questions.length,
        maxScore: questions.length * 5
      });
    }
  };

  const progress = (currentQuestion + 1) / questions.length;

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.questionNumber}>
              Question {currentQuestion + 1}/{questions.length}
            </Text>
            <Text style={styles.question}>
              {questions[currentQuestion].question}
            </Text>
            <View style={styles.optionsContainer}>
              {questions[currentQuestion].options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    selectedAnswer === index && styles.selectedOption
                  ]}
                  onPress={() => handleAnswer(index)}
                  disabled={selectedAnswer !== null}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </Card.Content>
        </Card>

        <View style={styles.footer}>
          <Text style={styles.score}>Score: {score}</Text>
          <ProgressBar
            progress={progress}
            color={theme.colors.primary}
            style={styles.progressBar}
          />
          {selectedAnswer !== null && (
            <TouchableOpacity
              style={styles.nextButton}
              onPress={handleNext}
            >
              <Text style={styles.nextButtonText}>
                {currentQuestion < questions.length - 1 ? 'Suivant' : 'Terminer'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  card: {
    marginBottom: 20,
    elevation: 4,
    borderRadius: 15,
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  questionNumber: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  question: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  optionsContainer: {
    gap: 10,
  },
  optionButton: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  selectedOption: {
    backgroundColor: '#4c669f',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  footer: {
    marginTop: 10,
    alignItems: 'center',
  },
  score: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  progressBar: {
    width: '100%',
    height: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  nextButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    elevation: 3,
    marginTop: -5,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4c669f',
  },
});

export default QuizScreen; 