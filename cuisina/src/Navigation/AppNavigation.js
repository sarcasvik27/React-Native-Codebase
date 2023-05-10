import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../Screens/HomeScreen/View/HomeScreen';
import Menu from '../Screens/Menu/View/Menu';
import EachDish from '../Screens/EachDish/View/EachDish';
import Cart from '../Screens/Cart/View/Cart';
import OrderSuccessful from '../Screens/OrderSucessfull/View/OrderSuccessful';
import DrawerNavigation from './DrawerNavigation';
import DrawerNavigator from './DrawerNavigation';
import SavedCards from '../Screens/SavedCards/View/SavedCards';
import Payment from '../Screens/Payment_while_Pay/View/Payment';
import AddNewCard from '../Screens/AddNewCard/View/AddNewCard';

const Stack = createNativeStackNavigator();
const AppNavigation = () => {
  return (
      <Stack.Navigator screenOptions={{
        headerShown: false,
        animationTypeForReplace: 'push',
                animation:'slide_from_right'
      }}>
 
        {/* <Stack.Screen name="HomeScreen" component={HomeScreen} /> */}
        <Stack.Screen name="MyDrawer" component={DrawerNavigation} />
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="EachDish" component={EachDish} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="OrderSuccessful" component={OrderSuccessful} />
        <Stack.Screen name="savedCards" component={Payment}/>
        <Stack.Screen name="addCard" component={AddNewCard}/>
      </Stack.Navigator>
  );
};

export default AppNavigation

