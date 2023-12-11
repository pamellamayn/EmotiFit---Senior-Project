import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {

  const navigation = useNavigation();
//Profile Page
//Make future edits so that page kind of looks like iPhone Settings app layout
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Profile</Text>

      <Text style={styles.background}>
        <Text style={styles.buttonText}>Name: John Doe{'\n'}</Text>
        <Text style={styles.buttonText}>Age: 20{'\n'}</Text>
        <Text style={styles.buttonText}>Phone Number: (775)123-4567{'\n'}</Text>
        <Text style={styles.buttonText}>Email: EmotiFit@nevada.unr.edu</Text>
      </Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Change Photo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Change Email</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>

      <Button title="Log Out" onPress={() => navigation.navigate('Welcome2')}/>
    </View>
  );
};

const styles = StyleSheet.create({

    background: {
        backgroundColor: '#000000',
        paddingVertical: 12,
        paddingHorizontal: 14,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
      },
  container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
  },
  title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        justifyContent: 'flex-start',
        bottom: 120
  },
  button: {
        backgroundColor: '#0884af',
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
  },
  buttonText: {
        color: '#fff',
        fontWeight: 'bold',
  },
});

export default ProfileScreen;
