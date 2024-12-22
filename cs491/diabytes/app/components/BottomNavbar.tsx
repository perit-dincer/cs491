// app/components/BottomNavbar.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BottomNavbar = ({ openCamera }: { openCamera: () => void }) => {
  const navigation = useNavigation();

  // Handle navigation to other screens
  const handleNavigation = (screen: string) => {
    console.log(`Navigating to ${screen}`);
    navigation.navigate(screen); // Navigate to the provided screen name
  };

  return (
    <View style={styles.navbar}>
      <TouchableOpacity style={styles.navButton} onPress={() => handleNavigation('Home')}>
        <Text style={styles.navText}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navButton} onPress={() => handleNavigation('Statistics')}>
        <Text style={styles.navText}>Statistics</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.navButton, styles.plusButton]}
        onPress={() => handleNavigation('CalculateCalories')} // Navigate to CalculateCalories screen
      >
        <Text style={styles.navText}>+</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navButton} onPress={() => handleNavigation('Profile')}>
        <Text style={styles.navText}>Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navButton} onPress={() => handleNavigation('Settings')}>
        <Text style={styles.navText}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#333',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 999,
  },
  navButton: {
    padding: 10,
    backgroundColor: '#555',
    borderRadius: 5,
  },
  plusButton: {
    backgroundColor: '#ff6347',
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  navText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default BottomNavbar;
