import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../../FirebaseConfig';

type UserAttributes = {
  name: string;
  age: string;
  location: string;
  language: string;
  profilePicture: string;
  email: string;
};

const Profile = () => {
  const [userAttributes, setUserAttributes] = useState<UserAttributes>({
    name: '',
    age: '',
    location: '',
    language: '',
    profilePicture:
      'https://staff.bilkent.edu.tr/aatalar/wp-content/uploads/sites/109/2018/12/b_AAImage-277x300.png', // Default profile picture
    email: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserAttributes = async () => {
      try {
        const userId = auth.currentUser?.uid;
        const userEmail = auth.currentUser?.email;

        if (!userId) {
          alert('User not authenticated.');
          return;
        }

        const userDoc = await getDoc(doc(db, 'users', userId));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserAttributes({
            name: data.name || 'No name provided',
            age: data.age || 'N/A',
            location: data.location || 'N/A',
            language: data.language || 'N/A',
            profilePicture:
              data.profilePicture ||
              'https://staff.bilkent.edu.tr/aatalar/wp-content/uploads/sites/109/2018/12/b_AAImage-277x300.png',
            email: userEmail || 'No email available',
          });
        } else {
          alert('User attributes not found.');
        }
      } catch (error) {
        console.error('Error fetching user attributes:', error);
        alert('Failed to fetch user attributes.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserAttributes();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: userAttributes.profilePicture }} style={styles.profileImage} />
      <Text style={styles.name}>{userAttributes.name}</Text>
      <Text style={styles.attribute}>Email: {userAttributes.email}</Text>
      <Text style={styles.attribute}>Age: {userAttributes.age}</Text>
      <Text style={styles.attribute}>Location: {userAttributes.location}</Text>
      <Text style={styles.attribute}>Language: {userAttributes.language}</Text>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  attribute: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
});
