import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { db, auth } from '../../FirebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type EditAttributesProps = NativeStackScreenProps<RootStackParamList, 'EditAttributes'>;

const EditAttributes: React.FC<EditAttributesProps> = ({ route, navigation }) => {
  const { name: initialName = '', age: initialAge = '', location: initialLocation = '', language: initialLanguage = '' } =
    route.params || {};

  // Initialize state with params
  const [name, setName] = useState(initialName);
  const [age, setAge] = useState(initialAge);
  const [location, setLocation] = useState(initialLocation);
  const [language, setLanguage] = useState(initialLanguage);

  const saveAttributes = async () => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) {
        alert('User not authenticated.');
        return;
      }

      await setDoc(doc(db, 'users', userId), {
        name,
        age,
        location,
        language,
      });
      alert('Attributes saved successfully!');
      navigation.goBack();
    } catch (error) {
      console.error('Error saving attributes:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
      <TextInput
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput placeholder="Location" value={location} onChangeText={setLocation} style={styles.input} />
      <TextInput placeholder="Language" value={language} onChangeText={setLanguage} style={styles.input} />
      <Button title="Save" onPress={saveAttributes} />
    </View>
  );
};

export default EditAttributes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 4,
  },
});
