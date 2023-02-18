import 'react-native-reanimated'
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { AuthContextProvider } from './context/AuthContext';
AppRegistry.registerComponent(appName, () => App);
