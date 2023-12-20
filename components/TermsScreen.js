import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';

//mockup screen, how terms and conditions on screen
const TermsScreen = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Terms and Conditions',
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

  const parseText = (text) => {
    const parts = text.split('**');
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return <Text key={index} style={styles.bold}>{part}</Text>;
      }
      return <Text key={index}>{part}</Text>;
    });
  };
  
//terms and conditions
  const termsAndConditionsText = `
  Welcome to our Paddleboard Rental Service. These Terms and Conditions outline the rules and regulations for the use of our mobile application.

    By accessing this application, we assume you accept these terms and conditions. Do not continue to use the app if you do not agree to all of the terms and conditions stated on this page.

    The following terminology applies to these Terms and Conditions: “Customer,” “You,” and “Your” refer to you, the person accessing this application and accepting the Company’s terms and conditions. “The Company,” “Ourselves,” “We,” “Our,” and “Us” refer to our Company. “Party,” “Parties,” or “Us” refer to both the Customer and ourselves.

    **Rental Process and Responsibilities**

    **- Booking Process:** Our app allows you to view available paddleboards at various locations. You can book, rent, and schedule the pickup and return of paddleboards.

    **- Rental Duration:** You may rent a paddleboard for a specified duration. Any extension should be confirmed through the app.

    **- Usage:** Paddleboards should be used responsibly and in compliance with local regulations and safety guidelines.

    **- Return Policy:** Paddleboards must be returned in the same condition as they were received. Any damages or issues should be reported upon return.

    **Fees and Charges**

    **- Rental Fees:** Rental fees are determined based on the duration and type of paddleboard rented. Payment is made through the app.

    **- Additional Charges:** Any additional charges due to damage, late return, or violations of the terms will be applied accordingly.

    **Liability and Safety**

    **- Safety Guidelines:** Customers are responsible for adhering to safety guidelines. Use of safety equipment, including life jackets, is recommended.

    **- Liability:** Our company holds no liability for injuries or accidents that occur during the rental period. Customers assume full responsibility for their actions.

    **Cancellations and Refunds**

    **- Cancellations:** Any cancellations must be made within a reasonable time frame. Refunds are subject to the company’s cancellation policy.

    **User Conduct and Responsibilities**

    **- Account Use:** Users are responsible for their account security and any actions taken through their account.

    **- Prohibited Actions:** Any misuse, abuse, or violation of the terms will result in suspension or termination of the user account.

    By using this application, you agree to the terms and conditions laid out by the Company. Please contact us for any queries or clarification.
    `;
//UI
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Terms and Conditions</Text>
        {parseText(termsAndConditionsText)}
      </ScrollView>
    </View>
  );
};

//styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  menuIcon: {
    marginLeft: 20,
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    marginTop: 20,
    color: '#095167',
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default TermsScreen;
