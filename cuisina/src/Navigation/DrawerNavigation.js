import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MyAccount from '../Screens/MyAccount/View/MyAccount';
import HomeScreen from '../Screens/HomeScreen/View/HomeScreen';
import OrderHistory from '../Screens/OrderHistory/View/OrderHistory';
import Faq from '../Screens/Faq/View/Faq';
import Cart from '../Screens/Cart/View/Cart';
import AboutUs from '../Screens/AboutUs/View/AboutUs';
import Settings from '../Screens/Settings/View/Settings';
import Aboutus from '../Screens/AboutUs/View/AboutUs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Logout from '../Components/Logout';
import AddNewCard from '../Screens/AddNewCard/View/AddNewCard';
import SavedCards from '../Screens/SavedCards/View/SavedCards';
const Drawer = createDrawerNavigator();
const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: 'white',
        drawerInactiveTintColor: 'gray',
        drawerStyle: {
          backgroundColor: 'rgba(35,36,41,255)',
          width: 240,
        },

        drawerItemStyle: {
          paddingVertical: 10,
        },
      }}>
      <Drawer.Screen
        name="Home"
        options={{
          drawerIcon: ({focused}) => (
            <Icon name="home" size={22} color={focused ? '#7cc' : '#ccc'} />
          ),
        }}
        component={HomeScreen}
      />
      <Drawer.Screen
        name="MyAccount"
        options={{
          drawerIcon: ({focused}) => (
            <Icon name="account" size={22} color={focused ? '#7cc' : '#ccc'} />
          ),
        }}
        component={MyAccount}
      />

      {/* <Drawer.Screen name="Order History" component={OrderHistory} /> */}
    
      <Drawer.Screen
        name="Cart"
        options={{
          drawerIcon: ({focused}) => (
            <Icon name="cart" size={22} color={focused ? '#7cc' : '#ccc'} />
          ),
        }}
        component={Cart}
      />

      <Drawer.Screen
        name="About us"
        options={{
          drawerIcon: ({focused}) => (
            <Icon name="chef-hat" size={22} color={focused ? '#7cc' : '#ccc'} />
          ),
        }}
        component={Aboutus}
      />

<Drawer.Screen
        name="FAQs"
        options={{
          drawerIcon: ({focused}) => (
            <Icon
              name="frequently-asked-questions"
              size={22}
              color={focused ? '#7cc' : '#ccc'}
            />
          ),
        }}
        component={Faq}
      />
      <Drawer.Screen
        name="Add New Card"
        options={{
          drawerIcon: ({focused}) => (
            <Icon name="credit-card" size={22} color={focused ? '#7cc' : '#ccc'} />
          ),
        }}
        component={AddNewCard}
      />

      <Drawer.Screen
        name="Saved Cards"
        options={{
          drawerIcon: ({focused}) => (
            <Icon name="credit-card-check" size={22} color={focused ? '#7cc' : '#ccc'} />
          ),
        }}
        component={SavedCards}
      />

      <Drawer.Screen
        name="Logout"
        options={{
          drawerIcon: ({focused}) => (
            <Icon name="logout" size={22} color={focused ? '#7cc' : '#ccc'} />
          ),
        }}
        component={Logout}
      />
    </Drawer.Navigator>
  );
};
export default DrawerNavigation;
