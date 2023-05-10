import React, {useState, useEffect,useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo';
import Button from '../../../../Components/Button';
import { GlobalContext } from '../../../../context/Index';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = () => {
  const navigation = useNavigation();
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [emailerror, setemailerror] = useState('');
  const [passworderror, setpassworderror] = useState('');
  const [emailstate, setemailstate] = useState(false);
  const [passwordstate, setpasswordstate] = useState(false);
  const [loading, setloading] = useState(false);
  const [iconName, setIconName] = useState('eye');
  const [error, seterror] = useState(false);
  const [hidePassword, sethidePassword] = useState(true);
  const [errormessage, seterrormessage] = useState('');

  const {state, actions} = useContext(GlobalContext);
  const {navigationState} = state;

  let count = 0;
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let regpswrd =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  const passwordHideHandle = () => {
    if (iconName == 'eye') {
      setIconName('eye-with-line');
      sethidePassword(false);
    } else {
      sethidePassword(true);
      setIconName('eye');
    }
  };
  
  const getdata = async () => {
    const data1 = await firestore().collection('users').get();
    data1.docs.find(satvik => {
      if (satvik.data().EMAIL == email) {
        count++;
        if (satvik.data().PASSWORD == password) {
          
          Asyncstr(satvik.id);
          actions.UserDetailsAction(satvik)
          seterror(true);
          setloading(false);
        } else {
          seterror(false);
          
          seterrormessage('Password is incorrect');
          setloading(false);
          return;
        }
      }
    });
    if (count === 0) {
      seterror(false);
      seterrormessage('User is not signed in');
      setloading(false);
    }
  };

  const Asyncstr = async data => {
    await AsyncStorage.setItem('ID', data);
    seterror(true);
    setemail('');
    setpassword('');
    actions.NavigationDecider(!navigationState);
  };

  // const email_validation = () => {
  //   if (email == '') {
  //     setemailerror('Email id required');
  //   } else if (reg.test(email)) {
  //     setemailstate(true);
  //   } else {
  //     setemailerror(' Invalid mail id');
  //   }
  // };

  // const password_validation = () => {
  //   if (password == '') {
  //     setpassworderror('Password is required');
  //   } else if (regpswrd.test(password)) {
  //     setpasswordstate(true);
  //   } else {
  //     setpassworderror(
  //       'Password must contain minimum eight characters, at least one letter, one number and one special character:',
  //     );
  //   }
  // };

  const validate = () => {
    // email_validation();
    // password_validation();
    // if (emailstate && passwordstate) {
    //   setloading(true);
      getdata();
    
  };

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        borderWidth: 1,
        height: '100%',
        backgroundColor: 'rgba(1,43,40,255)',
      }}>
      <KeyboardAvoidingView behavior="position">
        <View
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            flexDirection: 'row',
            padding: 10,
          }}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={require('../../../../Assets/Images/cuisina.png')}
              style={{width: 370, height: 250, marginTop: 60}}></Image>
          </View>
        </View>
        <View style={{padding: 30, marginTop: 30}}>
          <TextInput
            elevation={10}
            style={{
              padding: 10,
              borderColor: 'black',
              margin: 10,
              borderRadius: 8,
              backgroundColor: '#FFFFFF',
            }}
            placeholder="Email"
            value={email}
            onChangeText={email => setemail(email)}
            onChange={() => {
              setemailerror(''),
                seterror(true),
                setloading(false),
                seterrormessage('');
            }}></TextInput>
          <Text style={{paddingHorizontal: 10, color: 'red'}}>
            {emailerror}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              margin: 10,
              borderRadius: 8,
              paddingHorizontal: 10,
            }}
            elevation={10}>
            <TextInput
              style={{
                borderColor: 'black',
                flex: 9,
              }}
              secureTextEntry={hidePassword}
              placeholder="Password"
              value={password}
              onChangeText={password => setpassword(password)}
              onChange={() => {
                setpassworderror(''),
                  seterror(true),
                  setloading(false),
                  seterrormessage('');
              }}
            />
            <Pressable
              onPress={() => {
                passwordHideHandle();
              }}>
              <Icon name={iconName} size={25} />
            </Pressable>
          </View>
          <Text style={{color: 'red', paddingHorizontal: 10}}>
            {passworderror}
          </Text>
        </View>
        {loading == true ? <ActivityIndicator /> : null}
        {
          <Text style={{textAlign: 'center', color: 'red'}}>
            {errormessage}
          </Text>
        }
      </KeyboardAvoidingView>
      <Button title={'LOGIN'} functionality={validate}></Button>
      <View style={{display: 'flex', alignItems: 'center', marginBottom: 20}}>
        <Pressable
          style={{display: 'flex', flexDirection: 'row'}}
          onPress={()=>{
            navigation.navigate("Signup")
          }}
        >
          <Text style={{color: '#FFFFFF'}}>New to the App ? </Text>
          <Text style={{color: 'rgba(235,180,44,255)'}}>Signup</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Login;
