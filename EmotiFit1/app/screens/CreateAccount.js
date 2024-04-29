import React, { useState } from 'react';
import { ScrollView, StyleSheet, SafeAreaView, View, Image, Text, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase';

export default function CreateAccount() {

  const navigation = useNavigation();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')



  const handleSignUp = () => {
      auth
          .createUserWithEmailAndPassword(email, password)
          .then(userCredentials => {
              const user = userCredentials.user;

              console.log('The display name for this user is', user.displayName)
              console.log('Created an account with', user.email)
          })
          .catch(error => alert(error.message))
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            alt=""
            resizeMode="contain"
            style={styles.headerImg}
            source={require("../assets/logo.png")}
          />

          <Text style={styles.title}>
            Create an Account with <Text style={{ color: '#0884af' }}>EmotiFit</Text>
          </Text>

          <Text style={styles.subtitle}>
            Sign up to access EmotiFit and enjoy personalized features!
          </Text>
        </View>

        <View style={styles.form}>

        {/*
            //FIGURE THIS OUT SO THAT THE USER DOESN'T HAVE TO INPUT THEIR NAME AFTER THEY CREATE AN ACCOUNT
        <View style={styles.input}>
            <Text style={styles.inputLabel}>Full Name</Text>

            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="default"
              onChangeText={name => setName(name)}
              placeholder="John Doe"
              placeholderTextColor="#949494"
              style={styles.inputControl}
              //value={form.name}
            />
          </View>*/}

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Email address</Text>

            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={text => setEmail(text)}
              placeholder="emotifit@nevada.unr.edu"
              placeholderTextColor="#949494"
              style={styles.inputControl}
            />
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Password</Text>

            <TextInput
              autoCorrect={false}
              onChangeText={text => setPassword(text)}
              placeholder="********"
              placeholderTextColor="#949494"
              style={styles.inputControl}
              secureTextEntry={true}
            />
            <Text style={styles.subtitle2}>Please enter a password with at least 6 characters, including 1 special character.</Text>
          </View>

          {/*
          
          //FIGURE OUT A WAY TO VERIFY THAT THE PASSWORDS MATCH!!!!
          
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Confirm Password</Text>

            <TextInput
              autoCorrect={false}
              onChangeText={(password) => setForm({ ...form, password })}
              placeholder="********"
              placeholderTextColor="#949494"
              style={styles.inputControl}
              secureTextEntry={true}
              //value={form.password}
            />
          </View>*/}


          <View style={styles.formAction}>
            <TouchableOpacity onPress={handleSignUp}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Create Account</Text>
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={{ marginTop: 'auto' }}>
            <Text style={styles.formFooter}>
              Already have an account?{' '}
              <Text style={{ textDecorationLine: 'underline' }}>Sign in</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 26,
  },
  
  container: {
    bottom: 60,
    flex: 1,
    flexGrow: 1,
    flexBasis: 0,
    flexShrink: 1,
    padding: 20,
  },
  
  form: {
    bottom: 70,
    flex: 1,
    flexGrow: 1,
    flexBasis: 0,
    flexShrink: 1,
    marginBottom: 24,
  },
  
  formAction: {
    marginVertical: 30,
  },
  
  formFooter: {
    color: '#222',
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: 0.15,
    textAlign: 'center',
  },
  
  header: {
    marginVertical: 36,
  },
  
  headerImg: {
    alignSelf: 'center',
    bottom: 30,
    height: 200,
    marginBottom: 20,
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
    fontWeight: '500',
    height: 44,
    paddingHorizontal: 16,
  },
  
  inputLabel: {
    color: '#222',
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 8,
  },

  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },

  subtitle: {
    bottom: 60,
    color: '#929292',
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
  },

  subtitle2: {
    top: 15,
    color: '#929292',
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
  },

  title: {
    bottom: 65,
    color: '#1d1d1d',
    fontSize: 27,
    fontWeight: '700',
    marginBottom: 6,
    textAlign: 'center',
  },
  
  });