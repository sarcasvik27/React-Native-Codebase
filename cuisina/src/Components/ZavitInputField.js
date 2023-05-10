import React from 'react';
import {TextInput, StyleSheet,View} from 'react-native';

const ZavitInputField = ({value, setValue, emptyValue, placeholder,max,edit,type,sec}) => {
  return (
    <View elevation={10} style={{paddingTop:10}} >
    <TextInput
      placeholder={placeholder}
      editable={edit}
      style={styles.inputbox}
      value={value}
      onChangeText={value => setValue(value)}
      onChange={emptyValue}
      maxLength={max}
      keyboardType={type}
      secureTextEntry={sec}  
    />
    <View style={{marginHorizontal:10}}></View>
    </View>
  );
};

export default ZavitInputField;

const styles = StyleSheet.create({
     inputbox: {
     width:"95%",
     marginHorizontal:10,
     color:"black",
     padding:3,
     borderRadius:16,
     backgroundColor:"#FFFFFF"
  },
});
