import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const MyTrips = () => {
    const navigation = useNavigation();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: 'My Trips',
            headerStyle: {
                height: 90,
                backgroundColor: '#095167',
            },
            headerTintColor: '#FCCE85',
            headerLeft: () => (
                <Feather
                    name="arrow-left"
                    size={30}
                    color="#FCCE85"
                    style={styles.menuIcon}
                    onPress={() => navigation.navigate('ProfileScreen')}
                />
            ),
        });
    }, [navigation]);

    // Create an array of trip data
    const trips = [
        {
            imageSource: require('../assets/Trip1.png'),
            title: 'Trip 1',
            distance: '2 Km',
            price: '50.00',
            date: '26.10.23',
        },
        {
            imageSource: require('../assets/Trip2.png'),
            title: 'Trip 2',
            distance: '900 M',
            price: '75,25',
            date: '26.1.22',
        },
        {
            imageSource: require('../assets/Trip3.png'),
            title: 'Trip 3',
            distance: '1,5 KM',
            price: '50.00',
            date: '26.10.23',
        },
    ];
    return (
        <ScrollView style={styles.container}>
            {trips.map((trip, index) => (
                <View key={index} style={styles.tripContainer}>
                    <Image source={trip.imageSource} style={styles.tripImage} />
                    <View style={styles.tripInfo}>
                        <Text style={styles.title}>{trip.title}</Text>
                        <View style={styles.detailContainer}>
                            <Feather name="activity" size={24} color="black" />
                            <Text style={styles.detailText}>{trip.distance}</Text>
                        </View>
                        <View style={styles.detailContainer}>
                            <Feather name="dollar-sign" size={24} color="black" />
                            <Text style={styles.detailText}>{trip.price}</Text>
                        </View>
                        <View style={styles.detailContainer}>
                            <Feather name="calendar" size={24} color="black" />
                            <Text style={styles.detailText}>{trip.date}</Text>
                        </View>
                    </View>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tripContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        marginBottom: 16,
        marginRight: 16,
        borderWidth: 2, // Add border
        borderColor: '#CCCCCC', // Border color
        borderRadius: 10, // Rounded corners
        marginLeft: 16,
        marginTop: 16,
    },
    tripImage: {
        width: 220,
        height: 100,
        marginRight: 16,
    },
    tripInfo: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    detailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    detailText: {
        marginLeft: 8,
        fontSize: 16,
    },
    menuIcon: {
        marginLeft: 16,
    },
});

export default MyTrips;