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
import { Picker } from "@react-native-picker/picker";

const ClassRoomCRUD = () => {
  const [classRooms, setClassRooms] = useState([]);
  const [newClassRoom, setNewClassRoom] = useState({
    size: "",
    type: "",
    floor: "",
  });
  const [editingClassRoom, setEditingClassRoom] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    loadClassRooms();
  }, []);

  const loadClassRooms = async () => {
    try {
      const response = await axios.get("http://localhost:8080/classroom");
      setClassRooms(response.data);
    } catch (error) {
      console.error("Erro ao obter dados da API:", error);
      Alert.alert("Erro", "Não foi possível obter dados da API.");
    }
  };

  const handleCreateClassRoom = async () => {
    try {
      if (!newClassRoom.size || !newClassRoom.type || !newClassRoom.floor) {
        setErrorMessage("Selecione campos válidos");
        return;
      }

      if (
        newClassRoom.size === null ||
        newClassRoom.type === null ||
        newClassRoom.floor === null
      ) {
        setErrorMessage("Escolha um valor válido");
        return;
      }

      const response = await axios.post(
        "http://localhost:8080/classroom",
        newClassRoom
      );

      if (response.status === 201) {
        Alert.alert("Sucesso", "Sala adicionada com sucesso!");
        loadClassRooms();
        setNewClassRoom({
          size: "",
          type: "",
          floor: "",
        });
        setErrorMessage(""); // Limpar a mensagem de erro após sucesso
      } else {
        Alert.alert("Erro", "Falha ao adicionar sala.");
      }
    } catch (error) {
      console.error("Erro ao adicionar sala:", error);
      Alert.alert("Erro", "Algo deu errado ao adicionar a sala.");
    }
  };

  const handleEditClassRoom = async () => {
    try {
      if (
        !editingClassRoom.size ||
        !editingClassRoom.type ||
        !editingClassRoom.floor
      ) {
        setErrorMessage("Selecione campos válidos");
        return;
      }

      const response = await axios.put(
        `http://localhost:8080/classroom/${editingClassRoom.id}`,
        editingClassRoom
      );

      if (
        editingClassRoom.size === null ||
        editingClassRoom.type === null ||
        editingClassRoom.floor === null
      ) {
        setErrorMessage("Escolha um valor válido");
        return;
      }

      if (response.status === 200) {
        Alert.alert("Sucesso", "Informações da sala editadas com sucesso!");
        loadClassRooms();
        setEditingClassRoom(null);
        setIsModalVisible(false);
        setErrorMessage("");
      } else {
        Alert.alert("Erro", "Falha ao editar informações da sala.");
      }
    } catch (error) {
      console.error("Erro ao editar informações da sala:", error);
      Alert.alert("Erro", "Algo deu errado ao editar as informações da sala.");
    }
  };

  const handleDeleteClassRoom = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/classroom/${id}`
      );

      if (response.status === 204) {
        Alert.alert("Sucesso", "Sala excluída com sucesso!");
        loadClassRooms();
      } else {
        console.error("Falha ao excluir sala:", response);
        Alert.alert(
          "Erro",
          "Falha ao excluir sala. Verifique o console para mais detalhes."
        );
      }
    } catch (error) {
      console.error("Erro ao excluir sala:", error);
      Alert.alert("Erro", "Algo deu errado ao excluir a sala.");
    }
  };

  const handleEditButtonPress = (classRoom) => {
    setEditingClassRoom({ ...classRoom });
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setEditingClassRoom(null);
    setIsModalVisible(false);
    setErrorMessage("");
  };

  const renderClassRoomItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text>{`Tamanho: ${item.size}`}</Text>
      <Text>{`Tipo: ${item.type}`}</Text>
      <Text>{`Andar: ${item.floor}`}</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Excluir"
          onPress={() => handleDeleteClassRoom(item.id)}
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
        <Text style={styles.headerText}>Adicionar Nova Sala:</Text>
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}
        <Picker
          selectedValue={newClassRoom.size}
          style={styles.input}
          onValueChange={(itemValue, itemIndex) =>
            setNewClassRoom({ ...newClassRoom, size: itemValue })
          }
        >
          <Picker.Item label="Selecione o tamanho da sala" value={null} />
          <Picker.Item label="Pequeno 10 - 20" value="Pequeno" />
          <Picker.Item label="Média 20 - 40" value="Média" />
          <Picker.Item label="Grande 60+" value="Grande" />
        </Picker>

        <Picker
          selectedValue={newClassRoom.type}
          style={styles.input}
          onValueChange={(itemValue, itemIndex) =>
            setNewClassRoom({ ...newClassRoom, type: itemValue })
          }
        >
          <Picker.Item
            label="Selecione o tipo da sala"
            value={null}
            enabled={true}
          />
          <Picker.Item label="Sala" value="Sala" />
          <Picker.Item label="Laboratório" value="Laboratório" />
        </Picker>

        <Picker
          selectedValue={newClassRoom.floor}
          style={styles.input}
          onValueChange={(itemValue, itemIndex) =>
            setNewClassRoom({ ...newClassRoom, floor: itemValue })
          }
        >
          <Picker.Item label="Selecione o andar da sala" value={null} />
          <Picker.Item label="Térreo" value="Térreo" />
          <Picker.Item label="1° Andar" value="1° Andar" />
          <Picker.Item label="2° Andar" value="2° Andar" />
        </Picker>
        <Button
          title="Adicionar Sala"
          onPress={handleCreateClassRoom}
          color="#000000"
        />
      </View>

      <Text style={styles.headerText}>Lista de Salas:</Text>
      <FlatList
        data={classRooms}
        keyExtractor={(item) => item.id.toString()}
        numColumns={1}
        renderItem={renderClassRoomItem}
      />

      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.formContainer}>
            <Text style={styles.headerText}>Editar Sala:</Text>
            {errorMessage ? (
              <Text style={styles.errorText}>{errorMessage}</Text>
            ) : null}
            <Picker
              selectedValue={editingClassRoom?.size || ""}
              style={styles.input}
              onValueChange={(itemValue, itemIndex) =>
                setEditingClassRoom({ ...editingClassRoom, size: itemValue })
              }
            >
              <Picker.Item
                label="Selecione o tamanho da sala"
                value={null}
                enabled={false}
              />
              <Picker.Item label="Pequeno 10 - 20" value="Pequeno" />
              <Picker.Item label="Média 20 - 40" value="Média" />
              <Picker.Item label="Grande 60+" value="Grande" />
            </Picker>
            <Picker
              selectedValue={editingClassRoom?.type || ""}
              style={styles.input}
              onValueChange={(itemValue, itemIndex) =>
                setEditingClassRoom({ ...editingClassRoom, type: itemValue })
              }
            >
              <Picker.Item
                label="Selecione o tipo da sala"
                value={null}
                enabled={false}
              />
              <Picker.Item label="Sala" value="Sala" />
              <Picker.Item label="Laboratório" value="Laboratório" />
            </Picker>
            <Picker
              selectedValue={editingClassRoom?.floor || ""}
              style={styles.input}
              onValueChange={(itemValue, itemIndex) =>
                setEditingClassRoom({ ...editingClassRoom, floor: itemValue })
              }
            >
              <Picker.Item
                label="Selecione o andar da sala"
                value={null}
                enabled={false}
              />
              <Picker.Item label="Térreo" value="Térreo" />
              <Picker.Item label="1° Andar" value="1° Andar" />
              <Picker.Item label="2° Andar" value="2° Andar" />
            </Picker>
            <Button
              title="Salvar Edição"
              onPress={handleEditClassRoom}
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
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});

export default ClassRoomCRUD;
