import React, {useEffect, useState, useContext} from 'react';
import {
  Text,
  FlatList,
  Image,
  View,
  Pressable,
  Modal,
  StyleSheet,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../../../Components/Button';
import { GlobalContext } from '../../../context/Index';

const Payment = ({navigation}) => {
  const [showPopUp, setShowPopUp] = useState(false);
  const {state, actions} = useContext(GlobalContext);
  const {allCards} = state;
  const [userId, setUserId] = useState();
  const [card, setcard] = useState('');
  const arr = [];
  useEffect(() => {
    getId();
  }, []);

  const getdata = async ID => {
    try {
      const data = await firestore()
        .collection('paymentcards')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(documentSnapshot => {
            if (documentSnapshot.data().ID == ID) {
              // documentSnapshot.data().UNIQUEID=(documentSnapshot.id)
              arr.push(documentSnapshot.data()); 
            }
          });
        });
      actions.AddCardAction(arr);

    } catch (err) {
    }
  };

  const getId = async () => {
    try {
      const ID = await AsyncStorage.getItem('ID');
      if (ID !== null) {
        // We have data!
        setUserId(ID);
        getdata(ID);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  const deletedata = id => {
    firestore()
      .collection('paymentcards')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          if (documentSnapshot.data().CARDNUMBER == id) {
            const num = documentSnapshot.id;
            del(num);
          }
        });
      });
    getId();
  };

  const del = id => {
    firestore()
      .collection('paymentcards')
      .doc(id)
      .delete()
      .then(() => {});
  };
  return (
    <>
      {allCards.length == 0 ? (
        <View
          style={{
             flex:1,
             flexDirection: 'column',
             justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: 20,
              textAlign: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              alignItems: 'center',
              marginVertical: '50%',
            }}>
            No Saved Cards yet Please add a one to continue
          </Text>
          <Button
            title={'ADD NEW CARD'}
            functionality={() =>{navigation.navigate("addCard")}}></Button>
        </View>
      ) : (
        <View
          style={{
            height: '95%',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
          <FlatList
            data={allCards}
            renderItem={element => {
              return (
                <Pressable
                onPress={()=>{navigation.navigate("OrderSuccessful")}}
                  >
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 10,
                      }}>
                           {element.item.CARDTYPE == 'Visa' ? (
                        <Image
                          source={require('../../../Assets/Images/visa.png')}
                          style={{borderRadius: 50, height: 50, width: 50}}
                        />
                      ) : element.item.CARDTYPE == 'master' ? (
                        <Image
                          source={require('../../../Assets/Images/mc1.png')}
                          style={{borderRadius: 50, height: 50, width: 50}}
                        />
                      ) : (
                        <Image
                          source={require('../../../Assets/Images/amex.png')}
                          style={{borderRadius: 50, height: 50, width: 50}}
                        />
                      )}

                      <View
                        style={{
                          flexDirection: 'column',
                          padding: 10,
                        }}>
                        <Text
                          style={{
                            fontWeight: 'bold',
                            color: 'black',
                            fontSize: 20,
                          }}>
                          {element.item.CARDTYPE} Credit card
                        </Text>
                        <Text>
                          xxxx-xxxx-xxxx-
                          {element?.item?.CARDNUMBER?.substring(
                            element?.item?.CARDNUMBER?.length - 4,
                          )}
                        </Text>
                      </View>
                    </View>
                    <Pressable
                      onPress={() => {
                        setShowPopUp(!showPopUp),
                          setcard(element.item.CARDNUMBER);
                      }}>
                      <Icon
                        name="ellipsis-v"
                        style={{fontSize: 25, padding: 10}}></Icon>
                    </Pressable>
                  </View>
                  <View
                    style={{
                      height: 0.9,
                      backgroundColor: 'rgba(196, 196, 196,1)',
                    }}
                  />
                </Pressable>
              );
            }}
            keyExtractor={item => item.id}></FlatList>
          {/* <Button
            title={'ADD NEW CARD'}
            functionality={() =>{}}></Button> */}
        </View>
      )}

      {showPopUp ? (
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={showPopUp}
            onRequestClose={() => {
              setShowPopUp(!showPopUp);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View>
                  <Text style={{textAlign: 'center', fontSize: 16}}>
                    Manage cards
                  </Text>
                </View>
                <View>
                  <Pressable
                    onPress={() => {
                      deletedata(card);
                      setShowPopUp(!showPopUp);
                    }}>
                    <Text style={styles.modalText}>Remove Card</Text>
                  </Pressable>
                </View>
                <Pressable onPress={() => setShowPopUp(!showPopUp)}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 18,
                      color: 'blue',
                      fontWeight: 'bold',
                    }}>
                    Cancel
                  </Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      ) : null}
    </>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    width: '90%',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color:"red",
    paddingTop:10,
  },
});
export default Payment;
