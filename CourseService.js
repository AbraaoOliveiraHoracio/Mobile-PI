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
  Picker,
} from "react-native";
import axios from "axios";

const CourseCRUD = () => {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    name: "",
    size: "",
    period: "",
  });
  const [editingCourse, setEditingCourse] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [nameError, setNameError] = useState("");

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const response = await axios.get("http://localhost:8080/course");
      setCourses(response.data);
    } catch (error) {
      console.error("Erro ao obter dados da API:", error);
      Alert.alert("Erro", "Não foi possível obter dados da API.");
    }
  };

  const validateName = (name) => {
    const regex = /^[a-zA-Z0-9\s]*$/;
    return regex.test(name);
  };

  const isNullOrWhitespace = (input) => {
    return !input.trim();
  };

  const handleCreateCourse = async () => {
    if (
      isNullOrWhitespace(newCourse.name) ||
      isNullOrWhitespace(newCourse.size) ||
      isNullOrWhitespace(newCourse.period)
    ) {
      setErrorMessage("Por favor, preencha todas as informações.");
      return;
    }

    if (!validateName(newCourse.name)) {
      setNameError("Nome não pode conter caracteres especiais.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/course",
        newCourse
      );
      if (response.status === 201) {
        Alert.alert("Sucesso", "Curso adicionado com sucesso!");
        loadCourses();
        setNewCourse({
          name: "",
          size: "",
          period: "",
        });
        setErrorMessage("");
        setNameError("");
      } else {
        Alert.alert("Erro", "Falha ao adicionar curso.");
      }
    } catch (error) {
      console.error("Erro ao adicionar curso:", error);
      Alert.alert("Erro", "Algo deu errado ao adicionar o curso.");
    }
  };

  const handleEditCourse = async () => {
    if (
      isNullOrWhitespace(editingCourse.name) ||
      isNullOrWhitespace(editingCourse.size) ||
      isNullOrWhitespace(editingCourse.period)
    ) {
      setErrorMessage("Por favor, preencha todas as informações.");
      return;
    }

    if (!validateName(editingCourse.name)) {
      setNameError("Nome não pode conter caracteres especiais.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8080/course/${editingCourse.id}`,
        editingCourse
      );
      if (response.status === 200) {
        Alert.alert("Sucesso", "Informações do curso editadas com sucesso!");
        loadCourses();
        setEditingCourse(null);
        setIsModalVisible(false);
        setErrorMessage("");
        setNameError("");
      } else {
        Alert.alert("Erro", "Falha ao editar informações do curso.");
      }
    } catch (error) {
      console.error("Erro ao editar informações do curso:", error);
      Alert.alert("Erro", "Algo deu errado ao editar as informações do curso.");
    }
  };

  const handleDeleteCourse = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/course/${id}`);

      if (response.status === 204) {
        Alert.alert("Sucesso", "Curso excluído com sucesso!");
        loadCourses();
      } else {
        console.error("Falha ao excluir curso:", response);
        Alert.alert(
          "Erro",
          "Falha ao excluir curso. Verifique o console para mais detalhes."
        );
      }
    } catch (error) {
      console.error("Erro ao excluir curso:", error);
      Alert.alert("Erro", "Algo deu errado ao excluir o curso.");
    }
  };

  const handleEditButtonPress = (course) => {
    setEditingCourse({ ...course });
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setEditingCourse(null);
    setIsModalVisible(false);
    setErrorMessage("");
    setNameError("");
  };

  const renderCourseItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text>{`Nome: ${item.name}`}</Text>
      <Text>{`Tamanho: ${item.size}`}</Text>
      <Text>{`Período: ${item.period}`}</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Excluir"
          onPress={() => handleDeleteCourse(item.id)}
          color="#FF0000"
          x
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
        <Text style={styles.headerText}>Adicionar Novo Curso:</Text>
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={newCourse.name}
          onChangeText={(text) => setNewCourse({ ...newCourse, name: text })}
        />
        {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
        <Picker
          selectedValue={newCourse.size}
          style={styles.input}
          onValueChange={(itemValue, itemIndex) =>
            setNewCourse({ ...newCourse, size: itemValue })
          }
        >
          <Picker.Item label="Selecione o tamanho do curso" value={null} />
          <Picker.Item label="Curso pequeno 10 - 20" value="small" />
          <Picker.Item label="Curso médio 20 - 40" value="medium" />
          <Picker.Item label="Curso grande maior que 60" value="large" />
        </Picker>
        <Picker
          selectedValue={newCourse.period}
          style={styles.input}
          onValueChange={(itemValue, itemIndex) =>
            setNewCourse({ ...newCourse, period: itemValue })
          }
        >
          <Picker.Item label="Selecione o período do curso" value={null} />
          <Picker.Item label="Manhã" value="morning" />
          <Picker.Item label="Tarde" value="afternoon" />
          <Picker.Item label="Noite" value="evening" />
        </Picker>
        <Button
          title="Adicionar Curso"
          onPress={handleCreateCourse}
          color="#000000"
        />
      </View>

      <Text style={styles.headerText}>Lista de Cursos:</Text>
      <FlatList
        data={courses}
        keyExtractor={(item) => item.id.toString()}
        numColumns={1}
        renderItem={renderCourseItem}
      />

      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.formContainer}>
            <Text style={styles.headerText}>Editar Curso:</Text>
            {errorMessage ? (
              <Text style={styles.errorText}>{errorMessage}</Text>
            ) : null}
            <TextInput
              style={styles.input}
              placeholder="Nome"
              value={editingCourse?.name || ""}
              onChangeText={(text) =>
                setEditingCourse({ ...editingCourse, name: text })
              }
            />
            {nameError ? (
              <Text style={styles.errorText}>{nameError}</Text>
            ) : null}
            <Picker
              selectedValue={editingCourse?.size || ""}
              style={styles.input}
              onValueChange={(itemValue, itemIndex) =>
                setEditingCourse({ ...editingCourse, size: itemValue })
              }
            >
              <Picker.Item label="Selecione o tamanho do curso" value={null} />
              <Picker.Item label="Curso pequeno 10 - 20" value="small" />
              <Picker.Item label="Curso médio 20 - 40" value="medium" />
              <Picker.Item label="Curso grande maior que 60" value="large" />
            </Picker>
            <Picker
              selectedValue={editingCourse?.period || ""}
              style={styles.input}
              onValueChange={(itemValue, itemIndex) =>
                setEditingCourse({ ...editingCourse, period: itemValue })
              }
            >
              <Picker.Item label="Manhã" value="Manhã" />
              <Picker.Item label="Tarde" value="Tarde" />
              <Picker.Item label="Noite" value="Noite" />
            </Picker>
            <Button
              title="Salvar Edição"
              onPress={handleEditCourse}
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
  errorText: {
    color: "#FF0000",
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
});

export default CourseCRUD;
