import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { db, auth } from '../../FirebaseConfig';
import { collection, addDoc, getDocs, query, where, orderBy } from 'firebase/firestore';

type Meal = {
  id: string;
  name: string;
  calories: number;
  date: Date; // Use a proper Date object
};

const Meals = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Fetch meals from Firestore
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const userId = auth.currentUser?.uid;
        if (!userId) return;

        const mealsRef = collection(db, 'meals');
        const mealsQuery = query(
          mealsRef,
          where('userId', '==', userId),
          orderBy('date', 'desc') // Order by date in descending order
        );

        const querySnapshot = await getDocs(mealsQuery);
        const fetchedMeals = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            date: (data.date as any).toDate(), // Convert Firestore Timestamp to Date object
          };
        }) as Meal[];

        setMeals(fetchedMeals);
      } catch (error) {
        console.error('Error fetching meals:', error);
      }
    };

    fetchMeals();
  }, []);

  // Add a new meal
  const addMeal = async () => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) {
        Alert.alert('Error', 'User not authenticated.');
        return;
      }

      if (!name || !calories || !date) {
        Alert.alert('Error', 'All fields are required.');
        return;
      }

      const mealRef = await addDoc(collection(db, 'meals'), {
        userId,
        name,
        calories: parseInt(calories),
        date: date, // Store as a Date object
      });

      setMeals(prevMeals => [
        { id: mealRef.id, name, calories: parseInt(calories), date },
        ...prevMeals,
      ]);
      setName('');
      setCalories('');
      setDate(new Date());
    } catch (error) {
      console.error('Error adding meal:', error);
      Alert.alert('Error', 'Failed to add meal.');
    }
  };

  // Handle date selection
  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Past Meals</Text>

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="Meal Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Calories"
        value={calories}
        onChangeText={setCalories}
        keyboardType="numeric"
      />

      <Button title="Select Date" onPress={() => setShowDatePicker(true)} />
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}
      <Text style={styles.dateText}>Selected Date: {date.toDateString()}</Text>

      <Button title="Add Meal" onPress={addMeal} />

      {/* List of Meals */}
      <FlatList
        data={meals}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.mealItem}>
            <Text style={styles.mealText}>Name: {item.name}</Text>
            <Text style={styles.mealText}>Calories: {item.calories}</Text>
            <Text style={styles.mealText}>Date: {item.date.toDateString()}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Meals;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  dateText: {
    fontSize: 16,
    marginVertical: 10,
  },
  mealItem: {
    marginVertical: 8,
    padding: 10,
    backgroundColor: '#e9e9e9',
    borderRadius: 4,
  },
  mealText: {
    fontSize: 16,
  },
});
