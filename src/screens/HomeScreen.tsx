import React from 'react'
import { Text, View, Image, ActivityIndicator } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {styles} from '../styles/AppTheme'
import { usePokemonPagination } from '../hooks/usePokemonPagination';
import { FlatList } from 'react-native-gesture-handler';
import { FadeInImage } from '../components/FadeInImage';
import { PokemonCard } from '../components/PokemonCard';

export const HomeScreen = () => {

   const {top} =  useSafeAreaInsets()
   const {simplePokemonList, isLoading, loadPokemon} = usePokemonPagination()

  return (
    <>
        <Image
            source={require('../assets/pokebola.png')}
            style = {{
               ...styles.pokebolaPng
            }}
        />
      
        {/* <Text style={{...styles.marginGlobal, ...styles.title, top: top + 20, marginBottom: top + 20}}>Pokedex</Text> */}
    <View style={{alignItems: 'center'}}>
        <FlatList 
            data={simplePokemonList}
            keyExtractor={(pokemon) => pokemon.id}
            showsVerticalScrollIndicator={false}
            numColumns={2}

            ListHeaderComponent={(
                <Text style={{
                    ...styles.marginGlobal,
                    ...styles.title,
                    top: top + 20,
                    marginBottom: top + 30
                }}>
                    Pokedex
                </Text>
            )}

            renderItem={({item}) => (
                <PokemonCard pokemon={item}  />
            )}
            
            //infinite scroll
            onEndReached={loadPokemon}
            onEndReachedThreshold={0.4}

            ListFooterComponent={(
                <ActivityIndicator 
                    style={{height: 100}}
                    size={20}
                />
            )}

        />
    </View>
    </>
  )
}
