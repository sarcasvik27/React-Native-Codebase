import {View, StyleSheet, Text} from 'react-native';
import React, {useState} from 'react';
import PopupButton from './PopupButton';
import ZavitInputField from './ZavitInputField';
import firestore from '@react-native-firebase/firestore';

const SuggesstionPopup = ({title, desc, functionality}) => {
  const [req, setreq] = useState();

  const userObject = {
    suggesstion: req,
  };

  const setdata = async () => {
      try {
        firestore().collection('Suggesstion').add(userObject);
        functionality()
      } catch (error) {
        console.error(error);
      }
    };

  const cancel=()=>{
      functionality()
  }
  return (
      <View style={styles.outerView}>
      <View style={styles.innerView}>
        <Text style={styles.text}>{title}</Text>
        <Text style={styles.desc}>{desc}</Text>
        <View style={{padding: 10}}>
          <ZavitInputField
            value={req}
            setValue={setreq}
            placeholder="Your Suggesstion"></ZavitInputField>
        </View>
        <View style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexDirection:"row",width:"100%"}}>
        <PopupButton title={"Submit"} functionality={()=>setdata()} ></PopupButton>
        <PopupButton title={"Cancel"} functionality={()=>cancel()}></PopupButton>
        </View>
    
      </View>

      </View>
  );
};
export default SuggesstionPopup;

const styles = StyleSheet.create({
  innerView: {
    position: 'absolute',
    top: '30%',
    left:'7%',
    backgroundColor: '#fff',
    textAlign: 'center',
    borderRadius: 8,
    padding: 20,
    width:335
  },
  outerView: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    height: '100%',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 26,
    color: 'black',
    textAlign: 'center',
  },
  desc: {
    textAlign: 'center',
    color: 'black',
  },
});
