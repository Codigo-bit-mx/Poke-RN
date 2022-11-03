import React from 'react'
import { Text, View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParams } from '../navigator/StackNavigator'
import { SimplePokemon } from '../interfaces/PokemonInterfaces';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { FadeInImage } from '../components/FadeInImage';
import { usePokemon } from '../hooks/usePokemon';
import { PokemonDetails } from '../components/PokemonDetails';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'>{}

export const PokemonScreen = ({navigation, route}:Props) => {

  const { top } = useSafeAreaInsets()
  
  const {simplePokemon, colors} = route.params
  const {name, id, picture} = simplePokemon

  const {isLoading, dataPokemon} = usePokemon(id)

  return (
   <View style={{flex: 1}}>
       {/* Header */}
      <View style={{...styles.headerContainer, backgroundColor: colors}}>
        
        <TouchableOpacity
          activeOpacity={0.7}
          style={{top: top + 15, left: 13}}
          onPress={() => navigation.pop()}
        >
          <Icon 
              name='arrow-back-outline'
              color='white'
              size={35}
          />
        </TouchableOpacity>

        <Text style={{...styles.namePokemon, top: top + 25}}>
          {name + '\n' }#{id} 
        </Text>

      <View style={{alignItems:'center'}}>
            <Image 
              source={require('../assets/pokebola-blanca.png')}
              style={{...styles.imgPokebola}}
            />
      </View>
    
      <View style={{alignItems:'center'}}>
        <FadeInImage 
          uri={picture} 
          style={{...styles.picturePokemon}}
        />
      </View>
  
     </View>    

      { isLoading ? (
      <View style={{...styles.loadingIndicator}}>
        <ActivityIndicator 
          color={colors}
          size={50}
        />
      </View>
    ) : (

      <PokemonDetails pokemon={dataPokemon} />
    ) } 

   </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 370,
    zIndex: 999,
    position:'relative',
    borderBottomStartRadius:1000,
    borderBottomEndRadius:1000,
  },
  namePokemon:{
    color: 'white', 
    fontSize:45,
    alignSelf: 'flex-start',
    left: 13
  },
  imgPokebola:{
    display: 'flex',
    alignItems:'center',
    width: 230,
    height: 230,
    opacity: 0.7
  },
  picturePokemon:{
    width: 220,
    height: 220,
    position: 'absolute',
    bottom: -8,
  },
  loadingIndicator: {
    height: 300,
    justifyContent: 'center',
    alignItems:'center'
  }
})
