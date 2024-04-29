import 'dotenv/config';
import Config from 'react-native-config';
import firebase from 'firebase/compat';
import 'firebase/firestore';

//Initializing Firebase
const app = firebase.initializeApp({
    apiKey: Config.API_KEY,
    authDomain: Config.AUTH_DOMAIN,
    projectId: Config.PROJECT_ID,
    storageBucket: Config.STORAGE_BUCKET,
    messagingSenderId: Config.MESSAGING_SENDER_ID,
    appId: Config.APP_ID,
  });
  
  const auth = firebase.auth();
  
  export { auth };
  