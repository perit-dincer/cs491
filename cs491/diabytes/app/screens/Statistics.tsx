import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import BottomNavbar from '../components/BottomNavbar';

const Statistics = ({ navigation }: null) => {
  return (
    <ScrollView contentContainerStyle={styles.statisticsContainer}>
      <Text style={styles.header}>Statistics</Text>
      <Image
        source={{ uri: 'https://cdn.prod.website-files.com/651719a9112ca2eb946935db/651720e923242b32a493f63f_blood_glucose_graph.jpeg' }}
        style={styles.graphImage}
      />
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
  },
  graphImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
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
