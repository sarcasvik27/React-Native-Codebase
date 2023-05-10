import React from "react";
import { TouchableOpacity,Text} from "react-native";
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const PopupButton=({title,functionality,icon})=>{
    return(
        <TouchableOpacity style={styles.Button} onPress={functionality}> 
         <Icon name={icon} style={styles.icons}></Icon>
        <Text style={styles.text}>{title} </Text>
        </TouchableOpacity>
    )
}
export default PopupButton
const styles = StyleSheet.create({
    Button: {
       height: 35,
       width: 120,
       backgroundColor:"#FFE5B4",
       flexDirection:"row",
       borderRadius:20,
       justifyContent:"center",
       alignItems:"center",
    },
    text:{
        color:"#581845",
        textAlign:"center",
        fontWeight:"bold",

    },
    icons:{
        fontSize: 20,
        paddingRight:10,   
    }
   
  });