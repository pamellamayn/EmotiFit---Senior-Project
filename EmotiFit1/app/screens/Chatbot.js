import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import Config from 'react-native-config'; 

export default function Chatbot() {
  const [userInput, setUserInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [isChatting, setIsChatting] = useState(false);

  const sendChatMessage = async () => {
    try {
      //Fix punctuation/extra empty spaces
      const userMessage = userInput.trim();
      //NO empty messages sending to API!!
      if (userMessage === '') return;

      setChatMessages(prevMessages => [...prevMessages, { role: 'user', content: userMessage }]);
      setUserInput('');
      setIsChatting(true);

      //Chatbot API Calls to OpenAI
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'user', content: userMessage },
            { role: 'assistant', content: 'You are a knowledgeable stationary workout assistant.' },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            //API KEY HIDDEN IN OTHER FILE
            'Authorization': `Bearer ${Config.OPENAI_KEY}`,
          },
        }
      );

      const assistantResponse = response.data.choices[0].message.content;
      setChatMessages(prevMessages => [ ...prevMessages,
        { role: 'assistant', content: assistantResponse },
      ]);
      setIsChatting(false);
    } catch (error) {
      //Sending error logs 
      console.error('Error sending message:', error.response?.data || error.message);
      setIsChatting(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.chatContainer}>
        {chatMessages.map((message, index) => (
          <View key={index} style={message.role === 'user' ? styles.userBubble : styles.assistantBubble}>
            <Text style={styles.chatText}>{message.content}</Text>
          </View>
        ))}
        {isChatting && (
          //Adds visualizer so user can see it got the response
          <View style={styles.typingIndicator}>
            <ActivityIndicator size="small" color="#0884af" />
            <Text style={styles.typingText}>Generating response...</Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          //Textbox for input
          placeholder="Ask the assistant anything..."
          placeholderTextColor="#9eadba"
          style={styles.input}
          value={userInput}
          onChangeText={(text) => setUserInput(text)}
        />
        <TouchableOpacity onPress={sendChatMessage}>
          <View style={styles.sendButton}>
            <Text style={styles.sendButtonText}>Send</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

//All of the styling for the Chatbot Screen :)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#f0f0f0',
  },
  chatContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  userBubble: {
    backgroundColor: '#0884af',
    alignSelf: 'flex-end',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  assistantBubble: {
    backgroundColor: '#787A7A',
    alignSelf: 'flex-start',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  chatText: {
    color: '#ffffff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 10,
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#cccccc',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  sendButton: {
    backgroundColor: '#0884af',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  sendButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginBottom: 10,
  },
  typingText: {
    marginLeft: 10,
    color: '#555555',
    fontStyle: 'italic',
  },
});
