// app/screens/CalculateCalories.tsx
import React, { useState } from 'react';
import { View, Button, Alert, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const CalculateCalories = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const openCamera = async () => {
    try {
      // Request camera permissions
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Denied',
          'Camera permissions are required to take photos.'
        );
        return;
      }

      // Launch camera
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8, // Adjust quality as needed
      });

      if (result.canceled) {
        console.log('User canceled camera');
        Alert.alert('Cancelled', 'You canceled the camera.');
      } else {
        const asset = result.assets[0];
        if (!asset.uri) {
          throw new Error('Image URI is undefined.');
        }
        console.log('Photo URI:', asset.uri);
        setImageUri(asset.uri);
      }
    } catch (error) {
      console.error('Error opening camera:', error);
      Alert.alert(
        'Error',
        error instanceof Error
          ? error.message
          : 'Unable to open the camera. Please try again.'
      );
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Open Camera" onPress={openCamera} />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.imagePreview} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePreview: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginTop: 10,
  },
});

export default CalculateCalories;
