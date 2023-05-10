import React from 'react';
import {useState} from 'react';
import {Text, StyleSheet, View,Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../../../Components/Button';
import SuggesstionPopup from '../../../Components/SuggesstionPopup';


const Aboutus = () => {
  const [showPopup, setshowPopup] = useState(false);
  const [defaultStyle, setdefaultStyle] = useState(true);
  const navigation = useNavigation();

  const update = () => {
    setdefaultStyle(false), setshowPopup(true);
  };

  return (
    <>

      <View style={defaultStyle ? styles.style1 : styles.style2}>
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
          Cart
        </Text>
      </View>
        <View>  
          <Text
            style={styles.text}>
            Build version: 2.3 V3
          </Text>
          <Text style={{padding: 16, fontSize: 16}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget
            purus tristique, ornare massa eget, laoreet sem. Integer eget metus
            enim. Nullam viverra lobortis nisl, id euismod velit dapibus in.
            Suspendisse dignissim purus nunc, vitae scelerisque nisi luctus
            eget. Cras luctus sollicitudin dapibus. Praesent elit tortor,
            gravida vitae erat et, iaculis ullamcorper ligula. Fusce nunc erat,
            mattis quis gravida in, bibendum id tortor. Curabitur pulvinar massa
            diam, vel lobortis purus feugiat quis. Phasellus placerat lorem
            vitae arcu imperdiet t, iaculis ullamcorper ligula. Fusce nunc erat,
            mattis quis gravida in, bibendum id tortor. Curabitur pulvinar massa
            diam, vel lobortis purus feugiat quis. Phasellus placerat lorem
            vitae arcu imperdiet
          </Text>
        </View>
        {showPopup && (
          <SuggesstionPopup
            title={'Your Valuable Suggestion'}
            functionality={() => {
              setshowPopup(false), setdefaultStyle(true);
            }}
          />
        )}
        <View>
        <Button
          title={'TELL US WHAT DO YOU THINK'}
          functionality={() => {
            update();
          }}></Button>
 
        <Button
          title={'TERMS AND CONDITION'}
          functionality={() =>
            navigation.navigate('TermsandCondition')
          }></Button>
        <Button
          title={'PRIVACY POLICY'}
          functionality={() => navigation.navigate('PrivacyPolicy')}></Button></View>
      </View>
    </>
  );
};
export default Aboutus;

const styles = StyleSheet.create({
  style1: {
    // padding: 12,
    // backgroundColor: 'white',
    height: '100%',
    flex: 1,
    // justifyContent:"space-between"
  },
  style2: {
    // padding: 12,
    backgroundColor: 'rgba(189,189,189,0.9)',
    height: '100%',
        flex: 1,
    // justifyContent:"space-between"
  },
  text:{
    fontSize: 26,
    fontWeight: 'bold',
    color: 'black',
    padding: 20,
    textAlign:"center"
  }
});
