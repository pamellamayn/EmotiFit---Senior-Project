import * as React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { getAuth, updateProfile } from 'firebase/auth';

const auth = getAuth();

const EditProfile = () => {
  const [displayName, setDisplayName] = React.useState('');
  const [email, setEmail] = React.useState('')

  const handleUpdateProfile = () => {
    updateProfile(auth.currentUser, {
      displayName: displayName,
    })
      .then(() => {
        alert('Your display name has been updated');
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleUpdateEmail = () => {
    updateProfile(auth.currentUser, {
        email: email,
    })
      .then(() => {
        alert('Your email has been updated')
      })
      .catch((error) => {
        alert(error.message);
      });
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
        keyboardType="default"
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
  inputControl: {
    backgroundColor: '#fff',
    borderRadius: 12,
    color: '#222',
    fontSize: 15,
    height: 44,
    paddingHorizontal: 16,
    fontWeight: '500',
  },
  inputLabel: {
    color: '#222',
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 8,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#0884af',
    borderColor: '#0884af',
    borderRadius: 8,
    bottom: 10,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 26,
  },
});

export default EditProfile;
