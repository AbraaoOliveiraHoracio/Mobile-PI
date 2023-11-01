import React from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';

const LoginScreen = () => {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');

 const loginUser = () => {
    if (email && password) {
      Alert.alert('Success', 'User Logged In Successfully', [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
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

const styles = StyleSheet.create({
 container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
 card: {
    borderWidth: 1, // Adiciona uma borda
    borderColor: 'gray', // Define a cor da borda como cinza
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
});

export default LoginScreen;
