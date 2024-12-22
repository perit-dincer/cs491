// app/screens/Home.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
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
import BottomNavbar from '../components/BottomNavbar'; // Import BottomNavbar

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

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.heading}>User Attributes</Text>
        <Text>Name: {userAttributes.name}</Text>
        <Text>Age: {userAttributes.age}</Text>
        <Text>Location: {userAttributes.location}</Text>
        <Text>Language: {userAttributes.language}</Text>

        <Button
          title="View Meals"
          onPress={() => navigation.navigate('Meals')}
        />


        <Button
          title="Edit Attributes"
          onPress={() =>
            navigation.navigate('EditAttributes', {
              ...userAttributes,
            })
          }
        />

        {imageUri && (
          <View style={styles.uploadingContainer}>
            <Text>Image preview:</Text>
            <Image source={{ uri: imageUri }} style={styles.imagePreview} />
          </View>
        )}

        <Text style={styles.galleryHeading}>Last 3 Images</Text>
        <View style={styles.imagesContainer}>
          {images.length === 0 ? (
            <Text>No images to display.</Text>
          ) : (
            images.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image.url }}
                style={styles.image}
                onPress={() => navigation.navigate('ImageView', { imageUrl: image.url })}
              />
            ))
          )}
        </View>
      </ScrollView>

      {/* Add the Bottom Navbar here */}
      <BottomNavbar navigation={navigation} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 70, // Adjust padding to ensure navbar is not overlapped
  },
  scrollContainer: {
    padding: 20,
    flexGrow: 1,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
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
