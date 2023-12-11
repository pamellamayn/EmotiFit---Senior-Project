import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import BottomNav from '../navigator/BottomNav';


const HomeScreen = ({ navigation }) => {
  return (

    <View style={styles.container}>
      <View style={styles.userWelcome}>
        <Text>Welcome John Doe!</Text>
        <TouchableOpacity
          style={styles.editProfileButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity 
            style={styles.workoutDataButton}
            onPress={() => navigation.navigate('Workout Data')}
        >
            <Text>Workout Data</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBar: {
    width: '100%',
    backgroundColor: '#3498db',
    paddingVertical: 30,
    alignItems: 'center',
    bottom: 340,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    alignContent: 'center',
    color: 'white',
    top: 15,
    right: 4,
  },
  userWelcome: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 1,
  },
  editProfileButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  workoutDataButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 5,
  },
});

export default HomeScreen;


//Find a way to implement this like the BottomNav.js file so that the buttons can be near the bottom of the screen.
/*        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#e0e0e0',
        paddingVertical: 25,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
*/