import React from "react";
import 'react-native-gesture-handler';

import Home from './app/screens/Home';
//import Spotify from './app/screens/Spotify';

//React Navigation Stack
import RootStack from './app/navigator/RootStack';

export default function App() {

  return <RootStack />;

}