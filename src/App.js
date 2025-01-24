import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';

const API_BASE = "https://dealership.naman.zip";

const App = () => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch sorted cars based on price
  const fetchSortedCars = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/cars/sort?direction=asc&key=price`);
      const data = await response.json();
      setCars(data);
    } catch (error) {
      console.error('Error fetching sorted cars:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch detailed information about a car by ID
  const fetchCarDetails = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/car/${id}`);
      const data = await response.json();
      setSelectedCar(data);
    } catch (error) {
      console.error('Error fetching car details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSortedCars();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (selectedCar) {
    return (
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsTitle}>{selectedCar.make} {selectedCar.model}</Text>
        <Image source={{ uri: selectedCar.image }} style={styles.carImage} />
        <Text style={styles.detailsText}>Year: {selectedCar.year}</Text>
        <Text style={styles.detailsText}>Price: ${selectedCar.price}</Text>
        <Text style={styles.detailsText}>Condition: {selectedCar.condition}</Text>
        <Text style={styles.detailsText}>Mileage: {selectedCar.mileage} miles</Text>
        <Text style={styles.detailsText}>Fuel Type: {selectedCar.fuel_type}</Text>
        <Text style={styles.detailsText}>Transmission: {selectedCar.transmission}</Text>
        <Text style={styles.detailsText}>Color: {selectedCar.color}</Text>
        <Text style={styles.detailsText}>VIN: {selectedCar.vin}</Text>
        <Text style={styles.detailsText}>Description: {selectedCar.description}</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => setSelectedCar(null)}>
          <Text style={styles.buttonText}>Back to List</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Image source={require('./logo.png')} style={styles.logo} />
      <Text style={styles.title}>Convergent Car Dealership</Text>
      </View>
      <FlatList
        data={cars}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.carButton} onPress={() => fetchCarDetails(item.id)}>
            <Image source={{ uri: item.image }} style={styles.carImageSmall} />
            <View>
              <Text style={styles.carText}>{item.make} {item.model}</Text>
              <Text style={styles.carText}>${item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#1e1e1e',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ffffff',
  },
  carButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 8,
    backgroundColor: '#2e2e2e',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  carImageSmall: {
    width: 60,
    height: 40,
    marginRight: 16,
    borderRadius: 4,
  },
  carText: {
    fontSize: 16,
    color: '#ffffff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
  },
  loadingText: {
    color: '#ffffff',
    fontSize: 18,
  },
  detailsContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#1e1e1e',
    justifyContent: 'space-between',
  },
  detailsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#ffffff',
  },
  detailsText: {
    fontSize: 16,
    color: '#cccccc',
    marginBottom: 8,
  },
  carImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  backButton: {
    padding: 10,
    backgroundColor: '#4caf50',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;
