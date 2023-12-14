import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import axios from "axios";

const HoursList = () => {
  const [hours, setHours] = useState([]);

  useEffect(() => {
    loadHours();
  }, []);

  const loadHours = async () => {
    try {
      const response = await axios.get("http://localhost:8080/hours");
      setHours(response.data);
    } catch (error) {
      console.error("Erro ao obter dados da API:", error);
    }
  };

  const renderItem = ({ item, index }) => (
    <View
      style={[
        styles.listItem,
        index % 2 === 0 ? styles.evenItem : styles.oddItem,
      ]}
    >
      <Text style={styles.text}>{`ID: ${item.id}`}</Text>
      <Text style={styles.text}>{`Início: ${item.start}`}</Text>
      <Text style={styles.text}>{`Fim: ${item.end}`}</Text>
      <Text style={styles.text}>{`Dia: ${item.day}`}</Text>
      <Text style={styles.text}>{`Disciplina: ${item.discipline}`}</Text>
      <Text style={styles.text}>{`Curso: ${item.course}`}</Text>
      <Text style={styles.text}>{`Sala de Aula: ${item.classroom}`}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Lista de Horários:</Text>
      <FlatList
        data={hours}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  listItem: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    margin: 5,
  },
  evenItem: {
    backgroundColor: "#f2f2f2",
  },
  oddItem: {
    backgroundColor: "#ffffff",
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default HoursList;
