import React, {useState} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,ScrollView,
  StyleSheet,Image,Pressable
} from 'react-native';
import auth from '@react-native-firebase/auth';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';
import Button from '../../../Components/Button';
import ZavitInputField from '../../../Components/ZavitInputField';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import VerifyOtp from '../../VerifyOtp.js/View/VerifyOtp';
const Signup = () => {
  const [fname, setfname] = useState('');
  const [lname, setlname] = useState('');
  const [email, setemail] = useState('');
  const [number,setNumber]=useState('');
  const [numberError,setNumberError]=useState('');
  const [numberState,setNumberState]=useState(false)
  const [password, setpassword] = useState('');
  const [fnameerror, setfnameerror] = useState('');
  const [lnameerror, setlnameerror] = useState('');
  const [emailerror, setemailerror] = useState('');
  const [passworderror, setpassworderror] = useState('');
  const [emailstate, setemailstate] = useState(false);
  const [passwordstate, setpasswordstate] = useState(false);
  const [fnamestate, setfnamestate] = useState(false);
  const [lnamestate, setlnamestate] = useState(false);

  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let regpswrd = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  let phoneregex=/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  const navigation=useNavigation()

  const userObject = {
    ID: moment().format(),
    FNAME: fname,
    LNAME: lname,
    EMAIL: email,
    PASSWORD: password,
    USERIMAGE:"",
  };
  
  const storeData = async () => {
        const mob = '+91' + number;
           await auth()
              .signInWithPhoneNumber(mob)
              .then(res => {
          
                 navigation.navigate("VerifyOtp",{userObject ,res})
              })


    
  };

  const empty = () => {
    return setemailerror('');
  };
  const emptyfname = () => {
    return setfnameerror('');
  };
  const emptylname = () => {
    return setlnameerror('');
  };
  const emptypassword = () => {
    return setpassworderror('');
  };
  const fname_validation = () => {
    if (fname == '') {
      setfnameerror("Name can't be empty");
    } else {
      setfnamestate(true);
      setfnameerror('');
    }
  };
  const lname_validation = () => {
    if (lname == '') {
      setlnameerror("Surname can't be empty");
    } else  {
      setlnamestate(true);
      setlnameerror('');
    } 
  };
  const email_validation = () => {
    if (email == '') {
      setemailerror("Email Can't be empty");
    } else if (reg.test(email)) {
      setemailstate(true);
    } else {
      setemailerror(' Invalid mail id');
    }
  };
  const password_validation = () => {
    if (password == '') {
      setpassworderror("Password Can't be empty");
    } else if (regpswrd.test(password)) {
      setpasswordstate(true);
    } else {
      setpassworderror(
        'Password must contain minimum eight characters, at least one letter, one number and one special character:',
      );
    }
  };


  const numberValidation=()=>{
   // code to verify the number of the user
   if(number.length===0){
    setNumberError("This field is necessary");
   }
   else if (phoneregex.test(number)){
    setNumberState(true)
   }
   else {
    setNumberError("Not a Valid Phone Number")
   }
  }
  const validate = () => {
    email_validation();
    password_validation();
    fname_validation();
    lname_validation();
    numberValidation();
    if (emailstate && passwordstate&&fnamestate&&lnamestate&&numberState) {
      storeData();
    }
  };
  return (
    <>
      <View style={styles.container}>
        <KeyboardAvoidingView style={{flex:1}}   >
          <ScrollView >
      <Image 
             source={require('../../../Assets/Images/cuisina.png')} style={{width:370,height:220,marginVertical:10}} ></Image> 
        <Text style={{paddingHorizontal: 15, fontWeight: 'bold', fontSize: 12,color:"#FFFFFF"}}>
         First Name
        </Text>
        <ZavitInputField
          value={fname}
          setValue={setfname}
          emptyValue={emptyfname}
          placeholder="john"
        />
        <Text style={{color:"red",paddingHorizontal:15}}>{fnameerror}</Text>
        <Text style={{paddingHorizontal: 15, fontWeight: 'bold', fontSize: 12,color:"#FFFFFF"}}>
          Last Name
        </Text>
        <ZavitInputField
          value={lname}
          setValue={setlname}
          emptyValue={emptylname}
          placeholder="simmons"
        />
        <Text style={{color:"red",paddingHorizontal:15}}>{lnameerror}</Text>
        <Text style={{paddingHorizontal: 15, fontWeight: 'bold', fontSize: 12,color:"#FFFFFF"}}>
         Mob Number
        </Text>
        <ZavitInputField
          value={number}
          setValue={setNumber}
          emptyValue={()=>{setNumberError("")}}
        />
        <Text style={{color:"red",paddingHorizontal:15}}>{numberError}</Text>
        <Text style={{paddingHorizontal: 15, fontWeight: 'bold', fontSize: 12,color:"#FFFFFF"}}>
          Email
        </Text>
        <ZavitInputField
          value={email}
          setValue={setemail}
          emptyValue={empty}
          placeholder="john@gmail.com"
        />
        <Text style={{color:"red",paddingHorizontal:15}}>{emailerror}</Text>
        <Text style={{paddingHorizontal: 15, fontWeight: 'bold', fontSize: 12,color:"#FFFFFF"}}>
          Password
        </Text>
        <ZavitInputField
          value={password}
          setValue={setpassword}
          emptyValue={emptypassword}
          placeholder="Password"
          sec={true}
        />
        <Text style={{color:"red",paddingHorizontal:15}}>{passworderror}</Text>
       <View style={{justifyContent:"center",alignItems:"center",padding:5}}>
        <Pressable
          style={{display: 'flex', flexDirection: 'row'}}
          onPress={() =>navigation.navigate("Login")}>
          <Text style={{color:"white"}}>Already a user ? </Text>
          <Text style={{color: 'rgba(235,180,44,255)'}}>Login</Text>
        </Pressable>
        </View>
        <Button title={'REGISTER'} functionality={validate}></Button>
        </ScrollView>
        </KeyboardAvoidingView>
      </View>
    
    </>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    paddingHorizontal: 12,
    flexDirection:"column",
    justifyContent:"flex-start",
    backgroundColor:"rgba(1,43,40,255)"
   },
  title: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 25,
    paddingHorizontal: 15,
    paddingVertical:10,
  },
  inputbox: {
    borderWidth: 0.5,
    borderColor: 'white',
    borderBottomColor: 'black',
    marginBottom: 15,
    padding: 15,
  },
  Button: {
    display: 'flex',
    alignItems: 'center',
    width:"100%"
  },
});
