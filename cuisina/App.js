import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigation from './src/Navigation/AppNavigation';
import { GlobalProvider } from './src/context/Index';
import RootNavigation from './src/Navigation/RootNavigation';
const App = () => {
  return (
    <GlobalProvider>
    <NavigationContainer>
     <RootNavigation/>
    </NavigationContainer>
  </GlobalProvider>
  );
};

export default App;

