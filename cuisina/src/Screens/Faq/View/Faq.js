import React, {useState} from 'react';
import {Text, ScrollView, View,Linking,Pressable} from 'react-native';
import Button from '../../../Components/Button';
import SettingsComponent from '../../../Components/SettingComponent';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const Faq = () => {
  const [order, setorder] = useState(false);
  const [pay, setpay] = useState(false);
  const [deny, setdeny] = useState(false);
  const [refund, setrefund] = useState(false);
  const [ordericon,setordericon]=useState("chevron-right")
  const [refundicon,setrefundicon]=useState("chevron-right")
  const [payicon,setpayicon]=useState("chevron-right")
  const [denyicon,setdenyicon]=useState("chevron-right") 
  const[c1,setc1]=useState("rgb(90,90,90)")
  const[c2,setc2]=useState("rgb(90,90,90)")
  const[c3,setc3]=useState("rgb(90,90,90)")
  const[c4,setc4]=useState("rgb(90,90,90)")

const navigation=useNavigation()

  const refunds=()=>{
    if(refundicon=="chevron-right"){
      setrefundicon("chevron-down")
      setc2("red")
    }
    else {
      setrefundicon("chevron-right")
      setc2("rgb(90,90,90)")
    }
    setrefund(!refund)
  }

  const pays=()=>{
    if(payicon=="chevron-right"){
      setpayicon("chevron-down")
      setc4("red")
    }
    else {
      setpayicon("chevron-right")
      setc4("rgb(90,90,90)")
    }
    setpay(!pay)
  }

  const denys=()=>{
    if(denyicon=="chevron-right"){
      setdenyicon("chevron-down")
      setc3("red")
    }
    else {
      setdenyicon("chevron-right")
      setc3("rgb(90,90,90)")
    }
    setdeny(!deny)
  }
  
   const orders=()=>{
    if(ordericon=="chevron-right"){
      setordericon("chevron-down")
      setc1("red")
      
    }
    else {
      setordericon("chevron-right")
      setc1("rgb(90,90,90)")
    }
    setorder(!order)

  }
  
  const contact=()=>{
    Linking.openURL(`mailto:${"saatvik2710@gmail.com"}`)
    
  }  
  return (
    <>
    <ScrollView>
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
      <Icon name={'arrow-left'} size={25} style={{paddingHorizontal: 10}} />
    </Pressable>
    <Text
      style={{
        padding: 20,
        fontSize: 20,
        fontWeight: 'bold',
        fontStyle: 'italic',
      }}>
      My Account
    </Text>
  </View>
      <View
        style={{
          backgroundColor: '#FFFFFF',
          margin:10,
          marginBottom:1
        }}>
        <SettingsComponent
          title={'How to order using Cuisina ?'}
          color1={c1}
          functionality={() => orders()}
          icon={ordericon}
        
          ></SettingsComponent>
        {order && (
          <View>
            <Text style={{padding: 10, marginTop: 0}}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget
              purus tristique, ornare massa eget, laoreet sem. Integer eget
              metus enim. Nullam viverra lobortis nisl, id euismod velit dapibus
              in. Suspendisse dignissim purus nunc, vitae scelerisque nisi
              luctus eget. Cras luctus sollicitudin dapibus.
            </Text>
          </View>
        )}
      </View>

      <View  style={{
          backgroundColor: '#FFFFFF',
          margin:10,
          marginBottom:1
        }}>
        <SettingsComponent
          title={'How to get offers using Cuisina ?'}
          functionality={() =>refunds()}icon={refundicon} color1={c2}></SettingsComponent>
        {refund && (
          <View>
            <Text style={{padding: 10, marginTop: 0}}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget
              purus tristique, ornare massa eget, laoreet sem. Integer eget
              metus enim. Nullam viverra lobortis nisl, id euismod velit dapibus
              in. Suspendisse dignissim purus nunc, vitae scelerisque nisi
              luctus eget. Cras luctus sollicitudin dapibus.
            </Text>
          </View>
        )}
      </View>
      
      <View  style={{
          backgroundColor: '#FFFFFF',
          margin:10,
          marginBottom:1
        }}>
      <SettingsComponent
        title={'How to pay at the restaurant ?'}
        functionality={() =>denys()} icon={denyicon} color1={c3}></SettingsComponent>
      {deny && (
        <View>
          <Text style={{padding: 10, marginTop: 0}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget
            purus tristique, ornare massa eget, laoreet sem. Integer eget metus
            enim. Nullam viverra lobortis nisl, id euismod velit dapibus in.
            Suspendisse dignissim purus nunc, vitae scelerisque nisi luctus
            eget. Cras luctus sollicitudin dapibus.
          </Text>
        </View>
      )}
      </View>

          <View  style={{
          backgroundColor: '#FFFFFF',
          margin:10,
          marginBottom:1
        }}>
      <SettingsComponent
        title={'How to increase my daily points ?'}
        functionality={() => pays()} icon={payicon} color1={c4}></SettingsComponent>
      {pay && (
        <View>
          <Text style={{padding: 10, marginTop: 0}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget
            purus tristique, ornare massa eget, laoreet sem. Integer eget metus
            enim. Nullam viverra lobortis nisl, id euismod velit dapibus in.
            Suspendisse dignissim purus nunc, vitae scelerisque nisi luctus
            eget. Cras luctus sollicitudin dapibus.
          </Text>
        </View>
      )}
        </View>
    </ScrollView>
    <Text style={{textAlign:"center",fontWeight:"bold",paddingTop:30,padding:10}}>Still need help ?</Text>
    <Button title={"CONTACT CUISINA"} functionality={()=>{contact()}}></Button>
    </>
  );
};
export default Faq;
