import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  Alert,
  Modal,
  Picker,
  StyleSheet,
} from "react-native";
import axios from "axios";

const TeacherCRUD = () => {
  const [teachers, setTeachers] = useState([]);
  const [newTeacher, setNewTeacher] = useState({
    name: "",
    email: "",
    pass: "",
  });
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    loadTeachers();
  }, []);

  const loadTeachers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/teacher");
      setTeachers(response.data);
    } catch (error) {
      console.error("Erro ao obter dados da API:", error);
      Alert.alert("Erro", "Não foi possível obter dados da API.");
    }
  };

  const handleCreateTeacher = async () => {
    try {
      // Validar o nome
      if (!newTeacher.name || !/^[a-zA-Z]+$/.test(newTeacher.name)) {
        setErrorMessage("O nome deve conter apenas letras.");
        return;
      }

      // Validar o e-mail
      if (
        !newTeacher.email ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newTeacher.email)
      ) {
        setErrorMessage("O e-mail inserido não é válido.");
        return;
      }

      const response = await axios.post(
        "http://localhost:8080/teacher",
        newTeacher
      );

      if (response.status === 201) {
        Alert.alert("Sucesso", "Professor adicionado com sucesso!");
        loadTeachers();
        setNewTeacher({
          name: "",
          email: "",
          pass: "",
        });
      } else {
        Alert.alert("Erro", "Falha ao adicionar professor.");
      }
    } catch (error) {
      console.error("Erro ao adicionar professor:", error);
      setErrorMessage("Algo deu errado ao adicionar o professor.");
    }
  };

  const handleEditTeacher = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/teacher/${editingTeacher.id}`,
        editingTeacher
      );

      if (response.status === 200) {
        Alert.alert(
          "Sucesso",
          "Informações do professor editadas com sucesso!"
        );
        loadTeachers();
        setEditingTeacher(null);
        setIsModalVisible(false);
      } else {
        Alert.alert("Erro", "Falha ao editar informações do professor.");
      }
    } catch (error) {
      console.error("Erro ao editar informações do professor:", error);
      Alert.alert(
        "Erro",
        "Algo deu errado ao editar as informações do professor."
      );
    }
  };

  const handleDeleteTeacher = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/teacher/${id}`
      );

      if (response.status === 204) {
        Alert.alert("Sucesso", "Professor excluído com sucesso!");
        loadTeachers();
      } else {
        console.error("Falha ao excluir professor:", response);
        Alert.alert(
          "Erro",
          "Falha ao excluir professor. Verifique o console para mais detalhes."
        );
      }
    } catch (error) {
      console.error("Erro ao excluir professor:", error);
      Alert.alert("Erro", "Algo deu errado ao excluir o professor.");
    }
  };

  const handleEditButtonPress = (teacher) => {
    setEditingTeacher({ ...teacher });
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setEditingTeacher(null);
    setIsModalVisible(false);
  };

  const renderTeacherItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text>{`Nome: ${item.name}`}</Text>
      <Text>{`Email: ${item.email}`}</Text>
      <Text>{`Senha: ${item.pass}`}</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Excluir"
          onPress={() => handleDeleteTeacher(item.id)}
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
        <Text style={styles.headerText}>Adicionar Novo Professor:</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={newTeacher.name}
          onChangeText={(text) => setNewTeacher({ ...newTeacher, name: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={newTeacher.email}
          onChangeText={(text) => setNewTeacher({ ...newTeacher, email: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={newTeacher.pass}
          onChangeText={(text) => setNewTeacher({ ...newTeacher, pass: text })}
        />
        <Button
          title="Adicionar Professor"
          onPress={handleCreateTeacher}
          color="#000000"
        />
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}
      </View>

      <Text style={styles.headerText}>Lista de Professores:</Text>
      <FlatList
        data={teachers}
        keyExtractor={(item) => item.id.toString()}
        numColumns={1}
        renderItem={renderTeacherItem}
      />

      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.formContainer}>
            <Text style={styles.headerText}>Editar Professor:</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome"
              value={editingTeacher?.name || ""}
              onChangeText={(text) =>
                setEditingTeacher({ ...editingTeacher, name: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={editingTeacher?.email || ""}
              onChangeText={(text) =>
                setEditingTeacher({ ...editingTeacher, email: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              value={editingTeacher?.pass || ""}
              onChangeText={(text) =>
                setEditingTeacher({ ...editingTeacher, pass: text })
              }
            />
            <Button
              title="Salvar Alterações"
              onPress={handleEditTeacher}
              color="#000000"
            />
            <Button
              title="Cancelar"
              onPress={handleCloseModal}
              color="#808080"
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
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  errorText: {
    color: "red",
    marginTop: 5,
  },
});

export default TeacherCRUD;
