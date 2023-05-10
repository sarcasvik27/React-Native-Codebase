import React, {useEffect, useState} from 'react';
import {
  Text,
  FlatList,
  View,
  ImageBackground,
  Pressable,
  ScrollView,
  Image,
  ActivityIndicator
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/EvilIcons';
import {useNavigation} from '@react-navigation/native';
const RestaurantCards = ({search}) => {
  const arr2=[]
  const [firebaseData, setFirebaseData] = useState([]);
  const [permanentData,setPermanentData]=useState([])
  const [loader,setLoading]=useState(true)
  const arr = [];
  const navigation = useNavigation();
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (search != null) {
      permanentData.filter(data => {
        if (data.Name.toUpperCase().includes(search.trim().toUpperCase())) {
          arr2.push(data);
        }
      });
      setFirebaseData(arr2);
    }
  }, [search]);



  const getData = async () => {
    // storing data in context and in local state (firebasedata) from firebase
    const data = await firestore()
      .collection('restaurantData')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          documentSnapshot.data().id = documentSnapshot.id;
          arr.push(documentSnapshot.data());
        });
      });
        setFirebaseData(arr)
        setPermanentData(arr)
        setLoading(false)
        
        ;};

  return (
      
    firebaseData.length===0 && !loader?
    <View style={{justifyContent:"center",alignItems:"center",flex:1}}><Image source={require("../Assets/Images/noplace.jpg")} style={{height:200,width:200,borderRadius:100}}></Image>
    <Text style={{fontWeight:"bold",fontStyle:"italic",fontSize:20}}>No such place found </Text></View>:
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,}}>
      <FlatList
        data={firebaseData}
        showsVerticalScrollIndicator={false}
        renderItem={element => {
          return (
            <Pressable
            elevation={10}
              onPress={() => {
                navigation.navigate('Menu', element.item.id);
              }}
              style={{
                borderRadius: 16,
                backgroundColor: '#FFFFFF',
                marginBottom: 25,
                justifyContent: 'space-between',
                
              }}>
              <ImageBackground
                source={{uri: element.item.image}}
                style={{width: '100%', height: 220}}
                imageStyle={{borderRadius: 16}}>
                <LinearGradient
                  colors={['#00000000', '#000000']}
                  style={{
                    height: '40%',
                    width: '100%',
                    position: 'absolute',
                    bottom: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: 20,
                  }}>
                  <Text
                    style={{
                      backgroundColor: 'transparent',
                      fontSize: 24,
                      fontWeight: 'bold',
                      // bottom: 2,
                      // left: 0,
                      color: '#FFFFFF',
                      width: '100%',
                      paddingHorizontal: 10,
                    }}>
                    {element.item.Name}
                  </Text>
                  <Text
                    style={{
                      backgroundColor: 'transparent',
                      fontSize: 15,
                      fontWeight: 600,
                      color: '#FFFFFF',
                      width: '100%',
                      paddingHorizontal: 10,
                    }}>
                    {element.item.description}
                  </Text>
                </LinearGradient>
              </ImageBackground>
              <View
                style={{
                  padding: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                }}>
                <View style={{}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Icon
                      name={'progress-clock'}
                      size={18}
                      style={{paddingRight: 5, color: 'green'}}
                    />
                    <Text>{element.item.description}</Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon1
                      name={'location'}
                      size={18}
                      style={{paddingRight: 5, color: 'red'}}
                    />
                    <Text>{element.item.address}</Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Icon
                      name={'human-male-male'}
                      size={18}
                      style={{paddingRight: 5}}
                    />
                    <Text>₹ {element.item.costForTwo}</Text>
                  </View>
                </View>
              </View>
            </Pressable>
          );
        }}></FlatList>
    </ScrollView>
        );
};
export default RestaurantCards;
