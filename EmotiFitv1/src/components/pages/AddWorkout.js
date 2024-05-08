import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const AddWorkout = ({ navigation }) => {

  const db = firestore();
  
  const [workoutName, setWorkoutName] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');

  const handleAddWorkout = async () => {
    try {
      await db.collection('workouts').add({
        name: workoutName,
        description: description,
        duration: parseInt(duration),
      });
      Alert.alert('Workout added successfully!');
      navigation.goBack();
    } catch (error) {
      console.error('Error adding workout: ', error);
      Alert.alert('There was an error trying to add your workout. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Workout Name</Text>
      <TextInput
        style={styles.input}
        value={workoutName}
        onChangeText={text => setWorkoutName(text)}
        placeholder="Enter workout name"
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={text => setDescription(text)}
        placeholder="Enter description"
        multiline
      />

      <Text style={styles.label}>Duration (minutes)</Text>
      <TextInput
        style={styles.input}
        value={duration}
        onChangeText={text => setDuration(text)}
        placeholder="Enter duration"
        keyboardType="numeric"
      />

      <Button title="Add Workout" onPress={handleAddWorkout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default AddWorkout;