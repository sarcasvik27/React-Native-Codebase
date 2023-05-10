import React, {useEffect, useState, useContext} from 'react';
import {Text, View, ActivityIndicator, Image, Pressable} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {GlobalContext} from '../../../context/Index';
import ZavitInputField from '../../../Components/ZavitInputField';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
const MyAccount = () => {
  const [data, setData] = useState('');
  const [loader, setLoader] = useState(true);
  const [image, saveImage] = useState();

  const navigation=useNavigation()
  useEffect(() => {
    AsyncStorage.getItem('ID').then(data => {
  
        firestore()
          .collection('users')
          .doc(data)
          .get()
          .then(data => {
             setData(data);
            setLoader(false);
          });
    });
  }, []);
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
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <Pressable
        //  disabled={editdisable}
        onPress={() => {
          ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
          }).then(image => {
            
            saveImage(image.path);
          });
        }}>
        {data._data?.USERIMAGE == '' ? (
          <Image
            source={require('../../../Assets/Images/account.png')}
            style={{height: 150, width: 150, padding: 10}}
          />
        ) : (
          <Image
            source={{uri: data._data?.USERIMAGE}}
            style={{height: 150, width: 150, padding: 10, borderRadius: 75}}
          />
        )}
      </Pressable>

      <View style={{flexDirection:"row",backgroundColor:"#FFFFFF",padding:10,borderRadius:16,width:"75%",marginBottom:10}}>
        <Text style={{fontSize: 16,}}>
          {"First Name  "} 
        </Text>
        <Text style={{fontSize: 16,color:"black"}}>
            {data._data?.FNAME}
        </Text>
      </View>
      <View style={{flexDirection:"row",backgroundColor:"#FFFFFF",padding:10,borderRadius:16,width:"75%",marginBottom:10}}>
        <Text style={{fontSize: 16,}}>
          {"Last Name  "} 
        </Text>
        <Text style={{fontSize: 16,color:"black"}}>
            {data._data?.LNAME}
        </Text>
      </View>
      <View style={{flexDirection:"row",backgroundColor:"#FFFFFF",padding:10,borderRadius:16,width:"75%",marginBottom:10}}>
        <Text style={{fontSize: 16,}}>
          {"email  "} 
        </Text>
        <Text style={{fontSize: 16,color:"black"}}>
            {data._data?.EMAIL}
        </Text>
      </View>
    </View>
    </>
  );
};
export default MyAccount;
