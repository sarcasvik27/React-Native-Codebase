import React from "react";
import { TouchableOpacity,Text,View } from "react-native";
import {StyleSheet} from 'react-native';
const Button=({title, functionality})=>{
return(
    <View style={{display:"flex",justifyContent:"center",alignItems:"center",marginBottom:10}}>
    <TouchableOpacity style={styles.Button} onPress={functionality}> 
        <Text style={styles.text}>{title} </Text>
    </TouchableOpacity>
    </View>
)
}
export default Button

 const styles = StyleSheet.create({
    Button: {
       height: 55,
       width:"80%",
       backgroundColor: 'rgba(236,180,45,255)',
       borderRadius:8,
       justifyContent:"center",
       alignItems:"center",
    },
    text:{
        color:"white",
        textAlign:"center",
        fontWeight:"bold",

    }
   
  });
 
  