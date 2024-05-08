import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Text, TouchableOpacity, View, Button, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const Workout = () => {
  const navigation = useNavigation();
  const db = firestore();
  const [workouts, setWorkouts] = useState<Array<{ name: string; description: string; duration: number }>>([]);

  const fetchWorkouts = async () => {
    try {
      const snapshot = await db.collection('workouts').get();
      const workoutList = snapshot.docs.map(doc => doc.data()) as Array<{ name: string; description: string; duration: number }>;
      setWorkouts(workoutList);
    } catch (error) {
      console.error('There was an error fetching the workouts: ', error);
      Alert.alert('There was an error fetching the workouts. Please try again.');
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Indoor cycling workouts 🚴</Text>

        <Button title="Add Workout" onPress={() => navigation.navigate("AddWorkout")} />

        {workouts && workouts.length > 0 ? (
          workouts.map(({ name, description, duration }, index) => (
            <TouchableOpacity key={index}>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>{name}</Text>
                <Text style={styles.cardDescription}>{description}</Text>
                <Text style={styles.cardDuration}>{duration} mins</Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text>No workouts available.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 12,
  },
  card: {
    paddingVertical: 16,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 13,
    color: '#636a73',
    marginBottom: 4,
  },
  cardDuration: {
    fontSize: 13,
    color: '#636a73',
  },
  cardInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardInfoItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  cardInfoItemText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#636a73',
    marginLeft: 2,
  },
  cardAction: {
    marginLeft: 'auto',
  },
})

export default Workout;