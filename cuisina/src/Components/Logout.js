import React, {useContext, useEffect} from 'react';
import {Alert} from 'react-native';
import {GlobalContext} from '../context/Index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import SuggesstionPopup from './SuggesstionPopup';
import LogoutPopup from './LogoutPopup';

const Logout = () => {
  const {state, actions} = useContext(GlobalContext);
  const {navigationState} = state;
  const navigation = useNavigation();
  const logoutPerson = () => {
    AsyncStorage.removeItem('ID');
    actions.NavigationDecider(!navigationState);
  };
  



  return(
    <LogoutPopup  yes={()=>{logoutPerson}}  no={()=>{navigation.goBack()}}/>
  );
};
export default Logout;
