import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Text, TouchableOpacity, View, Image, Button } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import firebase from 'firebase/compat';
import 'firebase/firestore';


const workouts = () => {
  const db = firebase.firestore();
  const [workouts, setWorkouts] = useState([]);

  const fetchWorkouts = async () => {
    try{
      const snapshot = await db.collection('workouts').get();
      const workoutList = snapshot.docs.map(doc => doc.data());
      setWorkouts(workoutList);
    }catch(error){
      console.error('There was an error fetching the workouts: ', error);
      Alert.alert('There was an error fetching the workouts. Please try again.');
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const addWorkout = async (workoutData) => {
    try{
      await db.collection('workouts').add(workoutData);
      Alert.alert('Your workout was added successfully.');
      fetchWorkouts();
    }catch(error){
      console.error('Error adding workout: ', error);
      Alert.alert('There was an error trying to add your workout. Please try again.');
    }
  }
};

export default function Workout() {
  return (
    <SafeAreaView style={{ backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.container}>

        <Text style={styles.title}>EmotiBit Visualizer</Text>
        
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text>Data:</Text>
        <Text></Text>


        <Text style={styles.title}>Indoor cycling workouts 🚴</Text>

        <Button title="Add Workout" onPress={() => addWorkout({ name: 'New Workout', duration: 30 })} />

        {workouts && workouts.length > 0 ? (
          workouts.map(({ name, duration }, index) => (
            <TouchableOpacity key={index}>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>{name}</Text>
                <View style={styles.cardInfo}>
                  <FeatherIcon color="#636a73" name="clock" />
                  <Text style={styles.cardInfoItemText}>{duration} mins</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text>No workouts available.</Text>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

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
    paddingVertical: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  cardimage: {
    width: 50,
    height: 50,
    borderRadius: 9999,
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
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
});