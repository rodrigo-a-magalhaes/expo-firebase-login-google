import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase/app';
import React, { useContext, useState } from 'react';
import { ImageBackground, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImageBG from '../assets/bg.png';
import { Button } from '../components/Button';
import { AuthUserContext } from '../hooks/AuthUserProvider';

export function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(AuthUserContext);
  const navigation = useNavigation();

  async function handleSubmit() {
    const result = await firebase.database().ref('/users/').push({
      name: name,
      email: email,
      password: password
    });

    if (result) {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          setUser(userCredential);
          console.log(userCredential);
          navigation.navigate('Welcome');
        })
        .catch((error) => {
          console.log(error)
        });

    }

  }

  return (
    <ImageBackground source={ImageBG} style={styles.image}>
      <SafeAreaView style={styles.container}>

        <View style={styles.content}>
          <Text style={styles.title}>Cadastrar</Text>
          <View>
            <TextInput
              placeholder="Seu Nome"
              textContentType="name"
              keyboardType="default"
              autoCapitalize="none"
              style={styles.input}
              onChangeText={(value: string) => setName(value)}
            />

            <TextInput
              placeholder="Seu email"
              textContentType="emailAddress"
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
              onChangeText={(value: string) => setEmail(value)}
            />

            <TextInput
              placeholder="Sua Senha"
              textContentType="password"
              keyboardType="default"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry
              style={styles.input}
              onChangeText={(value: string) => setPassword(value)}
            />

            <Button title="Cadastrar" onPress={handleSubmit} />
          </View>

        </View>

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
  content: {
    paddingHorizontal: 22
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  input: {
    backgroundColor: '#fff',
    marginBottom: 12,
    borderRadius: 8,
    padding: 12
  }
});
