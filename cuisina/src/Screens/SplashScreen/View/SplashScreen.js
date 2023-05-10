import {React} from "react"
import {Text,View,Image} from "react-native"

const SplashScreen=()=>{
    return(
    <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:"rgba(1,43,40,255)"}}>
    <Image source={require("../../../Assets/Images/cuisina.png")}/>
    </View>
    )
}

export default SplashScreen