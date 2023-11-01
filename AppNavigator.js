import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from './LoginScreen';
import aluno from './alunoluno';

const AppNavigator = createStackNavigator(
  {
    Login: LoginScreen,
    aluno: aluno,
  },
  {
    initialRouteName: 'Login',
  }
);

export default createAppContainer(AppNavigator);
