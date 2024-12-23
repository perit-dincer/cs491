import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Button } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import BottomNavbar from '../components/BottomNavbar';

const screenWidth = Dimensions.get('window').width;

const Statistics = ({ navigation }: null) => {
  // State to manage chart data
  const [dataPoints, setDataPoints] = useState([110, 140, 180, 120, 160, 130, 150]); // Default data
  const [newPoint, setNewPoint] = useState('');

  const updateData = () => {
    const parsedPoint = parseFloat(newPoint);
    if (!isNaN(parsedPoint)) {
      setDataPoints([...dataPoints, parsedPoint]); // Add the new data point
      setNewPoint(''); // Clear the input
    } else {
      alert('Please enter a valid number');
    }
  };

  const clearData = () => {
    setDataPoints([]); // Clear all data points
  };

  const mockData = {
    labels: Array.from({ length: dataPoints.length }, (_, i) => `Day ${i + 1}`), // Dynamic labels
    datasets: [
      {
        data: dataPoints,
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // Line color
        strokeWidth: 2, // Line width
      },
    ],
    legend: ['Blood Sugar (mg/dL)'], // Chart legend
  };

  return (
    <ScrollView contentContainerStyle={styles.statisticsContainer}>
      <Text style={styles.header}>Statistics</Text>

      {/* Line Chart */}
      <LineChart
        data={mockData}
        width={screenWidth - 40} // Full width minus padding
        height={220}
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        style={styles.graphStyle}
      />

      {/* Input for Adding Data */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter new data point"
          value={newPoint}
          onChangeText={setNewPoint}
          keyboardType="numeric"
        />
        <Button title="Add Data Point" onPress={updateData} />
        <Button title="Clear Data" onPress={clearData} color="red" />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Blood Sugar Levels</Text>
        <Text style={styles.cardContent}>Track your blood sugar over time with this graph.</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Daily Averages</Text>
        <Text style={styles.cardContent}>See the average statistics for your recent measurements.</Text>
      </View>

      <BottomNavbar navigation={navigation} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  statisticsContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  graphStyle: {
    marginVertical: 8,
    borderRadius: 16,
    alignSelf: 'center',
  },
  inputContainer: {
    marginVertical: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardContent: {
    fontSize: 16,
    marginBottom: 12,
    color: '#6c757d',
  },
});

export default Statistics;
