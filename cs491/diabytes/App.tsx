import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './app/screens/Login';
import Home from './app/screens/Home';
import EditAttributes from './app/screens/EditAttributes';
import ImageView from './app/screens/ImageView';
import CalculateCalories from './app/screens/CalculateCalories';
import Meals from './app/screens/Meals';
import Settings from './app/screens/Settings';
import Statistics from './app/screens/Statistics';
import Profile from './app/screens/Profile';

// Define the type for navigation parameters
export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  EditAttributes: {
    name: string;
    age: string;
    location: string;
    language: string;
  };
  Meals: undefined;
};

// Create the stack navigator with the correct type
const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {

  
  return (
      
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="EditAttributes" component={EditAttributes} />
		<Stack.Screen name="ImageView" component={ImageView} />
		<Stack.Screen name="CalculateCalories" component={CalculateCalories} />
		<Stack.Screen name="Settings" component={Settings} />
    	<Stack.Screen name="Meals" component={Meals} />
		<Stack.Screen name="Statistics" component={Statistics} />
    <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );

  
};

export default App;
