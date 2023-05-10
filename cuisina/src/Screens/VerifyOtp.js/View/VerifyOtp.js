import React, {useState, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import {TextInput, StyleSheet,Image, View,Alert} from 'react-native';
import { GlobalContext } from '../../../context/Index';
import Button from '../../../Components/Button';
import {useNavigation} from '@react-navigation/native';

const VerifyOtp = ({route}) => {
  const [pin, setPin] = useState('');
  const navigation = useNavigation();

  const {state, actions} = useContext(GlobalContext);
  const {navigationState} = state;

  const checkOtp = async () => {
    await route.params.res.confirm(pin).then(data => {
      if (data.additionalUserInfo.isNewUser == false) {
       Alert.alert('Already an existing user ',  
       "You've already been signed up from this number. Please try to Login from valid email id and password ",  
       [  
        {text: 'OK', onPress: () => navigation.navigate('Login')},  
       ]   )
    
      } else {

        firestore().collection('users').add(route.params.userObject)
        AsyncStorage.setItem("ID",route.params.userObject.ID); // add the code to get id and then store into async storage
        actions.NavigationDecider(!navigationState);
      }
    });
  };

  return (
    
    <View style={Style.outerView}>
    <View style={Style.innerView}>
      <View style={Style.textBox}>
     <Image source={require("../../../Assets/Images/cuisina.png")} style={{marginTop:10}}/>
      </View>
    <View style={Style.svgg}>
      </View>
      </View>
      <View style={Style.view}>
        <TextInput
          elevation={10}
          placeholder="Enter OTP"
          keyboardType="numeric"
          maxLength={6}
          style={Style.inputBox}
          value={pin}
          onChangeText={pin => {
            setPin(pin);
          }}></TextInput>   
          <Button title={'Verify'} functionality={() =>checkOtp()} />
      </View>
     
      </View> 
  );
};
export default VerifyOtp;

const Style = StyleSheet.create({
  group:{
    opacity: 0.6,
  },
  svgg:{alignItems: 'flex-end'},
  text:{
    fontFamily: 'Viga-Regular',
    fontWeight: 400,
    fontSize: 31,
    color: '#09051C',
    width: 200,
    paddingTop: 40,
  },
  textBox:{flex:1,justifyContent:'center',alignItems:"center",marginTop:10},
  innerView:{flex:1},
  outerView:{flex:1,backgroundColor:"rgba(1,43,40,255)"},
  inputBox: {
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
  },
  view: {
    flex:1,
    justifyContent: "space-evenly",
    padding: 30,
  },
});
