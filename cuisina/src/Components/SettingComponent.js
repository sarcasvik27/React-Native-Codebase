import React from "react";
import { Text,TouchableOpacity,View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
const SettingsComponent=({title,functionality,icon,color1})=>{
    return(
        <>
        <TouchableOpacity onPress={functionality}>
            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",paddingHorizontal:10,paddingTop:10}}>
            <View style={{flexDirection:"row",alignItems:"center",}}>
              <Text style={{color:color1,fontWeight:"700",fontSize:20}}>{title}</Text>
              </View>
              <Icon name={icon} style={{fontSize: 25,padding: 10}}></Icon>
              </View>
        </TouchableOpacity>
       </>
    )
}
export default SettingsComponent
