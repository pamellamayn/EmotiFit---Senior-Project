import React from 'react';

//React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Screens
import Login from "./components/pages/Login";
import CreateAccount from "./components/pages/CreateAccount";
import Welcome from "./components/pages/Welcome";
import Home from "./components/pages/Home";
import Profile from "./components/pages/Profile";
import Workout from "./components/pages/Workout";
import Chatbot from "./components/pages/Chatbot";
import Music from "./components/pages/Music";
import ForgotPassword from "./components/pages/ForgotPassword";
import EditProfile from "./components/pages/EditProfile";
import AddWorkout from './components/pages/AddWorkout';

const Stack = createNativeStackNavigator();

//This enables for screens to move in between each other other than once the home page is loaded when the user is signed in.
const App = () => {

    return(

            <Stack.Navigator initialRouteName='Welcome'>
                
                <Stack.Screen name="Welcome to EmotiFit" component={Welcome} />
                <Stack.Screen name="Login" component={Login} options={{headerBackTitleVisible: false}}/>
                <Stack.Screen name="Create Account" component={CreateAccount} options={{headerBackTitleVisible: false}}/>
                <Stack.Screen name="Home" component={Home} options={{headerBackVisible: false}} />
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="Workouts" component={Workout} options={{headerBackTitleVisible: false}} />
                <Stack.Screen name="Chatbot" component={Chatbot} options={{headerBackTitleVisible: false}} />
                <Stack.Screen name="Music" component={Music} options={{headerBackTitleVisible: false}} />
                <Stack.Screen name="Forgot Password" component={ForgotPassword} options={{headerBackTitleVisible: false}} />
                <Stack.Screen name="Edit Profile" component={EditProfile} options={{headerBackTitleVisible: false}} />
                <Stack.Screen name="Add Workout" component={AddWorkout} options={{headerBackTitleVisible: false}} />


            </Stack.Navigator>

    );
};

export default App;