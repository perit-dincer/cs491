import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const Settings = () => {
  return (
    <ScrollView contentContainerStyle={styles.optionsContainer}>
      <Text style={styles.header}>Options</Text>
      <View style={styles.card}>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>Account Settings</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.card}>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>Notification Preferences</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.card}>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>Appearance</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.card}>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>Privacy & Security</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.card}>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>Language</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.card}>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  optionsContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  optionButton: {
    padding: 10,
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
  },
});

export default Settings;
