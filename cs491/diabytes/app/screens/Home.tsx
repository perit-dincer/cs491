import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { db, auth } from '../../FirebaseConfig';
import {
  doc,
  getDoc,
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
} from 'firebase/firestore';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type UserAttributes = {
  name: string;
  age: string;
  location: string;
  language: string;
};

type ImageData = {
  url: string;
  timestamp: any; // Firestore Timestamp
};

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home = ({ navigation }: HomeScreenProps) => {
  const [userAttributes, setUserAttributes] = useState<UserAttributes>({
    name: '',
    age: '',
    location: '',
    language: '',
  });

  const [imageUri, setImageUri] = useState<string | null>(null);
  const [images, setImages] = useState<ImageData[]>([]);

  useEffect(() => {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      Alert.alert('Error', 'User not authenticated.');
      return;
    }

    const fetchUserAttributes = async () => {
      try {
        const userDoc = await getDoc(doc(db, 'users', userId));
        if (userDoc.exists()) {
          setUserAttributes(userDoc.data() as UserAttributes);
        } else {
          Alert.alert('Error', 'User attributes not found.');
        }
      } catch (error) {
        console.log('Error fetching user attributes:', error);
        Alert.alert('Error', 'Failed to fetch user attributes.');
      }
    };

    const imagesCollection = collection(db, 'users', userId, 'images');
    const imagesQuery = query(
      imagesCollection,
      orderBy('timestamp', 'desc'),
      limit(3)
    );

    const unsubscribe = onSnapshot(
      imagesQuery,
      (querySnapshot) => {
        const fetchedImages: ImageData[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          fetchedImages.push({
            url: data.url,
            timestamp: data.timestamp,
          });
        });

        setImages(fetchedImages);
      },
      (error) => {
        console.log('Error fetching images:', error);
        Alert.alert('Error', 'Failed to fetch images.');
      }
    );

    fetchUserAttributes();

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

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

        // Here, we no longer upload the image to Firebase
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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>User Attributes</Text>
      <Text>Name: {userAttributes.name}</Text>
      <Text>Age: {userAttributes.age}</Text>
      <Text>Location: {userAttributes.location}</Text>
      <Text>Language: {userAttributes.language}</Text>

      <Button
        title="Edit Attributes"
        onPress={() =>
          navigation.navigate('EditAttributes', {
            ...userAttributes,
          })
        }
      />

      <View style={styles.cameraButtonContainer}>
        <Button
          title="Open Camera"
          onPress={openCamera}
        />
      </View>

      {imageUri && (
        <View style={styles.uploadingContainer}>
          <Text>Image preview:</Text>
          <Image source={{ uri: imageUri }} style={styles.imagePreview} />
        </View>
      )}

      <Text style={styles.galleryHeading}>Last 3 Images</Text>
      <View style={styles.imagesContainer}>
        {images.length === 0 && <Text>No images to display.</Text>}
        {images.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image.url }}
            style={styles.image}
            onPress={() => navigation.navigate('ImageView', { imageUrl: image.url })}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cameraButtonContainer: {
    marginTop: 20,
  },
  uploadingContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  galleryHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
  },
  imagesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  image: {
    width: '30%',
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  imagePreview: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginTop: 10,
  },
});
