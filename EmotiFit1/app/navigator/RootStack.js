import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import Login from '../screens/Login';
import CreateAccount from '../screens/CreateAccount';
import Welcome2 from '../screens/Welcome2';
import HomeScreen from '../screens/Home';
import Profile from '../screens/Profile';
import Workout from '../screens/WorkoutData';
import Chatbot from '../screens/Chatbot';
import Music from '../screens/Music';
import ForgotPassword from '../screens/ForgotPassword';
import EditProfile from '../screens/EditProfile';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome to EmotiFit">
        <Stack.Screen name="Welcome to EmotiFit" component={Welcome2} />
        <Stack.Screen name="Login" component={Login} options={{ headerBackTitleVisible: false }} />
        <Stack.Screen name="Create Account" component={CreateAccount} options={{ headerBackTitleVisible: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerBackVisible: false }} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Workouts" component={Workout} options={{ headerBackTitleVisible: false }} />
        <Stack.Screen name="Chatbot" component={Chatbot} options={{ headerBackTitleVisible: false }} />
        <Stack.Screen name="Music" component={Music} options={{ headerBackTitleVisible: false }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerBackTitleVisible: false }} />
        <Stack.Screen name="Edit Profile" component={EditProfile} options={{ headerBackTitleVisible: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
