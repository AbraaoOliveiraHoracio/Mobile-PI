import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const Aluno = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seja bem-vindo(a)</Text>
      <Text style={styles.name}>Carlos</Text>
      <Button title="Gerenciar Cursos" onPress={() => console.log('Gerenciar Cursos')} />
      <Button title="Cadastrar Professor" onPress={() => console.log('Cadastrar Professor')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    marginBottom: 30,
  },
});

export default Aluno;
