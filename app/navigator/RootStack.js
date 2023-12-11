import React from 'react';

import {Colors} from "../config/colors";

//React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';

//Screens
import Login from "../screens/Login";
import CreateAccount from "../screens/CreateAccount";
import Welcome2 from "../screens/Welcome2";
import HomeScreen from '../screens/Home';
import Profile from '../screens/Profile';
import Workout from '../screens/WorkoutData';

const Stack = createNativeStackNavigator();

const RootStack = () => {

    return(
        
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Welcome'>
                
                <Stack.Screen name="Welcome to EmotiFit" component={Welcome2} />
                <Stack.Screen name="Login" component={Login} options={{headerBackTitleVisible: false}}/>
                <Stack.Screen name="Create Account" component={CreateAccount} options={{headerBackTitleVisible: false}}/>
                <Stack.Screen name="Home" component={HomeScreen} options={{headerBackVisible: false}} />
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="Workout Data" component={Workout} options={{headerBackTitleVisible: false}} />

            </Stack.Navigator>
        </NavigationContainer>


    );
};

export default RootStack;