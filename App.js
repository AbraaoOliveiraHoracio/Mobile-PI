import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';

// Componente de Login
const LoginScreen = ({ setScreen }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState();

  const loginUser = () => {
    if (email && password) {
      Alert.alert('Success', 'User Logged In Successfully', [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
      setScreen('Aluno');
    } else {
      Alert.alert('Error', 'Please enter a valid email and password', [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder='Email'
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <Button
          title='Login'
          onPress={loginUser}
          color='black'
        />
      </View>
    </View>
  );
};

// Componente de Aluno
const Aluno = ({ setScreen }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seja bem-vindo(a)</Text>
      <Text style={styles.name}>Carlos</Text>
      <Button title="Gerenciar Cursos" onPress={() => console.log('Gerenciar Cursos')} />
      <Button title="Cadastrar Professor" onPress={() => console.log('Cadastrar Professor')} />
      <Button title="Voltar para o Login" onPress={() => setScreen('Login')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  card: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    padding: 10,
    width: '80%',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 5,
    padding: 5,
  },
  name: {
    fontSize: 20,
    marginBottom: 30,
  },
});

export default function App() {
  const [screen, setScreen] = useState('Login');

  return (
    <View style={styles.container}>
      {screen === 'Login' && <LoginScreen setScreen={setScreen} />}
      {screen === 'Aluno' && <Aluno setScreen={setScreen} />}
    </View>
  );
}
