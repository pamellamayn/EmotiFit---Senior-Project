//Insert Chatbot information here from Johnathon
import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Configuration, OpenAIAPI } from 'openai';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export default function Chatbot() {

    return(
      <View style={styles.container}>
        <View style={styles.text}>
        <View style={styles.textInput}>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Ask the assistant anything..."
              placeholderTextColor="#9eadba"
              style={styles.input} />
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            // Add onPress functionality here!!!!! should connect to chatgpt API
          }}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>Send</Text>
          </View>
        </TouchableOpacity>
        </View>
        </View>

        
    )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    bottom: 35,
  },
  title: {
    color: '#1d1d1d',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 0,
    textAlign: 'center',
    bottom: 330
  },
  text: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    marginRight: 12,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: '#0884af',
    borderColor: '#0884af',
  },
  btnText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '600',
    color: '#fff',
  },
  input: {
    height: 44,
    backgroundColor: '#f0f6fb',
    paddingLeft: 44,
    paddingRight: 24,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
  },
  inputWrapper: {
    position: 'relative',
    width: '100%',
  },
  inputIcon: {
    position: 'absolute',
    width: 44,
    height: 44,
    top: 0,
    left: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});