import React, {useContext,useEffect,useState} from 'react';
import {GlobalContext} from '../../../context/Index';
import {useNavigation} from '@react-navigation/native';
import {Text, FlatList, View, Image,Pressable,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
const Cart = () => {

  const {state, actions} = useContext(GlobalContext);
  const {cart} = state;

  const [total,setTotal]=useState(0)
  const navigation = useNavigation();
  const arr=[]
  const arr2=[]
  let sum=0
  useEffect(()=>{calculateTotal()},[cart])
  
  const calculateTotal=()=>{
    cart.map((data)=>{
        count=data.PRICE*data.QUANTITY
        sum=sum+count  
    })
    setTotal(sum)
  }

  const storeData=()=>{
    cart.map((data)=>{
    
       arr2.push(data)
        //firestore().collection('orders').add(data)
      })
        navigation.navigate("savedCards",arr2)
         actions?.AddToCart([]);
       
  }

  const deleteItem=(item)=>{
      
    cart.map((data)=>{
      
      if(item.TIME!==data.TIME){
        arr.push(data)
      }
    })
   actions?.AddToCart(arr);
  }
  
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
          Cart
        </Text>
      </View>

      {cart.length>0?
      <>
      <FlatList
        data={cart}
        renderItem={element => {
          return (
            <>
            <View
              style={{
                flex:1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 20,
              }}>
              <Image
                source={{uri: element.item.IMAGE}}
                style={{width: 100, height: 100, borderRadius: 16}}
              />
              <View style={{justifyContent:"space-between",flex:0.8,paddingVertical:5}}>
             <View style={{flexDirection:"row"}}><Text>{element.item.QUANTITY} * </Text><Text style={{fontWeight:'bold',color:"black"}}>{element.item.NAME}</Text></View>    
             {element.item.VEG==="veg"?<Image source={require("../../../Assets/Images/vegFood.png")} style={{width:30,height:30}}/>
             :<Image source={require("../../../Assets/Images/nonVegFood.png")} style={{width:30,height:30}}></Image>}
             <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
               <Text>₹{element.item.PRICE}</Text>
               <Pressable onPress={()=>{deleteItem(element.item)}}><Image source={require("../../../Assets/Images/trashcan.png")} style={{width:20,height:30}}></Image></Pressable>
               </View>
              </View>
            </View>
      </>
          );
        }}></FlatList>
              <Text style={{
            padding: 20,
            fontSize: 20,
            fontWeight: 'bold',
            fontStyle: 'italic',
            textAlign:"center"
          }}>Grand Total ₹{total } </Text>
        <TouchableOpacity
          style={{
            backgroundColor: '#7895B2',
            padding: 20,
            marginBottom: 35,
            flexDirection: 'row',
            justifyContent: "center",
            borderRadius: 8,
            alignItems: 'center',
          }}
          onPress={()=>{storeData()}} >
          <Text style={{color: 'white', fontWeight: 'bold',textAlign:"center",fontStyle:"italic",}}>
            Checkout
          </Text>
        </TouchableOpacity></>:
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
          <Image source={require("../../../Assets/Images/emptyBowl.png")} style={{width:200,height:200,}}/>
         <Text style={{ fontWeight: 'bold',textAlign:"center",fontStyle:"italic",padding:50}}> I am empty, please order something</Text>
        </View>
        
        }
    </>
  );
};
export default Cart;
