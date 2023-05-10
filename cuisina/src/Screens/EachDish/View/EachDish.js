import React,{useState,useContext} from 'react';
import {ImageBackground, View, Pressable,StyleSheet,ScrollView,Text,TouchableOpacity,Alert} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ZavitInputField from '../../../Components/ZavitInputField';
import firestore from '@react-native-firebase/firestore';
import { GlobalContext } from '../../../context/Index';
import moment from 'moment';
import CounterButton from '../../../Components/CounterButton';

const EachDish = ({route}) => {
    const [disabled, setdisabled] = useState(true);
    const [addToCardButtonDisable,setAddToCartButtonDisable]=useState(true);
    const [count, setcount] = useState(0);
    const [note, setnote] = useState('');
    const [pepsi, setpepsi] = useState(false);
    const [coke, setcoke] = useState(false);
    const [beer, setbeer] = useState(false);
    const navigation = useNavigation();
     const {state, actions} = useContext(GlobalContext);
     const {navigationState,cart} = state;
    const inc = () => {
        setcount(count + 1),
         setdisabled(false)
         setAddToCartButtonDisable(false)
      };


      const dec = () => {
        if (count > 0) {
          if (count == 1) {
          //  setcartdisabled(true);
            setdisabled(true);
            setAddToCartButtonDisable(true)
          }
          setcount(count - 1);
        }
      };


      const empty=()=>{
        setbeer(false)
        setcoke(false)
        setpepsi(false)
        setcount(0)
        setnote("")
        setAddToCartButtonDisable(true)
        setdisabled(true)
      }
      let varx=0;
      const order = {
        NAME: route.params.Name,
        PRICE: route.params.price,
        QUANTITY: count,
        NOTE: note,
        DATE: moment().format('MM/DD/YYYY'),
        TIME: moment().format('hh:mm:ss a'),
        RestaurantID: route.params.id,
        IMAGE:route.params.image,
        // VEG:route.params.veg
      };
      const storeData = async () => {
     //   firestore().collection('orders').add(order);
        let arr = [...cart,order];

        cart.map((data)=>{
         if(data.RestaurantID===route.params.id){
               varx=varx+1;
         }
        })
        if(varx===cart.length){
          actions?.AddToCart(arr);
          navigation.navigate("Cart")
          empty()

        }
        else {
          Alert.alert(  
            'You already have some products in the cart',  
            'Do you want to replace them ?',  
            [  
                {  
                    text: 'View cart',onPress: () =>
                    {
                    navigation.navigate("Cart")
                  }  
                },  
                {text: 'Yes', onPress: () =>
                {actions?.AddToCart([order])
                navigation.navigate("Cart")
                empty()
              }}
            ]  
        );  
        }};


  return (
    <>
      <ImageBackground
        source={{uri:route.params.image}}
        style={{flex: 1}} resizeMethod="resize">
        <Pressable onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" style={styles.icon}></Icon>
        </Pressable>
        <View style={{padding: 100}}></View>
        <View style={{flex: 1}}>
        <ScrollView
      style={{
        width: '100%',
        padding: 12,
        backgroundColor: 'white',
        borderTopEndRadius: 12,
        borderTopStartRadius: 12,
        borderTopRightRadius: 14,
        borderTopLeftRadius: 14,
      }}>
      <View style={{display: 'flex', flexDirection: 'column'}}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            color: 'black',
            padding: 15,
          }}>
          {route.params.Name}
        </Text>
        <Text style={{fontSize: 18, color: 'black', padding: 15}}>{route.params.description}</Text>
        <Text
          style={{
            fontSize: 23,
            fontWeight: 'bold',
            color: 'gray',
            padding: 15,
          }}>
          ₹{route.params.price}{' '}
        </Text>
        <View
          style={{height: 0.5, backgroundColor: 'rgba(196, 196, 196, 1)'}}
        />
        <View style={{flexDirection: 'column', padding: 15}}>
          <Text>Add ons</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <CheckBox value={pepsi} onValueChange={setpepsi}></CheckBox>
            <Text style={{paddingHorizontal: 15}}>Pepsi</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <CheckBox value={coke} onValueChange={setcoke}></CheckBox>
            <Text style={{paddingHorizontal: 15}}>coke</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <CheckBox value={beer} onValueChange={setbeer}></CheckBox>
            <Text style={{paddingHorizontal: 15}}>Mirinda</Text>
          </View>
        </View>

        <ZavitInputField
          placeholder={'Leave a note for the Kitchen'}
          value={note}
          setValue={setnote}></ZavitInputField>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            margin: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <CounterButton
            buttontext={'-'}
            disabled={disabled}
            functionality={() => {
              dec();
            }}></CounterButton>
          <Text style={{margin: 10, fontWeight: 'bold'}}>{count}</Text>
          <CounterButton
            buttontext={'+'}
            disabled={false}
            functionality={() => {
              inc();
            }}></CounterButton>
        </View>
        <TouchableOpacity
        disabled={addToCardButtonDisable}
          style={{
            backgroundColor: '#7895B2',
            padding: 20,
            marginBottom: 35,
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderRadius: 8,
            alignItems: 'center',
          }}
          onPress={()=>{storeData()}}
        >
          <Text style={{color: 'white', fontWeight: 'bold'}}>
            ADD TO CART
          </Text>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>
            ₹{route.params.price * count}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>























        </View>
      </ImageBackground>
    </>
  );
};
const styles=StyleSheet.create({
  icon:{fontSize: 25, padding: 19},
})
export default EachDish;
