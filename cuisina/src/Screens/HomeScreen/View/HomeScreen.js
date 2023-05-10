import {React, useContext,useEffect,useState} from 'react';
import {Text, Pressable, View, TextInput, Image} from 'react-native';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {GlobalContext} from '../../../context/Index';
import Icon from 'react-native-vector-icons/FontAwesome';
import RestaurantCards from '../../../Components/RestaurantCards';
import SearchBox from '../../../Components/SearchBox';

const HomeScreen = () => {
  const {state, actions} = useContext(GlobalContext);
  const {navigationState} = state;
  const[search, setSearch] = useState(null);
  const navigation = useNavigation();

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 10,
        }}>
        <View style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
          <Image
            source={require('../../../Assets/Images/peeza.png')}
            style={{
              right: 0,
              height: 100,
              width: 100,
              transform: [{rotate: '90deg'}],
            }}></Image>
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 10,
            alignItems: 'center',
            position: 'absolute',
            width: '100%',
            top: 40,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}>
            <Pressable
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
              <Icon name={'bars'} size={30} style={{flex: 0.1}} />
            </Pressable>
            <View style={{flex: 0.9}}>
              <View elevation={10}>
                <TextInput
                  style={{
                    width:"100%",
                    padding:4,
                    backgroundColor: 'rgba(0,0,0,0.06)',
                    borderRadius: 8,
                    justifyContent: 'flex-end',
                  }}
                  placeholder="Search any Restaurant"
                   value={search}
                  onChangeText={value => {
                   setSearch(value);
                  }}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={{flex: 1, paddingTop: 8}}>
          <RestaurantCards search={search}/>
        </View>
      </View>
    </View>
  );
};
export default HomeScreen;
