// app/screens/ImageView.tsx

import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App'; // Import RootStackParamList for type checking

type ImageViewProps = NativeStackScreenProps<RootStackParamList, 'ImageView'>;

const ImageView = ({ route, navigation }: ImageViewProps) => {
  const { imageUrl } = route.params; // Get the image URL from params

  return (
    <View style={styles.container}>
      <Button
        title="Back"
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      />
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={styles.text}>Viewing Image</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  image: {
    width: '100%',
    height: '80%',
    resizeMode: 'contain',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ImageView;
