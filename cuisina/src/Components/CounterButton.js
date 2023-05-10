import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
const CounterButton = ({buttontext,disabled,functionality}) => {
    if(disabled==true)
    {
        color="#D3D3D3"
    }
    else
    {
        color="#7895B2"
    }

  
  return (
    <TouchableOpacity
      style={{
        backgroundColor: color,
        borderRadius: 50,
        height: 50,
        width: 50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      disabled={disabled}
      onPress={functionality}>
      <Text style={{color: 'white', fontSize: 36}}>{buttontext}</Text>
    </TouchableOpacity>
  );
};
export default CounterButton;
