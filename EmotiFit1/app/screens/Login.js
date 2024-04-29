import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, SafeAreaView, View, Image, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, BackHandler, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase';

export default function Login() {

  const navigation = useNavigation();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  //Makes sure that it doesn't kick user out if still logged in with refreshes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace('Home')
      }
    })

    return unsubscribe
  }, [])

  //This uses Firebase to do login
  const handleLogin = () => {
    auth
        .signInWithEmailAndPassword(email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log('Signed in with', user.email)
        })
        .catch(error => alert(error.message))
  }


  return (

    //All of the Login Page Screen stuff
    //KeyboardAvoidingView does not work right now, please fix later so that keyboard is not blocking the input field.
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined} keyboardVerticalOffset={60}>

      <View style={styles.container}>
        <View style={styles.header}>

          <Image alt="" resizeMode="contain" style={styles.headerImg} source={require("../assets/logo.png")} />

          <Text style={styles.title}>
            Sign in to <Text style={{ color: '#0884af' }}>EmotiFit</Text>
          </Text>

          <Text style={styles.subtitle}>
            Log in to access EmotiFit, or create an account!
          </Text>

        </View>

        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Email address</Text>

            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={text => setEmail(text)}
              placeholder="EmotiFit@nevada.unr.edu"
              placeholderTextColor="#949494"
              style={styles.inputControl}
            />
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Password</Text>

            <TextInput
              autoCorrect={false}
              onChangeText={text => setPassword(text)}
              placeholder="Enter password here"
              placeholderTextColor="#949494"
              style={styles.inputControl}
              secureTextEntry={true}
            />
          </View>
          <View style={styles.formAction}>
            <TouchableOpacity 
              onPress={handleLogin}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Sign in</Text>
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("Create Account")}
            style={{ marginTop: 'auto' }}>
            <Text style={styles.formBottom}>
              Ready to get started?{' '}
              <Text style={{ textDecorationLine: 'underline' }}>Create an account</Text>
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
          //Added Forgot Password implementation, Firebase helps take care of it
            onPress={() => navigation.navigate("ForgotPassword")}
            style={{ marginTop: 'auto' }}>
            <Text style={styles.formBottom}>
              Forgot password?{' '}
              <Text style={{ textDecorationLine: 'underline' }}>Reset password here</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      </KeyboardAvoidingView>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#0884af',
    borderColor: '#0884af',
    borderRadius: 8,
    bottom: 25,
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
  container: {
    flex: 1,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    padding: 24,
  },
  form: {
    flex: 1,
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 1,
    marginBottom: 24,
  },
  formAction: {
    marginVertical: 24,
  },
  formBottom: {
    color: '#222',
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: 0.15,
    textAlign: 'center',
    marginTop: 15,
  },
  header: {
    marginVertical: 25,
  },
  headerImg: {
    backgroundColor: '#777777',
    margin: 10,
    borderRadius: 8,
    padding: 4,
    alignSelf: 'center',
    height: 200,
    marginBottom: 5,
    width: 200,
  },
  input: {
    marginBottom: 16,
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
  subtitle: {
    color: '#929292',
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
  },
  title: {
    color: '#1d1d1d',
    fontSize: 27,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
});