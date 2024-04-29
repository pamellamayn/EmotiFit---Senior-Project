import * as React from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { auth } from '../firebase';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = React.useState('');

  const handleForgotPassword = () => {
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        alert('Password reset email sent. Check your inbox.');
      })
      .catch(error => {alert(error.message);
      });
  };

return (
    
    <View style={styles.container}>
      <Text>Enter your email here to send a recovery password email:</Text>
      <Text> </Text>
        <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
        />
        <TouchableOpacity 
            onPress={ handleForgotPassword }
        >
            <View style={styles.button}>
                <Text style={styles.buttonText}>Reset Password</Text>
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

export default ForgotPasswordScreen;
