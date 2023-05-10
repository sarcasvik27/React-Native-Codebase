import React from "react";
import {Text,Pressable, Image} from "react-native"
import { useNavigation } from "@react-navigation/native";
const OrderSuccessful=()=>{

    const navigation=useNavigation()
return(
<Pressable onPress={()=>{navigation.navigate("MyDrawer")}} style={{flex:1,justifyContent:"center",alignItems:"center"}}>
<Image source={require("../../../Assets/Images/orderS.png")}></Image>
<Text style={{fontSize:24,fontStyle:"italic",fontWeight:'bold'}}>Order Sucessful</Text>
<Text style={{fontSize:20,fontStyle:"italic",fontWeight:'bold'}}>Explore more cuisines</Text>
</Pressable>
)
}
export default OrderSuccessful 