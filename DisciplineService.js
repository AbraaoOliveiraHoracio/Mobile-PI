import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  Alert,
  Modal,
  StyleSheet,
} from "react-native";
import axios from "axios";

const DisciplineCRUD = () => {
  const [disciplines, setDisciplines] = useState([]);
  const [newDiscipline, setNewDiscipline] = useState({
    name: "",
  });
  const [editingDiscipline, setEditingDiscipline] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState("");

  useEffect(() => {
    loadDisciplines();
  }, []);

  const loadDisciplines = async () => {
    try {
      const response = await axios.get("http://localhost:8080/discipline");
      setDisciplines(response.data);
    } catch (error) {
      console.error("Erro ao obter dados da API:", error);
      Alert.alert("Erro", "Não foi possível obter dados da API.");
    }
  };

  const validateDiscipline = (discipline) => {
    const nameRegex = /^[A-Za-z]+$/;

    if (!discipline.name || !nameRegex.test(discipline.name)) {
      setNameErrorMessage(
        "O nome é obrigatório e não recebe caracteres especiais."
      );
      return false;
    } else {
      setNameErrorMessage("");
    }

    return true;
  };

  const handleCreateDiscipline = async () => {
    if (!validateDiscipline(newDiscipline)) {
      Alert.alert("Erro", "Verifique os dados da disciplina.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/discipline", {
        name: newDiscipline.name,
      });

      if (response.status === 201) {
        Alert.alert("Sucesso", "Disciplina adicionada com sucesso!");
        loadDisciplines();
        setNewDiscipline({
          name: "",
        });
      } else {
        Alert.alert("Erro", "Falha ao adicionar disciplina.");
      }
    } catch (error) {
      console.error("Erro ao adicionar disciplina:", error);
      Alert.alert("Erro", "Algo deu errado ao adicionar a disciplina.");
    }
  };

  const handleEditDiscipline = async () => {
    if (!validateDiscipline(editingDiscipline)) {
      Alert.alert("Erro", "Verifique os dados da disciplina.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8080/discipline/${editingDiscipline.id}`,
        { name: editingDiscipline.name }
      );

      if (response.status === 200) {
        Alert.alert(
          "Sucesso",
          "Informações da disciplina editadas com sucesso!"
        );
        loadDisciplines();
        setEditingDiscipline(null);
        setIsModalVisible(false);
      } else {
        Alert.alert("Erro", "Falha ao editar informações da disciplina.");
      }
    } catch (error) {
      console.error("Erro ao editar informações da disciplina:", error);
      Alert.alert(
        "Erro",
        "Algo deu errado ao editar as informações da disciplina."
      );
    }
  };

  const handleDeleteDiscipline = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/discipline/${id}`
      );

      if (response.status === 204) {
        Alert.alert("Sucesso", "Disciplina excluída com sucesso!");
        loadDisciplines();
      } else {
        console.error("Falha ao excluir disciplina:", response);
        Alert.alert(
          "Erro",
          "Falha ao excluir disciplina. Verifique o console para mais detalhes."
        );
      }
    } catch (error) {
      console.error("Erro ao excluir disciplina:", error);
      Alert.alert("Erro", "Algo deu errado ao excluir a disciplina.");
    }
  };

  const handleEditButtonPress = (discipline) => {
    setEditingDiscipline({
      ...discipline,
      name: discipline.name,
    });
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setEditingDiscipline(null);
    setIsModalVisible(false);
  };

  const renderDisciplineItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text>{`Nome: ${item.name}`}</Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Excluir"
          onPress={() => handleDeleteDiscipline(item.id)}
          color="#FF0000"
        />
        <Button
          title="Editar"
          onPress={() => handleEditButtonPress(item)}
          color="#007BFF"
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.headerText}>Adicionar Nova Disciplina:</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome da Disciplina"
          value={newDiscipline.name}
          onChangeText={(text) =>
            setNewDiscipline({ ...newDiscipline, name: text })
          }
        />
        {nameErrorMessage !== "" && (
          <Text style={styles.errorMessage}>{nameErrorMessage}</Text>
        )}

        <Button
          title="Adicionar Disciplina"
          onPress={handleCreateDiscipline}
          color="#000000"
        />
      </View>

      <Text style={styles.headerText}>Lista de Disciplinas:</Text>
      <FlatList
        data={disciplines}
        keyExtractor={(item) => item.id.toString()}
        numColumns={1}
        renderItem={renderDisciplineItem}
      />

      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.formContainer}>
            <Text style={styles.headerText}>Editar Disciplina:</Text>

            <TextInput
              style={styles.input}
              placeholder="Nome"
              value={editingDiscipline?.name || ""}
              onChangeText={(text) =>
                setEditingDiscipline({ ...editingDiscipline, name: text })
              }
            />
            {nameErrorMessage !== "" && (
              <Text style={styles.errorMessage}>{nameErrorMessage}</Text>
            )}

            <Button
              title="Salvar Edição"
              onPress={handleEditDiscipline}
              color="#000000"
            />
            <Button
              title="Cancelar"
              onPress={handleCloseModal}
              color="#FF0000"
            />
          </View>
        </View>
      </Modal>
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
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 5,
  },
  formContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  errorMessage: {
    color: "red",
    marginBottom: 5,
  },
});

export default DisciplineCRUD;
