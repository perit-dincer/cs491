import { View, TextInput, ActivityIndicator, Button, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { auth } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App'; // Import the type

// Define props type for the Login screen
type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Login = ({ navigation }: LoginScreenProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      navigation.navigate('Home'); // TypeScript now recognizes this as valid
    } catch (error) {
      console.log(error);
      alert('Failed at login');
    } finally {
      setLoading(false);
    }
  };

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response);
      alert('Account created successfully');
    } catch (error) {
      console.log(error);
      alert('Failed at create');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput 
        value={email} 
        style={styles.input} 
        placeholder="Email" 
        autoCapitalize="none" 
        onChangeText={(text) => setEmail(text)} 
      />
      <TextInput 
        secureTextEntry={true} 
        value={password} 
        style={styles.input} 
        placeholder="Password" 
        autoCapitalize="none" 
        onChangeText={(text) => setPassword(text)} 
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Button title="Login" onPress={signIn} />
          <Button title="Create" onPress={signUp} />
        </>
      )}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff',
  },
});
