import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TeacherCRUD from "./TeacherService";
import DisciplineCRUD from "./DisciplineService";
import ClassRoomCRUD from "./ClassRoomService";
import CourseCRUD from "./CourseService";
import HoursList from "./StudentScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="App">
        <Stack.Screen name="App" component={AppScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Teacher" component={TeacherCRUD} />
        <Stack.Screen name="Discipline" component={DisciplineCRUD} />
        <Stack.Screen name="ClassRoom" component={ClassRoomCRUD} />
        <Stack.Screen name="Course" component={CourseCRUD} />
        <Stack.Screen name="schedules" component={HoursList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const AppScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Escolha o seu acesso</Text>
        <Text style={styles.subtitle}>
          Escolha um tipo de acesso para que possa prosseguir:
        </Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("schedules")}
          >
            <FontAwesome name="user" size={24} color="black" />
            <Text style={styles.buttonText}>Entrar como aluno</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("schedules")}
          >
            <FontAwesome name="user" size={24} color="black" />
            <Text style={styles.buttonText}>Entrar como professor</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Login")}
          >
            <FontAwesome name="lock" size={24} color="black" />
            <Text style={[styles.buttonText, { color: "black" }]}>
              Entrar como coordenador
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>Insira suas informações para logar:</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Senha:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          style={[styles.button, styles.darkButton]}
          onPress={() => navigation.navigate("Welcome")}
        >
          <Text style={[styles.buttonText, { color: "white" }]}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.title}>Seja bem-vindo(a) Leonardo</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Teacher")}
        >
          <FontAwesome name="user" size={30} color="black" />
          <Text style={styles.buttonText}>Professores</Text>
          <FontAwesome name="arrow-right" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Discipline")}
        >
          <FontAwesome name="user" size={30} color="black" />
          <Text style={styles.buttonText}>Disciplinas</Text>
          <FontAwesome name="arrow-right" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("ClassRoom")}
        >
          <FontAwesome name="user" size={30} color="black" />
          <Text style={styles.buttonText}>Salas/Labs</Text>
          <FontAwesome name="arrow-right" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Course")}
        >
          <FontAwesome name="user" size={30} color="black" />
          <Text style={styles.buttonText}>Cursos</Text>
          <FontAwesome name="arrow-right" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ClassroomsScreen = () => {
  return (
    <View style="container d-flex justify-content-center align-items-center min-vh-100">
      <View
        class="text-center"
        style={{
          width: 505,
          height: 460,
          flexShrink: 0,
          borderRadius: 10,
          border: "0.5px solid #878787",
          background: "#FFF",
          boxShadow: "0px 4px 64px 0px rgba(0, 0, 0, 0.05)",
          padding: 20,
        }}
      >
        <h2 class="mt-4 poppins" style={{ marginBottom: 55 }}>
          Salas/Labs
        </h2>

        <TouchableOpacity style={styles.button}>
          <FontAwesome name="plus" size={24} color="black" />
          <Text style={styles.buttonText}>Adicionar Sala</Text>
          <FontAwesome name="chevron-right" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <FontAwesome name="pencil" size={24} color="black" />
          <Text style={styles.buttonText}>Editar Sala</Text>
          <FontAwesome name="chevron-right" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <FontAwesome name="trash" size={24} color="black" />
          <Text style={styles.buttonText}>Excluir Sala</Text>
          <FontAwesome name="chevron-right" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.darkButton}>
          <FontAwesome name="arrow-left" size={24} color="white" />
          <Text style={[styles.buttonText, { color: "white" }]}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100%",
  },
  innerContainer: {
    width: 500,
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
    padding: 15,
  },
  loginContainer: {
    width: 300,
    minHeight: 400,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#878787",
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 64,
    padding: 20,
  },
  welcomeContainer: {
    width: 505,
    height: 560,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#878787",
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 64,
    padding: 20,
  },
  title: {
    marginTop: 20,
    marginBottom: 55,
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    textAlign: "center",
  },
  subtitle: {
    marginTop: 5,
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    textAlign: "center",
  },
  buttonsContainer: {
    marginTop: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f8f9fa",
    borderRadius: 5,
    padding: 15,
    marginBottom: 20,
  },
  darkButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#343a40",
    borderRadius: 5,
    padding: 15,
    marginBottom: 20,
    marginTop: 10,
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 18,
    fontFamily: "Poppins-Regular",
    flex: 1,
  },
  label: {
    fontFamily: "Poppins",
    fontSize: 16,
    marginBottom: 5,
  },
  inputContainer: {
    marginTop: 20,
  },
  input: {
    borderColor: "#878787",
    borderWidth: 0.5,
    borderRadius: 5,
    padding: 10,
  },
});

export default App;
