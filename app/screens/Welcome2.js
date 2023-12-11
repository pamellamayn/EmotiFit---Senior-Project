import React from 'react';
import { StyleSheet, SafeAreaView, View, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Welcome() {
    const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.img}>
        <Image
          source={require("../assets/background.jpg")}
          style={styles.imageBackground}
          resizeMode="contain"
        />
      </View>
      <View style={styles.mainText}>
        <View style={styles.contentHeader}>
          <Text style={styles.title}>
            Workouts have never been the same{'\n'}without{' '}
            <View style={styles.appName}>
              <Text style={styles.appNameText}>EmotiFit</Text>
            </View>
          </Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Let's get started</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    backgroundColor: '#777777',
    margin: 10,
    borderRadius: 12,
    padding: 12,
    top: 30,
  },
  imageBackground: {
    width: '100%',
    height: 350,
  },
  mainText: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 25,
    paddingHorizontal: 25,
  },
  contentHeader: {
    paddingHorizontal: 20,
  },
  title: {
    top: 30,
    fontSize: 30,
    fontWeight: '500',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 39,
  },
  appName: {
    paddingHorizontal: 6,
  },
  appNameText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0884af',
  },
  text: {
    fontSize: 15,
    lineHeight: 24,
    fontWeight: '400',
    color: '#000000',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#0884af',
    paddingVertical: 12,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#fff',
  },
});