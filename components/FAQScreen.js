import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';

const FAQScreen = ({ navigation }) => {
  const [faqData, setFaqData] = useState([
    {
      question: 'What are the rental hours?',
      answer: 'Our rental hours are from 9:00 AM to 6:00 PM every day.',
      isOpen: false,
    },
    {
      question: 'Are paddles included in the rental?',
      answer: 'Yes, paddles are included in the rental. You can pick them up at the same location.',
      isOpen: false,
    },
    {
      question: 'What forms of payment do you accept?',
      answer: 'We accept cash, credit cards, and mobile payments like Apple Pay or Google Pay.',
      isOpen: false,
    },
    {
      question: 'Do I need to make a reservation?',
      answer: 'Reservations are recommended, especially during weekends and holidays, but walk-ins are welcome.',
      isOpen: false,
    },
    {
      question: 'Is there an age limit for rentals?',
      answer: 'Yes, renters must be at least 18 years old. Minors can rent if accompanied by a parent or guardian.',
      isOpen: false,
    },
    {
      question: 'Is there a time limit for rentals?',
      answer: 'Rental time slots are typically for 1 hour. Additional hours can be added if there is availability.',
      isOpen: false,
    },
    {
      question: 'What if I need to cancel a reservation?',
      answer: 'You can cancel your reservation up to 24 hours in advance without any charges.',
      isOpen: false,
    },
    {
      question: 'Do you provide life jackets?',
      answer: 'Yes, life jackets are provided and are mandatory for all renters.',
      isOpen: false,
    },
  ]);

  const toggleAnswer = (index) => {
    const updatedFaq = [...faqData];
    updatedFaq[index].isOpen = !updatedFaq[index].isOpen;
    setFaqData(updatedFaq);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'FAQ',
      headerStyle: {
        height: 90,
        backgroundColor: '#095167',
      },
      headerTintColor: '#FCCE85',
      headerLeft: () => (
        <Feather
          name="menu"
          size={30}
          color="#FCCE85"
          style={styles.menuIcon}
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        />
      ),
    });
  }, [navigation]);

  return (
    <ImageBackground source={require('../assets/questionmark.png')} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        {faqData.map((faq, index) => (
          <View key={index} style={styles.faqItem}>
            <TouchableOpacity onPress={() => toggleAnswer(index)} style={styles.questionContainer}>
              <Text style={styles.question}>{faq.question}</Text>
              <Feather
                name={faq.isOpen ? 'chevron-up' : 'chevron-down'}
                size={20}
                color="#000"
                style={styles.chevronIcon}
              />
            </TouchableOpacity>
            {faq.isOpen && <Text style={styles.answer}>{faq.answer}</Text>}
          </View>
        ))}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    padding: 20,
  },
  faqItem: {
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
    padding: 20,
    margin: 10,
    backgroundColor: 'rgba(169, 169, 169, 0.3)', // Greyish transparent color
  },
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  question: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black', // Question text color
    
  },
  chevronIcon: {
    marginLeft: 'auto',
  },
  answer: {
    padding: 20,
    backgroundColor: 'rgba(169, 169, 169, 0.3)',
    color: 'black', // Answer text color
  
  },
  menuIcon: {
    marginLeft: 20,
  },
});

export default FAQScreen;
