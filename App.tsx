import React from 'react';
import { MainNavigation } from './src/navigations';
import firebase from 'firebase';
import { firebaseConfig } from './src/config/firebase-config';

firebase.initializeApp(firebaseConfig)

export default function App() {
  return (
    <MainNavigation/>
  );
}
