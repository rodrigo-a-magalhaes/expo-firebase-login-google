import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { ImageBackground, Image, Text, StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImageBG from '../assets/bg.png';
import { Button } from '../components/Button';
import GoogleImage from '../assets/logo-google.png';
import * as Google from "expo-google-app-auth";
import firebase from 'firebase/app';

export function SignIn() {
  const navigation = useNavigation();

  const handleRegister = () => {
    navigation.navigate('Register');
  }

  async function handleGoogle() {
    console.log("LoginScreen.js 6 | loggin in");
    try {
      const { type, user }: any = await Google.logInAsync({
        iosClientId: `<ID_GOOGLE_CREDENTIAL_IOS>`,
        androidClientId: `<ID_GOOGLE_CREDENTIAL_ANDROID>`,
      });

      if (type === "success") {
        // Falta registrar no firebase

        // Then you can use the Google REST API
        console.log("LoginScreen.js 17 | success, navigating to profile");
        navigation.navigate("Welcome", { user });
      }
    } catch (error) {
      console.log("LoginScreen.js 19 | error with login", error);
    }
  }

  function onSignIn(googleUser: any) {
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.getAuthResponse().id_token);

        // Sign in with credential from the Google user.
        firebase.auth().signInWithCredential(credential)
          .then(() => {
            console.log('User signed in')
          })
          .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
      } else {
        console.log('User already signed-in Firebase.');
      }
    });
  }

  function isUserEqual(googleUser: any, firebaseUser: any) {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }

  return (
    <ImageBackground source={ImageBG} style={styles.image}>
      <SafeAreaView style={styles.container}>

        <View style={styles.content}>
          <Text style={styles.title}>Login</Text>

          <View>
            <TextInput
              placeholder="Seu email"
              textContentType="emailAddress"
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
            />

            <TextInput
              placeholder="Sua Senha"
              textContentType="password"
              keyboardType="default"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry
              style={styles.input}
            />

            <Button title="Entrar" />

          </View>

          <View style={styles.divider}  >
            <View style={styles.dividerLine}>
            </View>
          </View>


          <TouchableOpacity
            style={styles.boxLogo}
            onPress={handleGoogle}
          >
            <Image style={styles.logo} source={GoogleImage} />
            <Text>Sign In</Text>
          </TouchableOpacity>

          <View style={styles.boxRegister}>
            <Button onPress={handleRegister} variante="link" title="Não tem conta?" />
          </View>

        </View>



      </SafeAreaView>
    </ImageBackground>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  boxRegister: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical: 12
  },
  title: {
    color: '#ffffff',
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 22
  },
  boxLogo: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    width: '100%',
    marginBottom: 12
  },
  logo: {
    width: 22,
    height: 22,
    marginRight: 12
  },
  content: {
    paddingHorizontal: 22
  },
  dividerLine: {
    height: 1,
    width: '100%',
    backgroundColor: '#fff'
  },
  divider: {
    paddingVertical: 22,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  text: {
    color: 'grey',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30
  },
  input: {
    backgroundColor: '#fff',
    marginBottom: 12,
    borderRadius: 8,
    padding: 12
  }
});
