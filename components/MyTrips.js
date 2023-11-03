// MyTrips.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MyTrips = () => {
    return (
        <View style={styles.container}>
            <Text>My Trips</Text>
            {/* Add your containers, map, length, price here */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default MyTrips;