import React from 'react';
import Routes from './src/routes';

import firebase from 'firebase';
import { firebaseConfig } from './config';
import { AuthUserProvider } from './src/hooks/AuthUserProvider';
firebase.initializeApp(firebaseConfig);

export default function App() {
  return (
    <AuthUserProvider>
      <Routes />
    </AuthUserProvider>
  )
}
