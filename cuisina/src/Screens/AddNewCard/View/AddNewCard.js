import React, {useEffect, useState,useContext} from 'react';
import {Text, View,TextInput,Pressable, KeyboardAvoidingView} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Button from '../../../Components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GlobalContext} from '../../../context/Index';
import ZavitInputField from '../../../Components/ZavitInputField';
import SelectDropdown from 'react-native-select-dropdown';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
const AddNewCard = () => {

   useEffect(()=>{getId()},[])
  const navigation=useNavigation()
  const [name, setname] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setcvv] = useState("");
  const [cardtype, setcardtype] = useState("");
  const [expmonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");
  const [userId,setUserId]=useState("");
  const [nameerror,setnameerror]=useState("")
  const [carderror,setcarderror]=useState("")
  const [cardtypeerror,setcardtypeerror]=useState("");
  const [cvverror,setcvverror]=useState("");
  const [montherror,setmontherror]=useState("");
  const[yearerror,setyeaeerror]=useState("");

  const {state,actions}=useContext(GlobalContext)
  const {allCards}=state

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'July',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const year=[
  '2024',
  '2025',
  '2026',
  '2027',
  '2028',
  '2029',
  '2030',
  '2031',
  '2032',
  '2033',
  '2034',
  '2035',
  '2036',
  '2037',
  '2038',
]
const cards=[
  'Visa',
  'Amex',
  'Mastercard',
]
 
 const userObject = {
    NAME: name,
    CARDNUMBER: cardNumber,
    CVV: cvv,
    EXP_MON: expmonth,
    EXP_YEAR: expYear,
    CARDTYPE:cardtype,
    ID:userId,
  };


  const nameregex=/^[a-z ,.'-]+$/i;
  const namecheck=()=>{

    if(name=="")
    {
      setnameerror("Name Can't be empty")
      return false
    }
   else  if(nameregex.test(name))
  { 
    return true
  }
  else {
    setnameerror("Name is not correct")
    return false
  }
}

const cardcheck=()=>{
  if(cardNumber.length!=19){
    setcarderror("Please Enter 16 numbers")
    return false
  }
  else {
    return true
  }
}
 const cvvcheck=()=>{
  if(cvv.length!=3){
    setcvverror("Please enter 3 numbers")
    return false
  }
  else {
    return true
  }
 }

 const cardtypecheck=()=>{
  if(cardtype==""){
    setcardtypeerror("Not a Valid card")
    return false
  }

 }

 const monthcheck=()=>
{
  if(expmonth==""){
    setmontherror("Month can't be empty")
    return false 
  }
  else {
    return true
  }
}

const yearcheck=()=>{
  if(expYear==""){
    setyeaeerror("year can't be empty")
    return false 
  }
  else {
    return true
  }
}

const validation=()=>{
  namecheck()
  cardcheck()
  cvvcheck()
  cardtypecheck()
  monthcheck()
  yearcheck()
  if(
 namecheck()==true&&
 cardcheck()==true&&
 cvvcheck()==true&&
 monthcheck()==true&&
 yearcheck()
  ){
setdata()
  }
  
}

const empty=()=>{
  setname("")
  setCardNumber("")
  setExpMonth("")
  setExpYear("")
  setcardtype("")
  setcvv("")
}

  const setdata = () => {
    firestore().collection('paymentcards').add(userObject);
    let arr=[...allCards,userObject]
    actions?.AddCardAction(arr);
    empty()
    navigation.goBack()
  };

  const getId = async () => {
    try {
      const ID = await AsyncStorage.getItem('ID');
      if (ID !== null) {
        // We have data!!
        setUserId(ID); 
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  return (
    <>
         <View
        style={{
          backgroundColor: '#FFFFFF',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon1 name={'arrow-left'} size={25} style={{paddingHorizontal: 10}} />
        </Pressable>
        <Text
          style={{
            padding: 20,
            fontSize: 20,
            fontWeight: 'bold',
            fontStyle: 'italic',
          }}>
          Add New Card
        </Text>
      </View>

      <KeyboardAvoidingView style={{flex:1}}>
        <ScrollView>
    <View style={{flex:1,flexDirection:"column",justifyContent:"space-evenly"}}>
      <View style={{ padding: 5}}>
        <Text style={{paddingHorizontal: 15, fontWeight: 'bold', fontSize: 20,paddingTop:12,color:"rgb(60,60,60)"}}>
          Name
        </Text>
        <ZavitInputField
          placeholder={'Name as per Card'}
          value={name}
          setValue={setname}
          emptyValue={()=>setnameerror("")}>
          </ZavitInputField>
         <Text style={{color:"red",fontSize:12,paddingHorizontal: 15}}>{nameerror}</Text>
    
         <Text style={{paddingHorizontal: 15, fontWeight: 'bold', fontSize: 20,paddingTop:12,color:"rgb(60,60,60)"}}>
          Card Type
        </Text>
        <View style={{marginHorizontal:10}}>
        <SelectDropdown
              data={cards}
               onSelect={(selectedItem, index) => {
               setcardtype(selectedItem);
               setcardtypeerror("")
              }}
             
              defaultButtonText={'Select card '}
              buttonTextStyle={{color:"rgb(120,120,120)",fontSize:14,textAlign:'left'}}
              buttonStyle={{backgroundColor:"#FAF9F6",width:"100%",height:60}}
              dropdownIconPosition={'right'}
               dropdownStyle={{backgroundColor:"#FAF9F6"}}
              rowStyle={{backgroundColor:"#FAF9F6"}}
              
              ></SelectDropdown>
            </View>
          <Text style={{color:"red",fontSize:12,paddingHorizontal: 15}}>{cardtypeerror}</Text>
      
        <Text style={{paddingHorizontal: 15, fontWeight: 'bold', fontSize: 20,paddingTop:12,color:"rgb(60,60,60)"}}>
          Card Number
        </Text>
        <TextInput
        style={{ borderRadius:4,
          padding: 15,
          backgroundColor:"#FAF9F6",
          width:"95%",
          marginHorizontal:10}}
          maxLength={19}
          placeholder={'xxxx-xxxx-xxxx-xxxx'}
          keyboardType={"numeric"}
          value={cardNumber}
          onChangeText={e => setCardNumber(e
            .replace(/\s?/g, '')
            .replace(/(\d{4})/g, '$1 ')
            .trim())}
          onChange={()=>setcarderror("")}
          ></TextInput>
          <Text style={{color:"red",fontSize:12,paddingHorizontal: 15}}>{carderror}</Text>


        <Text style={{paddingHorizontal: 15, fontWeight: 'bold', fontSize: 20,paddingTop:12,color:"rgb(60,60,60)"}}>CVV</Text>
        <ZavitInputField
          placeholder={'123'}
          value={cvv}
          setValue={setcvv}
          type={"numeric"}
          max={3}
          emptyValue={()=>setcvverror("")}></ZavitInputField>
          <Text style={{color:"red",fontSize:12,paddingHorizontal: 15}}>{cvverror}</Text>
     

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: "space-between",
            alignItems:"center",
            width:"100%",
            padding:15,
          }}>
          <View style={{display: 'flex', flexDirection: 'column',}}>
            <Text style={{ fontWeight: 'bold', fontSize: 20,color:"rgb(60,60,60)"}}>
              Month
            </Text>
            <View>
            <SelectDropdown
              data={months}
               onSelect={(selectedItem, index) => {
               setExpMonth(selectedItem);
               setmontherror("")
              }}
             
              defaultButtonText={'Select month '}
              buttonTextStyle={{color:"rgb(120,120,120)",fontSize:14,textAlign:'left'}}
              buttonStyle={{backgroundColor:"#FAF9F6",width:150,marginLeft:50}}
              dropdownIconPosition={'right'}
               dropdownStyle={{backgroundColor:"#FAF9F6"}}
              rowStyle={{backgroundColor:"#FAF9F6"}}
              
              
            />
       
            <Text style={{color:"red",fontSize:12,paddingHorizontal: 15}}>{montherror}</Text>
          </View>
           
          </View>
          <View style={{display: 'flex', flexDirection: 'column'}}>
            <Text style={{ fontWeight: 'bold', fontSize: 20,color:"rgb(60,60,60)"}}>
              Year
            </Text>
            <View>
            <SelectDropdown
              data={year}
               onSelect={(selectedItem, index) => {
               setExpYear(selectedItem);
               setyeaeerror("")
              }}
              defaultButtonText={'Select Year'}
              buttonTextStyle={{color:"rgb(120,120,120)",fontSize:14,textAlign:"left"}}
              buttonStyle={{backgroundColor:"#FAF9F6",width:150}}
              dropdownIconPosition={'right'}
               dropdownStyle={{backgroundColor:"#FAF9F6"}}
              rowStyle={{backgroundColor:"#FAF9F6"}}
           
            />
            
          </View>
          <Text style={{color:"red",fontSize:12,paddingHorizontal: 15}}>{yearerror}</Text>
           
          </View>
        </View>
      </View>
      <Button title={'Done'} functionality={() => validation()}></Button>
   </View>
   </ScrollView>
   </KeyboardAvoidingView>
    </>
  );
};
export default AddNewCard;
