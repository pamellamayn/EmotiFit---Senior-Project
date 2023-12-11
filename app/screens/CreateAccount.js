import React, { useState } from 'react';
import { ScrollView, StyleSheet, SafeAreaView, View, Image, Text, TouchableOpacity, TextInput } from 'react-native';
import { NativeScreenNavigationContainer } from 'react-native-screens';
import { useNavigation } from '@react-navigation/native';

export default function CreateAccount() {
  const navigation = useNavigation();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleCreateAccount = () => {
    //Implement the creating account stuff and it should go to home screen after successful login! :)
    alert('Account created successfully!');
  };

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

        <View style={styles.input}>
            <Text style={styles.inputLabel}>Full Name</Text>

            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="default"
              onChangeText={(name) => setForm({ ...form, name })}
              placeholder="John Doe"
              placeholderTextColor="#949494"
              style={styles.inputControl}
              value={form.name}
            />
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Phone Number</Text>

            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="number-pad"
              onChangeText={(phoneNumber) => setForm({ ...form, phoneNumber })}
              placeholder="(775) 012-3456"
              placeholderTextColor="#949494"
              style={styles.inputControl}
              value={form.phoneNumber}
            />
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Email address</Text>

            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={(email) => setForm({ ...form, email })}
              placeholder="emotifit@nevada.unr.edu"
              placeholderTextColor="#949494"
              style={styles.inputControl}
              value={form.email}
            />
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Password</Text>

            <TextInput
              autoCorrect={false}
              onChangeText={(password) => setForm({ ...form, password })}
              placeholder="********"
              placeholderTextColor="#949494"
              style={styles.inputControl}
              secureTextEntry={true}
              value={form.password}
            />
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Confirm Password</Text>

            <TextInput
              autoCorrect={false}
              onChangeText={(password) => setForm({ ...form, password })}
              placeholder="********"
              placeholderTextColor="#949494"
              style={styles.inputControl}
              secureTextEntry={true}
              value={form.password}
            />
          </View>


          <View style={styles.formAction}>
            <TouchableOpacity onPress={handleCreateAccount}>
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
  
  title: {
    bottom: 65,
    color: '#1d1d1d',
    fontSize: 27,
    fontWeight: '700',
    marginBottom: 6,
    textAlign: 'center',
  },
  
  });