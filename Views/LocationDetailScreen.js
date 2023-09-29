import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import productsData from '../products.json'; // Importér produktdatalisten fra JSON-filen

const LocationDetail = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Læs JSON-data, når komponenten indlæses
    fetchProducts();
  }, []);

  const fetchProducts = () => {
   
    setProducts(productsData); // Indlæs produktdatalisten fra JSON-filen 
  };

  // Funktion til at bestemme billedkilden baseret på billedstien i produktdatalisten
  const getImageSource = (imagePath) => {
    switch (imagePath) {
      case './paddle.png':
        return require('./paddle.png'); 
      
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Produktliste</Text>
      <FlatList
        data={products} // Brug produktdatalisten fra det lokale miljø
        keyExtractor={(item) => item.id.toString()} // Konverter id til en streng for nøgle
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Image
              source={getImageSource(item.image)} // Hent billedkilden baseret på stien i JSON filen
              style={styles.productImage}
            />
            <Text>{item.name}</Text>
            <Text>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'column',
    alignItems: 'center',
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});

export default LocationDetail;