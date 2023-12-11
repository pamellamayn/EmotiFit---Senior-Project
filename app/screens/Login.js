import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, SafeAreaView, View, Image, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Login() {

  const navigation = useNavigation();

  //Android/iOS 'Go Back' Screen disabled for mobile devices
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });
    return () => backHandler.remove();
  },[]);

  //Entering email & password information, DO NOT USE PLAINTEXT, will add MongoDB and authorization stuff later
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleLogin = () => {
    //Implement the creating account stuff and it should go to home screen after successful login! :)
    alert('Please enter your information!');
  };

  return (

    //All of the Login Page Screen stuff
    //KeyboardAvoidingView does not work right now, please fix later so that keyboard is not blocking the input field.
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={60}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            alt=""
            resizeMode="contain"
            style={styles.headerImg}
            source={require("../assets/logo.png")}
          />

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
              onChangeText={email => setForm({ ...form, email })}
              placeholder="EmotiFit@nevada.unr.edu"
              placeholderTextColor="#949494"
              style={styles.inputControl}
              value={form.email}
            />
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Password</Text>

            <TextInput
              autoCorrect={false}
              onChangeText={password => setForm({ ...form, password })}
              placeholder="Enter password here"
              placeholderTextColor="#949494"
              style={styles.inputControl}
              secureTextEntry={true}
              value={form.password}
            />
          </View>
          <View style={styles.formAction}>
            <TouchableOpacity 
              onPress={() => navigation.navigate('Home')}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Sign in</Text>
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("Create Account")}
            style={{ marginTop: 'auto' }}>
            <Text style={styles.formFooter}>
              Ready to get started?{' '}
              <Text style={{ textDecorationLine: 'underline' }}>Create an account</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      </KeyboardAvoidingView>
    </ScrollView>
    </SafeAreaView>
  );
}

//All of the UI looks written here
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
  formFooter: {
    color: '#222',
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: 0.15,
    textAlign: 'center',
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