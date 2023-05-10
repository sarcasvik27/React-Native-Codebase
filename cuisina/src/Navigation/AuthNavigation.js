import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../Screens/Home/Login/View/Login';
import Signup from '../Screens/Signup/View/Signup';
import VerifyOtp from '../Screens/VerifyOtp.js/View/VerifyOtp';
const Stack = createNativeStackNavigator();
const AuthNavigation = () => {
  return (
      <Stack.Navigator screenOptions={{
        headerShown: false,
            animationTypeForReplace: 'push',
                animation:'slide_from_left'
      }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="VerifyOtp" component={VerifyOtp} />
      </Stack.Navigator>
  );
};

export default AuthNavigation