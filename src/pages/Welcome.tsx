import React from 'react';
import { ImageBackground, SafeAreaView, StyleSheet, Text } from 'react-native';
import ImageBG from '../assets/bg.png';

export function Welcome({ route, navigation }: any) {
  const { user } = route.params;
  console.log("user from google", user);

  return (
    <ImageBackground source={ImageBG} style={styles.image}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>
          Seja bem vindo(a) {user?.name}
        </Text>
      </SafeAreaView>
    </ImageBackground>
  )
}


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: '#ffffff',
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 22
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },

});
