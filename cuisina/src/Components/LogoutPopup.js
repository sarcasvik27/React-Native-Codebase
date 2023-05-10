import {View, StyleSheet, Text} from 'react-native';
import React, {useState,useContext} from 'react';
import {GlobalContext} from '../context/Index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PopupButton from './PopupButton';
import ZavitInputField from './ZavitInputField';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const LogoutPopup = ({yes,no}) => {
    const {state, actions} = useContext(GlobalContext);
    const {navigationState} = state;
   const navigation=useNavigation()
  const setdata =  () => {
    AsyncStorage.removeItem('ID');
    actions.NavigationDecider(!navigationState);
    };

  const cancel=()=>{
    no()
  }
  return (
      <View style={styles.outerView}>
      <View style={styles.innerView}>
        <View>
        <Text style={styles.text}>{"Logout "}</Text>
        <Text style={styles.desc}>{"Are you sure you wanna logout ?"}</Text></View>
        <View style={{justifyContent:"space-evenly",alignItems:"center",flexDirection:"row",width:"100%"}}>
        <PopupButton title={"Yes"} functionality={()=>setdata()} ></PopupButton>
        <PopupButton title={"No"} functionality={()=>cancel()}></PopupButton>
        </View>
    
      </View>

      </View>
  );
};
export default LogoutPopup;

const styles = StyleSheet.create({
  innerView: {
    position: 'absolute',
    backgroundColor: '#fff',
    textAlign: 'center',
    borderRadius: 8,
    height:"25%",
    width:"90%",
    justifyContent:"space-evenly"
    
  },
  outerView: {
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },
  text: {
    fontWeight: 'bold',
    fontSize: 26,
    color: 'black',
    textAlign: 'center',
    marginVertical:10
  },
  desc: {
    textAlign: 'center',
    color: 'black',
  },
});
