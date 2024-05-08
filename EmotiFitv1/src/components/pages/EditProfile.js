import * as React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { getAuth, updateProfile, updateEmail } from '@react-native-firebase/auth';

const auth = getAuth();

const EditProfile = () => {
  const [displayName, setDisplayName] = React.useState('');
  const [email, setEmail] = React.useState('');

  const handleUpdateProfile = () => {
    if (auth.currentUser) {
      updateProfile(auth.currentUser, {
        displayName: displayName,
      })
        .then(() => {
          Alert.alert('Success', 'Your display name has been updated');
        })
        .catch((error) => {
          Alert.alert('Error', error.message);
        });
    } else {
      Alert.alert('Error', 'User is not authenticated');
    }
  };

  const handleUpdateEmail = () => {
    if (auth.currentUser) {
      updateEmail(auth.currentUser, email)
        .then(() => {
          Alert.alert('Success', 'Your email has been updated');
        })
        .catch((error) => {
          Alert.alert('Error', error.message);
        });
    } else {
      Alert.alert('Error', 'User is not authenticated');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Update your display name here"
        value={displayName}
        onChangeText={setDisplayName}
        keyboardType="default"
        autoCapitalize="none"
      />
      <TouchableOpacity onPress={handleUpdateProfile}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Change display name</Text>
        </View>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Update your email here"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity onPress={handleUpdateEmail}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Change email</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#0884af',
    borderColor: '#0884af',
    borderRadius: 8,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default EditProfile;
