import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {
  Text,
  FlatList,
  View,
  Image,
  ImageBackground,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
const Menu = ({route}) => {
  const [firebaseData, setFirebaseData] = useState([]);
  const navigation = useNavigation();
  const arr = [];

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const data = await firestore()
      .collection('AllDishes')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          if (documentSnapshot.data().id === route.params)
            arr.push(documentSnapshot.data());
        });
      });
    
    setFirebaseData(arr);
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
          <Icon name={'arrow-left'} size={25} style={{paddingHorizontal: 10}} />
        </Pressable>
        <Text
          style={{
            padding: 20,
            fontSize: 20,
            fontWeight: 'bold',
            fontStyle: 'italic',
          }}>
          Menu
        </Text>
      </View>
      <FlatList
        data={firebaseData}
        renderItem={element => {
          return (
            <>
              <Pressable
                onPress={() => {
                  navigation.navigate('EachDish', element.item);
                }}
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 20,
                }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                  }}>
                  <View style={{width: 200}}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 19,
                        color: '#282828',
                        //  fontFamily: 'Ubuntu',
                        paddingTop: 20,
                      }}>
                      {element.item.Name}
                    </Text>
                  </View>
                  <View style={{width: 220}}>
                    <Text numberOfLines={3}>{element.item.description}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: 20,
                      paddingHorizontal: 10,
                    }}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: '#282828',
                      }}>
                      ₹{element.item.price}
                    </Text>
                    {element.item.veg === 'veg' ||
                    element.item.veg === undefined ? (
                      <Icon
                        name={'leaf'}
                        size={20}
                        style={{color: 'green', paddingLeft: 15}}
                      />
                    ) : (
                      <Icon
                        name={'food-drumstick'}
                        size={20}
                        style={{
                          paddingRight: 15,
                          color: 'brown',
                          transform: [{rotate: '175deg'}],
                        }}
                      />
                    )}
                  </View>
                </View>
                <View style={{padding: 20}}>
                  <Image
                    style={{height: 100, width: 100, borderRadius: 20}}
                    source={{uri: element.item.image}}
                  />
                </View>
              </Pressable>
              <View style={{borderWidth: 0.4, marginHorizontal: 10}}></View>
            </>
          );
        }}
        keyExtractor={item => item.Name}></FlatList>
    </>
  );
};
export default Menu;
