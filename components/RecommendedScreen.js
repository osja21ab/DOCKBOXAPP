import React from 'react';
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
//mockup screen all data is hard coded and displayed in the app no real functionality
const RecommendedTrips = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Recommended Trips',
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

  //reccomended trips as objects hardcoded in app
  const trips = [
    {
        name: 'The Beautiful Opera House',
        description: 'Experience the stunning Opera House in Copenhagen on a paddleboard! Glide along the serene waters as you get a unique perspective of this architectural marvel. Enjoy a picturesque view while paddling around the Opera House, soaking in the beauty of this iconic structure from a different angle.',
        rating: 4.5,
        image: require('../assets/opera.png'),
    },
    {
        name: 'Christianshavn Tour',
        description: 'Explore Christianshavn on a paddleboard and see the beautiful canals, unique architecture, and colorful houses. Enjoy the peaceful atmosphere and the vibrant culture of this historic district in Copenhagen.',
        rating: 4.2,
        image: require('../assets/christianshavn.png'),
      },
    {
        name: 'Nordhavn Exploration',
        description: 'Embark on a paddleboarding adventure in Nordhavn, exploring the modern architectural landscape and serene waters. Discover the vibrant atmosphere of this up-and-coming district in Copenhagen.',
        rating: 3.9,
        image: require('../assets/nordhavn.png'),
      },
    ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {trips.map((trip, index) => (
        <View key={index} style={styles.tripBox}>
          <View style={styles.imageContainer}>
            <Image source={trip.image} style={styles.tripImage} resizeMode="cover" />
          </View>
          <Text style={styles.tripName}>{trip.name}</Text>
          <Text style={styles.description}>{trip.description}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>Rating: {trip.rating}</Text>
            <Feather name="star" size={18} color="gold" style={styles.starIcon} />
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#f5f5f5', // Light grey background color
  },
  tripBox: {
    backgroundColor: '#f0f0f0', // Background color for individual trip boxes
    width: '90%',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },
  tripImage: {
    width: '100%',
    height: 150,
    borderRadius: 50,
    marginBottom: 20,
  },
  tripName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    color: '#666',
  },
  starIcon: {
    marginLeft: 5,
  },
  menuIcon: {
    marginLeft: 20,
  },
});

export default RecommendedTrips;
