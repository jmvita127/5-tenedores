import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import {LogBox} from 'react-native';
import Navigation from './app/navigations/Navigation';
import {firebaseApp} from './app/utils/firebase';
import * as firebase from 'firebase';

export default function App() {
  // //testing firebase connection
  // useEffect(() => {
  //   firebase.auth().onAuthStateChanged((user) => {
  //     console.log(user);
  //   })
  // }, []);
  //evitar warnings al momento de cambiar avatar
  LogBox.ignoreLogs(["Setting a timer"])
  return <Navigation />;
}

